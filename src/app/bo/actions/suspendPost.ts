"use server"

import connectDB from "@/lib/db"
import Post from "@/models/post"
import { cookies } from "next/headers"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import { Types } from "mongoose"

const ALLOWED = ["super_admin", "admin"]

export async function suspendPost(postId: string) {

  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value || ""
  const session = token ? verifyAdminJwt(token) : null

  if (!session || !ALLOWED.includes(session.role))
    return { ok: false, error: "Forbidden" }

  if (!Types.ObjectId.isValid(postId))
    return { ok: false, error: "Invalid post id" }

  await connectDB()

  const adminId =
    session.adminId && Types.ObjectId.isValid(session.adminId)
      ? new Types.ObjectId(session.adminId)
      : undefined

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      isSuspended: true,
      suspendedAt: new Date(),
      ...(adminId && { suspendedBy: adminId }),
      status: "off",
    },
    { new: true }
  )

  if (!post)
    return { ok: false, error: "Post not found" }

  return { ok: true }
}