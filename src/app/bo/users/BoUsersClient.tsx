// src/app/bo/users/BoUsersClient.tsx
"use client"

import { DataTable } from "../components/data-table"
import { columns } from "./columns"

export default function BoUsersClient({ data }: { data: any[] }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
