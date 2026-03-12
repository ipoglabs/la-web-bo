"use server";

import { cookies } from "next/headers";
import connectDB from "@/config/database";
import User from "@/models/user";
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth";
import { Types } from "mongoose";

const ALLOWED = ["super_admin", "admin", "moderator"];

export async function reportUser(userId: string, reason?: string) {
  try {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value || "";
    const session = token ? verifyAdminJwt(token) : null;

    if (!session || !ALLOWED.includes(session.role))
      return { ok: false, error: "Forbidden" };

    if (!Types.ObjectId.isValid(userId))
      return { ok: false, error: "Invalid user id" };

    await connectDB();

    const now = new Date();

    const adminId =
      session.adminId && Types.ObjectId.isValid(session.adminId)
        ? new Types.ObjectId(session.adminId)
        : null;

    const user = await User.findById(userId);

    if (!user) return { ok: false, error: "User not found" };

    if (!Array.isArray(user.audit)) user.audit = [];
    if (!Array.isArray(user.reports)) user.reports = [];

    user.reported = true;

    user.reports.push({
      reason: reason || "No reason",
      by: adminId,
      at: now,
    });

    user.audit.push({
      action: "report",
      by: adminId,
      at: now,
    });

    await user.save();

    return { ok: true };
  } catch (e) {
    console.error("REPORT USER ERROR:", e);
    return { ok: false, error: "Report failed" };
  }
}