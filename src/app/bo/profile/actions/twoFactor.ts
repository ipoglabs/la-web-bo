"use server";

import QRCode from "qrcode";
import connectDB from "@/lib/db";
import AdminUser from "@/models/adminUser";
import { requireAdmin, logAdminAction } from "@/lib/adminGuard";
import { generateTotpSecret, otpauthUri, verifyTotp } from "@/lib/totp";
import { generateRecoveryCodes, hashRecoveryCode, open, seal } from "@/lib/secretBox";
import { reportError } from "@/lib/errorReport";

export type SetupStart = { ok: true; qr: string; secret: string } | { ok: false; error: string };
export type CodesResult = { ok: true; recoveryCodes: string[] } | { ok: false; error: string } | null;

/** Step 1 of setup: a new secret, kept as "pending" until a code proves the
 *  app has it. Calling again replaces any unconfirmed pending secret. */
export async function startTwoFactorSetup(): Promise<SetupStart> {
  try {
    const guard = await requireAdmin();
    if (!guard.ok) return guard;
    const { admin } = guard;
    if (admin.twoFactorEnabled) return { ok: false, error: "Two-factor sign-in is already on." };

    const secret = generateTotpSecret();
    await connectDB();
    await AdminUser.updateOne({ _id: admin.adminId }, { $set: { totpPendingSecret: seal(secret) } });

    const svg = await QRCode.toString(otpauthUri(secret, admin.email), { type: "svg", margin: 1, width: 200 });
    return {
      ok: true,
      qr: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
      secret: secret.match(/.{1,4}/g)!.join(" "), // for typing in by hand
    };
  } catch (e) {
    await reportError(e, { where: "action:startTwoFactorSetup" });
    return { ok: false, error: "Couldn't start setup. Try again." };
  }
}

/** Step 2 of setup: the first code from the app turns two-factor on and
 *  returns recovery codes, shown once. */
export async function confirmTwoFactorSetup(_prev: CodesResult, form: FormData): Promise<CodesResult> {
  try {
    const guard = await requireAdmin();
    if (!guard.ok) return guard;
    const { admin } = guard;

    await connectDB();
    const user = await AdminUser.findById(admin.adminId).select("+totpPendingSecret");
    if (!user) return { ok: false, error: "Account not found." };
    if (user.twoFactorEnabled) return { ok: false, error: "Two-factor sign-in is already on." };
    if (!user.totpPendingSecret) return { ok: false, error: "Setup expired. Start again." };

    const secret = open(user.totpPendingSecret);
    const step = verifyTotp(secret, String(form.get("code") ?? ""));
    if (step === null) return { ok: false, error: "That code isn't right. Check the time on your phone is set automatically, and try the newest code." };

    const codes = generateRecoveryCodes();
    user.totpSecret = user.totpPendingSecret;
    user.totpPendingSecret = undefined;
    user.totpLastStep = step;
    user.twoFactorEnabled = true;
    user.twoFactorEnabledAt = new Date();
    user.recoveryCodeHashes = codes.map(hashRecoveryCode);
    await user.save();

    await logAdminAction(admin, { action: "auth.2fa_enabled", targetType: "admin", targetId: admin.adminId, targetLabel: user.employeeId });
    return { ok: true, recoveryCodes: codes };
  } catch (e) {
    await reportError(e, { where: "action:confirmTwoFactorSetup" });
    return { ok: false, error: "Couldn't turn on two-factor. Try again." };
  }
}

/** New set of recovery codes (old ones stop working). Needs a current code. */
export async function regenerateRecoveryCodes(_prev: CodesResult, form: FormData): Promise<CodesResult> {
  try {
    const guard = await requireAdmin();
    if (!guard.ok) return guard;
    const { admin } = guard;

    await connectDB();
    const user = await AdminUser.findById(admin.adminId).select("+totpSecret +totpLastStep");
    if (!user?.twoFactorEnabled || !user.totpSecret) return { ok: false, error: "Two-factor sign-in isn't on." };

    const step = verifyTotp(open(user.totpSecret), String(form.get("code") ?? ""), user.totpLastStep ?? -1);
    if (step === null) return { ok: false, error: "That code isn't right." };

    const codes = generateRecoveryCodes();
    user.totpLastStep = step;
    user.recoveryCodeHashes = codes.map(hashRecoveryCode);
    await user.save();

    await logAdminAction(admin, { action: "auth.recovery_codes_regenerated", targetType: "admin", targetId: admin.adminId, targetLabel: user.employeeId });
    return { ok: true, recoveryCodes: codes };
  } catch (e) {
    await reportError(e, { where: "action:regenerateRecoveryCodes" });
    return { ok: false, error: "Couldn't create new codes. Try again." };
  }
}
