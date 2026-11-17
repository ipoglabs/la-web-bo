// Sends server errors to Rollbar (installed via the Vercel Marketplace) so
// someone is alerted, instead of the error sitting unread in Vercel's logs.
//
// Deliberately not the Rollbar SDK: this posts to Rollbar's API with fetch so
// we decide exactly what leaves the server. Never sent: request bodies,
// headers, cookies, query strings. Emails, phone numbers, long digit runs and
// token-looking strings are masked in messages and stack traces, because
// database errors can quote user data (e.g. a duplicate-key error on email).

const ENDPOINT = "https://api.rollbar.com/api/1/item/";

function serverToken(): string | undefined {
  // The Marketplace names it ROLLBAR_<RESOURCE>_SERVER_TOKEN_<n>; accept any of that shape.
  if (process.env.ROLLBAR_SERVER_TOKEN) return process.env.ROLLBAR_SERVER_TOKEN;
  for (const [k, v] of Object.entries(process.env)) {
    if (v && /^ROLLBAR_.*SERVER_TOKEN/.test(k)) return v;
  }
  return undefined;
}

export function scrub(text: string): string {
  return text
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
    .replace(/\beyJ[\w-]+\.[\w-]+\.[\w-]+/g, "[jwt]")
    .replace(/\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}/g, "[hash]")
    .replace(/mongodb(\+srv)?:\/\/[^\s"']+/g, "[mongodb-uri]")
    .replace(/\+?\d[\d\s().-]{7,}\d/g, (m) => (m.replace(/\D/g, "").length >= 8 ? "[number]" : m))
    .slice(0, 4000);
}

type Frame = { filename: string; lineno?: number; colno?: number; method?: string };

function frames(stack?: string): Frame[] {
  if (!stack) return [];
  const out: Frame[] = [];
  for (const line of stack.split("\n").slice(1, 40)) {
    const m = line.match(/^\s*at (?:(.*?) \()?(.*?):(\d+):(\d+)\)?$/);
    if (m) out.push({ method: m[1] ? scrub(m[1]) : undefined, filename: m[2], lineno: Number(m[3]), colno: Number(m[4]) });
  }
  // Rollbar expects oldest call first.
  return out.reverse();
}

export type ErrorContext = {
  /** Where it happened, e.g. "action:suspendUser" or "route:/api/admin/auth/login". */
  where: string;
  method?: string;
  /** Path only; any query string is dropped. */
  path?: string;
  /** Small, non-personal extra detail (ids, flags). Strings are scrubbed. */
  extra?: Record<string, string | number | boolean | undefined>;
  level?: "critical" | "error" | "warning";
};

/** Report an error. Never throws, and gives up after 2.5s so a slow Rollbar
 *  can't hold up a response. Also prints to the Vercel log as before.
 *  Resolves true if Rollbar accepted it. */
export async function reportError(err: unknown, ctx: ErrorContext): Promise<boolean> {
  console.error(`[${ctx.where}]`, err);

  const token = serverToken();
  if (!token) return false;
  if (process.env.NODE_ENV === "development" && process.env.ROLLBAR_IN_DEV !== "1") return false;

  const e = err instanceof Error ? err : new Error(typeof err === "string" ? err : "Non-Error thrown");
  const digest = typeof err === "object" && err && "digest" in err ? String((err as { digest: unknown }).digest) : undefined;
  const path = ctx.path?.split("?")[0];

  const extra: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(ctx.extra ?? {})) {
    if (v !== undefined) extra[k] = typeof v === "string" ? scrub(v) : v;
  }

  const payload = {
    data: {
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
      level: ctx.level ?? "error",
      platform: "node",
      language: "javascript",
      framework: "next",
      code_version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12),
      context: ctx.where,
      title: `${ctx.where}: ${scrub(e.message).slice(0, 200)}`,
      body: {
        trace: {
          frames: frames(e.stack),
          exception: { class: e.name || "Error", message: scrub(e.message) },
        },
      },
      request: path ? { url: path, method: ctx.method } : undefined,
      server: { host: process.env.VERCEL_URL ? "vercel" : "local", branch: process.env.VERCEL_GIT_COMMIT_REF },
      custom: { ...extra, ...(digest ? { digest } : {}) },
      notifier: { name: "lokalads-bo", version: "1" },
    },
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", "X-Rollbar-Access-Token": token },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) console.error("Rollbar rejected error report:", res.status);
    return res.ok;
  } catch (sendErr) {
    console.error("Couldn't send error report to Rollbar:", sendErr instanceof Error ? sendErr.message : sendErr);
    return false;
  }
}
