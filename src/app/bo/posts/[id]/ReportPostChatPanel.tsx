"use client"

import { useEffect, useState, useRef } from "react"
import { sendPostReportMessage } from "@/app/bo/actions/sendPostReportMessage"
import { clearPostReportConversation } from "@/app/bo/actions/clearPostReportConversation"

export default function ReportPostChatPanel({
  postId,
  postTitle,
  messages = [],
}: {
  postId: string
  postTitle: string
  messages: any[]
}) {

  const [chat, setChat] = useState(messages)
  const [text, setText] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const source = new EventSource(`/api/report-post-chat/stream/${postId}`)

    source.onmessage = (event) => {

      const data = JSON.parse(event.data)

      if (!data || data.length === 0) return

      setChat(data)

    }

    source.onerror = () => source.close()

    return () => source.close()

  }, [postId])

  useEffect(() => {

    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth"
    })

  }, [chat])

  const send = async () => {

    if (!text.trim()) return

    const message = text

    setText("")

    const optimistic = {
      id: Date.now().toString(),
      sender: "You",
      text: message,
      at: new Date().toISOString()
    }

    setChat(prev => [...prev, optimistic])

    await sendPostReportMessage(postId, message)

  }

  const clearChat = async () => {

    if (!confirm("Clear entire chat history?")) return

    await clearPostReportConversation(postId)

    setChat([])

  }

  return (

    <div className="bg-white rounded-xl border shadow flex flex-col h-[600px]">

      <div className="p-4 border-b flex justify-between">

        <div>
          <div className="font-semibold">Admin Chat</div>
          <div className="text-xs text-slate-500">{postTitle}</div>
        </div>

        <button
          onClick={clearChat}
          className="text-xs text-red-600 hover:underline"
        >
          Clear Chat
        </button>

      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >

        {chat.length === 0 && (
          <div className="text-sm text-slate-500">
            No messages yet
          </div>
        )}

        {chat.map((m: any) => {

          const mine = m.sender === "You"

          return (

            <div
              key={m.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >

              <div
                className={`max-w-[70%] rounded-xl px-3 py-2 text-sm shadow
                ${mine
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-900"
                }`}
              >

                <div className="text-[11px] opacity-80 mb-1">
                  {m.sender}
                </div>

                <div>{m.text}</div>

                <div className="text-[10px] opacity-70 mt-1">
                  {new Date(m.at).toLocaleTimeString("en-GB")}
                </div>

              </div>

            </div>

          )

        })}

      </div>

      <div className="border-t p-3 flex gap-2">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 border rounded-md px-3 py-2 text-sm"
          placeholder="Write admin message..."
        />

        <button
          onClick={send}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md"
        >
          Send
        </button>

      </div>

    </div>

  )
}