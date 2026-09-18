"use server"

import { cookies } from "next/headers"
import connectDB from "@/lib/db"
import AdminUser from "@/models/adminUser"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import { Types } from "mongoose"

const ALLOWED_ROLES = ["admin", "moderator", "support", "analyst"]

export async function changeEmployeeRole(
  employeeId: string,
  nextRole: string
) {
  try {
    if (!ALLOWED_ROLES.includes(nextRole)) {
      return { ok: false, error: "Invalid role" }
    }

    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_COOKIE)?.value || ""
    const session = token ? verifyAdminJwt(token) : null

    // 🔐 super_admin only
    if (!session || session.role !== "super_admin") {
      return { ok: false, error: "Forbidden" }
    }

    if (!Types.ObjectId.isValid(employeeId)) {
      return { ok: false, error: "Invalid employee id" }
    }

    if (session.adminId === employeeId) {
      return { ok: false, error: "You cannot change your own role" }
    }

    await connectDB()

    const employee = await AdminUser.findById(employeeId)
    if (!employee) return { ok: false, error: "Employee not found" }

    if (employee.role === "super_admin") {
      return { ok: false, error: "Cannot change another super admin's role" }
    }

    const prevRole = employee.role

    if (prevRole === nextRole) {
      return { ok: true }
    }

    employee.role = nextRole
employee.audit.push({
  action: "role_change",
  from: prevRole,
  to: nextRole,
  by: session.adminId, // ✅ correct field
})

await employee.save()


    return { ok: true }
  } catch (e: any) {
    return { ok: false, error: e.message }
  }
}
