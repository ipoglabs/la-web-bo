/**
 * Turns a raw post document into labelled, formatted rows for the bo post
 * detail page — every field the seller filled in, whatever the category.
 * Works off the stored document (not the schema) so fields la-web adds later
 * still show up.
 */

/** Shown elsewhere on the page, or internal bookkeeping. */
const SYSTEM_KEYS = new Set([
  "_id", "__v", "name", "description", "images", "category", "subcategory", "country",
  "ownerId", "adsId", "status", "rejectionReason", "expiresAt", "lastBumpedAt", "deletedAt",
  "location", "seller_info", "attributes", "isSuspended", "suspendedAt", "suspendedBy",
  "viewCount", "createdAt", "updatedAt",
])

const MONEY_KEYS = new Set([
  "salePrice", "rentPrice", "rent", "deposit", "maintenance", "rateNightly", "rateWeekly",
  "rateMonthly", "minBudget", "maxBudget", "budget", "budgetAmount", "salary", "hourlyRate",
  "stipendAmount",
])

const LABELS: Record<string, string> = {
  salePrice: "Price",
  rentPrice: "Rent",
  rateNightly: "Nightly rate",
  rateWeekly: "Weekly rate",
  rateMonthly: "Monthly rate",
  builtup_area: "Built-up area",
  carpet_area: "Carpet area",
  plot_area: "Plot area",
  kms: "Kilometres driven",
  lfDate: "Date lost / found",
  gender_pref: "Gender preference",
  ageText: "Age",
  available_from: "Available from",
  applyLink: "Apply link",
  durationText: "Duration",
}

const CURRENCY: Record<string, string> = { in: "INR", gb: "GBP", sg: "SGD" }

export type FieldRow = { key: string; label: string; value: string; href?: string }

export function humanize(key: string): string {
  if (LABELS[key]) return LABELS[key]
  const words = key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .trim()
    .toLowerCase()
  return words.charAt(0).toUpperCase() + words.slice(1)
}

function isEmpty(v: unknown): boolean {
  if (v === null || v === undefined || v === "") return true
  if (Array.isArray(v)) return v.length === 0
  if (v instanceof Date) return false
  if (typeof v === "object") return Object.keys(v as object).length === 0
  return false
}

export function formatMoney(n: number, country?: string): string {
  const currency = CURRENCY[String(country || "").toLowerCase()]
  if (!currency) return n.toLocaleString("en-GB")
  return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 2 }).format(n)
}

export function formatDate(d: unknown): string {
  const date = d instanceof Date ? d : new Date(String(d))
  return Number.isNaN(date.getTime())
    ? String(d)
    : date.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })
}

function formatValue(key: string, v: unknown, country?: string): string {
  if (typeof v === "number" && MONEY_KEYS.has(key)) return formatMoney(v, country)
  if (typeof v === "number") return v.toLocaleString("en-GB")
  if (typeof v === "boolean") return v ? "Yes" : "No"
  if (v instanceof Date) return formatDate(v)
  if (Array.isArray(v)) return v.map((x) => (typeof x === "object" ? JSON.stringify(x) : String(x))).join(", ")
  if (typeof v === "object" && v !== null) {
    return Object.entries(v)
      .filter(([, x]) => !isEmpty(x))
      .map(([k, x]) => `${humanize(k)}: ${formatValue(k, x, country)}`)
      .join(" · ")
  }
  return decodeEntities(String(v))
}

/** Every seller-entered field (top-level and form attributes), formatted. */
export function detailRows(post: Record<string, unknown>): FieldRow[] {
  const country = typeof post.country === "string" ? post.country : undefined
  const attributes =
    post.attributes && typeof post.attributes === "object" ? (post.attributes as Record<string, unknown>) : {}

  const seen = new Set<string>()
  const rows: FieldRow[] = []
  for (const [key, v] of [...Object.entries(post), ...Object.entries(attributes)]) {
    if (SYSTEM_KEYS.has(key) || seen.has(key) || isEmpty(v)) continue
    seen.add(key)
    const value = formatValue(key, v, country)
    const href = typeof v === "string" && /^https?:\/\//i.test(v) ? v : undefined
    rows.push({ key, label: humanize(key), value, href })
  }
  // Money first (what most reviews check), then alphabetical.
  return rows.sort((a, b) => {
    const am = MONEY_KEYS.has(a.key) ? 0 : 1
    const bm = MONEY_KEYS.has(b.key) ? 0 : 1
    return am - bm || a.label.localeCompare(b.label)
  })
}

/** Stored text sometimes arrives HTML-escaped ("Free &amp; Giveaway"). */
export function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&#x27;|&apos;/gi, "'")
    .replace(/&amp;/g, "&")
}
