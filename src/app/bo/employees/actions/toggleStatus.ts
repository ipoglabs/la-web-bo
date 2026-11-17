"use server"

import connectDB from "@/lib/db"
import AdminUser from "@/models/adminUser"
import { Types } from "mongoose"
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON } from "@/lib/adminGuard"
import { canManageRole } from "@/lib/adminPermissions"

export async function toggleEmployeeStatus(employeeId: string, reason: string) {
  try {
    const guard = await requireAdmin("staff.manage")
    if (!guard.ok) return guard
    const { admin } = guard

    if (!Types.ObjectId.isValid(employeeId)) return { ok: false, error: "Invalid employee id" }
    if (admin.adminId === employeeId) return { ok: false, error: "You cannot change your own status" }

    const why = cleanReason(reason)
    if (!why) return { ok: false, error: `Write a reason (at least ${MIN_REASON} characters) for the audit log.` }

    await connectDB()

    const employee = await AdminUser.findById(employeeId)
    if (!employee) return { ok: false, error: "Employee not found" }

    // A super admin may (de)activate another super admin (e.g. someone who left);
    // everyone else can only act on roles below their own.
    const superOnSuper = admin.role === "super_admin" && employee.role === "super_admin"
    if (!superOnSuper && !canManageRole(admin.role, employee.role)) {
      return { ok: false, error: "You can't change the status of someone at or above your level." }
    }

    if (employee.isActive && employee.role === "super_admin") {
      const otherActive = await AdminUser.countDocuments({
        _id: { $ne: employee._id },
        role: "super_admin",
        isActive: true,
      })
      if (otherActive === 0) return { ok: false, error: "Cannot deactivate the last active super admin" }
    }

    const next = !employee.isActive
    employee.isActive = next
    if (!next) employee.tokenVersion = (employee.tokenVersion ?? 0) + 1 // kill live sessions now
    employee.audit.push({
      action: "status_change",
      from: String(!next),
      to: String(next),
      by: new Types.ObjectId(admin.adminId),
    })
    await employee.save()

    await logAdminAction(admin, {
      action: next ? "staff.activate" : "staff.deactivate",
      targetType: "admin",
      targetId: employeeId,
      targetLabel: `${employee.employeeId} · ${employee.email}`,
      reason: why,
    })

    return { ok: true }
  } catch (e) {
    console.error("toggleEmployeeStatus failed:", e)
    return { ok: false, error: "Status change failed" }
  }
}
