"use server";

import { cookies } from "next/headers";
import { Types } from "mongoose";
import connectDB from "@/config/database";
import User from "@/models/user";
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth";

const ALLOWED = ["super_admin"] as const;

function getActorObjectId(session: any): Types.ObjectId | undefined {
  const candidates = [
    session?.adminId,
    session?.id,
    session?._id,
    session?.sub,
  ];

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
  } catch (e: any) {
    console.error("deleteUser failed:", e);
    return { ok: false, error: e?.message || "Delete failed" };
  }
}