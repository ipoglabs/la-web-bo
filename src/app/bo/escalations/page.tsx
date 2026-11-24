import Link from "next/link"
import connectDB from "@/lib/db"
import Escalation from "@/models/escalation"
import AdReport from "@/models/adReport"
import { requireAdminPage } from "@/lib/adminGuard"
import { PAGE_SIZE, pageWindow, parsePage } from "@/lib/listQuery"
import { ListPager } from "../components/ListControls"
import ResolveEscalation from "./ResolveEscalation"

const TARGET_HREF = {
  post: (id: string) => `/bo/posts/${id}`,
  user: (id: string) => `/bo/users/${id}`,
  report: (ticket: string) => `/bo/reports/posts?status=all&q=${encodeURIComponent(ticket)}`,
} as const

const fmt = (d?: Date) => (d ? new Date(d).toLocaleString("en-GB") : "—")

export default async function EscalationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>
}) {
  await requireAdminPage("escalations.review", "/bo/escalations")
  const sp = await searchParams
  const status: "open" | "resolved" = sp.status === "resolved" ? "resolved" : "open"

  await connectDB()
  const filter = { status }
  const total = await Escalation.countDocuments(filter)
  const w = pageWindow(parsePage(sp.page), total)
  // Open: oldest first, so nothing waits forever. Resolved: newest first.
  const rows = await Escalation.find(filter)
    .sort(status === "open" ? { createdAt: 1, _id: 1 } : { resolvedAt: -1, _id: -1 })
    .skip(w.skip)
    .limit(PAGE_SIZE)
    .lean()

  // Report escalations link to the report by ticket.
  const reportIds = rows.filter((r) => r.targetType === "report").map((r) => r.targetId)
  const tickets = new Map(
    (reportIds.length ? await AdReport.find({ _id: { $in: reportIds } }).select("ticketId").lean() : []).map((r) => [
      String(r._id),
      r.ticketId,
    ]),
  )

  const tab = (s: "open" | "resolved", label: string) => (
    <Link
      href={`/bo/escalations?status=${s}`}
      className={`px-3 py-1.5 rounded-md text-sm ${status === s ? "bg-slate-900 text-white" : "bg-white border"}`}
    >
      {label}
    </Link>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Escalations</h1>
        <p className="text-sm text-muted-foreground">
          Cases Moderators and Support handed to the admins. Take the action on the ad or user page as usual, then
          resolve here with what you decided. Work oldest first.
        </p>
      </div>

      <div className="flex gap-2">
        {tab("open", "Open")}
        {tab("resolved", "Resolved")}
      </div>

      <div className="bg-white rounded-xl border shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b">
            <tr>
              <th className="p-3 text-left">Escalated</th>
              <th className="p-3 text-left">About</th>
              <th className="p-3 text-left">Note</th>
              <th className="p-3 text-right">{status === "open" ? "Action" : "Resolution"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const href =
                r.targetType === "report"
                  ? tickets.get(r.targetId) && TARGET_HREF.report(tickets.get(r.targetId)!)
                  : TARGET_HREF[r.targetType](r.targetId)
              return (
                <tr key={String(r._id)} className="border-b align-top">
                  <td className="p-3 whitespace-nowrap">
                    {fmt(r.createdAt)}
                    <div className="text-xs text-muted-foreground">
                      {r.createdByEmail} ({r.createdByRole})
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-xs uppercase text-muted-foreground mr-1">{r.targetType}</span>
                    {href ? (
                      <Link href={href} className="text-blue-600 underline">
                        {r.targetLabel || r.targetId}
                      </Link>
                    ) : (
                      r.targetLabel || r.targetId
                    )}
                  </td>
                  <td className="p-3 max-w-md whitespace-pre-wrap">{r.note}</td>
                  <td className="p-3 text-right">
                    {status === "open" ? (
                      <ResolveEscalation id={String(r._id)} />
                    ) : (
                      <div className="text-left max-w-xs ml-auto">
                        <div className="whitespace-pre-wrap">{r.resolution}</div>
                        <div className="text-xs text-muted-foreground">
                          {r.resolvedByEmail} · {fmt(r.resolvedAt)}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground">
                  {status === "open" ? "Nothing escalated right now." : "No resolved escalations yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ListPager basePath="/bo/escalations" params={{ status }} page={w.current} pages={w.pages} from={w.from} to={w.to} total={total} />
    </div>
  )
}
