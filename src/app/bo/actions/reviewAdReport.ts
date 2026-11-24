"use server";

import connectDB from "@/lib/db";
import AdReport from "@/models/adReport";
import { Types } from "mongoose";
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON, MAX_REASON } from "@/lib/adminGuard";
import { hasPerm } from "@/lib/adminPermissions";
import { reportError } from "@/lib/errorReport";
import { findReportedPost, logSellerActivity, moderateAd, suspendAd } from "@/lib/moderation";
import { notifyReporter, describeNotice } from "@/lib/sellerNotify";

const STATUSES = ["reviewed", "actioned", "dismissed"] as const;
type ReportStatus = (typeof STATUSES)[number];

/** What "Actioned" did to the ad. `handled` = it was already dealt with
 *  (not live any more, or gone), and the server checks that. */
export type AdAction = "reject" | "pause" | "suspend" | "handled";
const AD_ACTIONS: readonly AdAction[] = ["reject", "pause", "suspend", "handled"];

const OPEN: ("pending" | "reviewed")[] = ["pending", "reviewed"];

type Result = { ok: true; closedAlso?: number; email?: string | null; seller?: string | null } | { ok: false; error: string };

/**
 * Reviews a real end-user ad report (AdReport, submitted from the live site).
 * bo never creates AdReport docs — only reviews the ones already submitted.
 *
 * - Every decision needs an internal note (audit log).
 * - "Actioned" means the ad was dealt with: the reviewer picks what to do
 *   (reject / pause / suspend), done here with the usual rules, or says it was
 *   already handled — accepted only if the ad isn't live any more.
 * - Actioning also closes the ad's other open reports, so they don't linger.
 * - Closed reports (actioned / dismissed) stay closed.
 * - The reporter is emailed when their report is closed.
 */
export async function reviewAdReport(
  reportId: string,
  status: ReportStatus,
  note: string,
  opts: { adAction?: AdAction; sellerReason?: string } = {},
): Promise<Result> {
  try {
    if (!STATUSES.includes(status)) return { ok: false, error: "Invalid status" };
    if (!Types.ObjectId.isValid(reportId)) return { ok: false, error: "Invalid report id" };

    const guard = await requireAdmin("reports.review");
    if (!guard.ok) return guard;
    const { admin } = guard;

    const why = cleanReason(note);
    if (!why) return { ok: false, error: `Add a note (at least ${MIN_REASON} characters) saying what you found.` };

    await connectDB();

    const report = await AdReport.findById(reportId).select("status adId ticketId adTitle").lean();
    if (!report) return { ok: false, error: "Report not found" };
    if (!(OPEN as string[]).includes(report.status)) return { ok: false, error: `This report is already ${report.status}.` };

    let seller: string | null = null;

    if (status === "actioned") {
      const adAction = opts.adAction;
      if (!adAction || !AD_ACTIONS.includes(adAction)) return { ok: false, error: "Choose what was done to the ad." };

      const post = await findReportedPost(report.adId);
      const postId = post ? String(post._id) : null;
      const live = !!post && post.status === "active" && !post.isSuspended;

      if (adAction === "handled") {
        if (live) return { ok: false, error: "The ad is still live. Reject, pause or suspend it, or dismiss the report." };
      } else {
        if (!postId) return { ok: false, error: "The ad no longer exists. Choose \"Already handled\"." };
        if (adAction === "suspend") {
          if (!hasPerm(admin.role, "posts.suspend")) return { ok: false, error: "Only admins can suspend ads. Escalate it instead." };
          const r = await suspendAd(admin, postId, why, { viaReport: report.ticketId });
          if (!r.ok) return r;
          seller = describeNotice(r.seller, "The seller");
        } else {
          if (!hasPerm(admin.role, "posts.moderate")) return { ok: false, error: "You don't have permission to change ads." };
          const sellerReason = (opts.sellerReason ?? "").trim().slice(0, MAX_REASON);
          if (adAction === "reject" && sellerReason.length < MIN_REASON) {
            return { ok: false, error: `Give the seller a reason (at least ${MIN_REASON} characters).` };
          }
          const r = await moderateAd(admin, postId, adAction === "reject" ? "rejected" : "off", sellerReason, {
            emailSeller: true,
            viaReport: report.ticketId,
          });
          if (!r.ok) return { ok: false, error: r.error };
          seller = describeNotice(r.seller, "The seller");
        }
      }
    }

    // Claim the report: only if nobody closed it meanwhile.
    const now = new Date();
    const updated = await AdReport.updateOne(
      { _id: reportId, status: { $in: OPEN } },
      { $set: { status, reviewedAt: now, reviewedBy: admin.email, resolution: why } },
    );
    if (updated.modifiedCount === 0) return { ok: false, error: "Someone else closed this report just now." };

    await logAdminAction(admin, {
      action: "report.review",
      targetType: "report",
      targetId: reportId,
      targetLabel: `${report.ticketId} · Ad ${report.adId}`,
      reason: why,
      meta: { from: report.status, to: status, ...(opts.adAction && status === "actioned" ? { adAction: opts.adAction } : {}) },
    });

    // The ad's other open reports are settled by the same decision.
    const closed = [reportId];
    if (status === "actioned") {
      const others = await AdReport.find({ adId: report.adId, _id: { $ne: reportId }, status: { $in: OPEN } })
        .select("_id ticketId status")
        .lean();
      for (const o of others) {
        const r = await AdReport.updateOne(
          { _id: o._id, status: { $in: OPEN } },
          { $set: { status: "actioned", reviewedAt: now, reviewedBy: admin.email, resolution: `Closed with ${report.ticketId}: ${why}`.slice(0, MAX_REASON) } },
        );
        if (r.modifiedCount === 0) continue;
        closed.push(String(o._id));
        await logAdminAction(admin, {
          action: "report.review",
          targetType: "report",
          targetId: String(o._id),
          targetLabel: `${o.ticketId} · Ad ${report.adId}`,
          reason: why,
          meta: { from: o.status, to: "actioned", with: report.ticketId },
        });
      }
    }

    // The seller's activity history, as la-web's admin recorded it.
    if (status !== "reviewed") {
      const post = await findReportedPost(report.adId);
      if (post?.ownerId && status === "dismissed") {
        await logSellerActivity(post.ownerId, "AD_REPORT_DISMISSED", { postId: String(post._id), title: post.name, ticketId: report.ticketId });
      } else if (post?.ownerId) {
        await logSellerActivity(post.ownerId, "AD_REPORT_REVIEWED", { postId: String(post._id), title: post.name, ticketId: report.ticketId });
      }
    }

    // Tell whoever reported it (closed reports only; "reviewed" is still open).
    let email: string | null = null;
    if (status !== "reviewed") {
      const results = await Promise.all(closed.map((id) => notifyReporter(id)));
      const sent = results.filter((r) => r.sent).length;
      const failed = results.filter((r) => "failed" in r).length;
      email =
        failed > 0
          ? `${failed} reporter email(s) could NOT be sent. This has been reported.`
          : sent > 0
            ? `${sent} reporter(s) emailed.`
            : null;
    }

    return { ok: true, closedAlso: closed.length - 1, email, seller };
  } catch (e) {
    await reportError(e, { where: "action:reviewAdReport" });
    return { ok: false, error: "Review failed" };
  }
}
