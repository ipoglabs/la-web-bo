// src/app/bo/users/page.tsx (SERVER)
import connectDB from "@/lib/db"
import User from "@/models/user"
import BoUsersClient from "./BoUsersClient"
import { requireAdminPage } from "@/lib/adminGuard"
import { PAGE_SIZE, pageWindow, parsePage, searchFilter } from "@/lib/listQuery"
import { ListPager, ListSearch } from "../components/ListControls"

type Search = { q?: string; page?: string }

export default async function BoUsersPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireAdminPage("users.view", "/bo/users")
  const sp = await searchParams
  await connectDB()

  const filter = searchFilter(sp.q, ["fullName", "email", "primaryNumber"])
  const total = await User.countDocuments(filter)
  const w = pageWindow(parsePage(sp.page), total)

  const users = await User.find(filter)
    .select("fullName email publicRole createdAt")
    .sort({ createdAt: -1, _id: -1 })
    .skip(w.skip)
    .limit(PAGE_SIZE)
    .lean()

  // 🚨 serialize for client
  const data = users.map((u) => ({
    id: u._id.toString(),
    fullName: u.fullName,
    email: u.email ?? "",
    publicRole: u.publicRole,
    createdAt: (u.createdAt ?? new Date(0)).toISOString(),
  }))

  const params = { q: sp.q }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <ListSearch basePath="/bo/users" params={params} placeholder="Search name, email or phone" />
      <BoUsersClient data={data} />
      <ListPager basePath="/bo/users" params={params} page={w.current} pages={w.pages} from={w.from} to={w.to} total={total} />
    </div>
  )
}
