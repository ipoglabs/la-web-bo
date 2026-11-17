import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/adminAuth";
import { getAdmin, logAdminAction } from "@/lib/adminGuard";

export async function POST() {
  const admin = await getAdmin().catch(() => null);
  if (admin) {
    await logAdminAction(admin, { action: "auth.logout", targetType: "admin", targetId: admin.adminId });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
