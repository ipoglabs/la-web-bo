import connectDB from "@/config/database"
import Post from "@/models/post"
import User from "@/models/user"
import ReportPostConversation from "@/models/reportPostConversation"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Types } from "mongoose"
import AdminPostActions from "./AdminPostActions"
import ReportPostChatPanel from "./ReportPostChatPanel"
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

  const fraudScore = post.reports?.length || 0

  const owner = post.ownerId
    ? await User.findById(post.ownerId).lean()
    : null

  const conversation = await ReportPostConversation
    .findOne({ postId: new Types.ObjectId(id) })
    .lean()

  const messages = (conversation?.messages || []).map((m: any) => ({
    id: m._id.toString(),
    sender: m.senderEmail,
    text: m.text,
    at: m.createdAt,
  }))

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

              {post.reported && (
                <span className="ml-3 text-red-600 font-medium">
                  ⚠ Reported
                </span>
              )}

              {fraudScore > 0 && (
                <span className="ml-3 text-orange-600">
                  Fraud Score: {fraudScore}
                </span>
              )}

            </div>

          </div>

          <div className="bg-white p-5 rounded-xl border shadow">

            <h2 className="font-semibold mb-2">Posted By</h2>

            {owner ? (
              <div className="text-sm">
                {owner.firstName} {owner.lastName} — {owner.email}
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
  reported={!!post.reported}
  isSuspended={!!post.isSuspended}
/>

        </div>

        {/* RIGHT SIDE CHAT */}

        <ReportPostChatPanel
          postId={id}
          postTitle={post.name}
          messages={messages}
        />

      </div>

    </div>

  )
}