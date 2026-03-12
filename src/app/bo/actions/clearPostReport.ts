"use server"

import connectDB from "@/config/database"
import Post from "@/models/post"
import { cookies } from "next/headers"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import { Types } from "mongoose"

const ALLOWED = ["super_admin", "admin"]

export async function clearPostReport(postId: string) {

  try {

    const token = (await cookies()).get(ADMIN_COOKIE)?.value || ""
    const session = token ? verifyAdminJwt(token) : null

    if (!session || !ALLOWED.includes(session.role))
      return { ok: false, error: "Forbidden" }

    if (!Types.ObjectId.isValid(postId))
      return { ok: false, error: "Invalid post id" }

    await connectDB()

    const post = await Post.findById(postId)

    if (!post)
      return { ok: false, error: "Post not found" }

    post.reported = false
    post.reports = []

    await post.save()

    return { ok: true }

  } catch (error) {

    console.error("CLEAR POST REPORT ERROR:", error)

    return { ok: false, error: "Clear report failed" }

  }
}