"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { updatePostStatus } from "../../actions/updatePostStatus"
import { suspendPost, unsuspendPost } from "../../actions/suspendPost"

type SellerNotice = { sent: boolean; skipped?: string; failed?: string }
type ActionResult = { ok: boolean; error?: string; seller?: SellerNotice }

export default function AdminPostActions({
  postId,
  status,
  canModerate,
  canSuspend,
  isSuspended,
}: {
  postId: string
  status: string
  canModerate: boolean
  canSuspend: boolean
  isSuspended: boolean
}) {

  const [pending, start] = useTransition()
  const [error, setError] = useState("")
  const [rejecting, setRejecting] = useState(false)
  const [reason, setReason] = useState("")
  const [notice, setNotice] = useState<{ tone: "ok" | "warn"; text: string } | null>(null)
  const router = useRouter()

  if (!canModerate && !canSuspend) return null

  const act = (fn: () => Promise<ActionResult>, done = "Rejected") =>
    start(async () => {
      setError("")
      setNotice(null)
      const res = await fn()
      if (!res?.ok) {
        setError(res?.error || "Action failed")
        return
      }
      setRejecting(false)
      setReason("")
      if (res.seller) {
        setNotice(
          res.seller.sent
            ? { tone: "ok", text: done === "Approved" ? "Approved. The seller has been emailed that their ad is live." : "Rejected. The seller has been emailed the reason." }
            : res.seller.failed
              ? { tone: "warn", text: `${done}, but the seller could NOT be emailed (${res.seller.failed}). They'll still see the status under My Ads. This has been reported.` }
              : { tone: "warn", text: `${done}. No email sent: ${res.seller.skipped}. They'll see the status under My Ads.` },
        )
      }
      router.refresh()
    })

  const onSuspend = () => {
    const r = window.prompt("Suspend this ad? It goes offline and only an admin can bring it back.\n\nReason (saved to the audit log, min 5 characters):")
    if (r === null) return
    act(() => suspendPost(postId, r))
  }

  const onUnsuspend = () => {
    const r = window.prompt("Lift the suspension? The ad goes back to the status it had before it was suspended (live, if it was live).\n\nCheck the original reason in the audit log first. Why are you reversing it? (min 5 characters):")
    if (r === null) return
    act(() => unsuspendPost(postId, r))
  }

  return (
    <div className="bg-white p-5 rounded-xl border shadow space-y-3">

      {isSuspended && (
        <p className="text-sm font-medium text-red-700">
          Suspended by an admin — hidden from the site whatever its status.{" "}
          {canSuspend ? "Unsuspend it to restore it." : "Only an admin can restore it."}
        </p>
      )}

      {status === "pending" && !isSuspended && (
        <p className="text-sm font-medium text-amber-700">
          Waiting for approval — this ad is hidden from the site until approved.
        </p>
      )}

      <div className="flex flex-wrap gap-3">

        {canModerate && !isSuspended && status !== "active" && (
          <Button
            disabled={pending}
            onClick={() => act(() => updatePostStatus(postId, "active"), "Approved")}
          >
            Approve
          </Button>
        )}

        {canModerate && !isSuspended && status === "active" && (
          <Button
            variant="outline"
            disabled={pending}
            onClick={() => act(() => updatePostStatus(postId, "off"))}
          >
            Pause
          </Button>
        )}

        {canModerate && !isSuspended && status !== "rejected" && (
          <Button
            variant="destructive"
            disabled={pending}
            onClick={() => setRejecting((v) => !v)}
          >
            Reject…
          </Button>
        )}

        {canSuspend && !isSuspended && (
          <Button variant="destructive" disabled={pending} onClick={onSuspend}>
            Suspend
          </Button>
        )}

        {canSuspend && isSuspended && (
          <Button variant="outline" disabled={pending} onClick={onUnsuspend}>
            Unsuspend…
          </Button>
        )}

      </div>

      {rejecting && (
        <div className="space-y-2">
          <label htmlFor="reject-reason" className="text-sm font-medium">
            Reason (emailed to the seller and shown under their My Ads)
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
      {notice && (
        <p className={`text-sm ${notice.tone === "ok" ? "text-green-700" : "text-amber-700"}`}>{notice.text}</p>
      )}

    </div>
  )
}
