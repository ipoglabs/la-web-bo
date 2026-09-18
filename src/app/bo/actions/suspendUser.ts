"use server";

import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import User from "@/models/user";
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth";
import { Types } from "mongoose";

const ALLOWED = ["super_admin", "admin"];

export async function suspendUser(userId: string, suspend: boolean) {
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

    user.isSuspended = suspend;
    user.accountStatus = suspend ? "Suspended" : "Active";

    user.audit.push({
      action: suspend ? "suspend" : "activate",
      by: adminId,
      byModel: "AdminUser",
      at: new Date(),
    });

    await user.save();

    return { ok: true };
  } catch (e) {
    console.error("SUSPEND USER ERROR:", e);
    return { ok: false, error: "Suspend failed" };
  }
}