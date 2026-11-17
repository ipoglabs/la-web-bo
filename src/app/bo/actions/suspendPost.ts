"use server"

import connectDB from "@/lib/db"
import Post from "@/models/post"
import { Types } from "mongoose"
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON } from "@/lib/adminGuard"
import { reportError } from "@/lib/errorReport"

export async function suspendPost(postId: string, reason: string) {
  try {
    if (!Types.ObjectId.isValid(postId)) return { ok: false, error: "Invalid post id" }

    const guard = await requireAdmin("posts.suspend")
    if (!guard.ok) return guard
    const { admin } = guard

    const why = cleanReason(reason)
    if (!why) return { ok: false, error: `Write a reason (at least ${MIN_REASON} characters) for the audit log.` }

    await connectDB()

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        isSuspended: true,
        suspendedAt: new Date(),
        suspendedBy: new Types.ObjectId(admin.adminId),
        status: "off",
      },
      { new: false },
    )
      .select("status name adsId")
      .lean()

    if (!post) return { ok: false, error: "Post not found" }

    await logAdminAction(admin, {
      action: "post.suspend",
      targetType: "post",
      targetId: postId,
      targetLabel: [post.adsId, post.name].filter(Boolean).join(" · ") || undefined,
      reason: why,
      meta: { from: post.status, to: "off" },
    })

    return { ok: true }
  } catch (e) {
    await reportError(e, { where: "action:suspendPost" })
    return { ok: false, error: "Suspend failed" }
  }
}
