"use server";

import connectDB from "@/lib/db";
import User from "@/models/user";
import { Types } from "mongoose";
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON } from "@/lib/adminGuard";
import { reportError } from "@/lib/errorReport";

export async function suspendUser(userId: string, suspend: boolean, reason: string) {
  try {
    if (!Types.ObjectId.isValid(userId)) return { ok: false, error: "Invalid user id" };

    const guard = await requireAdmin("users.suspend");
    if (!guard.ok) return guard;
    const { admin } = guard;

    const why = cleanReason(reason);
    if (!why) return { ok: false, error: `Write a reason (at least ${MIN_REASON} characters) for the audit log.` };

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return { ok: false, error: "User not found" };
    if (user.accountStatus === "Deleted") return { ok: false, error: "This account is deleted." };

    if (!Array.isArray(user.audit)) user.audit = [];

    user.isSuspended = suspend;
    user.accountStatus = suspend ? "Suspended" : "Active";
    user.audit.push({
      action: suspend ? "suspend" : "activate",
      by: new Types.ObjectId(admin.adminId),
      byModel: "AdminUser",
      at: new Date(),
    });

    await user.save();

    await logAdminAction(admin, {
      action: suspend ? "user.suspend" : "user.unsuspend",
      targetType: "user",
      targetId: userId,
      targetLabel: user.email || user.fullName,
      reason: why,
    });

    return { ok: true };
  } catch (e) {
    await reportError(e, { where: "action:suspendUser" });
    return { ok: false, error: "Suspend failed" };
  }
}
