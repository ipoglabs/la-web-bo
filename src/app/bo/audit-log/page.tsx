import Link from "next/link"
import { Types, type QueryFilter } from "mongoose"
import connectDB from "@/lib/db"
import AdminAuditLog, { AUDIT_ACTIONS, type IAdminAuditLog } from "@/models/adminAuditLog"
import { requireAdminPage } from "@/lib/adminGuard"

const PAGE_SIZE = 50

const ACTION_TONE: Record<string, string> = {
  "auth.login_failed": "text-amber-700 bg-amber-50",
  "auth.locked": "text-red-700 bg-red-50",
  "user.delete": "text-red-700 bg-red-50",
  "user.suspend": "text-red-700 bg-red-50",
  "post.suspend": "text-red-700 bg-red-50",
  "staff.deactivate": "text-red-700 bg-red-50",
  "staff.role_change": "text-violet-700 bg-violet-50",
  "staff.create": "text-violet-700 bg-violet-50",
  "devtools.view_conversation": "text-sky-700 bg-sky-50",
  "devtools.view_deleted_user": "text-sky-700 bg-sky-50",
  "devtools.view_user": "text-sky-700 bg-sky-50",
}

const TARGET_LINK: Record<string, (id: string) => string> = {
  user: (id) => `/bo/users/${id}`,
  post: (id) => `/bo/posts/${id}`,
  admin: (id) => `/bo/employees/${id}`,
}

type Search = { action?: string; actor?: string; target?: string; q?: string; page?: string }

export default async function AuditLogPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireAdminPage("audit.view", "/bo/audit-log")
  const sp = await searchParams

  const filter: QueryFilter<IAdminAuditLog> = {}
  if (sp.action) {
    if ((AUDIT_ACTIONS as readonly string[]).includes(sp.action)) filter.action = sp.action
    else if (/^[a-z]+$/.test(sp.action)) filter.action = { $regex: `^${sp.action}\\.` }
  }
  if (sp.actor && Types.ObjectId.isValid(sp.actor)) filter.actorId = new Types.ObjectId(sp.actor)
  if (sp.target) filter.targetId = sp.target.trim()
  if (sp.q) {
    const q = sp.q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&").slice(0, 100)
    filter.$or = [
      { actorEmail: { $regex: q, $options: "i" } },
      { targetLabel: { $regex: q, $options: "i" } },
      { reason: { $regex: q, $options: "i" } },
    ]
  }

  const page = Math.max(1, Number.parseInt(sp.page || "1", 10) || 1)

  await connectDB()
  const [rows, total] = await Promise.all([
    AdminAuditLog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    AdminAuditLog.countDocuments(filter),
  ])

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const qs = (p: number) => {
    const u = new URLSearchParams()
    for (const [k, v] of Object.entries(sp)) if (v && k !== "page") u.set(k, v)
    u.set("page", String(p))
    return `/bo/audit-log?${u}`
  }

  const groups = [...new Set(AUDIT_ACTIONS.map((a) => a.split(".")[0]))]

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Audit log</h1>
        <p className="text-sm text-muted-foreground">
          Every sign-in and every back-office action, newest first. Entries can&apos;t be edited or deleted.
        </p>
      </div>

      <form className="flex flex-wrap gap-2 items-end bg-white border rounded-xl p-3" method="get">
        <label className="text-xs space-y-1">
          <div className="text-muted-foreground">Action</div>
          <select name="action" defaultValue={sp.action || ""} className="border rounded h-9 px-2 text-sm">
            <option value="">All</option>
            {groups.map((g) => (
              <optgroup key={g} label={g}>
                <option value={g}>All {g}.*</option>
                {AUDIT_ACTIONS.filter((a) => a.startsWith(g + ".")).map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label className="text-xs space-y-1">
          <div className="text-muted-foreground">Search (email, target, reason)</div>
          <input name="q" defaultValue={sp.q || ""} className="border rounded h-9 px-2 text-sm w-64" />
        </label>
        <label className="text-xs space-y-1">
          <div className="text-muted-foreground">Target ID</div>
          <input name="target" defaultValue={sp.target || ""} className="border rounded h-9 px-2 text-sm w-56 font-mono" />
        </label>
        {sp.actor && <input type="hidden" name="actor" value={sp.actor} />}
        <button className="h-9 rounded bg-blue-600 px-3 text-sm text-white">Filter</button>
        <Link href="/bo/audit-log" className="h-9 leading-9 text-sm text-blue-600 underline">
          Clear
        </Link>
        <span className="ml-auto text-xs text-muted-foreground">{total.toLocaleString()} entries</span>
      </form>

      <div className="bg-white rounded-xl border shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted text-left">
            <tr>
              <th className="p-3">When</th>
              <th className="p-3">Who</th>
              <th className="p-3">Action</th>
              <th className="p-3">Target</th>
              <th className="p-3">Reason / details</th>
              <th className="p-3">IP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const link = r.targetId && TARGET_LINK[r.targetType]?.(r.targetId)
              const meta = r.meta && Object.keys(r.meta).length ? r.meta : null
              return (
                <tr key={String(r._id)} className="border-b align-top">
                  <td className="p-3 whitespace-nowrap text-xs">
                    {new Date(r.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "medium" })}
                  </td>
                  <td className="p-3">
                    {r.actorId ? (
                      <Link href={`/bo/audit-log?actor=${r.actorId}`} className="hover:underline">
                        {r.actorEmail}
                      </Link>
                    ) : (
                      r.actorEmail
                    )}
                    {r.actorRole && <div className="text-xs text-muted-foreground">{r.actorRole}</div>}
                  </td>
                  <td className="p-3">
                    <span className={`rounded px-1.5 py-0.5 font-mono text-xs ${ACTION_TONE[r.action] ?? "bg-slate-100"}`}>
                      {r.action}
                    </span>
                  </td>
                  <td className="p-3">
                    {link ? (
                      <Link href={link} className="text-blue-600 hover:underline">
                        {r.targetLabel || r.targetId}
                      </Link>
                    ) : (
                      r.targetLabel || r.targetId || "—"
                    )}
                  </td>
                  <td className="p-3 max-w-xs">
                    {r.reason && <div className="italic">“{r.reason}”</div>}
                    {meta && (
                      <div className="text-xs text-muted-foreground font-mono break-all">
                        {Object.entries(meta)
                          .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`)
                          .join(" · ")}
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-xs font-mono">{r.ip || "—"}</td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">
                  No entries match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center gap-3 text-sm">
          {page > 1 && (
            <Link href={qs(page - 1)} className="text-blue-600 underline">
              ← Newer
            </Link>
          )}
          <span className="text-muted-foreground">
            Page {page} of {pages}
          </span>
          {page < pages && (
            <Link href={qs(page + 1)} className="text-blue-600 underline">
              Older →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
