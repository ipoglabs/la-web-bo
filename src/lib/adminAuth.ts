// src/lib/adminAuth.ts
import jwt from "jsonwebtoken";
import { isAdminRole, type AdminRole } from "./adminPermissions";

export { isAdminRole };
export type { AdminRole };

export const ADMIN_COOKIE = "admin_session";
/** A working day. Shorter sessions limit the damage of a stolen cookie. */
export const ADMIN_MAX_AGE = 60 * 60 * 12;
/** Tokens are scoped to bo so a la-web user token can never pass as an admin one. */
export const ADMIN_JWT_AUDIENCE = "lokalads-bo";

export type AdminSession = {
  adminId: string;
  email: string;
  role: AdminRole;
  country?: string;
  /** AdminUser.tokenVersion at sign-in; bumping it revokes every session. */
  tv: number;
};

/** Prefer a bo-only secret; fall back to the shared one so existing deploys keep working. */
export function adminJwtSecret(): string | undefined {
  return process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;
}

export function signAdminJwt(payload: AdminSession) {
  const secret = adminJwtSecret();
  if (!secret) throw new Error("ADMIN_JWT_SECRET / JWT_SECRET is not set");
  return jwt.sign(payload, secret, { expiresIn: ADMIN_MAX_AGE, audience: ADMIN_JWT_AUDIENCE });
}

/** Signature/expiry check only. Use requireAdmin() (adminGuard.ts) for anything
 *  that reads or changes data — it also checks the account is still active. */
export function verifyAdminJwt(token: string): AdminSession | null {
  try {
    const secret = adminJwtSecret();
    if (!secret) return null;
    const s = jwt.verify(token, secret, { audience: ADMIN_JWT_AUDIENCE }) as AdminSession;
    return isAdminRole(s.role) ? s : null;
  } catch {
    return null;
  }
}
