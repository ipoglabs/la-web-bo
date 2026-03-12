"use client"

import { useEffect, useState } from "react"
import { sendReportMessage } from "@/app/bo/actions/sendReportMessage"
import { clearReportConversation } from "@/app/bo/actions/clearReportConversation"

export default function ReportChatPanel({
  entityType,
  entityId,
  name,
  messages = []
}: {
  entityType: "user" | "post"
  entityId: string
  name: string
  messages: any[]
}) {

  const [chat, setChat] = useState(messages)
  const [text, setText] = useState("")

  useEffect(() => {

    const source = new EventSource(
      `/api/report-chat/stream/${entityType}/${entityId}`
    )

    source.onmessage = (event) => {

      const data = JSON.parse(event.data)

      if (!data || data.length === 0) return

      setChat(data)

    }

    return () => source.close()

  }, [entityType, entityId])

  const send = async () => {

    if (!text.trim()) return

    const message = text
    setText("")

    setChat(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "You",
        text: message,
        at: new Date().toISOString()
      }
    ])

    await sendReportMessage(entityType, entityId, message)

  }

  const clearChat = async () => {

    await clearReportConversation(entityType, entityId)

    setChat([])

  }

  return (
    <div className="border rounded-lg p-4 space-y-3">

      <div className="font-semibold">
        Admin Chat — {name}
      </div>

      <div className="space-y-2 max-h-96 overflow-auto">

        {chat.map(m => (

          <div key={m.id} className="text-sm">

            <b>{m.sender}</b>: {m.text}

            <div className="text-xs text-gray-400">
              {new Date(m.at).toLocaleString()}
            </div>

          </div>

        ))}

      </div>

      <div className="flex gap-2">

        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="border px-2 py-1 flex-1"
        />

        <button
          onClick={send}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Send
        </button>

      </div>

    </div>
  )
}