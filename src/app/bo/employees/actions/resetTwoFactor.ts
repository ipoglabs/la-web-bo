"use server"

import connectDB from "@/lib/db"
import AdminUser from "@/models/adminUser"
import { Types } from "mongoose"
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON } from "@/lib/adminGuard"
import { canManageRole } from "@/lib/adminPermissions"

/** For a lost phone: turns two-factor off and signs them out everywhere. They
 *  set it up again at their next sign-in. Verify who's asking (call them back on
 *  a known number) before doing this: it's what an attacker would ask for. */
export async function resetEmployeeTwoFactor(employeeId: string, reason: string) {
  try {
    const guard = await requireAdmin("staff.manage")
    if (!guard.ok) return guard
    const { admin } = guard

    if (!Types.ObjectId.isValid(employeeId)) return { ok: false, error: "Invalid employee id" }
    if (admin.adminId === employeeId) return { ok: false, error: "You can't reset your own two-factor. Use a recovery code, or ask another Super Admin." }

    const why = cleanReason(reason)
    if (!why) return { ok: false, error: `Write a reason (at least ${MIN_REASON} characters) for the audit log.` }

    await connectDB()
    const employee = await AdminUser.findById(employeeId)
    if (!employee) return { ok: false, error: "Employee not found" }

    const superOnSuper = admin.role === "super_admin" && employee.role === "super_admin"
    if (!superOnSuper && !canManageRole(admin.role, employee.role)) {
      return { ok: false, error: "You can't reset two-factor for someone at or above your level." }
    }

    await AdminUser.updateOne(
      { _id: employeeId },
      {
        $set: { twoFactorEnabled: false },
        $unset: { totpSecret: 1, totpPendingSecret: 1, totpLastStep: 1, recoveryCodeHashes: 1, twoFactorEnabledAt: 1 },
        $inc: { tokenVersion: 1 },
      },
    )

    await logAdminAction(admin, {
      action: "staff.2fa_reset",
      targetType: "admin",
      targetId: employeeId,
      targetLabel: `${employee.employeeId} · ${employee.email}`,
      reason: why,
    })
    return { ok: true }
  } catch (e) {
    console.error("resetEmployeeTwoFactor failed:", e)
    return { ok: false, error: "Reset failed" }
  }
}
