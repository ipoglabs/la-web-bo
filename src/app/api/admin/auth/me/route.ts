import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/adminGuard";
import { assignableRoles, ROLE_PERMS } from "@/lib/adminPermissions";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ role: null }, { status: 401 });

  return NextResponse.json({
    role: admin.role,
    email: admin.email,
    adminId: admin.adminId,
    name: admin.name,
    permissions: ROLE_PERMS[admin.role],
    assignableRoles: assignableRoles(admin.role),
  });
}
