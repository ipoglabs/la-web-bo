import { cookies } from "next/headers";
import { verifyAdminJwt, ADMIN_COOKIE, isAdminRole } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminHeader from "./components/AdminHeader";
import connectDB from "@/lib/db";
import Post from "@/models/post";
import OptionRequest from "@/models/optionRequest";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value || "";

  const session = token ? verifyAdminJwt(token) : null;
  if (!session || !isAdminRole(session.role)) {
    redirect("/bo-login?next=/bo");
  }

  // Work-waiting badges for the nav; a DB hiccup shouldn't take the panel down.
  let pendingPosts = 0;
  let pendingOptions = 0;
  try {
    await connectDB();
    [pendingPosts, pendingOptions] = await Promise.all([
      Post.countDocuments({ status: "pending" }),
      OptionRequest.countDocuments({ status: "pending" }),
    ]);
  } catch (e) {
    console.error("bo layout counts failed:", e);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-6 py-4 bg-white border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="font-semibold">Admin Panel</div>

          <div className="flex items-center gap-4">
            <Link href="/bo" className="text-blue-600 underline">
              Dashboard
            </Link>
            <Link href="/bo/users" className="text-blue-600 underline">
              Users
            </Link>
            <Link href="/bo/posts" className="text-blue-600 underline">
              Ads
              {pendingPosts > 0 && (
                <span className="ml-1 rounded-full bg-amber-500 px-1.5 text-xs text-white no-underline">
                  {pendingPosts}
                </span>
              )}
            </Link>
            <Link href="/bo/reports/posts" className="text-blue-600 underline">
              Reports
            </Link>
            <Link href="/bo/option-requests" className="text-blue-600 underline">
              Options
              {pendingOptions > 0 && (
                <span className="ml-1 rounded-full bg-amber-500 px-1.5 text-xs text-white no-underline">
                  {pendingOptions}
                </span>
              )}
            </Link>
            <Link href="/bo/dev-tools" className="text-blue-600 underline">
              Dev Tools
            </Link>

            {/* Profile dropdown */}
            <AdminHeader
              name={`${session.email.split("@")[0]}`}
              email={session.email}
              role={session.role}
            />
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
