// src/app/actions/getMyPosts.ts
"use server";

import connectDB from "@/lib/db";
import Post from "@/models/post";
import { Types } from "mongoose";
import { toClientPost, type LeanPost } from "@/lib/serialize";

type Params = { ownerId?: string; email?: string };

// escape regex special chars
function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getMyPosts({ ownerId, email }: Params = {}) {
  await connectDB();

  const or: Record<string, unknown>[] = [];

  if (ownerId && Types.ObjectId.isValid(ownerId)) {
    or.push({ ownerId: new Types.ObjectId(ownerId) });
  }

  if (email) {
    const safe = escapeRegex(String(email).trim());
    or.push({
      $and: [
        { "seller_info.email": { $type: "string" } },
        { "seller_info.email": new RegExp(`^${safe}$`, "i") },
      ],
    });
  }

  if (or.length === 0) return [];

  // ✅ select the fields your My Ads UI needs (status + lastBumpedAt are required for bump UI)
  const rows = await Post.find({ $or: or })
    .sort({ updatedAt: -1 })
    .select([
      "_id",
      "name",
      "category",
      "subcategory",
      "images",
      "updatedAt",
      "status",
      "lastBumpedAt",
    ])
    .lean<LeanPost[]>();

  // Keep your existing serializer, but ensure status/lastBumpedAt/thumb exist
  return rows.map((r) => {
    const base = toClientPost(r)!;
    const result = base as typeof base & { thumb?: string | null };

    // Fallbacks in case serializer doesn't include them
    if (result.status === undefined) result.status = r.status;
    if (result.lastBumpedAt === undefined)
      result.lastBumpedAt = r.lastBumpedAt ? new Date(r.lastBumpedAt).toISOString() : null;

    // If your UI expects thumb, ensure it exists
    if (result.thumb === undefined) {
      result.thumb = Array.isArray(r.images) && r.images.length > 0 ? r.images[0] : null;
    }

    // If your UI expects id, ensure it exists (many serializers already do)
    if (result.id === undefined) result.id = String(r._id);

    // Ensure updatedAt is a string if your UI uses it as string
    if (result.updatedAt === undefined && r.updatedAt) {
      result.updatedAt = new Date(r.updatedAt).toISOString();
    }

    return result;
  });
}
