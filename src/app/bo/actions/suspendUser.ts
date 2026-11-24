"use server";

import connectDB from "@/lib/db";
import User from "@/models/user";
import Post from "@/models/post";
import { Types } from "mongoose";
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON } from "@/lib/adminGuard";
import { reportError } from "@/lib/errorReport";
import { notifyAccountStatus, describeNotice } from "@/lib/sellerNotify";

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

    const already = Boolean(user.isSuspended) || user.accountStatus === "Suspended";
    if (already === suspend) return { ok: false, error: suspend ? "This user is already suspended." : "This user isn't suspended." };

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

    // The site shows any active ad without checking its owner, so a
    // suspended seller's live ads have to be taken offline here. They're
    // marked so unsuspending brings back exactly these, and not ads the
    // seller paused themselves or an admin suspended one by one.
    const ownerId = new Types.ObjectId(userId);
    const now = new Date();
    let ads = 0;
    if (suspend) {
      const r = await Post.updateMany(
        { ownerId, status: "active", isSuspended: { $ne: true } },
        { $set: { status: "off", pausedForOwnerSuspension: true, updatedAt: now } },
      );
      ads = r.modifiedCount;
    } else {
      const r = await Post.updateMany(
        { ownerId, pausedForOwnerSuspension: true, status: "off", isSuspended: { $ne: true } },
        { $set: { status: "active", updatedAt: now }, $unset: { pausedForOwnerSuspension: 1 } },
      );
      ads = r.modifiedCount;
      // Ads the seller deleted or that changed status meanwhile: just drop the marker.
      await Post.updateMany({ ownerId, pausedForOwnerSuspension: true }, { $unset: { pausedForOwnerSuspension: 1 } });
    }

    await logAdminAction(admin, {
      action: suspend ? "user.suspend" : "user.unsuspend",
      targetType: "user",
      targetId: userId,
      targetLabel: user.email || user.fullName,
      reason: why,
      meta: suspend ? { adsTakenOffline: ads } : { adsRestored: ads },
    });

    // "Your account has been suspended" (with a way to appeal) / "reinstated".
    const email = describeNotice(await notifyAccountStatus(userId), "The user");

    return { ok: true, ads, email };
  } catch (e) {
    await reportError(e, { where: "action:suspendUser" });
    return { ok: false, error: "Suspend failed" };
  }
}
