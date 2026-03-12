"use server"

import connectDB from "@/config/database"
import ReportConversation from "@/models/reportConversation"
import { Types } from "mongoose"

export async function clearReportConversation(userId: string) {

  await connectDB()

  await ReportConversation.deleteOne({
    userId: new Types.ObjectId(userId)
  })

  return { ok: true }

}