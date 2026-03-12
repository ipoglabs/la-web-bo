import connectDB from "@/config/database"
import ReportConversation from "@/models/reportConversation"
import { Types } from "mongoose"

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {

  await connectDB()

  const encoder = new TextEncoder()

  const stream = new ReadableStream({

    async start(controller) {

      const send = (data: any) => {

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        )

      }

      const userObjectId = new Types.ObjectId(params.userId)

      let lastCount = -1

      const loadMessages = async () => {

        const convo = await ReportConversation
          .findOne({ userId: userObjectId })
          .lean()

        if (!convo) return

        const messages = convo.messages.map((m: any) => ({

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

      const interval = setInterval(loadMessages, 2000)

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