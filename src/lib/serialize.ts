// src/lib/serialize.ts
import type { IPost } from "@/models/post";
import type { Types } from "mongoose";

export type Plain<T> = Omit<T, "createdAt" | "updatedAt" | "lastBumpedAt"> & {
  id: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  lastBumpedAt?: string | null; // ✅ added
};

/** Shape of an `IPost` after `.lean()` — ids/dates still raw, not yet client-serialized. */
export type LeanPost = IPost & {
  _id: Types.ObjectId | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export function toClientPost(d: LeanPost | null | undefined) {
  if (!d) return null;

  // strip ObjectId / Date via JSON (safe because caller uses .lean())
  const obj: Record<string, unknown> = JSON.parse(JSON.stringify(d));

  // normalize id
  obj.id = String(d._id ?? obj._id);
  delete obj._id;

  // normalize ownerId
  if (d.ownerId != null) obj.ownerId = String(d.ownerId);

  // normalize dates
  if (d.createdAt != null)
    obj.createdAt = new Date(d.createdAt).toISOString();

  if (d.updatedAt != null)
    obj.updatedAt = new Date(d.updatedAt).toISOString();

  // ✅ normalize bump date (THIS IS IMPORTANT)
  if (d.lastBumpedAt != null)
    obj.lastBumpedAt = new Date(d.lastBumpedAt).toISOString();
  else
    obj.lastBumpedAt = null;

  return obj as Plain<Omit<IPost, "ownerId">> & { ownerId?: string };
}
