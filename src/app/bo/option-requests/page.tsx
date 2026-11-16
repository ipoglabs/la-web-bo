import connectDB from "@/lib/db"
import OptionRequest from "@/models/optionRequest"
import { cookies } from "next/headers"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import OptionRequestCard from "./OptionRequestCard"

export default async function OptionRequestsPage() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value || ""
  const session = token ? verifyAdminJwt(token) : null
  const canReview = !!session && ["super_admin", "admin"].includes(session.role)

  await connectDB()
  const rows = await OptionRequest.find({ status: "pending" }).sort({ createdAt: -1 }).limit(500).lean()

  const requests = rows
    .map((r) => ({
      id: String(r._id),
      category: r.category,
      subcategory: r.subcategory,
      country: r.country,
      fieldLabel: r.fieldLabel,
      value: r.value,
      postCount: r.postIds?.length ?? 0,
      createdAt: new Date(r.createdAt).toISOString(),
    }))
    .sort((a, b) => b.postCount - a.postCount)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Option requests</h1>
        <p className="text-sm text-muted-foreground">
          Dropdown values sellers typed that aren&apos;t in their post form yet. &ldquo;Add to form&rdquo; makes
          it a choice for everyone; &ldquo;Dismiss&rdquo; leaves the form alone. Posts keep the value either way.
        </p>
      </div>

      {!canReview && (
        <p className="text-sm text-amber-700">Only admins can add or dismiss option requests.</p>
      )}

      {requests.length === 0 ? (
        <p className="text-sm text-muted-foreground">No option requests.</p>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <OptionRequestCard key={r.id} request={r} canReview={canReview} />
          ))}
        </div>
      )}
    </div>
  )
}
