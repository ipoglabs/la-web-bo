"use server"

import connectDB from "@/config/database"
import Post from "@/models/post"
import { cookies } from "next/headers"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import { Types } from "mongoose"

const ALLOWED = ["super_admin", "admin", "moderator"]

export async function reportPost(postId: string, reason?: string) {

  try {

    const token = (await cookies()).get(ADMIN_COOKIE)?.value || ""
    const session = token ? verifyAdminJwt(token) : null

    if (!session || !ALLOWED.includes(session.role))
      return { ok: false, error: "Forbidden" }

    if (!Types.ObjectId.isValid(postId))
      return { ok: false, error: "Invalid post id" }

    await connectDB()

    const adminId =
      session.adminId && Types.ObjectId.isValid(session.adminId)
        ? new Types.ObjectId(session.adminId)
        : undefined   // 🔧 FIX (not null)

    const post = await Post.findById(postId)

    if (!post)
      return { ok: false, error: "Post not found" }

    if (!Array.isArray(post.reports)) post.reports = []

    post.reported = true

    post.reports.push({
      reason: reason || "No reason",
      ...(adminId && { by: adminId }),   // 🔧 SAFE SPREAD
      at: new Date(),
    })

    /** Fraud score logic */
    const fraudScore = post.reports.length

    if (fraudScore >= 5) {
      post.isSuspended = true
      post.suspendedAt = new Date()
      if (adminId) post.suspendedBy = adminId
    }

    await post.save()

    return { ok: true }

  } catch (error) {

    console.error("REPORT POST ERROR:", error)

    return { ok: false, error: "Report failed" }

  }
}