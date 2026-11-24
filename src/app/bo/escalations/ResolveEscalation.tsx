"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { resolveEscalation } from "@/app/bo/actions/escalations"

export default function ResolveEscalation({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [error, setError] = useState("")
  const [pending, start] = useTransition()
  const router = useRouter()

  if (!open) {
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Resolve…
      </Button>
    )
  }

  return (
    <div className="space-y-2 min-w-64">
      <Textarea
        value={text}
        maxLength={500}
        onChange={(e) => setText(e.target.value)}
        placeholder="What you decided and did, e.g. Suspended the ad and the seller: fake payment scam"
      />
      <div className="flex gap-2 justify-end">
        <Button
          size="sm"
          disabled={pending || text.trim().length < 5}
          onClick={() =>
            start(async () => {
              const res = await resolveEscalation(id, text)
              if (!res.ok) return setError(res.error)
              router.refresh()
            })
          }
        >
          Mark resolved
        </Button>
        <Button size="sm" variant="ghost" disabled={pending} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
