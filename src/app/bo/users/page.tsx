// src/app/bo/users/page.tsx (SERVER)
import connectDB from "@/lib/db"
import User from "@/models/user"
import BoUsersClient from "./BoUsersClient"

export default async function BoUsersPage() {
  await connectDB()

  const users = await User.find()
    .select("fullName email publicRole createdAt")
    .sort({ createdAt: -1 })
    .lean()

  // 🚨 serialize for client
  const data = users.map((u: any) => ({
    id: u._id.toString(),
    fullName: u.fullName,
    email: u.email,
    publicRole: u.publicRole,
    createdAt: u.createdAt.toISOString(),
  }))

  return <BoUsersClient data={data} />
}
