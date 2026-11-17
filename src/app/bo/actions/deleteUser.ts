"use server";

import { Types } from "mongoose";
import connectDB from "@/lib/db";
import User from "@/models/user";
import Post from "@/models/post";
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON } from "@/lib/adminGuard";
import { reportError } from "@/lib/errorReport";

/**
 * Closes an account the same way the site's own "Delete account" does:
 * contact details and name are removed now, their ads are hidden, and every
 * session is signed out. A snapshot of email/phone/name is kept for 28 days
 * (support, fraud, legal requests), after which scripts/retention.mjs wipes
 * the account for good. See the privacy policies: 30/60/90 days (UK/SG/IN).
 */
export async function deleteUser(userId: string, reason: string) {
  try {
    if (!Types.ObjectId.isValid(userId)) return { ok: false, error: "Invalid user id" };

    const guard = await requireAdmin("users.delete");
    if (!guard.ok) return guard;
    const { admin } = guard;

    const why = cleanReason(reason);
    if (!why) return { ok: false, error: `Write a reason (at least ${MIN_REASON} characters) for the audit log.` };

    await connectDB();

    const user = await User.findById(userId).select("email primaryNumber fullName isDeleted").lean();
    if (!user) return { ok: false, error: "User not found" };
    if (user.isDeleted) return { ok: false, error: "This account is already deleted." };

    const now = new Date();
    const _id = new Types.ObjectId(userId);
    // Raw collection update: the model's validators require an email or phone,
    // which a closed account deliberately no longer has. $unset (not null)
    // frees the email/phone for a fresh sign-up, matching the site.
    await User.collection.updateOne(
      { _id },
      {
        $set: {
          fullName: "Deleted User",
          isDeleted: true,
          deletedAt: now,
          accountStatus: "Deleted",
          isSuspended: true,
          isEmailVerified: false,
          isPrimaryNumberVerified: false,
          deletedIdentitySnapshot: { email: user.email, primaryNumber: user.primaryNumber, fullName: user.fullName },
          updatedAt: now,
        },
        $unset: { email: "", primaryNumber: "", appleEmailId: "", secondaryNumber1: "", secondaryNumber2: "", image: "" },
        $push: {
          audit: { action: "delete", at: now, by: new Types.ObjectId(admin.adminId), byModel: "AdminUser" },
        } as never,
      },
    );
    await Post.updateMany({ ownerId: _id, status: { $ne: "deleted" } }, { $set: { status: "deleted", deletedAt: now } });
    // Sign them out everywhere (the site checks revokedAt on every request).
    await User.db.collection("sessions").updateMany({ userId: _id, revokedAt: null }, { $set: { revokedAt: now } });

    await logAdminAction(admin, {
      action: "user.delete",
      targetType: "user",
      targetId: userId,
      targetLabel: user.email || user.fullName,
      reason: why,
    });

    return { ok: true };
  } catch (e) {
    await reportError(e, { where: "action:deleteUser" });
    return { ok: false, error: "Delete failed" };
  }
}
