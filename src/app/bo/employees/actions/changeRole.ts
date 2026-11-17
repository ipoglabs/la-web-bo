"use server"

import connectDB from "@/lib/db"
import AdminUser from "@/models/adminUser"
import { Types } from "mongoose"
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON } from "@/lib/adminGuard"
import { canManageRole, isAdminRole } from "@/lib/adminPermissions"
import { reportError } from "@/lib/errorReport"

export async function changeEmployeeRole(employeeId: string, nextRole: string, reason: string) {
  try {
    const guard = await requireAdmin("staff.manage")
    if (!guard.ok) return guard
    const { admin } = guard

    if (!isAdminRole(nextRole) || !canManageRole(admin.role, nextRole)) {
      return { ok: false, error: "You can't assign that role." }
    }
    if (!Types.ObjectId.isValid(employeeId)) return { ok: false, error: "Invalid employee id" }
    if (admin.adminId === employeeId) return { ok: false, error: "You cannot change your own role" }

    const why = cleanReason(reason)
    if (!why) return { ok: false, error: `Write a reason (at least ${MIN_REASON} characters) for the audit log.` }

    await connectDB()

    const employee = await AdminUser.findById(employeeId)
    if (!employee) return { ok: false, error: "Employee not found" }

    if (!canManageRole(admin.role, employee.role)) {
      return { ok: false, error: "You can't change the role of someone at or above your level." }
    }

    const prevRole = employee.role
    if (prevRole === nextRole) return { ok: true }

    employee.role = nextRole
    employee.tokenVersion = (employee.tokenVersion ?? 0) + 1 // sign them out so the new role applies cleanly
    employee.audit.push({
      action: "role_change",
      from: prevRole,
      to: nextRole,
      by: new Types.ObjectId(admin.adminId),
    })
    await employee.save()

    await logAdminAction(admin, {
      action: "staff.role_change",
      targetType: "admin",
      targetId: employeeId,
      targetLabel: `${employee.employeeId} · ${employee.email}`,
      reason: why,
      meta: { from: prevRole, to: nextRole },
    })

    return { ok: true }
  } catch (e) {
    await reportError(e, { where: "action:changeEmployeeRole" })
    return { ok: false, error: "Role change failed" }
  }
}
