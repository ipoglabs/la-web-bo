"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { updatePostStatus } from "../../actions/updatePostStatus"

type PostSummary = {
  id: string
  name: string
  category: string
  status?: "active" | "off" | "expired" | "pending" | "rejected" | "closed" | "deleted"
}

export default function AdminUserAdCard({ post }: { post: PostSummary }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [status, setStatus] = useState(post.status)

  const [error, setError] = useState("")

  // Rejecting needs a reason for the seller (and emails them), so it happens
  // on the ad's own page, not here.
  const update = (next: "active" | "off") => {
    start(async () => {
      setError("")
      const res = await updatePostStatus(post.id, next)
      if (!res?.ok) return setError(res?.error || "Update failed")
      setStatus(next)
      router.refresh()
    })
  }

  return (
    <div className="border rounded-lg p-4 bg-white hover:bg-slate-50">
      <div className="font-medium">{post.name}</div>
      <div className="text-xs text-slate-500">{post.category}</div>

      <div className="mt-3 flex flex-wrap gap-2">
        {status !== "active" && (
          <Button size="sm" disabled={pending} onClick={() => update("active")}>
            Approve
          </Button>
        )}
        {status === "active" && (
          <Button size="sm" variant="outline" disabled={pending} onClick={() => update("off")}>
            Pause
          </Button>
        )}
        <Button size="sm" variant="outline" disabled={pending} onClick={() => router.push(`/bo/posts/${post.id}`)}>
          Review / reject…
        </Button>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}
