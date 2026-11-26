"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { reviewAdReport, type AdAction } from "../../actions/reviewAdReport"

type Decision = "reviewed" | "actioned" | "dismissed"

const DECISION_LABEL: Record<Decision, string> = {
  reviewed: "Mark reviewed (still open)",
  actioned: "Actioned: the ad broke the rules",
  dismissed: "Dismiss: the report was unfounded",
}

export default function ReviewReportButtons({
  reportId,
  status,
  adLive,
  adExists,
  canModerate,
  canSuspend,
}: {
  reportId: string
  status: string
  /** The ad is publicly visible right now. */
  adLive: boolean
  adExists: boolean
  canModerate: boolean
  canSuspend: boolean
}) {
  const [pending, start] = useTransition()
  const [open, setOpen] = useState(false)
  const [decision, setDecision] = useState<Decision>("actioned")
  const [adAction, setAdAction] = useState<AdAction | "">("")
  const [note, setNote] = useState("")
  const [sellerReason, setSellerReason] = useState("")
  const [error, setError] = useState("")
  const [done, setDone] = useState("")
  const router = useRouter()

  if (status === "actioned" || status === "dismissed") {
    return <span className="text-xs text-muted-foreground">Closed</span>
  }

  const actions: { value: AdAction; label: string; show: boolean }[] = [
    { value: "reject", label: "Reject the ad (seller gets your reason)", show: adExists && canModerate },
    { value: "pause", label: "Freeze the ad", show: adExists && canModerate },
    { value: "suspend", label: "Suspend the ad (serious: scam, illegal, dangerous)", show: adExists && canSuspend },
    { value: "handled", label: adLive ? "Already handled (not possible: the ad is live)" : "Already handled (the ad isn't live)", show: true },
  ]

  const ready =
    note.trim().length >= 5 &&
    (decision !== "actioned" ||
      (adAction !== "" && !(adAction === "handled" && adLive) && !(adAction === "reject" && sellerReason.trim().length < 5)))

  const submit = () =>
    start(async () => {
      setError("")
      const res = await reviewAdReport(reportId, decision, note, {
        adAction: decision === "actioned" && adAction ? adAction : undefined,
        sellerReason,
      })
      if (!res.ok) {
        setError(res.error)
        return
      }
      setDone(
        [
          "Saved.",
          res.seller,
          res.closedAlso ? `${res.closedAlso} other open report(s) on this ad closed too.` : "",
          res.email,
        ]
          .filter(Boolean)
          .join(" "),
      )
      setOpen(false)
      router.refresh()
    })

  if (!open) {
    return (
      <div className="flex flex-col items-end gap-1.5">
        <Button size="sm" variant="outline" disabled={pending} onClick={() => setOpen(true)}>
          Review…
        </Button>
        {done && <p className="text-xs text-green-700 max-w-56 text-right">{done}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-3 text-left w-80 ml-auto rounded-md border bg-slate-50 p-3">
      <fieldset className="space-y-1">
        {(Object.keys(DECISION_LABEL) as Decision[])
          .filter((d) => !(d === "reviewed" && status === "reviewed"))
          .map((d) => (
            <label key={d} className="flex items-center gap-2 text-sm">
              <input type="radio" name={`d-${reportId}`} checked={decision === d} onChange={() => setDecision(d)} />
              {DECISION_LABEL[d]}
            </label>
          ))}
      </fieldset>

      {decision === "actioned" && (
        <fieldset className="space-y-1 border-t pt-2">
          <legend className="text-xs font-medium text-muted-foreground">What happens to the ad?</legend>
          {actions
            .filter((a) => a.show)
            .map((a) => (
              <label key={a.value} className={`flex items-center gap-2 text-sm ${a.value === "handled" && adLive ? "text-muted-foreground" : ""}`}>
                <input
                  type="radio"
                  name={`a-${reportId}`}
                  disabled={a.value === "handled" && adLive}
                  checked={adAction === a.value}
                  onChange={() => setAdAction(a.value)}
                />
                {a.label}
              </label>
            ))}
          {!canSuspend && (
            <p className="text-xs text-muted-foreground">Needs suspending (scam, illegal, dangerous)? Escalate it to an Admin instead.</p>
          )}
        </fieldset>
      )}

      {decision === "actioned" && adAction === "reject" && (
        <div className="space-y-1">
          <label className="text-xs font-medium" htmlFor={`sr-${reportId}`}>Reason for the seller (emailed to them)</label>
          <Textarea id={`sr-${reportId}`} value={sellerReason} maxLength={500} onChange={(e) => setSellerReason(e.target.value)} />
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-medium" htmlFor={`n-${reportId}`}>Internal note (audit log, required)</label>
        <Textarea
          id={`n-${reportId}`}
          value={note}
          maxLength={500}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What you checked and found"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button size="sm" disabled={pending || !ready} onClick={submit}>
          Save
        </Button>
        <Button size="sm" variant="ghost" disabled={pending} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
