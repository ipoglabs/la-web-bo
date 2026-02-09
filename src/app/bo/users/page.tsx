import connectDB from "@/config/database"
import User from "@/models/user"
import BoUsersClient from "./BoUsersClient"

export default async function BoUsersPage() {
  await connectDB()

  const users = await User.find()
    .select("firstName lastName email role createdAt")
    .sort({ createdAt: -1 })
    .lean()

  // ✅ serialize for client
  const data = users.map((u: any) => ({
    id: u._id.toString(),
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
  }))

  return (
    <BoUsersClient data={data} />
  )
}
