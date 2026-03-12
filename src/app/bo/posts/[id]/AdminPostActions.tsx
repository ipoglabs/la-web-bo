"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTransition, useState } from "react"
import { updatePostStatus } from "../../actions/updatePostStatus"
import { reportPost } from "../../actions/reportPost"
import { clearPostReport } from "../../actions/clearPostReport"
import { suspendPost } from "../../actions/suspendPost"

const ALLOWED = ["super_admin", "admin", "moderator"]

export default function AdminPostActions({
  postId,
  status,
  role,
  reported,
  isSuspended,
}: {
  postId: string
  status: string
  role?: string
  reported: boolean
  isSuspended: boolean
}) {

  const [pending, start] = useTransition()
  const router = useRouter()

  const [localReported, setLocalReported] = useState(reported)

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

  const onReport = () => {

    if (localReported) return

    const reason = prompt("Report reason (optional):") || ""

    start(async () => {

      const res = await reportPost(postId, reason)

      if (!res?.ok) {
        alert(res?.error)
        return
      }

      setLocalReported(true)

      router.refresh()

    })
  }

  const onClearReport = () => {

    const ok = confirm("Clear report for this post?")
    if (!ok) return

    start(async () => {

      const res = await clearPostReport(postId)

      if (!res?.ok) {
        alert(res?.error)
        return
      }

      setLocalReported(false)

      router.refresh()

    })
  }

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
        onClick={() => act(() => updatePostStatus(postId, "expired"))}
      >
        Reject
      </Button>

      {!localReported && (
        <Button
          variant="default"
          disabled={pending}
          onClick={onReport}
        >
          {pending ? "Reporting..." : "Report"}
        </Button>
      )}

      {localReported && (
        <Button
          variant="outline"
          disabled={pending}
          onClick={onClearReport}
        >
          {pending ? "Saving..." : "Clear Report"}
        </Button>
      )}

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