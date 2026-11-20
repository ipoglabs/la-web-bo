"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../components/data-table"
import { columns, BoPost } from "./columns"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { bulkUpdatePostStatus, type BulkResult } from "../actions/updatePostStatus"

type Mode = null | "approve" | "reject"
type Notice = { tone: "ok" | "warn" | "error"; lines: string[] }

const plural = (n: number, one: string, many = one + "s") => `${n} ${n === 1 ? one : many}`

function describe(res: BulkResult, verb: "Approved" | "Rejected", names: Map<string, string>): Notice {
  if (!res.ok) return { tone: "error", lines: [res.error] }
  const lines = [`${verb} ${plural(res.done, "ad")}.`]
  if (res.emails) {
    const e = res.emails
    lines.push(
      `Sellers emailed: ${e.sent}` +
        (e.notSent ? `; not emailed (no address, muted or account closed): ${e.notSent}` : "") +
        (e.failed ? `; email FAILED: ${e.failed} (reported; they still see the status under My Ads)` : "") +
        ".",
    )
  }
  for (const s of res.skipped) lines.push(`Skipped "${names.get(s.id) ?? s.id}": ${s.why}`)
  if (res.failed) lines.push(`${plural(res.failed, "ad")} failed with an error (reported). Try those again.`)
  const warn = res.skipped.length > 0 || res.failed > 0 || (res.emails?.failed ?? 0) > 0
  return { tone: warn ? "warn" : "ok", lines }
}

export default function BoPostsClient({ data, canModerate }: { data: BoPost[]; canModerate: boolean }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [picked, setPicked] = useState<Set<string>>(new Set())
  const [mode, setMode] = useState<Mode>(null)
  const [reason, setReason] = useState("")
  const [notice, setNotice] = useState<Notice | null>(null)

  // Only ads on the current page count; anything picked on another page or
  // already gone from this view (after refresh) is dropped automatically.
  const selected = data.filter((p) => picked.has(p.id))
  const allOnPage = data.length > 0 && selected.length === data.length

  const toggle = (id: string, on: boolean) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })

  const tableColumns = useMemo<ColumnDef<BoPost>[]>(() => {
    if (!canModerate) return columns
    const select: ColumnDef<BoPost> = {
      id: "select",
      enableHiding: false,
      header: () => (
        <Checkbox
          aria-label="Select all ads on this page"
          checked={allOnPage ? true : selected.length ? "indeterminate" : false}
          onCheckedChange={(v) => setPicked(v ? new Set(data.map((p) => p.id)) : new Set())}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          aria-label={`Select ${row.original.name}`}
          checked={picked.has(row.original.id)}
          onCheckedChange={(v) => toggle(row.original.id, !!v)}
        />
      ),
    }
    return [select, ...columns]
  }, [canModerate, allOnPage, selected.length, data, picked])

  const run = (status: "active" | "rejected") =>
    start(async () => {
      setNotice(null)
      const names = new Map(selected.map((p) => [p.id, p.name]))
      const res = await bulkUpdatePostStatus(selected.map((p) => p.id), status, reason)
      setNotice(describe(res, status === "active" ? "Approved" : "Rejected", names))
      if (res.ok) {
        setPicked(new Set())
        setMode(null)
        setReason("")
        router.refresh()
      }
    })

  const n = selected.length

  return (
    <div className="space-y-3">
      {canModerate && n > 0 && (
        <div className="sticky top-0 z-10 rounded-lg border bg-slate-50 p-3 space-y-3 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium mr-2">{plural(n, "ad")} selected</span>
            <Button size="sm" disabled={pending} onClick={() => setMode(mode === "approve" ? null : "approve")}>
              Approve selected…
            </Button>
            <Button size="sm" variant="destructive" disabled={pending} onClick={() => setMode(mode === "reject" ? null : "reject")}>
              Reject selected…
            </Button>
            <Button size="sm" variant="ghost" disabled={pending} onClick={() => { setPicked(new Set()); setMode(null) }}>
              Clear
            </Button>
          </div>

          {mode === "approve" && (
            <div className="space-y-2">
              <p className="text-sm">
                Approve {plural(n, "ad")}? {n === 1 ? "It goes" : "They go"} live on the site straight away. Only approve ads
                whose title and photo you have checked against the rules.
              </p>
              <div className="flex gap-2">
                <Button size="sm" disabled={pending} onClick={() => run("active")}>
                  {pending ? "Approving…" : `Yes, approve ${plural(n, "ad")}`}
                </Button>
                <Button size="sm" variant="outline" disabled={pending} onClick={() => setMode(null)}>Cancel</Button>
              </div>
            </div>
          )}

          {mode === "reject" && (
            <div className="space-y-2">
              <label htmlFor="bulk-reason" className="text-sm font-medium block">
                One reason for all {plural(n, "ad")}: emailed to each seller and shown under their My Ads
              </label>
              <Textarea
                id="bulk-reason"
                value={reason}
                maxLength={500}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Duplicate ad: you already have this item listed. Please keep one ad per item."
              />
              <div className="flex gap-2">
                <Button size="sm" variant="destructive" disabled={pending || reason.trim().length < 5} onClick={() => run("rejected")}>
                  {pending ? "Rejecting…" : `Reject ${plural(n, "ad")} and email sellers`}
                </Button>
                <Button size="sm" variant="outline" disabled={pending} onClick={() => setMode(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {notice && (
        <div
          role="status"
          className={`rounded-lg border p-3 text-sm space-y-1 ${
            notice.tone === "ok" ? "border-green-200 bg-green-50 text-green-800"
              : notice.tone === "warn" ? "border-amber-200 bg-amber-50 text-amber-900"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {notice.lines.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      )}

      <DataTable columns={tableColumns} data={data} serverPaged />
    </div>
  )
}
