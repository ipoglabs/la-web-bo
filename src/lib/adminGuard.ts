import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Types } from "mongoose";
import connectDB from "@/lib/db";
import AdminUser from "@/models/adminUser";
import AdminAuditLog, { type AuditAction, type AuditTargetType } from "@/models/adminAuditLog";
import { ADMIN_COOKIE, verifyAdminJwt, type AdminSession } from "@/lib/adminAuth";
import { hasPerm, type Permission } from "@/lib/adminPermissions";

export type AdminContext = AdminSession & { name: string; mustChangePassword: boolean };

/** Verifies the cookie AND re-reads the account, so deactivating someone,
 *  changing their role or resetting their password takes effect on their very
 *  next request instead of when their token expires. */
export async function getAdmin(): Promise<AdminContext | null> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  const session = token ? verifyAdminJwt(token) : null;
  if (!session || !Types.ObjectId.isValid(session.adminId)) return null;

  await connectDB();
  const admin = await AdminUser.findById(session.adminId)
    .select("firstName lastName email role country isActive tokenVersion mustChangePassword")
    .lean();

  if (!admin || !admin.isActive) return null;
  if ((admin.tokenVersion ?? 0) !== (session.tv ?? 0)) return null;

  return {
    adminId: String(admin._id),
    email: admin.email,
    role: admin.role, // the DB role, not the (possibly stale) token role
    country: admin.country,
    tv: admin.tokenVersion ?? 0,
    name: `${admin.firstName} ${admin.lastName}`.trim(),
    mustChangePassword: Boolean(admin.mustChangePassword),
  };
}

type Guard =
  | { ok: true; admin: AdminContext }
  | { ok: false; error: string };

/** For server actions. Returns an error result instead of throwing. */
export async function requireAdmin(perm?: Permission): Promise<Guard> {
  const admin = await getAdmin();
  if (!admin) return { ok: false, error: "Your session has ended. Please sign in again." };
  // Someone else knows a temporary password: nothing but changing it is allowed.
  if (perm && admin.mustChangePassword) return { ok: false, error: "Set your own password first (My Profile)." };
  if (perm && !hasPerm(admin.role, perm)) return { ok: false, error: "You don't have permission to do this." };
  return { ok: true, admin };
}

/** For server components (pages). Redirects instead of returning. */
export async function requireAdminPage(perm?: Permission, next = "/bo"): Promise<AdminContext> {
  const admin = await getAdmin();
  if (!admin) redirect(`/bo-login?next=${encodeURIComponent(next)}`);
  if (perm && !hasPerm(admin.role, perm)) redirect("/bo?denied=1");
  return admin;
}

export async function requestMeta() {
  const h = await headers();
  return {
    ip: (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "").trim() || undefined,
    userAgent: h.get("user-agent")?.slice(0, 400) || undefined,
  };
}

export type AuditEntry = {
  action: AuditAction;
  targetType: AuditTargetType;
  targetId?: string;
  targetLabel?: string;
  reason?: string;
  meta?: Record<string, unknown>;
};

/** Writes an audit entry. Never throws — a logging hiccup must not undo or
 *  block the admin action that already happened — but it does shout in the logs. */
export async function logAdminAction(
  actor: Pick<AdminSession, "adminId" | "email" | "role"> | { adminId?: string; email: string; role?: string },
  entry: AuditEntry,
) {
  try {
    await connectDB();
    const meta = await requestMeta();
    await AdminAuditLog.create({
      actorId: actor.adminId && Types.ObjectId.isValid(actor.adminId) ? actor.adminId : undefined,
      actorEmail: actor.email || "unknown",
      actorRole: actor.role,
      ...entry,
      reason: entry.reason?.slice(0, 1000),
      ...meta,
    });
  } catch (e) {
    console.error("[audit] FAILED to write audit log", entry.action, entry.targetId, e);
  }
}

export const MIN_REASON = 5;
export const MAX_REASON = 500;

/** Destructive actions need a written reason for the audit trail. */
export function cleanReason(reason: unknown): string | null {
  const r = String(reason ?? "").trim().slice(0, MAX_REASON);
  return r.length >= MIN_REASON ? r : null;
}
