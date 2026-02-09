import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth";

export async function GET(req: Request) {
  const token = req.headers
    .get("cookie")
    ?.split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(`${ADMIN_COOKIE}=`))
    ?.split("=")[1];

  const session = token ? verifyAdminJwt(token) : null;

  if (!session) {
    return NextResponse.json({ role: null }, { status: 401 });
  }

  return NextResponse.json({
    role: session.role,
    email: session.email,
    adminId: session.adminId,
  });
}
