import { cookies } from "next/headers"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import connectDB from "@/config/database"
import User from "@/models/user"
import AdminUser from "@/models/adminUser"
import ReportConversation from "@/models/reportConversation"
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth"
import { Types } from "mongoose"
import ReportUserChatPanel from "./ReportUserChatPanel"

export default async function ReportUserDetails({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const token = (await cookies()).get(ADMIN_COOKIE)?.value || ""
  const session = token ? verifyAdminJwt(token) : null

  if (!session || !["super_admin", "admin"].includes(session.role)) {
    redirect("/bo")
  }

  await connectDB()

  AdminUser

  const user = await User.findById(id)
    .populate({
      path: "reports.by",
      model: "AdminUser",
      select: "email role"
    })
    .lean()

  if (!user) return notFound()

  const reports = (user.reports || []).map((r: any) => ({

    reason: r.reason || "",
    at: r.at ? new Date(r.at).toLocaleString("en-GB") : "",
    by: r.by ? r.by.email : "Admin"

  }))

  const conversation = await ReportConversation
    .findOne({ userId: new Types.ObjectId(id) })
    .lean()

  const messages = (conversation?.messages || []).map((m: any) => ({

    id: m._id.toString(),
    sender: m.senderEmail,
    text: m.text,
    at: m.createdAt

  }))

  const safeUser = {

    id: user._id.toString(),
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    primaryNumber: user.primaryNumber || "",
    accountStatus: user.accountStatus || ""

  }

  return (

    <div className="space-y-6">

      <Link
        href="/bo/reports/users"
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to Reported Users
      </Link>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 space-y-6">

          <div className="bg-white rounded-xl border shadow p-6">

            <h1 className="text-2xl font-semibold">
              {safeUser.firstName} {safeUser.lastName}
            </h1>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">

              <p><b>Email:</b> {safeUser.email}</p>
              <p><b>Phone:</b> {safeUser.primaryNumber}</p>
              <p><b>Status:</b> {safeUser.accountStatus}</p>
              <p><b>Total Reports:</b> {reports.length}</p>

            </div>

          </div>

          <div className="bg-white rounded-xl border shadow p-6">

            <h2 className="font-semibold mb-4">
              Report History
            </h2>

            {reports.map((r: any, i: number) => (

              <div
                key={i}
                className="border rounded-lg p-3 bg-gray-50 text-sm mb-3"
              >

                <div className="font-medium text-red-600">
                  {r.reason}
                </div>

                <div className="text-gray-500 text-xs">
                  Reported by: {r.by}
                </div>

                <div className="text-gray-400 text-xs">
                  {r.at}
                </div>

              </div>

            ))}

          </div>

        </div>

        <div>

          <ReportUserChatPanel
            userId={safeUser.id}
            userName={`${safeUser.firstName} ${safeUser.lastName}`}
            messages={messages}
          />

        </div>

      </div>

    </div>

  )

}