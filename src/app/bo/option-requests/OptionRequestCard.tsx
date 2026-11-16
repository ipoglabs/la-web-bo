"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addOptionRequest, dismissOptionRequest } from "../actions/optionRequests"

type Request = {
  id: string
  category: string
  subcategory: string
  country: string
  fieldLabel: string
  value: string
  postCount: number
  createdAt: string
}

export default function OptionRequestCard({ request: r, canReview }: { request: Request; canReview: boolean }) {
  const [label, setLabel] = useState(r.value)
  const [error, setError] = useState("")
  const [pending, start] = useTransition()
  const router = useRouter()

  const run = (fn: () => Promise<{ ok: true } | { ok: false; error: string }>) =>
    start(async () => {
      setError("")
      const res = await fn()
      if (res.ok) router.refresh()
      else setError(res.error)
    })

  return (
    <div className="bg-white p-4 rounded-xl border shadow flex flex-col gap-3 md:flex-row md:items-end">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">
            {r.fieldLabel}: &ldquo;{r.value}&rdquo;
          </p>
          <span className="rounded-full bg-slate-100 px-2 text-xs">{r.country}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {r.category} › {r.subcategory} · used in {r.postCount} {r.postCount === 1 ? "post" : "posts"} · first{" "}
          {new Date(r.createdAt).toLocaleDateString()}
        </p>
        {canReview && (
          <>
            <label htmlFor={`option-${r.id}`} className="mt-2 block text-sm font-medium">
              Add as
            </label>
            <Input
              id={`option-${r.id}`}
              value={label}
              maxLength={40}
              onChange={(e) => setLabel(e.target.value)}
              className="mt-1 max-w-xs"
            />
          </>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      {canReview && (
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" disabled={pending} onClick={() => run(() => dismissOptionRequest(r.id))}>
            Dismiss
          </Button>
          <Button size="sm" disabled={pending || !label.trim()} onClick={() => run(() => addOptionRequest(r.id, label))}>
            Add to form
          </Button>
        </div>
      )}
    </div>
  )
}
