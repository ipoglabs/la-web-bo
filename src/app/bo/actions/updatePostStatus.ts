"use server";

import connectDB from "@/lib/db";
import Post from "@/models/post";
import { Types } from "mongoose";
import { requireAdmin, logAdminAction, MAX_REASON } from "@/lib/adminGuard";
import type { AuditAction } from "@/models/adminAuditLog";
import { reportError } from "@/lib/errorReport";

type Status = "active" | "off" | "expired" | "rejected";

const ACTION: Record<Status, AuditAction> = {
  active: "post.approve",
  off: "post.pause",
  expired: "post.expire",
  rejected: "post.reject",
};

export async function updatePostStatus(postId: string, status: Status, reason?: string) {
  try {
    if (!(status in ACTION)) return { ok: false, error: "Invalid status" };
    if (!Types.ObjectId.isValid(postId)) return { ok: false, error: "Invalid post id" };

    const guard = await requireAdmin("posts.moderate");
    if (!guard.ok) return guard;
    const { admin } = guard;

    const rejectionReason = reason?.trim().slice(0, MAX_REASON) || "";
    if (status === "rejected" && !rejectionReason) {
      return { ok: false, error: "Give the seller a reason for rejecting this ad." };
    }

    await connectDB();

    // Suspension is an admin decision; moderators can't quietly re-approve a suspended ad.
    const current = await Post.findById(postId).select("status isSuspended name adsId").lean();
    if (!current) return { ok: false, error: "Post not found" };
    if (current.isSuspended && status === "active" && admin.role === "moderator") {
      return { ok: false, error: "This ad was suspended by an admin. Ask an admin to review it." };
    }

    // A rejection carries a reason for the seller; any other status clears it.
    const update =
      status === "rejected"
        ? { $set: { status, rejectionReason, updatedAt: new Date() } }
        : { $set: { status, updatedAt: new Date() }, $unset: { rejectionReason: 1 } };

    await Post.updateOne({ _id: postId }, update);

    await logAdminAction(admin, {
      action: ACTION[status],
      targetType: "post",
      targetId: postId,
      targetLabel: [current.adsId, current.name].filter(Boolean).join(" · ") || undefined,
      reason: rejectionReason || undefined,
      meta: { from: current.status, to: status },
    });

    return { ok: true };
  } catch (e) {
    await reportError(e, { where: "action:updatePostStatus" });
    return { ok: false, error: "Update failed" };
  }
}
