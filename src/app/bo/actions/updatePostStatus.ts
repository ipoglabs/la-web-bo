"use server";

import connectDB from "@/lib/db";
import { Types } from "mongoose";
import { requireAdmin, MAX_REASON, MIN_REASON } from "@/lib/adminGuard";
import { reportError } from "@/lib/errorReport";
import { PAGE_SIZE } from "@/lib/listQuery";
import { notifySeller } from "@/lib/sellerNotify";
import { moderateAd, isModerationStatus, type ModerationStatus } from "@/lib/moderation";

export async function updatePostStatus(postId: string, status: ModerationStatus, reason?: string) {
  try {
    if (!isModerationStatus(status)) return { ok: false, error: "Invalid status" };
    if (!Types.ObjectId.isValid(postId)) return { ok: false, error: "Invalid post id" };

    const guard = await requireAdmin("posts.moderate");
    if (!guard.ok) return guard;

    const rejectionReason = reason?.trim().slice(0, MAX_REASON) || "";
    if (status === "rejected" && !rejectionReason) {
      return { ok: false, error: "Give the seller a reason for rejecting this ad." };
    }

    await connectDB();
    const res = await moderateAd(guard.admin, postId, status, rejectionReason, { emailSeller: true });
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
        const r = await moderateAd(guard.admin, id, status, rejectionReason, { bulk: batch, emailSeller: false });
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
