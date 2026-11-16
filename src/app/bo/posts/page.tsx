import connectDB from "@/lib/db"
import "@/models/user"
import Post from "@/models/post"
import Link from "next/link"
import { toClientPost, type LeanPost } from "@/lib/serialize"
import { BoPost } from "./columns"
import BoPostsClient from "./BoPostsClient"
import type { Types } from "mongoose"

type PopulatedOwner = { _id: Types.ObjectId; email?: string };
type LeanPostWithOwner = Omit<LeanPost, "ownerId"> & {
  ownerId?: Types.ObjectId | PopulatedOwner;
};

const TABS = ["pending", "active", "rejected", "off", "all"] as const
type Tab = (typeof TABS)[number]

const TAB_LABELS: Record<Tab, string> = {
  pending: "Pending approval",
  active: "Active",
  rejected: "Rejected",
  off: "Paused / suspended",
  all: "All",
}

export default async function BoPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  await connectDB()

  const counts = Object.fromEntries(
    (await Post.aggregate<{ _id: string | null; n: number }>([
      { $group: { _id: "$status", n: { $sum: 1 } } },
    ])).map((c) => [c._id ?? "pending", c.n])
  ) as Record<string, number>
  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  // Default to the approval queue when something is waiting.
  const requested = (await searchParams).status
  const tab: Tab = TABS.includes(requested as Tab)
    ? (requested as Tab)
    : (counts.pending ?? 0) > 0 ? "pending" : "all"

  // Queue is first-in, first-out; other views show the latest changes first.
  const posts = await Post.find(tab === "all" ? {} : { status: tab })
    .sort(tab === "pending" ? { updatedAt: 1 } : { updatedAt: -1 })
    .populate("ownerId", "email")
    .lean<LeanPostWithOwner[]>()

  const data: BoPost[] = posts.flatMap((p): BoPost[] => {
    const obj = toClientPost(p as LeanPost)
    if (!obj) return []

    return [{
      id: obj.id,
      name: obj.name,
      category: obj.category,
      subcategory: obj.subcategory,
      status: obj.status || "pending",
      ownerEmail:
        (p.ownerId && typeof p.ownerId === "object" && "email" in p.ownerId && p.ownerId.email) ||
        p.seller_info?.email ||
        "",
    }]
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Posts</h1>

      <nav className="flex flex-wrap gap-2" aria-label="Filter posts by status">
        {TABS.map((t) => {
          const n = t === "all" ? total : counts[t] ?? 0
          const current = t === tab
          return (
            <Link
              key={t}
              href={`/bo/posts?status=${t}`}
              aria-current={current ? "page" : undefined}
              className={`rounded-full border px-3 py-1 text-sm ${
                current ? "bg-slate-900 text-white border-slate-900" : "bg-white hover:bg-slate-100"
              }`}
            >
              {TAB_LABELS[t]}{" "}
              <span
                className={
                  t === "pending" && n > 0 && !current
                    ? "ml-1 rounded-full bg-amber-500 px-1.5 text-white"
                    : "ml-1 opacity-70"
                }
              >
                {n}
              </span>
            </Link>
          )
        })}
      </nav>

      {tab === "pending" && data.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing waiting for approval.</p>
      ) : (
        <BoPostsClient data={data} />
      )}
    </div>
  )
}
