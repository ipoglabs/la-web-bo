"use server"

import { cookies } from "next/headers"
import connectDB from "@/config/database"
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

    await connectDB()

    const employee = await AdminUser.findById(employeeId)
    if (!employee) return { ok: false, error: "Employee not found" }

    const prevRole = employee.role

    if (prevRole === nextRole) {
      return { ok: true }
    }

    employee.role = nextRole
    employee.audit.push({
      action: "role_change",
      from: prevRole,
      to: nextRole,
      by: session.id,
    })

    await employee.save()

    return { ok: true }
  } catch (e: any) {
    return { ok: false, error: e.message }
  }
}
