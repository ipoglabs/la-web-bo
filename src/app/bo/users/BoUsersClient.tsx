"use client"

import { columns } from "./columns"
import { DataTable } from "../components/data-table"

export default function BoUsersClient({ data }: { data: any[] }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
