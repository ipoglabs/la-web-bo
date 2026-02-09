import connectDB from "@/config/database"
import "@/models/user"
import Post from "@/models/post"
import { toClientPost } from "@/lib/serialize"
import { BoPost } from "./columns"
import BoPostsClient from "./BoPostsClient"

export default async function BoPostsPage() {
  await connectDB()

  const posts = await Post.find()
    .sort({ updatedAt: -1 })
    .populate("ownerId", "email")
    .lean()

  const data: BoPost[] = posts.map((p: any) => {
    const obj = toClientPost(p)

    return {
      id: obj.id,
      name: obj.name,
      category: obj.category,
      subcategory: obj.subcategory,
      status: obj.status || "pending",
      ownerEmail:
        (p.ownerId && typeof p.ownerId === "object" && p.ownerId.email) ||
        p.seller_info?.email ||
        "",
    }
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Posts</h1>

      {/* ✅ Client component boundary */}
      <BoPostsClient data={data} />
    </div>
  )
}
