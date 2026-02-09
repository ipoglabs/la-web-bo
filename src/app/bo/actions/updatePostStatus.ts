"use server";

import { cookies } from "next/headers";
import connectDB from "@/config/database";
import Post from "@/models/post";
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth";
import { Types } from "mongoose";

function isAllowedToModeratePosts(role?: string) {
  return ["super_admin", "admin", "moderator"].includes(String(role));
}

export async function updatePostStatus(
  postId: string,
  status: "active" | "off" | "expired"
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

    await connectDB();

    const updated = await Post.findByIdAndUpdate(
      postId,
      {
        status,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return { ok: false, error: "Post not found" };
    }

    return { ok: true };
  } catch (e: any) {
    console.error("updatePostStatus error:", e);
    return { ok: false, error: e?.message || "Update failed" };
  }
}
