"use server";

import connectDB from "@/config/database";
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

/** All users, newest first — gated by the /bo admin session (see bo/layout.tsx). */
export async function listUsers(): Promise<DevToolsUserDTO[]> {
  await connectDB();

  const users = await DevToolsUser.find({}).sort({ createdAt: -1 }).lean<UserLean[]>();

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
