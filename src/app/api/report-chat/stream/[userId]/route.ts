import connectDB from "@/config/database"
import ReportConversation from "@/models/reportConversation"
import { NextRequest } from "next/server"
import { Types } from "mongoose"

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {

  const { userId } = await context.params

  await connectDB()

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {

      const send = (data: any) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        )
      }

      const userObjectId = new Types.ObjectId(userId)

      let lastCount = 0

      const loadMessages = async () => {

        const convo = await ReportConversation
          .findOne({ userId: userObjectId })
          .lean()

        const messages = (convo?.messages || []).map((m: any) => ({
          id: m._id.toString(),
          sender: m.senderEmail,
          text: m.text,
          at: m.createdAt
        }))

        if (messages.length !== lastCount) {
          lastCount = messages.length
          send(messages)
        }
      }

      await loadMessages()

      const interval = setInterval(loadMessages, 1500)

      req.signal.addEventListener("abort", () => {
        clearInterval(interval)
        controller.close()
      })
    }
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    }
  })
}