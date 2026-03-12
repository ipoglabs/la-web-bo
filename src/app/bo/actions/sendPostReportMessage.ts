"use server"

import connectDB from "@/config/database"
import ReportPostConversation from "@/models/reportPostConversation"
import { cookies } from "next/headers"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import { Types } from "mongoose"

export async function sendPostReportMessage(postId: string, text: string) {

  try {

    const token = (await cookies()).get(ADMIN_COOKIE)?.value || ""
    const session = token ? verifyAdminJwt(token) : null

    if (!session)
      return { ok: false, error: "Unauthorized" }

    if (!Types.ObjectId.isValid(postId))
      return { ok: false, error: "Invalid post id" }

    if (!text?.trim())
      return { ok: false, error: "Empty message" }

    await connectDB()

    let conversation = await ReportPostConversation.findOne({
      postId: new Types.ObjectId(postId),
    })

    if (!conversation) {

      conversation = new ReportPostConversation({
        postId,
        messages: [],
      })

    }

    conversation.messages.push({
      senderEmail: session.email || "Admin",
      text: text.trim(),
    })

    await conversation.save()

    return { ok: true }

  } catch (error) {

    console.error("SEND POST MESSAGE ERROR:", error)

    return { ok: false, error: "Failed to send message" }

  }
}