"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { updatePostStatus } from "../../actions/updatePostStatus"
import { suspendPost } from "../../actions/suspendPost"

const ALLOWED = ["super_admin", "admin", "moderator"]

type ActionResult = { ok: boolean; error?: string }

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
  const [error, setError] = useState("")
  const [rejecting, setRejecting] = useState(false)
  const [reason, setReason] = useState("")
  const router = useRouter()

  if (!role || !ALLOWED.includes(role)) return null

  const act = (fn: () => Promise<ActionResult>) =>
    start(async () => {
      setError("")
      const res = await fn()
      if (!res?.ok) {
        setError(res?.error || "Action failed")
        return
      }
      setRejecting(false)
      setReason("")
      router.refresh()
    })

  return (
    <div className="bg-white p-5 rounded-xl border shadow space-y-3">

      {status === "pending" && (
        <p className="text-sm font-medium text-amber-700">
          Waiting for approval — this ad is hidden from the site until approved.
        </p>
      )}

      <div className="flex flex-wrap gap-3">

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

        {status !== "rejected" && (
          <Button
            variant="destructive"
            disabled={pending}
            onClick={() => setRejecting((v) => !v)}
          >
            Reject…
          </Button>
        )}

        {role !== "moderator" && (
          <Button
            variant="destructive"
            disabled={pending || isSuspended}
            onClick={() => act(() => suspendPost(postId))}
          >
            {isSuspended ? "Suspended" : "Suspend"}
          </Button>
        )}

      </div>

      {rejecting && (
        <div className="space-y-2">
          <label htmlFor="reject-reason" className="text-sm font-medium">
            Reason (shown to the seller)
          </label>
          <Textarea
            id="reject-reason"
            value={reason}
            maxLength={500}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Photos don't match the item described"
          />
          <div className="flex gap-2">
            <Button
              variant="destructive"
              disabled={pending || !reason.trim()}
              onClick={() => act(() => updatePostStatus(postId, "rejected", reason))}
            >
              Confirm reject
            </Button>
            <Button variant="outline" disabled={pending} onClick={() => setRejecting(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

    </div>
  )
}
