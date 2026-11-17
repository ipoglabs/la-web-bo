import { notFound } from "next/navigation"
import connectDB from "@/lib/db"
import AdminUser from "@/models/adminUser"
import AdminAuditLog from "@/models/adminAuditLog"
import { requireAdminPage } from "@/lib/adminGuard"
import { canManageRole, hasPerm, assignableRoles, ROLE_LABELS, type AdminRole } from "@/lib/adminPermissions"
import Link from "next/link"
import { Types } from "mongoose"
import EmployeeActions from "./EmployeeActions"

export default async function BoEmployeeDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const admin = await requireAdminPage("staff.view", `/bo/employees/${id}`)

  if (!Types.ObjectId.isValid(id)) {
    return notFound()
  }

  await connectDB()

  const employee = await AdminUser.findById(id)
    .select(
      "employeeId firstName lastName email role isActive country location designation age gender createdAt lastLoginAt lastLoginIp lockedUntil twoFactorEnabled twoFactorEnabledAt"
    )
    .lean()

  if (!employee) return notFound()

  const isSelf = admin.adminId === id
  const targetRole = employee.role as AdminRole
  const canManage = !isSelf && hasPerm(admin.role, "staff.manage") && canManageRole(admin.role, targetRole)
  const superOnSuper = !isSelf && admin.role === "super_admin" && targetRole === "super_admin"
  const roleOptions = [...new Set<AdminRole>([targetRole, ...assignableRoles(admin.role)])].map((r) => ({
    value: r,
    label: ROLE_LABELS[r],
  }))

  // What this person did, and what was done to their account.
  const history = hasPerm(admin.role, "audit.view")
    ? await AdminAuditLog.find({ $or: [{ actorId: id }, { targetType: "admin", targetId: id }] })
        .sort({ createdAt: -1 })
        .limit(50)
        .lean()
    : []

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
          <div>
  <h1 className="text-2xl font-semibold">
    {employee.firstName} {employee.lastName}
  </h1>

  <p className="text-sm text-muted-foreground">
    Employee ID:{" "}
    <span className="font-medium text-foreground">
      {employee.employeeId || "-"}
    </span>
  </p>
</div>

          <EmployeeActions
            id={id}
            role={employee.role}
            isActive={employee.isActive}
            roleOptions={roleOptions}
            canChangeRole={canManage}
            canToggleStatus={canManage || superOnSuper}
            canResetTwoFactor={(canManage || superOnSuper) && Boolean(employee.twoFactorEnabled)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Info label="Email" value={employee.email} />
          <Info label="Role" value={ROLE_LABELS[targetRole] ?? employee.role} />
          <Info
            label="Status"
            value={
              !employee.isActive
                ? "Inactive"
                : employee.lockedUntil && employee.lockedUntil > new Date()
                  ? "Locked (too many failed logins)"
                  : "Active"
            }
          />
          <Info
            label="Last login"
            value={
              employee.lastLoginAt
                ? `${new Date(employee.lastLoginAt).toLocaleString("en-GB")}${employee.lastLoginIp ? ` · ${employee.lastLoginIp}` : ""}`
                : "Never"
            }
          />
          <Info
            label="Two-factor sign-in"
            value={
              employee.twoFactorEnabled
                ? `On${employee.twoFactorEnabledAt ? ` since ${new Date(employee.twoFactorEnabledAt).toLocaleDateString("en-GB")}` : ""}`
                : "Not set up yet (asked at next sign-in)"
            }
          />
          <Info label="Designation" value={employee.designation} />
          <Info label="Gender" value={employee.gender} capitalize />
          <Info label="Age" value={String(employee.age)} />
          <Info label="Country" value={employee.country} />
          <Info label="Location" value={employee.location} />
          <Info
            label="Joined"
            value={
              employee.createdAt
                ? new Date(employee.createdAt).toLocaleDateString("en-GB")
                : "-"
            }
          />
        </div>
      </div>

      {history.length > 0 && (
        <div className="bg-white rounded-xl border shadow p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent activity</h2>
            <Link href={`/bo/audit-log?actor=${id}`} className="text-sm text-primary hover:underline">
              Full log →
            </Link>
          </div>
          <ul className="divide-y text-sm">
            {history.map((h) => (
              <li key={String(h._id)} className="py-2 flex flex-wrap gap-x-3">
                <span className="text-xs text-muted-foreground w-36">
                  {new Date(h.createdAt).toLocaleString("en-GB")}
                </span>
                <span className="font-mono text-xs">{h.action}</span>
                <span className="text-muted-foreground">
                  {String(h.actorId) === id ? h.targetLabel : `by ${h.actorEmail}`}
                </span>
                {h.reason && <span className="italic text-muted-foreground">“{h.reason}”</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
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
