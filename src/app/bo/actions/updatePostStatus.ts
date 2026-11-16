"use server";

import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import Post from "@/models/post";
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth";
import { Types } from "mongoose";

function isAllowedToModeratePosts(role?: string) {
  return ["super_admin", "admin", "moderator"].includes(String(role));
}

const MAX_REASON = 500;

export async function updatePostStatus(
  postId: string,
  status: "active" | "off" | "expired" | "rejected",
  reason?: string
) {
  try {
    if (!Types.ObjectId.isValid(postId)) {
      return { ok: false, error: "Invalid post id" };
    }

    // ✅ MUST await cookies() in Server Actions
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE)?.value;

    if (!token) {
      return { ok: false, error: "Not authenticated" };
    }

    const session = verifyAdminJwt(token);

    if (!session || !isAllowedToModeratePosts(session.role)) {
      return { ok: false, error: "Forbidden" };
    }

    const rejectionReason = reason?.trim().slice(0, MAX_REASON) || "";
    if (status === "rejected" && !rejectionReason) {
      return { ok: false, error: "Give the seller a reason for rejecting this ad." };
    }

    await connectDB();

    // A rejection carries a reason for the seller; any other status clears it.
    const update =
      status === "rejected"
        ? { $set: { status, rejectionReason, updatedAt: new Date() } }
        : { $set: { status, updatedAt: new Date() }, $unset: { rejectionReason: 1 } };

    const updated = await Post.findByIdAndUpdate(postId, update, { new: true });

    if (!updated) {
      return { ok: false, error: "Post not found" };
    }

    return { ok: true };
  } catch (e) {
    console.error("updatePostStatus error:", e);
    return { ok: false, error: e instanceof Error ? e.message : "Update failed" };
  }
}
