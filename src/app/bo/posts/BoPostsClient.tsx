"use client"

import { DataTable } from "../components/data-table"
import { columns, BoPost } from "./columns"

export default function BoPostsClient({ data }: { data: BoPost[] }) {
  return <DataTable columns={columns} data={data} />
}
