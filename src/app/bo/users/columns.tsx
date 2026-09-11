"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type BoUser = {
  id: string          // ✅ use id, not _id
  fullName: string
  email: string
  publicRole: string
  createdAt: string
}

export const columns: ColumnDef<BoUser>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.fullName}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "publicRole",
    header: "Role",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("publicRole")}</span>
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
