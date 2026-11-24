// Moderation rules shared by the ad page, bulk moderation and report review.
// Not a "use server" file on purpose: these take an already-checked admin and
// must never be callable from the browser. The server actions in
// src/app/bo/actions/ do the permission checks and then call these.

import { Types } from "mongoose";
import Post from "@/models/post";
import User from "@/models/user";
import { logAdminAction, type AdminContext } from "@/lib/adminGuard";
import type { AuditAction } from "@/models/adminAuditLog";
import { hasPerm } from "@/lib/adminPermissions";
import { notifySeller, type NotifyResult } from "@/lib/sellerNotify";
import { reportError } from "@/lib/errorReport";

export type ModerationStatus = "active" | "off" | "expired" | "rejected";

const ACTION: Record<ModerationStatus, AuditAction> = {
  active: "post.approve",
  off: "post.pause",
  expired: "post.expire",
  rejected: "post.reject",
};

export const isModerationStatus = (s: unknown): s is ModerationStatus =>
  typeof s === "string" && s in ACTION;

/** la-web's activity actions (models/ActivityLog.ts there) for the seller's
 *  activity history, which Dev Tools shows. */
type SellerActivity =
  | "AD_APPROVED"
  | "AD_REJECTED"
  | "AD_SUSPENDED"
  | "AD_RESTORED"
  | "AD_REPORT_REVIEWED"
  | "AD_REPORT_DISMISSED";

const ACTIVITY: Partial<Record<ModerationStatus, SellerActivity>> = {
  active: "AD_APPROVED",
  rejected: "AD_REJECTED",
};

/** Adds an entry to the seller's activity history (la-web's `activitylogs`),
 *  as la-web's own admin did. Best effort: the decision already happened. */
export async function logSellerActivity(
  ownerId: unknown,
  action: SellerActivity,
  metadata: Record<string, unknown>,
) {
  if (!ownerId || !Types.ObjectId.isValid(String(ownerId))) return;
  try {
    await Post.db.collection("activitylogs").insertOne({
      userId: new Types.ObjectId(String(ownerId)),
      action,
      metadata: { ...metadata, source: "back-office" },
      createdAt: new Date(),
    });
  } catch (e) {
    await reportError(e, { where: "logSellerActivity", level: "warning", extra: { action } });
  }
}

const labelOf = (p: { adsId?: string; name?: string }) => [p.adsId, p.name].filter(Boolean).join(" · ") || undefined;

export type ModerateOutcome =
  | { ok: true; from: string; seller?: NotifyResult }
  | { ok: false; error: string; skipped?: boolean };

/** One ad, one decision: the rules shared by single, bulk and report moderation. */
export async function moderateAd(
  admin: AdminContext,
  postId: string,
  status: ModerationStatus,
  rejectionReason: string,
  opts: { bulk?: string; emailSeller: boolean; viaReport?: string },
): Promise<ModerateOutcome> {
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
    targetLabel: labelOf(current),
    reason: rejectionReason || undefined,
    meta: {
      from: current.status,
      to: status,
      ...(opts.bulk ? { bulk: opts.bulk } : {}),
      ...(opts.viaReport ? { report: opts.viaReport } : {}),
    },
  });

  const activity = ACTIVITY[status];
  if (activity && current.status !== status) {
    await logSellerActivity(current.ownerId, activity, {
      postId,
      title: current.name,
      ...(rejectionReason ? { reason: rejectionReason } : {}),
    });
  }

  // Tell the seller: "live" on approval, the reason on rejection. The decision
  // itself already succeeded, so a failed email is reported to the moderator,
  // not treated as a failed action.
  let seller: NotifyResult | undefined;
  const wasLive = status === "active" && current.status === "active";
  if ((status === "rejected" || status === "active") && !wasLive && opts.emailSeller) seller = await notifySeller(postId);
  return { ok: true, from: String(current.status ?? "pending"), seller };
}

/** Statuses an unsuspended ad can go back to. Anything else (old suspensions
 *  saved before statusBeforeSuspend existed) comes back paused, so an admin
 *  decides on purpose whether it goes live. */
const RESTORABLE = ["pending", "active", "rejected", "off", "expired"] as const;

export type SuspendOutcome =
  | { ok: true; from: string; status: string; seller?: NotifyResult }
  | { ok: false; error: string };

/** Caller must have checked posts.suspend and the reason. */
export async function suspendAd(
  admin: AdminContext,
  postId: string,
  why: string,
  opts: { viaReport?: string } = {},
): Promise<SuspendOutcome> {
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
          // A fresh suspension gets its own "listing removed" email.
          suspensionEmailSentAt: "$$REMOVE",
          updatedAt: "$$NOW",
        },
      },
    ],
    { returnDocument: "before", updatePipeline: true },
  )
    .select("status name adsId ownerId")
    .lean();

  if (!post) {
    const exists = await Post.exists({ _id: postId });
    return { ok: false, error: exists ? "This ad is already suspended." : "Post not found" };
  }

  await logAdminAction(admin, {
    action: "post.suspend",
    targetType: "post",
    targetId: postId,
    targetLabel: labelOf(post),
    reason: why,
    meta: { from: post.status, to: "off", ...(opts.viaReport ? { report: opts.viaReport } : {}) },
  });
  await logSellerActivity(post.ownerId, "AD_SUSPENDED", { postId, title: post.name, ...(opts.viaReport ? { report: opts.viaReport } : {}) });

  // "Your listing has been removed" — only if it was something the seller
  // could see as live or waiting; a deleted ad needs no email.
  const seller = post.status === "deleted" ? undefined : await notifySeller(postId);
  return { ok: true, from: String(post.status ?? ""), status: "off", seller };
}

/** Lifts an admin suspension and puts the ad back in the status it had
 *  before. Caller must have checked posts.suspend and the reason. */
export async function unsuspendAd(admin: AdminContext, postId: string, why: string): Promise<SuspendOutcome> {
  const post = await Post.findOne({ _id: postId, isSuspended: true })
    .select("status statusBeforeSuspend name adsId ownerId")
    .lean();
  if (!post) {
    const exists = await Post.exists({ _id: postId });
    return { ok: false, error: exists ? "This ad isn't suspended." : "Post not found" };
  }

  // The seller deleted it meanwhile: lift the flag but keep it deleted.
  const before = String(post.statusBeforeSuspend ?? "");
  const to =
    post.status === "deleted" ? "deleted" : (RESTORABLE as readonly string[]).includes(before) ? before : "off";

  const res = await Post.updateOne(
    { _id: postId, isSuspended: true },
    {
      $set: { isSuspended: false, status: to, updatedAt: new Date() },
      // Back live: the seller gets "your listing is live" again.
      $unset: {
        suspendedAt: 1,
        suspendedBy: 1,
        statusBeforeSuspend: 1,
        suspensionEmailSentAt: 1,
        ...(to === "active" ? { liveEmailSentAt: 1 } : {}),
      },
    },
  );
  if (res.modifiedCount === 0) return { ok: false, error: "This ad isn't suspended." };

  await logAdminAction(admin, {
    action: "post.unsuspend",
    targetType: "post",
    targetId: postId,
    targetLabel: labelOf(post),
    reason: why,
    meta: { from: post.status, to },
  });
  await logSellerActivity(post.ownerId, "AD_RESTORED", { postId, title: post.name });

  const seller = to === "active" ? await notifySeller(postId) : undefined;
  return { ok: true, from: String(post.status ?? ""), status: to, seller };
}

/** Finds the ad an AdReport points at: la-web stores the listing's display id
 *  (Post.adsId), occasionally the Mongo _id. */
export async function findReportedPost(adId: string) {
  if (!adId) return null;
  const query = Types.ObjectId.isValid(adId) && adId.length === 24 ? { _id: adId } : { adsId: adId };
  return Post.findOne(query).select("_id status isSuspended ownerId name adsId").lean();
}
