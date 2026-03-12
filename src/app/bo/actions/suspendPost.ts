"use server"

import connectDB from "@/config/database"
import Post from "@/models/post"
import { cookies } from "next/headers"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import { Types } from "mongoose"

export async function suspendPost(postId: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value || ""
  const session = token ? verifyAdminJwt(token) : null

  if (!session) return { ok: false, error: "Unauthorized" }
  if (!Types.ObjectId.isValid(postId))
    return { ok: false, error: "Invalid post id" }

  const adminId =
    session.id || session._id || session.userId || session.sub

  await connectDB()

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      isSuspended: true,
      suspendedAt: new Date(),
      suspendedBy: adminId,
      status: "off",
    },
    { new: true }
  )

  if (!post) return { ok: false, error: "Post not found" }
  return { ok: true }
}
