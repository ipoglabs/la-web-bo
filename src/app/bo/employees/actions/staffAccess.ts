"use server"

import { randomInt } from "node:crypto"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/db"
import AdminUser from "@/models/adminUser"
import { Types } from "mongoose"
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON } from "@/lib/adminGuard"
import { canManageRole, checkAdminPassword } from "@/lib/adminPermissions"

type Result = { ok: true } | { ok: false; error: string }
type ResetResult = { ok: true; tempPassword: string } | { ok: false; error: string }

/** Shared checks: staff.manage, not yourself, a reason, and rank. A Super Admin
 *  may act on another Super Admin (e.g. the other one is locked out). */
async function loadTarget(employeeId: string, reason: string) {
  const guard = await requireAdmin("staff.manage")
  if (!guard.ok) return guard
  const { admin } = guard

  if (!Types.ObjectId.isValid(employeeId)) return { ok: false as const, error: "Invalid employee id" }
  if (admin.adminId === employeeId) return { ok: false as const, error: "Use My Profile for your own account." }

  const why = cleanReason(reason)
  if (!why) return { ok: false as const, error: `Write a reason (at least ${MIN_REASON} characters) for the audit log.` }

  await connectDB()
  const employee = await AdminUser.findById(employeeId)
  if (!employee) return { ok: false as const, error: "Employee not found" }

  const superOnSuper = admin.role === "super_admin" && employee.role === "super_admin"
  if (!superOnSuper && !canManageRole(admin.role, employee.role)) {
    return { ok: false as const, error: "You can't do this for someone at or above your level." }
  }
  return { ok: true as const, admin, employee, why }
}

/** Clears a lock-out from too many wrong passwords/codes. Doesn't sign them out
 *  or change anything else. Confirm it was really them failing first. */
export async function unlockEmployee(employeeId: string, reason: string): Promise<Result> {
  try {
    const t = await loadTarget(employeeId, reason)
    if (!t.ok) return t
    const { admin, employee, why } = t

    await AdminUser.updateOne({ _id: employee._id }, { $set: { failedLoginCount: 0 }, $unset: { lockedUntil: 1 } })
    await logAdminAction(admin, {
      action: "staff.unlock",
      targetType: "admin",
      targetId: employeeId,
      targetLabel: `${employee.employeeId} · ${employee.email}`,
      reason: why,
    })
    return { ok: true }
  } catch (e) {
    console.error("unlockEmployee failed:", e)
    return { ok: false, error: "Unlock failed" }
  }
}

const WORDS = "abcdefghjkmnpqrstuvwxyz"
const DIGITS = "23456789"
function tempPassword(): string {
  const chunk = (n: number) => Array.from({ length: n }, () => WORDS[randomInt(WORDS.length)]).join("")
  const digits = Array.from({ length: 2 }, () => DIGITS[randomInt(DIGITS.length)]).join("")
  const first = chunk(4)
  // e.g. "Kqpm-xtzr-hvwd-47": ~60 bits, meets the 12+/upper/lower/digit rule
  const pw = `${first[0].toUpperCase()}${first.slice(1)}-${chunk(4)}-${chunk(4)}-${digits}`
  if (checkAdminPassword(pw)) throw new Error("generated password failed policy")
  return pw
}

/** Sets a random temporary password (shown once to the person resetting),
 *  signs them out everywhere, unlocks the account and makes them choose their
 *  own password at next sign-in. Two-factor stays on. */
export async function resetEmployeePassword(employeeId: string, reason: string): Promise<ResetResult> {
  try {
    const t = await loadTarget(employeeId, reason)
    if (!t.ok) return t
    const { admin, employee, why } = t

    const pw = tempPassword()
    await AdminUser.updateOne(
      { _id: employee._id },
      {
        $set: {
          password: await bcrypt.hash(pw, 12),
          passwordChangedAt: new Date(),
          mustChangePassword: true,
          failedLoginCount: 0,
        },
        $unset: { lockedUntil: 1 },
        $inc: { tokenVersion: 1 },
      },
    )
    await logAdminAction(admin, {
      action: "auth.password_reset",
      targetType: "admin",
      targetId: employeeId,
      targetLabel: `${employee.employeeId} · ${employee.email}`,
      reason: why,
    })
    return { ok: true, tempPassword: pw }
  } catch (e) {
    console.error("resetEmployeePassword failed:", e)
    return { ok: false, error: "Password reset failed" }
  }
}
