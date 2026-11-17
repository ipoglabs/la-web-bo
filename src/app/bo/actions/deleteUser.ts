"use server";

import { Types } from "mongoose";
import connectDB from "@/lib/db";
import User from "@/models/user";
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON } from "@/lib/adminGuard";
import { reportError } from "@/lib/errorReport";

/** Soft delete: the account is closed and hidden, data is kept for the audit trail. */
export async function deleteUser(userId: string, reason: string) {
  try {
    if (!Types.ObjectId.isValid(userId)) return { ok: false, error: "Invalid user id" };

    const guard = await requireAdmin("users.delete");
    if (!guard.ok) return guard;
    const { admin } = guard;

    const why = cleanReason(reason);
    if (!why) return { ok: false, error: `Write a reason (at least ${MIN_REASON} characters) for the audit log.` };

    await connectDB();

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        $set: { accountStatus: "Deleted", isSuspended: true },
        $push: {
          audit: { action: "delete", at: new Date(), by: new Types.ObjectId(admin.adminId), byModel: "AdminUser" },
        },
      },
      { new: true, runValidators: true },
    )
      .select("email fullName")
      .lean();

    if (!updated) return { ok: false, error: "User not found" };

    await logAdminAction(admin, {
      action: "user.delete",
      targetType: "user",
      targetId: userId,
      targetLabel: updated.email || updated.fullName,
      reason: why,
    });

    return { ok: true };
  } catch (e) {
    await reportError(e, { where: "action:deleteUser" });
    return { ok: false, error: "Delete failed" };
  }
}
