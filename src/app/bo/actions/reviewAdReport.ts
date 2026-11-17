"use server";

import connectDB from "@/lib/db";
import AdReport from "@/models/adReport";
import { Types } from "mongoose";
import { requireAdmin, logAdminAction, MAX_REASON } from "@/lib/adminGuard";
import { reportError } from "@/lib/errorReport";

const STATUSES = ["reviewed", "actioned", "dismissed"] as const;

/** Marks a real end-user ad report (AdReport, submitted from the live site)
 * as reviewed/actioned/dismissed, with an optional admin note. bo never
 * creates AdReport docs — only reviews the ones already submitted. */
export async function reviewAdReport(
  reportId: string,
  status: (typeof STATUSES)[number],
  resolution?: string,
) {
  try {
    if (!STATUSES.includes(status)) return { ok: false, error: "Invalid status" };
    if (!Types.ObjectId.isValid(reportId)) return { ok: false, error: "Invalid report id" };

    const guard = await requireAdmin("reports.review");
    if (!guard.ok) return guard;
    const { admin } = guard;

    await connectDB();

    const note = resolution?.trim().slice(0, MAX_REASON) || null;
    const before = await AdReport.findByIdAndUpdate(
      reportId,
      { status, reviewedAt: new Date(), reviewedBy: admin.email, resolution: note },
      { new: false },
    ).lean();

    if (!before) return { ok: false, error: "Report not found" };

    await logAdminAction(admin, {
      action: "report.review",
      targetType: "report",
      targetId: reportId,
      targetLabel: before.adId ? `Ad ${before.adId}` : undefined,
      reason: note || undefined,
      meta: { from: before.status, to: status },
    });

    return { ok: true };
  } catch (e) {
    await reportError(e, { where: "action:reviewAdReport" });
    return { ok: false, error: "Review failed" };
  }
}
