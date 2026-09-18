"use server";

import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import AdReport from "@/models/adReport";
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth";
import { Types } from "mongoose";

const ALLOWED = ["super_admin", "admin", "moderator"];

/** Marks a real end-user ad report (AdReport, submitted from the live site)
 * as reviewed/actioned/dismissed, with an optional admin note. bo never
 * creates AdReport docs — only reviews the ones already submitted. */
export async function reviewAdReport(
  reportId: string,
  status: "reviewed" | "actioned" | "dismissed",
  resolution?: string
) {
  try {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value || "";
    const session = token ? verifyAdminJwt(token) : null;

    if (!session || !ALLOWED.includes(session.role)) return { ok: false, error: "Forbidden" };
    if (!Types.ObjectId.isValid(reportId)) return { ok: false, error: "Invalid report id" };

    await connectDB();

    const updated = await AdReport.findByIdAndUpdate(
      reportId,
      {
        status,
        reviewedAt: new Date(),
        reviewedBy: session.email,
        resolution: resolution?.trim() || null,
      },
      { new: true }
    );

    if (!updated) return { ok: false, error: "Report not found" };

    return { ok: true };
  } catch (e) {
    console.error("REVIEW AD REPORT ERROR:", e);
    return { ok: false, error: "Review failed" };
  }
}
