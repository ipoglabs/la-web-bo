import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  Users,
  Megaphone,
  MessageSquare,
  ShieldPlus,
  UserCog,
  Flag,
} from "lucide-react"

import { ADMIN_COOKIE, verifyAdminJwt, isAdminRole } from "@/lib/adminAuth"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

function hasPerm(role: string, perm: string) {
  if (role === "super_admin") return true

  if (perm === "users.manage") return role === "admin" || role === "moderator"
  if (perm === "posts.manage") return role === "admin" || role === "moderator" || role === "analyst"
  if (perm === "comm.manage") return role === "support" || role === "moderator" || role === "admin"

  return false
}

export default async function BoDashboard({
  searchParams,
}: {
  searchParams: { created?: string }
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value || ""

  const session = token ? verifyAdminJwt(token) : null
  if (!session || !isAdminRole(session.role)) {
    redirect("/bo-login?next=/bo")
  }

  const role = session.role
  const created = searchParams?.created === "1"

  const isAdminLevel = role === "super_admin" || role === "admin"

  return (
    <div className="space-y-6">
      {/* Success banner */}
      {created && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          ✅ User created successfully
        </div>
      )}

      {/* Page title */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Backoffice Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage users, ads and platform operations
        </p>
      </div>

      {/* Dashboard cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {/* Users */}
        {hasPerm(role, "users.manage") && (
          <Link href="/bo/users">
            <Card className="hover:bg-muted/40 transition">
              <CardHeader>
                <Users className="h-6 w-6 text-muted-foreground" />
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Manage user accounts and profiles
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}

        {/* Ads */}
        {hasPerm(role, "posts.manage") && (
          <Link href="/bo/posts">
            <Card className="hover:bg-muted/40 transition">
              <CardHeader>
                <Megaphone className="h-6 w-6 text-muted-foreground" />
                <CardTitle>Ads</CardTitle>
                <CardDescription>
                  Review, approve and manage ads
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}

        {/* Communications */}
        {hasPerm(role, "comm.manage") && (
          <Link href="/bo/communications">
            <Card className="hover:bg-muted/40 transition">
              <CardHeader>
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
                <CardTitle>Communications</CardTitle>
                <CardDescription>
                  User messages and support requests
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}

        {/* Create BO user */}
        {(role === "super_admin" || role === "admin") && (
          <Link href="/bo/register">
            <Card className="hover:bg-muted/40 transition border-dashed">
              <CardHeader>
                <ShieldPlus className="h-6 w-6 text-muted-foreground" />
                <CardTitle>Create BO User</CardTitle>
                <CardDescription>
                  Add admins, moderators and support users
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}

        {/* BO Employees */}
        {(role === "super_admin" || role === "admin") && (
          <Link href="/bo/employees">
            <Card className="hover:bg-muted/40 transition">
              <CardHeader>
                <UserCog className="h-6 w-6 text-muted-foreground" />
                <CardTitle>BO Employees</CardTitle>
                <CardDescription>
                  Admin, moderator, support and analyst users
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}

        {/* 🚩 Reported Users */}
        {isAdminLevel && (
          <Link href="/bo/reports/users">
            <Card className="hover:bg-muted/40 transition border border-red-200">
              <CardHeader>
                <Flag className="h-6 w-6 text-red-500" />
                <CardTitle>Reported Users</CardTitle>
                <CardDescription>
                  Review users reported for abuse or violations
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}

        {/* 🚩 Reported Posts */}
        {isAdminLevel && (
          <Link href="/bo/reports/posts">
            <Card className="hover:bg-muted/40 transition border border-red-200">
              <CardHeader>
                <Flag className="h-6 w-6 text-red-500" />
                <CardTitle>Reported Posts</CardTitle>
                <CardDescription>
                  Review and take action on reported ads
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}

      </div>
    </div>
  )
}
