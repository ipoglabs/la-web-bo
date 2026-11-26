import connectDB from "@/lib/db"
import Post from "@/models/post"
import User from "@/models/user"
import AdReport from "@/models/adReport"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Types } from "mongoose"
import EscalateButton from "../../components/EscalateButton"
import OpenEscalation from "../../components/OpenEscalation"
import AdminPostActions from "./AdminPostActions"
import { REPORT_ISSUE_LABELS } from "@/lib/reportIssueLabels"
import { requireAdminPage } from "@/lib/adminGuard"
import { hasPerm } from "@/lib/adminPermissions"
import { decodeEntities, detailRows, formatDate } from "./postFields"

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  rejected: "bg-red-100 text-red-800",
  off: "bg-slate-200 text-slate-700",
  expired: "bg-slate-200 text-slate-700",
  closed: "bg-slate-200 text-slate-700",
  deleted: "bg-red-100 text-red-800",
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="bg-white p-5 rounded-xl border shadow">
      {title && <h2 className="font-semibold mb-3">{title}</h2>}
      {children}
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-3 py-1.5 border-b last:border-b-0">
      <dt className="text-muted-foreground sm:w-44 shrink-0">{label}</dt>
      <dd className="font-medium break-words min-w-0">{children}</dd>
    </div>
  )
}

export default async function BoPostDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  if (!Types.ObjectId.isValid(id)) return notFound()

  const admin = await requireAdminPage("posts.view", `/bo/posts/${id}`)

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

  const status = post.status ?? "pending"
  // "off" covers the seller's own pause and a staff freeze; say which.
  const statusLabel = status === "off" && post.frozenByStaff && !post.isSuspended ? "frozen" : status
  const rows = detailRows(post as unknown as Record<string, unknown>)
  const images = (post.images ?? []).filter(Boolean)
  const loc = post.location
  const mapHref =
    loc?.lat != null && loc?.lng != null
      ? `https://www.google.com/maps?q=${loc.lat},${loc.lng}`
      : loc?.address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`
        : undefined

  return (

    <div className="space-y-6">

      <Link href="/bo/posts" className="text-sm text-blue-600 underline">
        ← Back to posts
      </Link>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="xl:col-span-2 space-y-6 min-w-0">

          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold break-words">{decodeEntities(post.name)}</h1>
                <p className="text-sm text-muted-foreground">
                  {decodeEntities(post.category)} › {decodeEntities(post.subcategory)}
                  {post.country && <> · {post.country.toUpperCase()}</>}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${STATUS_STYLES[status] ?? "bg-slate-100"}`}>
                {statusLabel}
              </span>
            </div>

            {reports.length > 0 && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                ⚠ {reports.length} report{reports.length === 1 ? "" : "s"}
              </p>
            )}

            {status === "rejected" && post.rejectionReason && (
              <p className="mt-2 text-sm text-red-700">
                Rejection reason: {post.rejectionReason}
              </p>
            )}

            <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div><dt className="text-muted-foreground">Ad ID</dt><dd className="font-mono">{post.adsId || "-"}</dd></div>
              <div><dt className="text-muted-foreground">Posted</dt><dd>{post.createdAt ? formatDate(post.createdAt) : "-"}</dd></div>
              <div><dt className="text-muted-foreground">Last updated</dt><dd>{post.updatedAt ? formatDate(post.updatedAt) : "-"}</dd></div>
              <div><dt className="text-muted-foreground">Views</dt><dd>{(post.viewCount ?? 0).toLocaleString("en-GB")}</dd></div>
              {post.expiresAt && (
                <div><dt className="text-muted-foreground">Expires</dt><dd>{formatDate(post.expiresAt)}</dd></div>
              )}
              {post.lastBumpedAt && (
                <div><dt className="text-muted-foreground">Last bumped</dt><dd>{formatDate(post.lastBumpedAt)}</dd></div>
              )}
            </dl>
          </Card>

          <Card title={`Photos (${images.length})`}>
            {images.length === 0 ? (
              <p className="text-sm text-muted-foreground">No photos.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {images.map((src, i) => (
                  <a key={src + i} href={src} target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden rounded-lg border bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element -- external R2 URLs, admin-only page */}
                    <img src={src} alt={`Photo ${i + 1}`} className="h-full w-full object-cover hover:opacity-90" loading="lazy" />
                  </a>
                ))}
              </div>
            )}
          </Card>

          <Card title="Description">
            <p className="text-sm whitespace-pre-line break-words">
              {post.description ? decodeEntities(post.description) : "-"}
            </p>
          </Card>

          <Card title={`Details entered by seller (${rows.length})`}>
            {rows.length === 0 ? (
              <p className="text-sm text-muted-foreground">No extra details.</p>
            ) : (
              <dl className="text-sm">
                {rows.map((r) => (
                  <Row key={r.key} label={r.label}>
                    {r.href ? (
                      <a href={r.href} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">{r.value}</a>
                    ) : (
                      r.value
                    )}
                  </Row>
                ))}
              </dl>
            )}
          </Card>

          <Card title="Location">
            <dl className="text-sm">
              <Row label="Address">{loc?.address ? decodeEntities(loc.address) : "-"}</Row>
              {loc?.lat != null && loc?.lng != null && (
                <Row label="Coordinates">{loc.lat}, {loc.lng}</Row>
              )}
            </dl>
            {mapHref && (
              <a href={mapHref} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-blue-600 underline">
                Open in Google Maps →
              </a>
            )}
          </Card>

          <Card title="Seller">
            <dl className="text-sm">
              <Row label="Contact name">{post.seller_info?.name || "-"}</Row>
              <Row label="Contact phone">
                {post.seller_info?.phone ? <a href={`tel:${post.seller_info.phone}`} className="text-blue-600 underline">{post.seller_info.phone}</a> : "-"}
              </Row>
              <Row label="Contact email">
                {post.seller_info?.email ? <a href={`mailto:${post.seller_info.email}`} className="text-blue-600 underline">{post.seller_info.email}</a> : "-"}
              </Row>
              <Row label="Account">
                {owner ? (
                  <Link href={`/bo/users/${owner._id.toString()}`} className="text-blue-600 underline">
                    {owner.fullName || owner.email} — {owner.email}
                  </Link>
                ) : (
                  "No linked account"
                )}
              </Row>
            </dl>
          </Card>

          <OpenEscalation targetType="post" targetId={post._id.toString()} canReview={hasPerm(admin.role, "escalations.review")} />

          {hasPerm(admin.role, "escalations.create") && !hasPerm(admin.role, "escalations.review") && !post.isSuspended && (
            <div className="bg-white p-5 rounded-xl border shadow space-y-2">
              <p className="text-sm text-muted-foreground">
                Scam, weapons, drugs, adult content, stolen or counterfeit goods, anything involving minors: escalate
                to an Admin instead of only rejecting.
              </p>
              <EscalateButton targetType="post" targetId={post._id.toString()} />
            </div>
          )}

          <AdminPostActions
            postId={post._id.toString()}
            status={status}
            canModerate={hasPerm(admin.role, "posts.moderate")}
            canSuspend={hasPerm(admin.role, "posts.suspend")}
            isSuspended={!!post.isSuspended}
          />

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 h-fit">

          {(post.isSuspended || post.deletedAt) && (
            <Card title="Moderation">
              <dl className="text-sm">
                {post.isSuspended && <Row label="Suspended">{post.suspendedAt ? formatDate(post.suspendedAt) : "Yes"}</Row>}
                {post.deletedAt && <Row label="Deleted">{formatDate(post.deletedAt)}</Row>}
              </dl>
            </Card>
          )}

          <div className="bg-white rounded-xl border shadow p-5 space-y-4">

            <h2 className="font-semibold">Ad Reports ({reports.length})</h2>

            {reports.length === 0 && (
              <p className="text-sm text-muted-foreground">No reports for this ad.</p>
            )}

            {reports.map((r) => (
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

    </div>

  )
}
