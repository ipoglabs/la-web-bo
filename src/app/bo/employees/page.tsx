import Link from "next/link"
import connectDB from "@/lib/db"
import AdminUser from "@/models/adminUser"
import { requireAdminPage } from "@/lib/adminGuard"
import { hasPerm, ROLE_LABELS, type AdminRole } from "@/lib/adminPermissions"

function fmt(d?: Date) {
  return d ? new Date(d).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "Never"
}

export default async function BoEmployeesPage() {
  const admin = await requireAdminPage("staff.view", "/bo/employees")

  await connectDB()

  const employees = await AdminUser.find()
    .select("employeeId firstName lastName email role isActive lastLoginAt lockedUntil createdAt")
    .sort({ isActive: -1, role: 1, createdAt: -1 })
    .lean()

  const now = new Date()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">BO Employees</h1>
        {hasPerm(admin.role, "staff.create") && (
          <Link href="/bo/register" className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">
            + Add employee
          </Link>
        )}
      </div>

      <div className="bg-white rounded-xl border shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted">
            <tr>
              <th className="p-3 text-left">Employee ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Last login</th>
              <th className="p-3"></th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e) => {
              const locked = e.lockedUntil && e.lockedUntil > now
              return (
                <tr key={String(e._id)} className={`border-b hover:bg-muted/40 ${e.isActive ? "" : "opacity-60"}`}>
                  <td className="p-3 font-mono text-xs">{e.employeeId}</td>
                  <td className="p-3 font-medium">
                    {e.firstName} {e.lastName}
                  </td>
                  <td className="p-3">{e.email}</td>
                  <td className="p-3">{ROLE_LABELS[e.role as AdminRole] ?? e.role}</td>
                  <td className="p-3">
                    {!e.isActive ? (
                      <span className="text-slate-500">Inactive</span>
                    ) : locked ? (
                      <span className="text-amber-700">Locked</span>
                    ) : (
                      <span className="text-emerald-700">Active</span>
                    )}
                  </td>
                  <td className="p-3 text-xs">{fmt(e.lastLoginAt)}</td>
                  <td className="p-3 text-right">
                    <Link href={`/bo/employees/${e._id}`} className="text-primary hover:underline text-sm">
                      View
                    </Link>
                  </td>
                </tr>
              )
            })}

            {employees.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted-foreground">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        Review this list monthly: deactivate anyone who has left or no longer needs access, and anyone
        who hasn&apos;t signed in for 60 days.
      </p>
    </div>
  )
}
