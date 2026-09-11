import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import connectDB from "@/config/database"
import AdReport from "@/models/adReport"
import Post from "@/models/post"
import ViewReportModal from "./ViewReportModal"
import ReviewReportButtons from "./ReviewReportButtons"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"

const STATUS_STYLE: Record<string, string> = {
  pending: "text-amber-700 bg-amber-50",
  reviewed: "text-blue-700 bg-blue-50",
  actioned: "text-green-700 bg-green-50",
  dismissed: "text-slate-500 bg-slate-100",
}

export default async function AdReportsPage() {

  const token = (await cookies()).get(ADMIN_COOKIE)?.value || ""
  const session = token ? verifyAdminJwt(token) : null

  if (!session || !["super_admin", "admin", "moderator"].includes(session.role)) {
    redirect("/bo")
  }

  await connectDB()

  const reports = await AdReport.find({})
    .sort({ createdAt: -1 })
    .lean()

  // AdReport.adId is the listing's display id (Post.adsId), not the Mongo
  // _id — resolve it here so "View Ad" can link to the real bo/posts/[id].
  const adIds = [...new Set(reports.map((r: any) => r.adId).filter(Boolean))]
  const posts = adIds.length
    ? await Post.find({ adsId: { $in: adIds } }).select("adsId").lean()
    : []
  const postIdByAdsId = new Map(posts.map((p: any) => [p.adsId, p._id.toString()]))

  const rows = reports.map((r: any) => ({
    id: r._id.toString(),
    ticketId: r.ticketId,
    adId: r.adId,
    postId: postIdByAdsId.get(r.adId) || null,
    adTitle: r.adTitle,
    sellerName: r.sellerName,
    issues: r.issues || [],
    details: r.details || "",
    priority: r.priority,
    status: r.status,
    resolution: r.resolution,
    reporterEmail: r.hideIdentity ? null : r.reporterEmail,
    createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : null,
  }))

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">🚩 Ad Reports</h1>
      <p className="text-sm text-muted-foreground">
        Reports submitted by real users from the live site (POST /api/reports) — bo only reviews these.
      </p>

      <div className="bg-white rounded-xl border shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-muted border-b">
            <tr>
              <th className="p-3 text-left">Ticket</th>
              <th className="p-3 text-left">Ad</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Reported At</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((r) => (
              <tr key={r.id} className="border-b align-top">

                <td className="p-3 font-mono text-xs">{r.ticketId}</td>

                <td className="p-3 font-medium max-w-xs truncate">{r.adTitle}</td>

                <td className="p-3 capitalize">{r.priority}</td>

                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLE[r.status] ?? ""}`}>
                    {r.status}
                  </span>
                </td>

                <td className="p-3">
                  {r.createdAt ? new Date(r.createdAt).toLocaleString("en-GB") : "—"}
                </td>

                <td className="p-3">
                  <ViewReportModal report={r} />
                </td>

                <td className="p-3 text-right space-y-2">
                  <div>
                    {r.postId ? (
                      <Link
                        href={`/bo/posts/${r.postId}`}
                        className="inline-flex items-center px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      >
                        View Ad
                      </Link>
                    ) : (
                      <span className="text-xs text-muted-foreground">Ad not found</span>
                    )}
                  </div>
                  <ReviewReportButtons reportId={r.id} status={r.status} />
                </td>

              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted-foreground">
                  No ad reports 🎉
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}
