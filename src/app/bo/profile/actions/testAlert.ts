"use server";

import { requireAdmin, logAdminAction } from "@/lib/adminGuard";
import { reportError } from "@/lib/errorReport";

/** Super Admin only: sends a harmless test error to Rollbar to prove alerts
 *  reach someone. Rollbar groups it as one item, so repeats don't spam. */
export async function sendTestAlert(): Promise<{ ok: boolean; message: string }> {
  const guard = await requireAdmin();
  if (!guard.ok) return { ok: false, message: guard.error };
  if (guard.admin.role !== "super_admin") return { ok: false, message: "Only Super Admins can send a test alert." };

  const sent = await reportError(new Error("Test alert from the back office: everything is fine, ignore this."), {
    where: "test-alert",
    level: "warning",
    extra: { by: guard.admin.adminId },
  });
  await logAdminAction(guard.admin, { action: "system.test_alert", targetType: "none", meta: { delivered: sent } });
  return sent
    ? { ok: true, message: "Sent. It should appear in Rollbar within a minute; check your email for the alert." }
    : { ok: false, message: "Rollbar didn't accept it. Check the Rollbar integration in Vercel (Storage/Integrations) and the Vercel logs." };
}
