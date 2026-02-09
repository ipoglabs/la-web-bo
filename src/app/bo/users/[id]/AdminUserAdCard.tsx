"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { updatePostStatus } from "../../actions/updatePostStatus"

export default function AdminUserAdCard({ post }: { post: any }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [status, setStatus] = useState(post.status)

  const update = (next: "active" | "off" | "expired") => {
    start(async () => {
      const res = await updatePostStatus(post.id, next)
      if (!res?.ok) return alert("Update failed")
      setStatus(next)
      router.refresh()
    })
  }

  return (
    <div className="border rounded-lg p-4 bg-white hover:bg-slate-50">
      <div className="font-medium">{post.name}</div>
      <div className="text-xs text-slate-500">{post.category}</div>

      <div className="mt-3 flex gap-2">
        {status !== "active" && (
          <Button size="sm" onClick={() => update("active")}>
            Approve
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={() => update("off")}>
          Pause
        </Button>
        <Button size="sm" variant="destructive" onClick={() => update("expired")}>
          Reject
        </Button>
      </div>
    </div>
  )
}
