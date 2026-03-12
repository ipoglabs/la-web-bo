"use server"

import { cookies } from "next/headers"
import connectDB from "@/config/database"
import ReportConversation from "@/models/reportConversation"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import { Types } from "mongoose"

export async function sendReportMessage(userId: string, text: string) {

  const token = (await cookies()).get(ADMIN_COOKIE)?.value || ""
  const session = token ? verifyAdminJwt(token) : null

  if (!session) return { ok: false }

  await connectDB()

  const userObjectId = new Types.ObjectId(userId)

  let convo = await ReportConversation.findOne({ userId: userObjectId })

  if (!convo) {

    convo = await ReportConversation.create({
      userId: userObjectId,
      messages: []
    })

  }

  convo.messages.push({

    senderAdminId: session.adminId,
    senderEmail: session.email,
    text,
    createdAt: new Date()

  })

  await convo.save()

  return { ok: true }

}