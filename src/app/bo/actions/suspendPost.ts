"use server"

import connectDB from "@/lib/db"
import Post from "@/models/post"
import { Types } from "mongoose"
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON } from "@/lib/adminGuard"
import { reportError } from "@/lib/errorReport"

/** Statuses an unsuspended ad can go back to. Anything else (old suspensions
 *  saved before statusBeforeSuspend existed) comes back paused, so an admin
 *  decides on purpose whether it goes live. */
const RESTORABLE = ["pending", "active", "rejected", "off", "expired"] as const

const labelOf = (p: { adsId?: string; name?: string }) => [p.adsId, p.name].filter(Boolean).join(" · ") || undefined

export async function suspendPost(postId: string, reason: string) {
  try {
    if (!Types.ObjectId.isValid(postId)) return { ok: false, error: "Invalid post id" }

    const guard = await requireAdmin("posts.suspend")
    if (!guard.ok) return guard
    const { admin } = guard

    const why = cleanReason(reason)
    if (!why) return { ok: false, error: `Write a reason (at least ${MIN_REASON} characters) for the audit log.` }

    await connectDB()

    // Only an ad that isn't suspended yet, so the status we remember is the
    // real one from before, never "off" from an earlier suspension.
    const post = await Post.findOneAndUpdate(
      { _id: postId, isSuspended: { $ne: true } },
      [
        {
          $set: {
            isSuspended: true,
            suspendedAt: "$$NOW",
            suspendedBy: new Types.ObjectId(admin.adminId),
            statusBeforeSuspend: "$status",
            status: "off",
            // Now held by this suspension, not the owner's: unsuspending the
            // owner must not bring it back.
            pausedForOwnerSuspension: "$$REMOVE",
            updatedAt: "$$NOW",
          },
        },
      ],
      { returnDocument: "before", updatePipeline: true },
    )
      .select("status name adsId")
      .lean()

    if (!post) {
      const exists = await Post.exists({ _id: postId })
      return { ok: false, error: exists ? "This ad is already suspended." : "Post not found" }
    }

    await logAdminAction(admin, {
      action: "post.suspend",
      targetType: "post",
      targetId: postId,
      targetLabel: labelOf(post),
      reason: why,
      meta: { from: post.status, to: "off" },
    })

    return { ok: true }
  } catch (e) {
    await reportError(e, { where: "action:suspendPost" })
    return { ok: false, error: "Suspend failed" }
  }
}

/** Lifts an admin suspension and puts the ad back in the status it had
 *  before. The main site hides every ad with isSuspended, whatever its
 *  status, so this is the only way a suspended ad can come back. */
export async function unsuspendPost(postId: string, reason: string) {
  try {
    if (!Types.ObjectId.isValid(postId)) return { ok: false, error: "Invalid post id" }

    const guard = await requireAdmin("posts.suspend")
    if (!guard.ok) return guard
    const { admin } = guard

    const why = cleanReason(reason)
    if (!why) return { ok: false, error: `Write why you're lifting the suspension (at least ${MIN_REASON} characters).` }

    await connectDB()

    const post = await Post.findOne({ _id: postId, isSuspended: true })
      .select("status statusBeforeSuspend name adsId")
      .lean()
    if (!post) {
      const exists = await Post.exists({ _id: postId })
      return { ok: false, error: exists ? "This ad isn't suspended." : "Post not found" }
    }

    // The seller deleted it meanwhile: lift the flag but keep it deleted.
    const before = String(post.statusBeforeSuspend ?? "")
    const to =
      post.status === "deleted" ? "deleted" : (RESTORABLE as readonly string[]).includes(before) ? before : "off"

    const res = await Post.updateOne(
      { _id: postId, isSuspended: true },
      {
        $set: { isSuspended: false, status: to, updatedAt: new Date() },
        $unset: { suspendedAt: 1, suspendedBy: 1, statusBeforeSuspend: 1 },
      },
    )
    if (res.modifiedCount === 0) return { ok: false, error: "This ad isn't suspended." }

    await logAdminAction(admin, {
      action: "post.unsuspend",
      targetType: "post",
      targetId: postId,
      targetLabel: labelOf(post),
      reason: why,
      meta: { from: post.status, to },
    })

    return { ok: true, status: to }
  } catch (e) {
    await reportError(e, { where: "action:unsuspendPost" })
    return { ok: false, error: "Unsuspend failed" }
  }
}
