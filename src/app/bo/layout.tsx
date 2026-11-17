import Link from "next/link";
import AdminHeader from "./components/AdminHeader";
import connectDB from "@/lib/db";
import Post from "@/models/post";
import OptionRequest from "@/models/optionRequest";
import { requireAdminPage } from "@/lib/adminGuard";
import { hasPerm, ROLE_LABELS, type Permission } from "@/lib/adminPermissions";

const NAV: { href: string; label: string; perm?: Permission; badge?: "posts" | "options" }[] = [
  { href: "/bo", label: "Dashboard" },
  { href: "/bo/users", label: "Users", perm: "users.view" },
  { href: "/bo/posts", label: "Ads", perm: "posts.view", badge: "posts" },
  { href: "/bo/reports/posts", label: "Reports", perm: "reports.view" },
  { href: "/bo/option-requests", label: "Options", perm: "options.review", badge: "options" },
  { href: "/bo/employees", label: "Staff", perm: "staff.view" },
  { href: "/bo/audit-log", label: "Audit log", perm: "audit.view" },
  { href: "/bo/dev-tools", label: "Dev Tools", perm: "devtools.view" },
  { href: "/bo/handbook", label: "Handbook" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdminPage();

  // Work-waiting badges for the nav; a DB hiccup shouldn't take the panel down.
  let counts = { posts: 0, options: 0 };
  try {
    await connectDB();
    const [posts, options] = await Promise.all([
      hasPerm(admin.role, "posts.moderate") ? Post.countDocuments({ status: "pending" }) : 0,
      hasPerm(admin.role, "options.review") ? OptionRequest.countDocuments({ status: "pending" }) : 0,
    ]);
    counts = { posts, options };
  } catch (e) {
    console.error("bo layout counts failed:", e);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-6 py-4 bg-white border-b">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="font-semibold">Admin Panel</div>

          <nav className="flex flex-wrap items-center gap-4">
            {NAV.filter((n) => !n.perm || hasPerm(admin.role, n.perm)).map((n) => (
              <Link key={n.href} href={n.href} className="text-blue-600 underline">
                {n.label}
                {n.badge && counts[n.badge] > 0 && (
                  <span className="ml-1 rounded-full bg-amber-500 px-1.5 text-xs text-white no-underline">
                    {counts[n.badge]}
                  </span>
                )}
              </Link>
            ))}

            <AdminHeader name={admin.name || admin.email.split("@")[0]} email={admin.email} role={ROLE_LABELS[admin.role]} />
          </nav>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
