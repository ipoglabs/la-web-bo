// src/app/bo/users/BoUsersClient.tsx
"use client"

import { DataTable } from "../components/data-table"
import { columns, type BoUser } from "./columns"

export default function BoUsersClient({ data }: { data: BoUser[] }) {
  return <DataTable columns={columns} data={data} serverPaged />
}
