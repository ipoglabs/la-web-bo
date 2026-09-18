import connectDB from "@/lib/db"
import "@/models/user"
import Post from "@/models/post"
import { toClientPost, type LeanPost } from "@/lib/serialize"
import { BoPost } from "./columns"
import BoPostsClient from "./BoPostsClient"
import type { Types } from "mongoose"

type PopulatedOwner = { _id: Types.ObjectId; email?: string };
type LeanPostWithOwner = Omit<LeanPost, "ownerId"> & {
  ownerId?: Types.ObjectId | PopulatedOwner;
};

export default async function BoPostsPage() {
  await connectDB()

  const posts = await Post.find()
    .sort({ updatedAt: -1 })
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

      {/* ✅ Client boundary */}
      <BoPostsClient data={data} />
    </div>
  )
}
