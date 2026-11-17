// Sign-in steps shared by the password route and the two-factor route:
// failure counting/lock-out, the short-lived "password OK, now the code"
// challenge, and issuing the real session.
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import type { HydratedDocument } from "mongoose";
import type { IAdminUser } from "@/models/adminUser";
import { ADMIN_COOKIE, ADMIN_MAX_AGE, adminJwtSecret, signAdminJwt } from "@/lib/adminAuth";
import { logAdminAction, requestMeta } from "@/lib/adminGuard";

export const MAX_FAILED = 5;
export const LOCK_MINUTES = 15;

export const TWO_FACTOR_COOKIE = "admin_2fa";
const TWO_FACTOR_AUDIENCE = "lokalads-bo-2fa";
const TWO_FACTOR_MAX_AGE = 5 * 60; // the code must be entered within 5 minutes

type AdminDoc = HydratedDocument<IAdminUser>;

const secure = process.env.NODE_ENV === "production";

export function actorOf(user: AdminDoc) {
  return { adminId: String(user._id), email: user.email, role: user.role };
}

export function isLocked(user: AdminDoc) {
  return Boolean(user.lockedUntil && user.lockedUntil > new Date());
}

export function lockedResponse(user: AdminDoc) {
  const mins = Math.ceil(((user.lockedUntil?.getTime() ?? Date.now()) - Date.now()) / 60000);
  return NextResponse.json(
    { ok: false, error: `Too many failed attempts. Try again in ${mins} minute${mins === 1 ? "" : "s"}.` },
    { status: 429 },
  );
}

/** Wrong password OR wrong code: both count towards the same lock-out, so
 *  knowing the password doesn't buy unlimited guesses at the code. */
export async function recordFailure(user: AdminDoc, why: string, action: "auth.login_failed" | "auth.2fa_failed") {
  user.failedLoginCount = (user.failedLoginCount ?? 0) + 1;
  const locked = user.failedLoginCount >= MAX_FAILED;
  if (locked) {
    user.lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60_000);
    user.failedLoginCount = 0;
  }
  await user.save();
  await logAdminAction(actorOf(user), {
    action: locked ? "auth.locked" : action,
    targetType: "admin",
    targetId: String(user._id),
    targetLabel: user.employeeId,
    meta: { why },
  });
  return locked;
}

/** After a correct password, when the account has two-factor on. */
export function twoFactorChallengeResponse(user: AdminDoc) {
  const token = jwt.sign(
    { adminId: String(user._id), tv: user.tokenVersion ?? 0 },
    adminJwtSecret()!,
    { audience: TWO_FACTOR_AUDIENCE, expiresIn: TWO_FACTOR_MAX_AGE },
  );
  const res = NextResponse.json({ ok: true, twoFactorRequired: true });
  res.cookies.set(TWO_FACTOR_COOKIE, token, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    path: "/api/admin/auth",
    maxAge: TWO_FACTOR_MAX_AGE,
  });
  return res;
}

export function readTwoFactorChallenge(token?: string): { adminId: string; tv: number } | null {
  if (!token) return null;
  try {
    return jwt.verify(token, adminJwtSecret()!, { audience: TWO_FACTOR_AUDIENCE }) as { adminId: string; tv: number };
  } catch {
    return null;
  }
}

/** Every check passed: record the login and hand out the real session. */
export async function completeLogin(user: AdminDoc, method: "password" | "totp" | "recovery_code") {
  const { ip } = await requestMeta();
  user.failedLoginCount = 0;
  user.lockedUntil = undefined;
  user.lastLoginAt = new Date();
  user.lastLoginIp = ip;
  await user.save();

  await logAdminAction(actorOf(user), {
    action: "auth.login",
    targetType: "admin",
    targetId: String(user._id),
    targetLabel: user.employeeId,
    meta: { method },
  });

  const res = NextResponse.json(
    {
      ok: true,
      user: {
        id: String(user._id),
        firstName: user.firstName,
        lastName: user.lastName,
        employeeId: user.employeeId,
        role: user.role,
        country: user.country,
      },
    },
    { status: 200 },
  );
  res.cookies.set(
    ADMIN_COOKIE,
    signAdminJwt({ adminId: String(user._id), email: user.email, role: user.role, country: user.country, tv: user.tokenVersion ?? 0 }),
    { httpOnly: true, secure, sameSite: "strict", path: "/", maxAge: ADMIN_MAX_AGE },
  );
  res.cookies.set(TWO_FACTOR_COOKIE, "", { path: "/api/admin/auth", maxAge: 0 });
  return res;
}
