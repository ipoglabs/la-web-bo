// Shared paging + search for back-office lists. Everything is done in the
// database so a page never loads more than PAGE_SIZE rows, however big the
// collection gets.

export const PAGE_SIZE = 25;

/** Lookups that return a picker list (Dev Tools) cap at this many rows. */
export const LOOKUP_LIMIT = 100;

export function parsePage(raw?: string): number {
  const n = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 10_000) : 1;
}

/** Case-insensitive "contains" match for user-typed text, with regex characters
 *  escaped so a search can't become an expensive or broken pattern. */
export function searchRegex(raw?: string | null): RegExp | null {
  const q = (raw ?? "").trim().slice(0, 100);
  if (!q) return null;
  return new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

/** `{ $or: [{ field: /q/i }, ...] }`, or `{}` when there's no search. */
export function searchFilter(raw: string | null | undefined, fields: string[]) {
  const re = searchRegex(raw);
  return re ? { $or: fields.map((f) => ({ [f]: re })) } : {};
}

export function pageWindow(page: number, total: number, size = PAGE_SIZE) {
  const pages = Math.max(1, Math.ceil(total / size));
  const current = Math.min(page, pages);
  return { pages, current, skip: (current - 1) * size, from: total ? (current - 1) * size + 1 : 0, to: Math.min(current * size, total) };
}
