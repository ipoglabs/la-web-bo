import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Types } from "mongoose";
import dbConnect from "@/lib/db";
import AdminUser from "@/models/adminUser";
import { logAdminAction } from "@/lib/adminGuard";
import {
  TWO_FACTOR_COOKIE,
  actorOf,
  completeLogin,
  isLocked,
  lockedResponse,
  readTwoFactorChallenge,
  recordFailure,
} from "@/lib/adminLogin";
import { verifyTotp } from "@/lib/totp";
import { open, hashRecoveryCode } from "@/lib/secretBox";
import { reportError } from "@/lib/errorReport";

const EXPIRED = "Your sign-in timed out. Enter your employee ID and password again.";

/** Step 2 of sign-in: a 6-digit authenticator code, or one recovery code. */
export async function POST(req: Request) {
  try {
    const challenge = readTwoFactorChallenge((await cookies()).get(TWO_FACTOR_COOKIE)?.value);
    if (!challenge || !Types.ObjectId.isValid(challenge.adminId)) {
      return NextResponse.json({ ok: false, error: EXPIRED, restart: true }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as { code?: string; recoveryCode?: string };
    const code = String(body.code ?? "").trim();
    const recovery = String(body.recoveryCode ?? "").trim();
    if (!code && !recovery) return NextResponse.json({ ok: false, error: "Enter the code from your app." }, { status: 400 });

    await dbConnect();
    const admin = await AdminUser.findById(challenge.adminId).select("+totpSecret +totpLastStep +recoveryCodeHashes");

    // Deactivated, password reset, or 2FA reset since the password step: start over.
    if (!admin || !admin.isActive || !admin.twoFactorEnabled || (admin.tokenVersion ?? 0) !== challenge.tv) {
      return NextResponse.json({ ok: false, error: EXPIRED, restart: true }, { status: 401 });
    }
    if (isLocked(admin)) return lockedResponse(admin);

    if (recovery) {
      const hash = hashRecoveryCode(recovery);
      const list = admin.recoveryCodeHashes ?? [];
      if (!list.includes(hash)) {
        const locked = await recordFailure(admin, "bad_recovery_code", "auth.2fa_failed");
        return NextResponse.json({ ok: false, error: locked ? "Too many failed attempts. Try again in 15 minutes." : "That recovery code isn't valid or was already used." }, { status: 401 });
      }
      admin.recoveryCodeHashes = list.filter((h) => h !== hash); // single use
      await logAdminAction(actorOf(admin), {
        action: "auth.recovery_code_used",
        targetType: "admin",
        targetId: String(admin._id),
        targetLabel: admin.employeeId,
        meta: { remaining: admin.recoveryCodeHashes.length },
      });
      return await completeLogin(admin, "recovery_code");
    }

    const step = admin.totpSecret ? verifyTotp(open(admin.totpSecret), code, admin.totpLastStep ?? -1) : null;
    if (step === null) {
      const locked = await recordFailure(admin, "bad_totp", "auth.2fa_failed");
      return NextResponse.json({ ok: false, error: locked ? "Too many failed attempts. Try again in 15 minutes." : "That code isn't right. Check your app and try again." }, { status: 401 });
    }
    admin.totpLastStep = step; // the same code can't be replayed
    return await completeLogin(admin, "totp");
  } catch (err) {
    await reportError(err, { where: "route:/api/admin/auth/2fa", level: "critical" });
    return NextResponse.json({ ok: false, error: "Something went wrong. Try again." }, { status: 500 });
  }
}
