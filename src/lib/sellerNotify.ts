// Asks the main site (la-web) to email people about back-office decisions.
// The email templates and the Resend account live there; bo only sends an id.
// la-web reads everything else (status, reason, address) from the database
// and sends at most once per decision, so even a leaked secret can only send
// a true notice:
//
//   notifySeller(postId)        → /api/internal/listing-moderated
//       approved ("your listing is live"), rejected (with the reason),
//       suspended ("your listing has been removed", with a way to appeal)
//   notifyAccountStatus(userId) → /api/internal/account-status
//       account suspended (with a way to appeal) / reinstated
//   notifyReporter(reportId)    → /api/internal/report-updated
//       the person who reported an ad hears it was resolved or dismissed
//
// Production only: LA_WEB_URL and BO_NOTIFY_SECRET are set for the Production
// environment of lokalads-bo, so previews and local dev (test database) never
// email anyone.
import { reportError } from "@/lib/errorReport";

export type NotifyResult =
  | { sent: true }
  | { sent: false; skipped: string }
  | { sent: false; failed: string };

async function callLaWeb(path: string, body: Record<string, string>, where: string): Promise<NotifyResult> {
  const base = process.env.LA_WEB_URL;
  const secret = process.env.BO_NOTIFY_SECRET;
  if (!base || !secret) return { sent: false, skipped: "emails are off in this environment" };

  try {
    const res = await fetch(new URL(path, base), {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${secret}` },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => ({}))) as { sent?: boolean; skipped?: string; error?: string };
    if (res.ok && data.sent) return { sent: true };
    if (res.ok) return { sent: false, skipped: data.skipped ?? "not sent" };
    throw new Error(`${path} returned ${res.status}: ${data.error ?? "unknown"}`);
  } catch (e) {
    await reportError(e, { where, extra: body });
    return { sent: false, failed: "couldn't reach the main site to send the email" };
  }
}

export const notifySeller = (postId: string) =>
  callLaWeb("/api/internal/listing-moderated", { postId }, "notifySeller");

export const notifyAccountStatus = (userId: string) =>
  callLaWeb("/api/internal/account-status", { userId }, "notifyAccountStatus");

export const notifyReporter = (reportId: string) =>
  callLaWeb("/api/internal/report-updated", { reportId }, "notifyReporter");

/** One line for a staff member about what happened to an email. */
export function describeNotice(r: NotifyResult | undefined, who: string): string | null {
  if (!r) return null;
  if (r.sent) return `${who} has been emailed.`;
  if ("failed" in r) return `${who} could NOT be emailed (${r.failed}). This has been reported.`;
  return `No email sent to ${who.toLowerCase()}: ${r.skipped}.`;
}
