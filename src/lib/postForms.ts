// Post Form Reviews: one Markdown file per category / subcategory post form,
// exported from the team's Claude docs into src/content/post-forms/ by
// scripts/import-post-forms.mjs. Listed at /bo/post-forms, each shown as a
// plain HTML page at /bo/post-forms/<slug>.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { marked, type Tokens } from "marked";

export const POST_FORMS_DIR = path.join(process.cwd(), "src/content/post-forms");

export type PostFormDoc = {
  slug: string;
  title: string;
  category: string;
  /** Subcategory, or null for the category's own page (the To-do / overview). */
  sub: string | null;
  /** Where the doc lives in Claude, if the import recorded it. */
  source: string | null;
};

const SLUG = /^[a-z0-9-]+$/;
const SOURCE_LINE = /^<!--\s*source:\s*(\S+)\s*-->\s*\n/;

function parse(slug: string, md: string): PostFormDoc & { body: string } {
  const source = md.match(SOURCE_LINE)?.[1] ?? null;
  const body = md.replace(SOURCE_LINE, "");
  const title = body.match(/^#\s+(.+)$/m)?.[1].trim() ?? slug;
  // "Pets › Pet Care — Post Form Review" · "Pets — Post Form Review To-do"
  const head = title.split(" — ")[0];
  const [category, sub] = head.split(" › ").map((s) => s.trim());
  return { slug, title, category, sub: sub ?? null, source, body };
}

export async function listPostForms(): Promise<PostFormDoc[]> {
  let files: string[] = [];
  try {
    files = (await readdir(POST_FORMS_DIR)).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  const docs = await Promise.all(
    files.map(async (f) => {
      const slug = f.slice(0, -3);
      const { slug: s, title, category, sub, source } = parse(slug, await readFile(path.join(POST_FORMS_DIR, f), "utf8"));
      return { slug: s, title, category, sub, source };
    }),
  );
  return docs.sort(
    (a, b) =>
      a.category.localeCompare(b.category) ||
      (a.sub === null ? -1 : b.sub === null ? 1 : a.sub.localeCompare(b.sub)),
  );
}

export async function getPostForm(slug: string) {
  if (!SLUG.test(slug)) return null;
  try {
    return parse(slug, await readFile(path.join(POST_FORMS_DIR, `${slug}.md`), "utf8"));
  } catch {
    return null;
  }
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// The docs are written by people: never pass their raw HTML through, and only allow web links.
const renderer = new marked.Renderer();
renderer.html = ({ text }: Tokens.HTML | Tokens.Tag) => escapeHtml(text);
const baseLink = renderer.link.bind(renderer);
renderer.link = (token: Tokens.Link) =>
  /^(https?:|mailto:|#|\/)/i.test(token.href) ? baseLink(token) : escapeHtml(token.text);
const baseTable = renderer.table.bind(renderer);
renderer.table = (token: Tokens.Table) => `<div class="wrap">${baseTable(token)}</div>`;

/** `live`: the "Live form today" section's inner HTML (already escaped), or null for pages without one. */
export function renderPostFormHtml(doc: PostFormDoc & { body: string }, live: string | null = null): string {
  const article = marked.parse(doc.body, { gfm: true, async: false, renderer }) as string;
  const source = doc.source
    ? ` · <a href="${escapeHtml(doc.source)}" target="_blank" rel="noopener noreferrer">Open the doc in Claude</a>`
    : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escapeHtml(doc.title)}</title>
<style>
  :root {
    --bg: #f6f7f9; --surface: #ffffff; --head: #eef1f5; --border: #dde2e9;
    --text: #18202c; --muted: #5b6676; --accent: #1f5fd6;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --bg: #0f131a; --surface: #161b24; --head: #1d2430; --border: #2a3342;
      --text: #e6eaf1; --muted: #9aa5b6; --accent: #7fa8ff;
    }
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--text); font: 14px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .page { max-width: 1080px; margin: 0 auto; padding: 16px 16px 64px; }
  nav { display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; color: var(--muted); font-size: 13px; }
  a { color: var(--accent); }
  article { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 8px 24px 24px; margin-top: 12px; }
  h1 { font-size: 24px; margin: 16px 0 4px; }
  h2 { font-size: 18px; margin: 28px 0 6px; padding-top: 12px; border-top: 1px solid var(--border); }
  h3 { font-size: 15px; margin: 20px 0 4px; }
  p { margin: 6px 0 12px; }
  h1 + p { color: var(--muted); }
  code { font: 12px ui-monospace, SFMono-Regular, Menlo, monospace; background: var(--head); padding: 1px 4px; border-radius: 4px; }
  pre { background: var(--head); padding: 12px; border-radius: 6px; overflow-x: auto; }
  pre code { padding: 0; }
  .wrap { overflow-x: auto; margin: 8px 0 16px; }
  table { width: 100%; border-collapse: collapse; }
  th, td { text-align: left; vertical-align: top; padding: 7px 10px; border-bottom: 1px solid var(--border); }
  th { background: var(--head); font-weight: 600; }
  ul, ol { padding-left: 22px; }
  li { margin: 3px 0; }
  li:has(> input[type="checkbox"]), li:has(> p > input[type="checkbox"]) { list-style: none; margin-left: -20px; }
  input[type="checkbox"] { margin: 0 6px 0 0; vertical-align: -1px; }
  blockquote { margin: 8px 0; padding: 4px 12px; border-left: 3px solid var(--border); color: var(--muted); }
  .live-box { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 4px 24px 12px; margin-top: 12px; }
  .live-box > summary { cursor: pointer; font-weight: 600; font-size: 16px; padding: 10px 0; }
  .live-box .muted { color: var(--muted); margin-top: 0; }
  .live td { font-size: 13px; }
  .live td.n { color: var(--muted); width: 32px; }
  .live tr.sec td { background: var(--head); font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .03em; color: var(--muted); }
  .live td div + div { margin-top: 4px; }
  .label { font-size: 12px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: .04em; margin: 20px 0 0; }
  @media print { nav { display: none; } article { border: 0; padding: 0; } }
</style>
</head>
<body>
<div class="page">
  <nav>
    <a href="/bo/post-forms">← All post form reviews</a>
    <span>Copy of the Claude doc${source}</span>
  </nav>
${
  live === null
    ? ""
    : `  <details class="live-box" open>
    <summary>Live form today</summary>
${live}
  </details>
  <p class="label">Review (copy of the Claude doc)</p>`
}
  <article>
${article}
  </article>
</div>
</body>
</html>`;
}
