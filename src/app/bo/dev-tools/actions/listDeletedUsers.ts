"use server";

import connectDB from "@/config/database";
import DevToolsUser from "@/models/devtools/DevToolsUser";
import type { DevToolsDeletedUser } from "./types";

type DeletedUserLean = {
  _id: unknown;
  userId: string;
  fullName: string;
  accountStatus: string;
  deletedAt?: Date;
  deleteFeedback?: string;
  createdAt: Date;
  audit?: { action: string; at: Date }[];
  deletedIdentitySnapshot?: { email?: string; primaryNumber?: string; fullName?: string };
};

/**
 * Deleted (anonymized) accounts, newest-deleted first — gated by the /bo
 * admin session (see bo/layout.tsx). Their email/phone/name are already
 * scrubbed (see softDeleteAccount in la-web) — this is a read-only view onto
 * what's left (userId, audit trail, deletion metadata) plus their
 * listings/chat history via getDeletedUserData.
 */
export async function listDeletedUsers(): Promise<DevToolsDeletedUser[]> {
  await connectDB();

  const users = await DevToolsUser.find({ isDeleted: true })
    .sort({ deletedAt: -1 })
    .lean<DeletedUserLean[]>();

  return users.map((user) => ({
    id: String(user._id),
    userId: user.userId,
    fullName: user.fullName,
    accountStatus: user.accountStatus,
    deletedAt: user.deletedAt ? new Date(user.deletedAt).toISOString() : undefined,
    deleteFeedback: user.deleteFeedback || undefined,
    createdAt: new Date(user.createdAt).toISOString(),
    audit: (user.audit || []).map((a) => ({
      action: a.action,
      at: new Date(a.at).toISOString(),
    })),
    originalEmail: user.deletedIdentitySnapshot?.email || undefined,
    originalPrimaryNumber: user.deletedIdentitySnapshot?.primaryNumber || undefined,
    originalFullName: user.deletedIdentitySnapshot?.fullName || undefined,
  }));
}
