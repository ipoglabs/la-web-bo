"use server";

import { cookies } from "next/headers";
import { Types } from "mongoose";
import connectDB from "@/lib/db";
import User from "@/models/user";
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth";

const ALLOWED = ["super_admin"]; // FIXED

function getActorObjectId(session: unknown): Types.ObjectId | undefined {
  const s = (session ?? {}) as Record<string, unknown>;
  const candidates = [s.adminId, s.id, s._id, s.sub];

  for (const value of candidates) {
    if (typeof value === "string" && Types.ObjectId.isValid(value)) {
      return new Types.ObjectId(value);
    }
  }

  return undefined;
}

export async function deleteUser(userId: string) {

  try {

    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE)?.value || "";
    const session = token ? verifyAdminJwt(token) : null;

    if (!session || !ALLOWED.includes(session.role)) {
      return { ok: false, error: "Forbidden" };
    }

    if (!Types.ObjectId.isValid(userId)) {
      return { ok: false, error: "Invalid user id" };
    }

    await connectDB();

    const now = new Date();
    const actorId = getActorObjectId(session);

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          accountStatus: "Deleted",
          isSuspended: true,
        },
        $push: {
          audit: {
            action: "delete",
            at: now,
            ...(actorId ? { by: actorId } : {}),
          },
        },
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return { ok: false, error: "User not found" };
    }

    return { ok: true };

  } catch (e) {

    console.error("deleteUser failed:", e);

    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };

  }

}