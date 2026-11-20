// Asks the main site (la-web) to email a seller about a moderation decision:
// "your listing is live" after an approval, or the reason after a rejection.
// The email templates and the Resend account live there; this only sends the
// ad's id. la-web reads the reason and the seller's address from the database
// and sends at most once per decision (see la-web
// src/app/api/internal/listing-moderated/route.ts).
//
// Production only: LA_WEB_URL and BO_NOTIFY_SECRET are set for the Production
// environment of lokalads-bo, so previews and local dev (test database) never
// email anyone.
import { reportError } from "@/lib/errorReport";

export type NotifyResult =
  | { sent: true }
  | { sent: false; skipped: string }
  | { sent: false; failed: string };

export async function notifySeller(postId: string): Promise<NotifyResult> {
  const base = process.env.LA_WEB_URL;
  const secret = process.env.BO_NOTIFY_SECRET;
  if (!base || !secret) return { sent: false, skipped: "seller emails are off in this environment" };

  try {
    const res = await fetch(new URL("/api/internal/listing-moderated", base), {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${secret}` },
      body: JSON.stringify({ postId }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => ({}))) as { sent?: boolean; skipped?: string; error?: string };
    if (res.ok && data.sent) return { sent: true };
    if (res.ok) return { sent: false, skipped: data.skipped ?? "not sent" };
    throw new Error(`listing-moderated returned ${res.status}: ${data.error ?? "unknown"}`);
  } catch (e) {
    await reportError(e, { where: "notifySeller", extra: { postId } });
    return { sent: false, failed: "couldn't reach the main site to email the seller" };
  }
}
