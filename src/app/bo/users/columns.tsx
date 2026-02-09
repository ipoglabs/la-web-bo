"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type BoUser = {
  id: string          // ✅ use id, not _id
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: string
}

export const columns: ColumnDef<BoUser>[] = [
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const u = row.original
      return (
        <div className="font-medium">
          {u.firstName} {u.lastName}
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("role")}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Link
        href={`/bo/users/${row.original.id}`}   // ✅ FIXED
        className="text-sm text-primary hover:underline"
      >
        View Ads
      </Link>
    ),
  },
]
