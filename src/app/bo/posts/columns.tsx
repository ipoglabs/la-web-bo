"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export type BoPost = {
  id: string
  name: string
  category: string
  subcategory: string
  status: "active" | "off" | "expired" | "pending" | "rejected" | "closed" | "deleted"
  ownerEmail?: string
}

function ActionCell({ post }: { post: BoPost }) {
  const router = useRouter()

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => router.push(`/bo/posts/${post.id}`)}
    >
      View
    </Button>
  )
}

export const columns: ColumnDef<BoPost>[] = [
  {
    accessorKey: "name",
    header: "Post",
    cell: ({ row }) => (
      <div className="space-y-0.5">
        <div className="font-medium">{row.original.name}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.category} • {row.original.subcategory}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "ownerEmail",
    header: "User",
    cell: ({ row }) => row.original.ownerEmail || "-",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="capitalize font-medium">
        {row.original.status}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionCell post={row.original} />,
  },
]
