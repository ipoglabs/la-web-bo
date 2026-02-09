import { cookies } from "next/headers"
import { redirect, notFound } from "next/navigation"
import connectDB from "@/config/database"
import AdminUser from "@/models/adminUser"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import Link from "next/link"
import { Types } from "mongoose"
import EmployeeActions from "./EmployeeActions"

export default async function BoEmployeeDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // 🔐 Auth
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value || ""
  const session = token ? verifyAdminJwt(token) : null

  if (!session || session.role !== "super_admin") {
    redirect("/bo")
  }

  const { id } = await params

  if (!Types.ObjectId.isValid(id)) {
    return notFound()
  }

  await connectDB()

  const employee = await AdminUser.findById(id)
    .select(
      "firstName lastName email role isActive country location designation age gender createdAt"
    )
    .lean()

  if (!employee) return notFound()

  return (
    <div className="max-w-3xl space-y-6">
      <Link
        href="/bo/employees"
        className="text-sm text-primary hover:underline"
      >
        ← Back to employees
      </Link>

      <div className="bg-white rounded-xl border shadow p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold">
            {employee.firstName} {employee.lastName}
          </h1>

          <EmployeeActions
            id={id}
            role={employee.role}
            isActive={employee.isActive}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Info label="Email" value={employee.email} />
          <Info label="Role" value={employee.role} capitalize />
          <Info label="Status" value={employee.isActive ? "Active" : "Inactive"} />
          <Info label="Designation" value={employee.designation} />
          <Info label="Gender" value={employee.gender} capitalize />
          <Info label="Age" value={String(employee.age)} />
          <Info label="Country" value={employee.country} />
          <Info label="Location" value={employee.location} />
          <Info
            label="Joined"
            value={new Date(employee.createdAt).toLocaleDateString("en-GB")}
          />
        </div>
      </div>
    </div>
  )
}

function Info({
  label,
  value,
  capitalize,
}: {
  label: string
  value?: string
  capitalize?: boolean
}) {
  return (
    <div>
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className={`font-medium ${capitalize ? "capitalize" : ""}`}>
        {value || "-"}
      </div>
    </div>
  )
}
