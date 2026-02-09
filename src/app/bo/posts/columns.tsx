"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { updatePostStatus } from "../actions/updatePostStatus"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export type BoPost = {
  id: string
  name: string
  category: string
  subcategory: string
  status: "active" | "off" | "expired" | "pending"
  ownerEmail?: string
}

function ActionCell({ post }: { post: BoPost }) {
  const [pending, start] = useTransition()
  const router = useRouter()

  const update = (status: "active" | "off" | "expired") => {
    start(async () => {
      const res = await updatePostStatus(post.id, status)
      if (!res?.ok) {
        alert(res?.error || "Update failed")
        return
      }
      router.refresh()
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* 👁 View */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/bo/posts/${post.id}`)}
      >
        View
      </Button>

      {/* ✅ Approve */}
      {post.status !== "active" && (
        <Button
          size="sm"
          disabled={pending}
          onClick={() => update("active")}
        >
          {pending ? "Saving…" : "Approve"}
        </Button>
      )}

      {/* ⏸ Pause */}
      {post.status === "active" && (
        <Button
          size="sm"
          variant="outline"
          disabled={pending}
          onClick={() => update("off")}
        >
          {pending ? "Saving…" : "Pause"}
        </Button>
      )}

      {/* ❌ Reject */}
      <Button
        size="sm"
        variant="destructive"
        disabled={pending}
        onClick={() => update("expired")}
      >
        {pending ? "Saving…" : "Reject"}
      </Button>
    </div>
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
