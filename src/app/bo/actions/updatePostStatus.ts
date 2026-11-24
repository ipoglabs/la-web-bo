"use server";

import connectDB from "@/lib/db";
import Post from "@/models/post";
import User from "@/models/user";
import { hasPerm } from "@/lib/adminPermissions";
import { Types } from "mongoose";
import { requireAdmin, logAdminAction, MAX_REASON, MIN_REASON } from "@/lib/adminGuard";
import type { AuditAction } from "@/models/adminAuditLog";
import { reportError } from "@/lib/errorReport";
import { PAGE_SIZE } from "@/lib/listQuery";
import { notifySeller, type NotifyResult } from "@/lib/sellerNotify";

type Status = "active" | "off" | "expired" | "rejected";

const ACTION: Record<Status, AuditAction> = {
  active: "post.approve",
  off: "post.pause",
  expired: "post.expire",
  rejected: "post.reject",
};

type Admin = Extract<Awaited<ReturnType<typeof requireAdmin>>, { ok: true }>["admin"];
type Outcome =
  | { ok: true; from: string; seller?: NotifyResult }
  | { ok: false; error: string; skipped?: boolean };

/** One ad, one decision: the rules shared by single and bulk moderation. */
async function moderateOne(
  admin: Admin,
  postId: string,
  status: Status,
  rejectionReason: string,
  opts: { bulk?: string; emailSeller: boolean },
): Promise<Outcome> {
  const current = await Post.findById(postId).select("status isSuspended ownerId name adsId").lean();
  if (!current) return { ok: false, error: "Post not found", skipped: true };
  if (opts.bulk && current.status === status) return { ok: false, error: `already ${status}`, skipped: true };
  if (opts.bulk && current.status === "deleted") return { ok: false, error: "deleted by the seller", skipped: true };
  // A suspended ad stays hidden on the site whatever its status, so changing
  // the status would only make bo look different from the site. Lifting the
  // suspension (Unsuspend, admins only, with a reason) is the one way back.
  if (current.isSuspended) {
    return {
      ok: false,
      error: hasPerm(admin.role, "posts.suspend")
        ? "This ad is suspended. Unsuspend it first (with a reason)."
        : "This ad was suspended by an admin. Ask an admin to review it.",
      skipped: true,
    };
  }
  // The site doesn't check the owner when showing ads, so bo mustn't put a
  // suspended seller's ad live.
  if (status === "active" && current.ownerId) {
    const owner = await User.findById(current.ownerId).select("isSuspended accountStatus").lean();
    if (owner && (owner.isSuspended || owner.accountStatus === "Suspended" || owner.accountStatus === "Deleted")) {
      return { ok: false, error: "The seller's account is suspended or closed.", skipped: true };
    }
  }

  // A rejection carries a reason for the seller; any other status clears it.
  // Every change clears the "seller emailed" markers, so a later approval or
  // re-rejection is emailed again (la-web sends at most once per decision).
  const sentMarkers = { rejectionEmailSentAt: 1, liveEmailSentAt: 1 } as const;
  const update =
    status === "rejected"
      ? { $set: { status, rejectionReason, updatedAt: new Date() }, $unset: sentMarkers }
      : { $set: { status, updatedAt: new Date() }, $unset: { rejectionReason: 1, ...sentMarkers } };

  await Post.updateOne({ _id: postId }, update);

  await logAdminAction(admin, {
    action: ACTION[status],
    targetType: "post",
    targetId: postId,
    targetLabel: [current.adsId, current.name].filter(Boolean).join(" · ") || undefined,
    reason: rejectionReason || undefined,
    meta: { from: current.status, to: status, ...(opts.bulk ? { bulk: opts.bulk } : {}) },
  });

  // Tell the seller: "live" on approval, the reason on rejection. The decision
  // itself already succeeded, so a failed email is reported to the moderator,
  // not treated as a failed action.
  let seller: NotifyResult | undefined;
  const wasLive = status === "active" && current.status === "active";
  if ((status === "rejected" || status === "active") && !wasLive && opts.emailSeller) seller = await notifySeller(postId);
  return { ok: true, from: String(current.status ?? "pending"), seller };
}

export async function updatePostStatus(postId: string, status: Status, reason?: string) {
  try {
    if (!(status in ACTION)) return { ok: false, error: "Invalid status" };
    if (!Types.ObjectId.isValid(postId)) return { ok: false, error: "Invalid post id" };

    const guard = await requireAdmin("posts.moderate");
    if (!guard.ok) return guard;

    const rejectionReason = reason?.trim().slice(0, MAX_REASON) || "";
    if (status === "rejected" && !rejectionReason) {
      return { ok: false, error: "Give the seller a reason for rejecting this ad." };
    }

    await connectDB();
    const res = await moderateOne(guard.admin, postId, status, rejectionReason, { emailSeller: true });
    return res.ok ? { ok: true, seller: res.seller } : { ok: false, error: res.error };
  } catch (e) {
    await reportError(e, { where: "action:updatePostStatus" });
    return { ok: false, error: "Update failed" };
  }
}

/** Most ads one bulk action may touch: one page of the Ads list. */
const MAX_BULK = PAGE_SIZE;

export type BulkResult =
  | { ok: false; error: string }
  | {
      ok: true;
      done: number;
      skipped: { id: string; why: string }[];
      failed: number;
      emails?: { sent: number; notSent: number; failed: number };
    };

/**
 * Approve or reject several ads at once (Ads list checkboxes). Each ad gets
 * exactly the same checks, audit entry and seller email as a single decision;
 * entries share a batch id in meta.bulk so a batch can be found and reviewed.
 */
export async function bulkUpdatePostStatus(
  postIds: string[],
  status: "active" | "rejected",
  reason?: string,
): Promise<BulkResult> {
  try {
    if (status !== "active" && status !== "rejected") return { ok: false, error: "Invalid status" };
    const ids = [...new Set(Array.isArray(postIds) ? postIds.map(String) : [])];
    if (ids.length === 0) return { ok: false, error: "Select at least one ad." };
    if (ids.length > MAX_BULK) return { ok: false, error: `At most ${MAX_BULK} ads at a time.` };
    if (!ids.every((id) => Types.ObjectId.isValid(id))) return { ok: false, error: "Invalid post id" };

    const guard = await requireAdmin("posts.moderate");
    if (!guard.ok) return guard;

    const rejectionReason = reason?.trim().slice(0, MAX_REASON) || "";
    if (status === "rejected" && rejectionReason.length < MIN_REASON) {
      return { ok: false, error: `Give the sellers a reason (at least ${MIN_REASON} characters).` };
    }

    await connectDB();
    const batch = new Types.ObjectId().toHexString();
    const skipped: { id: string; why: string }[] = [];
    const emailIds: string[] = [];
    let done = 0;
    let failed = 0;

    for (const id of ids) {
      try {
        const r = await moderateOne(guard.admin, id, status, rejectionReason, { bulk: batch, emailSeller: false });
        if (r.ok) {
          done++;
          emailIds.push(id);
        } else skipped.push({ id, why: r.error });
      } catch (e) {
        failed++;
        await reportError(e, { where: "action:bulkUpdatePostStatus", extra: { postId: id } });
      }
    }

    // Emails after all decisions are saved, a few at a time.
    let emails: { sent: number; notSent: number; failed: number } | undefined;
    if (emailIds.length) {
      emails = { sent: 0, notSent: 0, failed: 0 };
      for (let i = 0; i < emailIds.length; i += 5) {
        const results = await Promise.all(emailIds.slice(i, i + 5).map((id) => notifySeller(id)));
        for (const r of results) {
          if (r.sent) emails.sent++;
          else if ("failed" in r) emails.failed++;
          else emails.notSent++;
        }
      }
    }

    return { ok: true, done, skipped, failed, emails };
  } catch (e) {
    await reportError(e, { where: "action:bulkUpdatePostStatus" });
    return { ok: false, error: "Bulk update failed" };
  }
}
