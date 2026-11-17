"use server";

import { cookies } from "next/headers";
import { compare, hash } from "bcryptjs";
import connectDB from "@/lib/db";
import AdminUser from "@/models/adminUser";
import { requireAdmin, logAdminAction } from "@/lib/adminGuard";
import { ADMIN_COOKIE, ADMIN_MAX_AGE, signAdminJwt } from "@/lib/adminAuth";
import { checkAdminPassword } from "@/lib/adminPermissions";

export type ChangePasswordState = { ok: boolean; error?: string } | null;

const MAX_FAILED = 5;
const LOCK_MINUTES = 15;

export async function changeOwnPassword(
  _prev: ChangePasswordState,
  form: FormData,
): Promise<ChangePasswordState> {
  try {
    const guard = await requireAdmin(); // no permission needed: everyone may change their own
    if (!guard.ok) return guard;
    const { admin } = guard;

    const current = String(form.get("current") ?? "");
    const next = String(form.get("next") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (!current || !next) return { ok: false, error: "Fill in all three fields." };
    if (next !== confirm) return { ok: false, error: "The new passwords don't match." };
    const weak = checkAdminPassword(next);
    if (weak) return { ok: false, error: weak };
    if (next === current) return { ok: false, error: "Choose a password different from your current one." };
    if (next.toLowerCase().includes(admin.email.split("@")[0].toLowerCase())) {
      return { ok: false, error: "Don't use your email name in your password." };
    }

    await connectDB();
    const user = await AdminUser.findById(admin.adminId).select("+password");
    if (!user) return { ok: false, error: "Account not found." };

    // A wrong current password counts towards the same lock-out as the login form,
    // so a stolen, signed-in session can't be used to guess the password.
    if (!(await compare(current, user.password))) {
      user.failedLoginCount = (user.failedLoginCount ?? 0) + 1;
      const locked = user.failedLoginCount >= MAX_FAILED;
      if (locked) {
        user.lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60_000);
        user.failedLoginCount = 0;
        user.tokenVersion = (user.tokenVersion ?? 0) + 1; // sign this session out too
      }
      await user.save();
      await logAdminAction(admin, {
        action: locked ? "auth.locked" : "auth.login_failed",
        targetType: "admin",
        targetId: admin.adminId,
        targetLabel: user.employeeId,
        meta: { why: "bad_current_password" },
      });
      return { ok: false, error: locked ? "Too many wrong attempts. You've been signed out." : "Your current password is wrong." };
    }

    const wasTemporary = Boolean(user.mustChangePassword);
    user.password = await hash(next, 12);
    user.passwordChangedAt = new Date();
    user.mustChangePassword = false;
    user.failedLoginCount = 0;
    user.tokenVersion = (user.tokenVersion ?? 0) + 1; // sign out every other device
    await user.save();

    await logAdminAction(admin, {
      action: "auth.password_change",
      targetType: "admin",
      targetId: admin.adminId,
      targetLabel: user.employeeId,
      meta: wasTemporary ? { replacedTemporary: true } : undefined,
    });

    // Keep this browser signed in with a token for the new version.
    (await cookies()).set(
      ADMIN_COOKIE,
      signAdminJwt({
        adminId: admin.adminId,
        email: user.email,
        role: user.role,
        country: user.country,
        tv: user.tokenVersion,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: ADMIN_MAX_AGE,
      },
    );

    return { ok: true };
  } catch (e) {
    console.error("changeOwnPassword failed:", e);
    return { ok: false, error: "Couldn't change your password. Try again." };
  }
}
