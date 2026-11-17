import Link from "next/link"

type Params = Record<string, string | undefined>

function href(basePath: string, params: Params, page: number) {
  const u = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) if (v && k !== "page") u.set(k, v)
  if (page > 1) u.set("page", String(page))
  const qs = u.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

/** Search box for a server-paged list. A plain GET form, so it works without JS
 *  and the search lives in the URL. Keeps the list's other filters (e.g. status tab). */
export function ListSearch({
  basePath,
  params,
  placeholder,
}: {
  basePath: string
  params: Params
  placeholder: string
}) {
  return (
    <form method="get" action={basePath} className="flex flex-wrap items-center gap-2">
      {Object.entries(params).map(([k, v]) =>
        v && k !== "q" && k !== "page" ? <input key={k} type="hidden" name={k} value={v} /> : null,
      )}
      <input
        name="q"
        defaultValue={params.q ?? ""}
        placeholder={placeholder}
        maxLength={100}
        className="h-9 w-72 rounded-md border bg-white px-3 text-sm"
      />
      <button className="h-9 rounded-md bg-slate-900 px-3 text-sm text-white">Search</button>
      {params.q && (
        <Link href={href(basePath, { ...params, q: undefined }, 1)} className="text-sm text-blue-600 underline">
          Clear
        </Link>
      )}
    </form>
  )
}

export function ListPager({
  basePath,
  params,
  page,
  pages,
  from,
  to,
  total,
}: {
  basePath: string
  params: Params
  page: number
  pages: number
  from: number
  to: number
  total: number
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">
        {total === 0 ? "No results" : `Showing ${from.toLocaleString()}–${to.toLocaleString()} of ${total.toLocaleString()}`}
      </span>
      {pages > 1 && (
        <div className="flex items-center gap-3">
          {page > 1 ? (
            <Link href={href(basePath, params, page - 1)} className="text-blue-600 underline">
              ← Previous
            </Link>
          ) : (
            <span className="text-muted-foreground">← Previous</span>
          )}
          <span>
            Page {page} of {pages}
          </span>
          {page < pages ? (
            <Link href={href(basePath, params, page + 1)} className="text-blue-600 underline">
              Next →
            </Link>
          ) : (
            <span className="text-muted-foreground">Next →</span>
          )}
        </div>
      )}
    </div>
  )
}
