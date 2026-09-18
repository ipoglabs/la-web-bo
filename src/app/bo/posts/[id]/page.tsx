import connectDB from "@/lib/db"
import Post from "@/models/post"
import User from "@/models/user"
import AdReport from "@/models/adReport"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Types } from "mongoose"
import AdminPostActions from "./AdminPostActions"
import { REPORT_ISSUE_LABELS } from "@/lib/reportIssueLabels"
import { cookies } from "next/headers"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"

export default async function BoPostDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  if (!Types.ObjectId.isValid(id)) return notFound()

  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value || ""
  const session = token ? verifyAdminJwt(token) : null

  await connectDB()

  const post = await Post.findById(id).lean()

  if (!post) return notFound()

  const owner = post.ownerId
    ? await User.findById(post.ownerId).lean()
    : null

  // Real end-user ad reports (submitted from the live site) reference this
  // post by its display id (adsId), not the Mongo _id — see models/adReport.ts.
  const reports = post.adsId
    ? await AdReport.find({ adId: post.adsId }).sort({ createdAt: -1 }).lean()
    : []

  return (

    <div className="space-y-6">

      <Link href="/bo/posts" className="text-sm text-blue-600 underline">
        ← Back to posts
      </Link>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="xl:col-span-2 space-y-6">

          <div className="bg-white p-5 rounded-xl border shadow">

            <h1 className="text-2xl font-semibold">{post.name}</h1>

            <p className="text-sm text-muted-foreground">
              {post.category} • {post.subcategory}
            </p>

            <div className="mt-2 text-sm">

              Status: <b className="capitalize">{post.status}</b>

              {reports.length > 0 && (
                <span className="ml-3 text-red-600 font-medium">
                  ⚠ {reports.length} report{reports.length === 1 ? "" : "s"}
                </span>
              )}

            </div>

          </div>

          <div className="bg-white p-5 rounded-xl border shadow">

            <h2 className="font-semibold mb-2">Posted By</h2>

            {owner ? (
              <div className="text-sm">
                {owner.fullName} — {owner.email}
              </div>
            ) : (
              <div className="text-sm">
                {post.seller_info?.email}
              </div>
            )}

          </div>

          <div className="bg-white p-5 rounded-xl border shadow">

            <h2 className="font-semibold mb-2">Description</h2>

            <p className="text-sm whitespace-pre-line">
              {post.description || "-"}
            </p>

          </div>

          <AdminPostActions
            postId={post._id.toString()}
            status={post.status ?? "pending"}
            role={session?.role}
            isSuspended={!!post.isSuspended}
          />

        </div>

        {/* RIGHT SIDE — real ad reports */}
        <div className="bg-white rounded-xl border shadow p-5 space-y-4 h-fit">

          <h2 className="font-semibold">Ad Reports ({reports.length})</h2>

          {reports.length === 0 && (
            <p className="text-sm text-muted-foreground">No reports for this ad.</p>
          )}

          {reports.map((r: any) => (
            <div key={r._id.toString()} className="border rounded-lg p-3 text-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{r.ticketId}</span>
                <span className="capitalize text-xs font-medium">{r.status}</span>
              </div>
              <ul className="list-disc list-inside">
                {(r.issues || []).map((issue: string) => (
                  <li key={issue}>{REPORT_ISSUE_LABELS[issue as keyof typeof REPORT_ISSUE_LABELS] ?? issue}</li>
                ))}
              </ul>
              {r.details && <p className="text-muted-foreground">{r.details}</p>}
              <Link href="/bo/reports/posts" className="text-blue-600 hover:underline text-xs">
                Review in Ad Reports →
              </Link>
            </div>
          ))}

        </div>

      </div>

    </div>

  )
}
