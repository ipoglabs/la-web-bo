import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import connectDB from "@/config/database"
import Post from "@/models/post"
import AdminUser from "@/models/adminUser"
import ViewReportsModal from "./ViewReportsModal"
import ClearPostReportButton from "./ClearPostReportButton"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"

export default async function ReportedPostsPage() {

  const token = (await cookies()).get(ADMIN_COOKIE)?.value || ""
  const session = token ? verifyAdminJwt(token) : null

  if (!session || !["super_admin", "admin"].includes(session.role)) {
    redirect("/bo")
  }

  await connectDB()

  AdminUser

  const posts = await Post.find({ reported: true })
    .populate({
      path: "reports.by",
      model: "AdminUser",
      select: "email role",
    })
    .lean()

  const sortedPosts = posts
    .map((p: any) => {

      const reports = (p.reports || []).map((r: any) => ({
        reason: r.reason || "",
        at: r.at ? new Date(r.at).toISOString() : null,
        by: r.by
          ? {
              email: r.by.email || "",
              role: r.by.role || "",
            }
          : null,
      }))

      const latestReport =
        reports.length > 0 ? reports[reports.length - 1] : null

      return {
        id: p._id.toString(),
        name: p.name,
        category: p.category,
        reports,
        latestReport,
        reportCount: reports.length,
      }
    })
    .sort(
      (a: any, b: any) =>
        new Date(b.latestReport?.at || 0).getTime() -
        new Date(a.latestReport?.at || 0).getTime()
    )

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">
        🚩 Reported Posts
      </h1>

      <div className="bg-white rounded-xl border shadow">

        <table className="w-full text-sm">

          <thead className="bg-muted border-b">
            <tr>
              <th className="p-3 text-left">Post</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Reports</th>
              <th className="p-3 text-left">Latest Reason</th>
              <th className="p-3 text-left">Last Reported At</th>
              <th className="p-3 text-left">History</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>

            {sortedPosts.map((p: any) => (

              <tr key={p.id} className="border-b">

                <td className="p-3 font-medium">
                  {p.name}
                </td>

                <td className="p-3">
                  {p.category}
                </td>

                <td className="p-3 text-center font-semibold text-red-600">
                  {p.reportCount}
                </td>

                <td className="p-3 max-w-xs truncate">
                  {p.latestReport?.reason || "—"}
                </td>

                <td className="p-3">
                  {p.latestReport?.at
                    ? new Date(p.latestReport.at).toLocaleString("en-GB")
                    : "—"}
                </td>

                <td className="p-3">
                  <ViewReportsModal reports={p.reports} />
                </td>

                <td className="p-3 text-right space-x-2">

                  <Link
                    href={`/bo/posts/${p.id}`}
                    className="inline-flex items-center px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    View Details
                  </Link>

                  <ClearPostReportButton postId={p.id} />

                </td>

              </tr>

            ))}

            {sortedPosts.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted-foreground">
                  No reported posts 🎉
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}