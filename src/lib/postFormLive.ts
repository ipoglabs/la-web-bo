// The post form as it is live right now: la-web's `postformschemas` documents for
// one (category, subcategory), one per country, merged into a single table for
// the Post Form Review pages. Values come from the DB (sellers' option requests
// add to them), so every value is escaped.
import connectDB from "@/lib/db";
import PostFormSchema, { type FormFieldDef } from "@/models/postFormSchema";

const COUNTRIES = ["IN", "GB", "SG"] as const;
const MAX_OPTIONS = 20;

export type LiveForm = {
  /** Country code → its fields, each tagged with its section title. */
  byCountry: Map<string, (FormFieldDef & { section?: string })[]>;
  updatedAt: Date | null;
};

/** Review title → live subcategory name, where the form was renamed after the review. */
const RENAMED: Record<string, string> = {
  "Education › Online Courses": "Courses",
};

export async function loadLiveForm(category: string, sub: string): Promise<LiveForm> {
  const subcategory = RENAMED[`${category} › ${sub}`] ?? sub;
  await connectDB();
  const docs = await PostFormSchema.find({ category, subcategory })
    .select("country sections updatedAt")
    .lean<{ country: string; sections?: { title?: string; fields?: FormFieldDef[] }[]; updatedAt?: Date }[]>();

  const byCountry = new Map<string, (FormFieldDef & { section?: string })[]>();
  let updatedAt: Date | null = null;
  const order = (c: string) => (COUNTRIES.indexOf(c as never) + 1 || 99);
  for (const d of docs.sort((a, b) => order(a.country) - order(b.country))) {
    byCountry.set(
      d.country,
      (d.sections ?? []).flatMap((s) => (s.fields ?? []).map((f) => ({ ...f, section: s.title }))),
    );
    if (d.updatedAt && (!updatedAt || d.updatedAt > updatedAt)) updatedAt = d.updatedAt;
  }
  return { byCountry, updatedAt };
}

const esc = (v: unknown) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function list(v: unknown): string {
  return Array.isArray(v) ? v.map(String).join(", ") : String(v);
}

/** One line per rule the field carries, in plain words. */
function notes(f: FormFieldDef): string[] {
  const out: string[] = [];
  const opts = Array.isArray(f.options) ? f.options : [];
  if (opts.length) {
    const labels = opts.map((o) => (typeof o === "object" && o ? o.label ?? o.value : o));
    out.push(
      labels.slice(0, MAX_OPTIONS).join(", ") + (labels.length > MAX_OPTIONS ? ` … +${labels.length - MAX_OPTIONS} more` : ""),
    );
  }
  if (f.allowCustom) out.push("Sellers can type their own value");
  if (f.maxLength != null) out.push(`Max ${f.maxLength} characters`);
  if (f.min != null || f.max != null) out.push(`Range ${f.min ?? "–"} to ${f.max ?? "–"}${f.unit ? ` ${f.unit}` : ""}`);
  else if (f.unit) out.push(`Unit: ${f.unit}`);
  if (f.maxItems != null) out.push(`Up to ${f.maxItems}`);
  if (f.gteField) out.push(`≥ ${f.gteField}`);
  if (f.ltField) out.push(`< ${f.ltField}`);
  if (f.lteField) out.push(`≤ ${f.lteField}`);
  if (f.dateLimit) out.push(`Dates: ${typeof f.dateLimit === "object" ? JSON.stringify(f.dateLimit) : f.dateLimit}`);
  if (f.defaultValue != null) out.push(`Default: ${list(f.defaultValue)}`);
  if (f.placeholder) out.push(`Placeholder "${f.placeholder}"`);
  if (f.format) out.push(`Format: ${f.format}`);
  if (f.display) out.push(`Shown as ${f.display}`);
  if (f.width === "half") out.push("Half width");
  const sw = f.showWhen as { field?: string; in?: unknown; notIn?: unknown; equals?: unknown } | undefined;
  if (sw?.field) {
    const cond = sw.notIn != null ? `is not ${list(sw.notIn)}` : sw.in != null ? `is ${list(sw.in)}` : sw.equals != null ? `is ${list(sw.equals)}` : "is set";
    out.push(`Only when ${sw.field} ${cond}`);
  }
  if (f.hint) out.push(`Hint: ${f.hint}`);
  return out;
}

type Cell = (f: FormFieldDef & { section?: string }) => string;

/** Same in every country → the value; otherwise one line per country. */
function merged(per: [string, FormFieldDef & { section?: string }][], cell: Cell): string {
  const vals = per.map(([c, f]) => [c, cell(f)] as const);
  if (new Set(vals.map(([, v]) => v)).size === 1) return vals[0][1];
  return vals.map(([c, v]) => `<div><b>${c}:</b> ${v || "—"}</div>`).join("");
}

export function renderLiveFormHtml(live: LiveForm, name: string): string {
  const countries = [...live.byCountry.keys()];
  if (!countries.length) {
    return `<p class="muted">No live form called ${esc(name)} in the database. It may have been renamed or merged into another subcategory, or la-web may be using the defaults in its own code.</p>`;
  }

  // Rows in the order of the first country that has each field.
  const keys: string[] = [];
  for (const fields of live.byCountry.values()) for (const f of fields) if (!keys.includes(f.key)) keys.push(f.key);
  const identical = new Set([...live.byCountry.values()].map((f) => JSON.stringify(f))).size === 1;

  let section: string | undefined;
  const rows = keys.map((key, i) => {
    const per = countries
      .map((c) => [c, live.byCountry.get(c)!.find((f) => f.key === key)] as const)
      .filter((p): p is [string, FormFieldDef & { section?: string }] => Boolean(p[1]));
    const sec = per[0][1].section;
    const head =
      sec && sec !== section ? `<tr class="sec"><td colspan="7">${esc(sec)}</td></tr>` : "";
    section = sec;
    const where = per.length === countries.length ? "All" : per.map(([c]) => c).join(", ");
    return `${head}<tr>
<td class="n">${i + 1}</td>
<td>${merged(per, (f) => esc(f.label))}</td>
<td><code>${esc(key)}</code></td>
<td>${merged(per, (f) => esc(f.type))}</td>
<td>${merged(per, (f) => (f.required ? "Yes" : "No"))}</td>
<td>${merged(per, (f) => notes(f).map(esc).join("<br>"))}</td>
<td>${esc(where)}</td>
</tr>`;
  });

  const required = live.byCountry.get(countries[0])!.filter((f) => f.required).length;
  const when = live.updatedAt
    ? ` Last changed ${live.updatedAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}.`
    : "";
  return `<p class="muted">Read from the live database when you opened this page. ${keys.length} fields, ${required} required${countries.length > 1 ? ` in ${countries[0]}` : ""}. ${
    identical ? `Same in ${countries.join(", ")}.` : `Differs between ${countries.join(", ")}: where a value differs, each country is listed.`
  }${when}</p>
<div class="wrap"><table class="live">
<thead><tr><th>#</th><th>Label</th><th>Key</th><th>Type</th><th>Required</th><th>Options / rules</th><th>Countries</th></tr></thead>
<tbody>
${rows.join("\n")}
</tbody></table></div>`;
}
