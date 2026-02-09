"use server"

import { cookies } from "next/headers"
import connectDB from "@/config/database"
import AdminUser from "@/models/adminUser"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import { Types } from "mongoose"

export async function toggleEmployeeStatus(employeeId: string) {
  try {
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

    const prev = employee.isActive
    employee.isActive = !prev

    employee.audit.push({
  action: "status_change",
  from: String(prev),
  to: String(!prev),
  by: session.adminId, 
})

await employee.save()


    return { ok: true }
  } catch (e: any) {
    return { ok: false, error: e.message }
  }
}
