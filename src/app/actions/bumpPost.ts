"use server";

import { cookies, headers } from "next/headers";
import connectDB from "@/lib/db";
import Post from "@/models/post";
import { verifyToken } from "@/lib/auth";

// Accepts unknown because it's defensively handling both our own
// SessionPayload shape and older/legacy token shapes (sub, nested user.*).
function extractEmailFromDecoded(decoded: unknown): string | undefined {
  if (!decoded || typeof decoded !== "object") return undefined;
  const d = decoded as Record<string, unknown>;
  const user = d.user as Record<string, unknown> | undefined;

  if (typeof d.email === "string") return d.email;
  if (typeof user?.email === "string") return user.email;
  if (typeof d.sub === "string" && d.sub.includes("@")) return d.sub;
  return undefined;
}

function extractUserIdFromDecoded(decoded: unknown): string | undefined {
  if (!decoded || typeof decoded !== "object") return undefined;
  const d = decoded as Record<string, unknown>;
  const user = d.user as Record<string, unknown> | undefined;

  if (typeof d.id === "string") return d.id;
  if (typeof d.userId === "string") return d.userId;
  if (typeof user?.id === "string") return user.id;
  if (typeof d.sub === "string" && !d.sub.includes("@")) return d.sub;
  return undefined;
}

export async function bumpPost(postId: string) {
  try {
    await connectDB();

    // ✅ Next.js 16: BOTH are async
    const cookieStore = await cookies();
    const hdrs = await headers();

    let raw =
      cookieStore.get("session")?.value ||
      hdrs.get("authorization") ||
      "";

    if (raw?.startsWith("Bearer ")) {
      raw = raw.slice("Bearer ".length).trim();
    }

    const decoded = raw ? verifyToken(raw) : null;
    const ownerEmail = extractEmailFromDecoded(decoded);
    const ownerId = extractUserIdFromDecoded(decoded);

    if (!ownerEmail && !ownerId) {
      return { ok: false as const, error: "Not logged in" };
    }

    const post = await Post.findById(postId).exec();
    if (!post) return { ok: false as const, error: "Post not found" };

    const owned =
      (ownerId && post.ownerId && post.ownerId.toString() === String(ownerId)) ||
      (ownerEmail &&
        post.seller_info?.email?.toLowerCase() === ownerEmail.toLowerCase());

    if (!owned) return { ok: false as const, error: "Not allowed" };

    if (post.status !== "active") {
      return {
        ok: false as const,
        error: "Only approved (active) ads can be bumped.",
      };
    }

    post.lastBumpedAt = new Date();
    await post.save();

    return {
      ok: true as const,
      lastBumpedAt: post.lastBumpedAt.toISOString(),
    };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "Bump failed" };
  }
}
