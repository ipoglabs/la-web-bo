#!/usr/bin/env node
// Copies Post Form Review docs, exported from Claude as Markdown, into
// src/content/post-forms/<slug>.md for the BO page /bo/post-forms.
//
// Usage: node scripts/import-post-forms.mjs <exports-dir>
//   <exports-dir> holds one folder per doc, named by the doc's artifact id
//   (the last part of its claude.ai/artifact/<id> link), with the exported .md inside.
// Re-run after the docs change; files are overwritten, nothing is deleted.
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const src = process.argv[2];
if (!src) {
  console.error("Usage: node scripts/import-post-forms.mjs <exports-dir>");
  process.exit(1);
}
const OUT = path.join(process.cwd(), "src/content/post-forms");
await mkdir(OUT, { recursive: true });

const slugify = (s) =>
  s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const seen = new Map();
for (const id of (await readdir(src)).sort()) {
  const dir = path.join(src, id);
  let mdFile;
  try {
    mdFile = (await readdir(dir)).find((f) => f.endsWith(".md"));
  } catch {
    continue; // not a folder
  }
  if (!mdFile) continue;
  const md = (await readFile(path.join(dir, mdFile), "utf8"))
    .replace(/^﻿/, "")
    // Drop the author from the byline ("Oct 23, 2026 · @Name" → "Oct 23, 2026"): no staff names in the repo.
    .replace(/^(.*?)\s*·\s*@[^\n]*$/m, "$1");
  const title = md.match(/^#\s+(.+)$/m)?.[1].trim();
  if (!title) {
    console.warn(`skip ${id}: no "# title" line`);
    continue;
  }
  // "Pets › Pet Care — Post Form Review" → pets--pet-care ; "Pets — Post Form Review To-do" → pets--to-do
  const [head, rest = ""] = title.split(" — ");
  const [cat, sub] = head.split(" › ");
  const slug = `${slugify(cat)}--${sub ? slugify(sub) : slugify(rest.replace(/post form review/i, "")) || "overview"}`;
  if (seen.has(slug)) {
    console.warn(`skip ${id}: slug ${slug} already used by ${seen.get(slug)}`);
    continue;
  }
  seen.set(slug, id);
  await writeFile(path.join(OUT, `${slug}.md`), `<!-- source: https://claude.ai/artifact/${id} -->\n${md}`);
}
console.log(`Imported ${seen.size} docs into ${path.relative(process.cwd(), OUT)}`);
