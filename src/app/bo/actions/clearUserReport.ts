"use server";

import { cookies } from "next/headers";
import connectDB from "@/config/database";
import User from "@/models/user";
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth";
import { Types } from "mongoose";

const ALLOWED = ["super_admin", "admin"];

export async function clearUserReport(userId: string) {
  try {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value || "";
    const session = token ? verifyAdminJwt(token) : null;

    if (!session || !ALLOWED.includes(session.role))
      return { ok: false, error: "Forbidden" };

    if (!Types.ObjectId.isValid(userId))
      return { ok: false, error: "Invalid user id" };

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return { ok: false, error: "User not found" };

    if (!Array.isArray(user.audit)) user.audit = [];

    const adminId =
      session.adminId && Types.ObjectId.isValid(session.adminId)
        ? new Types.ObjectId(session.adminId)
        : null;

    user.reported = false;
    user.reportClearedAt = new Date();
    user.reportClearedBy = adminId;

    user.audit.push({
      action: "clear_report",
      by: adminId,
      at: new Date(),
    });

    await user.save();

    return { ok: true };
  } catch (e) {
    console.error("CLEAR REPORT ERROR:", e);
    return { ok: false, error: "Clear report failed" };
  }
}