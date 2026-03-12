"use server"

import connectDB from "@/config/database"
import ReportPostConversation from "@/models/reportPostConversation"
import { cookies } from "next/headers"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import { Types } from "mongoose"

const ALLOWED = ["super_admin", "admin"]

export async function clearPostReportConversation(postId: string) {

  try {

    const token = (await cookies()).get(ADMIN_COOKIE)?.value || ""
    const session = token ? verifyAdminJwt(token) : null

    if (!session || !ALLOWED.includes(session.role))
      return { ok: false, error: "Forbidden" }

    if (!Types.ObjectId.isValid(postId))
      return { ok: false, error: "Invalid post id" }

    await connectDB()

    const conversation = await ReportPostConversation.findOne({
      postId: new Types.ObjectId(postId),
    })

    if (!conversation)
      return { ok: true }

    conversation.messages = []

    await conversation.save()

    return { ok: true }

  } catch (error) {

    console.error("CLEAR POST CHAT ERROR:", error)

    return { ok: false, error: "Failed to clear chat" }

  }
}