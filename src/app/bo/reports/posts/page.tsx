import Link from "next/link"
import connectDB from "@/lib/db"
import { Types, type QueryFilter } from "mongoose"
import AdReport, { type IAdReport } from "@/models/adReport"
import Post from "@/models/post"
import ViewReportModal from "./ViewReportModal"
import ReviewReportButtons from "./ReviewReportButtons"
import { requireAdminPage } from "@/lib/adminGuard"
import { hasPerm } from "@/lib/adminPermissions"
import { PAGE_SIZE, pageWindow, parsePage, searchFilter } from "@/lib/listQuery"
import { ListPager, ListSearch } from "../../components/ListControls"
import EscalateButton from "../../components/EscalateButton"
import { reportCountsByOwner, VALID_REPORTS_ESCALATE } from "@/lib/reportCounts"

const STATUS_STYLE: Record<string, string> = {
  pending: "text-amber-700 bg-amber-50",
  reviewed: "text-blue-700 bg-blue-50",
  actioned: "text-green-700 bg-green-50",
  dismissed: "text-slate-500 bg-slate-100",
}

const PRIORITY_RANK = { high: 0, medium: 1, low: 2 } as const
const OPEN = ["pending", "reviewed"]
type View = "open" | "closed" | "all"

export default async function AdReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; status?: string }>
}) {

  const admin = await requireAdminPage("reports.view", "/bo/reports/posts")
  const canReview = hasPerm(admin.role, "reports.review")
  const canEscalate = hasPerm(admin.role, "escalations.create")
  const sp = await searchParams
  const view: View = sp.status === "closed" || sp.status === "all" ? sp.status : "open"

  await connectDB()

  const statusFilter =
    view === "open" ? { status: { $in: OPEN } } : view === "closed" ? { status: { $nin: OPEN } } : {}
  const filter = { ...searchFilter(sp.q, ["ticketId", "adTitle", "sellerName", "adId"]), ...statusFilter } as QueryFilter<IAdReport>
  const total = await AdReport.countDocuments(filter)
  const w = pageWindow(parsePage(sp.page), total)
  const params = { q: sp.q, status: view }

  // Open reports: high priority first, then oldest first, so nothing urgent
  // or old waits behind new low-priority ones. Closed: most recently closed.
  const sort: Record<string, 1 | -1> =
    view === "closed" ? { reviewedAt: -1, _id: -1 } : { open: -1, rank: 1, createdAt: 1, _id: 1 }
  const reports = await AdReport.aggregate<IAdReport & { _id: Types.ObjectId }>([
    { $match: filter },
    {
      $addFields: {
        open: { $cond: [{ $in: ["$status", OPEN] }, 1, 0] },
        rank: {
          $switch: {
            branches: Object.entries(PRIORITY_RANK).map(([k, v]) => ({ case: { $eq: ["$priority", k] }, then: v })),
            default: 3,
          },
        },
      },
    },
    { $sort: sort },
    { $skip: w.skip },
    { $limit: PAGE_SIZE },
  ])

  // AdReport.adId is the listing's display id (Post.adsId), occasionally the
  // Mongo _id — resolve both so "View Ad" links to the real bo/posts/[id].
  const adIds = [...new Set(reports.map((r) => r.adId).filter(Boolean))]
  const objectIds = adIds.filter((id) => Types.ObjectId.isValid(id) && id.length === 24)
  const posts = adIds.length
    ? await Post.find({ $or: [{ adsId: { $in: adIds } }, { _id: { $in: objectIds } }] })
        .select("adsId status isSuspended ownerId")
        .lean()
    : []
  const postByAdId = new Map<string, (typeof posts)[number]>()
  for (const p of posts) {
    postByAdId.set(String(p._id), p)
    if (p.adsId) postByAdId.set(p.adsId, p)
  }

  // Sellers' report history (3+ valid reports → escalate for suspension review).
  const ownerIds = posts.map((p) => (p.ownerId ? String(p.ownerId) : "")).filter(Boolean)
  const counts = await reportCountsByOwner(ownerIds)

  const rows = reports.map((r) => {
    const post = postByAdId.get(r.adId)
    const ownerId = post?.ownerId ? String(post.ownerId) : null
    return {
      id: r._id.toString(),
      ticketId: r.ticketId,
      adId: r.adId,
      postId: post ? String(post._id) : null,
      adLive: !!post && post.status === "active" && !post.isSuspended,
      adState: post ? (post.isSuspended ? "suspended" : String(post.status ?? "")) : "not found",
      ownerId,
      sellerValid: ownerId ? counts.get(ownerId)?.valid ?? 0 : 0,
      adTitle: r.adTitle,
      sellerName: r.sellerName,
      issues: r.issues || [],
      details: r.details || "",
      priority: r.priority,
      status: r.status,
      resolution: r.resolution,
      reporterEmail: r.hideIdentity ? null : r.reporterEmail,
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : null,
    }
  })

  const tab = (v: View, label: string) => (
    <Link
      href={`/bo/reports/posts?status=${v}${sp.q ? `&q=${encodeURIComponent(sp.q)}` : ""}`}
      className={`px-3 py-1.5 rounded-md text-sm ${view === v ? "bg-slate-900 text-white" : "bg-white border"}`}
    >
      {label}
    </Link>
  )

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">🚩 Ad Reports</h1>
      <p className="text-sm text-muted-foreground">
        Reports submitted by users on the live site. Open reports are listed high priority first, then oldest
        first. A seller with {VALID_REPORTS_ESCALATE}+ valid reports should be escalated for a suspension review.
      </p>

      <div className="flex gap-2">
        {tab("open", "Open")}
        {tab("closed", "Closed")}
        {tab("all", "All")}
      </div>

      <ListSearch basePath="/bo/reports/posts" params={params} placeholder="Search ticket, ad title, seller or ad ID" />

      <div className="bg-white rounded-xl border shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-muted border-b">
            <tr>
              <th className="p-3 text-left">Ticket</th>
              <th className="p-3 text-left">Ad</th>
              <th className="p-3 text-left">Seller</th>
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

                <td className="p-3 max-w-xs">
                  <div className="font-medium truncate">{r.adTitle}</div>
                  <div className="text-xs text-muted-foreground">Ad is {r.adState}</div>
                </td>

                <td className="p-3">
                  {r.ownerId ? (
                    <Link href={`/bo/users/${r.ownerId}`} className="text-blue-600 underline">
                      {r.sellerName || "Seller"}
                    </Link>
                  ) : (
                    r.sellerName || "—"
                  )}
                  {r.sellerValid > 0 && (
                    <div
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        r.sellerValid >= VALID_REPORTS_ESCALATE ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {r.sellerValid} valid report{r.sellerValid === 1 ? "" : "s"}
                    </div>
                  )}
                </td>

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
                  {canReview && (
                    <ReviewReportButtons
                      reportId={r.id}
                      status={r.status}
                      adLive={r.adLive}
                      adExists={!!r.postId}
                      canModerate={hasPerm(admin.role, "posts.moderate")}
                      canSuspend={hasPerm(admin.role, "posts.suspend")}
                    />
                  )}
                  {canEscalate && !hasPerm(admin.role, "escalations.review") && (r.status === "pending" || r.status === "reviewed") && (
                    <EscalateButton targetType="report" targetId={r.id} />
                  )}
                </td>

              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-muted-foreground">
                  {view === "open" ? "No open reports 🎉" : "No reports"}
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      <ListPager basePath="/bo/reports/posts" params={params} page={w.current} pages={w.pages} from={w.from} to={w.to} total={total} />

    </div>
  )
}
