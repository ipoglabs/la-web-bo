"use server";

import connectDB from "@/lib/db";
import { requireAdmin } from "@/lib/adminGuard";
import { LOOKUP_LIMIT, searchFilter } from "@/lib/listQuery";
import DevToolsUser from "@/models/devtools/DevToolsUser";
import type { DevToolsUser as DevToolsUserDTO } from "./types";

type UserLean = {
  _id: unknown;
  userId: string;
  fullName: string;
  email?: string;
  isEmailVerified: boolean;
  primaryNumber?: string;
  isPrimaryNumberVerified: boolean;
  dateOfBirth?: Date;
  locality?: string;
  provider: string;
  accountStatus: string;
  isFullyRegistered?: boolean;
  isNewUser?: boolean;
  createdAt: Date;
};

/** Newest users matching `query` (name, email, phone or user ID), at most
 *  LOOKUP_LIMIT — super admin only (devtools.view). */
export async function listUsers(query = ""): Promise<DevToolsUserDTO[]> {
  if (!(await requireAdmin("devtools.view")).ok) return [];
  await connectDB();

  const users = await DevToolsUser.find(searchFilter(query, ["fullName", "email", "primaryNumber", "userId"]))
    .sort({ createdAt: -1 })
    .limit(LOOKUP_LIMIT)
    .lean<UserLean[]>();

  return users.map((user) => ({
    id: String(user._id),
    userId: user.userId,
    fullName: user.fullName,
    email: user.email || undefined,
    isEmailVerified: user.isEmailVerified,
    primaryNumber: user.primaryNumber || undefined,
    isPrimaryNumberVerified: user.isPrimaryNumberVerified,
    dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString() : undefined,
    locality: user.locality || undefined,
    provider: user.provider,
    accountStatus: user.accountStatus,
    isFullyRegistered: Boolean(user.isFullyRegistered),
    isNewUser: Boolean(user.isNewUser),
    createdAt: new Date(user.createdAt).toISOString(),
  }));
}
