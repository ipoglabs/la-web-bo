"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createEscalation } from "@/app/bo/actions/escalations"
import type { EscalationTarget } from "@/models/escalation"

/** "Escalate to an Admin" with a note, for Moderators and Support. */
export default function EscalateButton({
  targetType,
  targetId,
  size = "sm",
}: {
  targetType: EscalationTarget
  targetId: string
  size?: "sm" | "default"
}) {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState("")
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, start] = useTransition()
  const router = useRouter()

  const submit = () =>
    start(async () => {
      const res = await createEscalation(targetType, targetId, note)
      if (!res.ok) {
        setMsg({ ok: false, text: res.error })
        return
      }
      setMsg({ ok: true, text: "Escalated. The admins will pick it up from Escalations." })
      setOpen(false)
      setNote("")
      router.refresh()
    })

  return (
    <div className="space-y-2 text-left">
      {!open && (
        <Button size={size} variant="outline" disabled={pending} onClick={() => { setOpen(true); setMsg(null) }}>
          Escalate to Admin…
        </Button>
      )}
      {open && (
        <div className="space-y-2 rounded-md border bg-amber-50/50 p-3">
          <label className="text-sm font-medium" htmlFor={`esc-${targetId}`}>
            What should the admins look at? (internal, not shown to the user)
          </label>
          <Textarea
            id={`esc-${targetId}`}
            value={note}
            maxLength={500}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Asks buyers to pay by gift card before viewing — looks like a scam"
          />
          <div className="flex gap-2">
            <Button size="sm" disabled={pending || note.trim().length < 5} onClick={submit}>
              Escalate
            </Button>
            <Button size="sm" variant="ghost" disabled={pending} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {msg && <p className={`text-sm ${msg.ok ? "text-green-700" : "text-red-600"}`}>{msg.text}</p>}
    </div>
  )
}
