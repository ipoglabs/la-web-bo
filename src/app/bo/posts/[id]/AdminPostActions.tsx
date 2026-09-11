"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { updatePostStatus } from "../../actions/updatePostStatus"
import { suspendPost } from "../../actions/suspendPost"

const ALLOWED = ["super_admin", "admin", "moderator"]

export default function AdminPostActions({
  postId,
  status,
  role,
  isSuspended,
}: {
  postId: string
  status: string
  role?: string
  isSuspended: boolean
}) {

  const [pending, start] = useTransition()
  const router = useRouter()

  if (!role || !ALLOWED.includes(role)) return null

  const act = (fn: () => Promise<any>) =>
    start(async () => {
      const res = await fn()
      if (!res?.ok) {
        alert(res?.error || "Action failed")
        return
      }
      router.refresh()
    })

  return (
    <div className="bg-white p-5 rounded-xl border shadow flex flex-wrap gap-3">

      {status !== "active" && (
        <Button
          disabled={pending}
          onClick={() => act(() => updatePostStatus(postId, "active"))}
        >
          Approve
        </Button>
      )}

      {status === "active" && (
        <Button
          variant="outline"
          disabled={pending}
          onClick={() => act(() => updatePostStatus(postId, "off"))}
        >
          Pause
        </Button>
      )}

      <Button
        variant="destructive"
        disabled={pending}
        onClick={() => act(() => updatePostStatus(postId, "rejected"))}
      >
        Reject
      </Button>

      <Button
        variant="destructive"
        disabled={pending || isSuspended}
        onClick={() => act(() => suspendPost(postId))}
      >
        {isSuspended ? "Suspended" : "Suspend"}
      </Button>

    </div>
  )
}
