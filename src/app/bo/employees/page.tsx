import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import connectDB from "@/config/database"
import AdminUser from "@/models/adminUser"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"

export default async function BoEmployeesPage() {
  // 🔐 Auth
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value || ""
  const session = token ? verifyAdminJwt(token) : null

  // 🔐 Only admins can see list
  if (!session || !["super_admin", "admin"].includes(session.role)) {
    redirect("/bo")
  }

  await connectDB()

  const employees = await AdminUser.find()
    .select("firstName lastName email role createdAt")
    .sort({ createdAt: -1 })
    .lean()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">BO Employees</h1>

      <div className="bg-white rounded-xl border shadow">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Joined</th>
              <th className="p-3"></th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e: any) => (
              <tr key={e._id} className="border-b hover:bg-muted/40">
                <td className="p-3 font-medium">
                  {e.firstName} {e.lastName}
                </td>
                <td className="p-3">{e.email}</td>
                <td className="p-3 capitalize">{e.role}</td>
                <td className="p-3">
                  {new Date(e.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="p-3 text-right">
                  {session.role === "super_admin" && (
                    <Link
                      href={`/bo/employees/${e._id}`}
                      className="text-primary hover:underline text-sm"
                    >
                      View
                    </Link>
                  )}
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
