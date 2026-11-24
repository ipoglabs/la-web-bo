"use server"

import connectDB from "@/lib/db"
import { Types } from "mongoose"
import { requireAdmin, cleanReason, MIN_REASON } from "@/lib/adminGuard"
import { reportError } from "@/lib/errorReport"
import { suspendAd, unsuspendAd } from "@/lib/moderation"

export async function suspendPost(postId: string, reason: string) {
  try {
    if (!Types.ObjectId.isValid(postId)) return { ok: false, error: "Invalid post id" }

    const guard = await requireAdmin("posts.suspend")
    if (!guard.ok) return guard

    const why = cleanReason(reason)
    if (!why) return { ok: false, error: `Write a reason (at least ${MIN_REASON} characters) for the audit log.` }

    await connectDB()
    return await suspendAd(guard.admin, postId, why)
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

    const why = cleanReason(reason)
    if (!why) return { ok: false, error: `Write why you're lifting the suspension (at least ${MIN_REASON} characters).` }

    await connectDB()
    return await unsuspendAd(guard.admin, postId, why)
  } catch (e) {
    await reportError(e, { where: "action:unsuspendPost" })
    return { ok: false, error: "Unsuspend failed" }
  }
}
