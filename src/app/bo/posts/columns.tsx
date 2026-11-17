"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { updatePostStatus } from "../actions/updatePostStatus"

export type BoPost = {
  id: string
  name: string
  category: string
  subcategory: string
  status: "active" | "off" | "expired" | "pending" | "rejected" | "closed" | "deleted"
  ownerEmail?: string
  thumb?: string
}

function ActionCell({ post }: { post: BoPost }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [error, setError] = useState("")

  const approve = () =>
    start(async () => {
      setError("")
      const res = await updatePostStatus(post.id, "active")
      if (res.ok) router.refresh()
      else setError(res.error || "Failed")
    })

  return (
    <div className="flex flex-wrap items-center gap-2">
      {post.status === "pending" && (
        <Button size="sm" disabled={pending} onClick={approve}>
          {pending ? "Approving…" : "Approve"}
        </Button>
      )}
      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/bo/posts/${post.id}`)}
      >
        {post.status === "pending" ? "Review" : "View"}
      </Button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}

export const columns: ColumnDef<BoPost>[] = [
  {
    accessorKey: "name",
    header: "Post",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <a
          href={`/bo/posts/${row.original.id}`}
          className="block size-14 shrink-0 overflow-hidden rounded-md border bg-slate-100"
          aria-label={`Open ${row.original.name}`}
        >
          {row.original.thumb ? (
            // eslint-disable-next-line @next/next/no-img-element -- external R2 URLs, admin-only page
            <img src={row.original.thumb} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <span className="flex h-full items-center justify-center text-[10px] text-muted-foreground">No photo</span>
          )}
        </a>
        <div className="space-y-0.5 min-w-0">
          <div className="font-medium">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.category} • {row.original.subcategory}
          </div>
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
