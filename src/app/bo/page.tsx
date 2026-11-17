import Link from "next/link"
import { Users, Megaphone, ShieldPlus, UserCog, Flag, ScrollText, BookOpen, ListPlus, Wrench } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { requireAdminPage } from "@/lib/adminGuard"
import { hasPerm, ROLE_LABELS, ROLE_SUMMARY, type Permission } from "@/lib/adminPermissions"

const CARDS: { href: string; title: string; desc: string; perm?: Permission; icon: typeof Users; tone?: string }[] = [
  { href: "/bo/posts?status=pending", title: "Ads", desc: "Review, approve and manage ads", perm: "posts.view", icon: Megaphone },
  { href: "/bo/reports/posts", title: "Ad Reports", desc: "Ads reported by users", perm: "reports.view", icon: Flag, tone: "border-red-200" },
  { href: "/bo/users", title: "Users", desc: "User accounts and their ads", perm: "users.view", icon: Users },
  { href: "/bo/option-requests", title: "Option requests", desc: "New dropdown values sellers typed", perm: "options.review", icon: ListPlus },
  { href: "/bo/employees", title: "Staff", desc: "Back-office accounts, roles and status", perm: "staff.view", icon: UserCog },
  { href: "/bo/register", title: "Add staff", desc: "Create moderator, support and analyst accounts", perm: "staff.create", icon: ShieldPlus, tone: "border-dashed" },
  { href: "/bo/audit-log", title: "Audit log", desc: "Who did what, when, and why", perm: "audit.view", icon: ScrollText },
  { href: "/bo/dev-tools", title: "Dev Tools", desc: "Private user data. Every view is logged", perm: "devtools.view", icon: Wrench, tone: "border-sky-200" },
  { href: "/bo/handbook", title: "Staff handbook", desc: "Rules and duties for your role", icon: BookOpen },
]

export default async function BoDashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const admin = await requireAdminPage(undefined, "/bo")
  const { denied } = await searchParams

  return (
    <div className="space-y-6">
      {denied === "1" && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Your role doesn&apos;t have access to that page. Ask an admin if you need it for your work.
        </div>
      )}

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome, {admin.name}</h1>
        <p className="text-sm text-muted-foreground">
          {ROLE_LABELS[admin.role]}: {ROLE_SUMMARY[admin.role]}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.filter((c) => !c.perm || hasPerm(admin.role, c.perm)).map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className={`hover:bg-muted/40 transition h-full ${c.tone ?? ""}`}>
              <CardHeader>
                <c.icon className="h-6 w-6 text-muted-foreground" />
                <CardTitle>{c.title}</CardTitle>
                <CardDescription>{c.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
