// proxy.ts (Next 16 name for middleware) — first, cheap gate: a signed, unexpired bo token.
// Account status and permissions are re-checked against the DB in
// requireAdmin / requireAdminPage (src/lib/adminGuard.ts) on every page and action.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ADMIN_ROLES } from "@/lib/adminPermissions";

const ADMIN_COOKIE = "admin_session";
const ADMIN_JWT_AUDIENCE = "lokalads-bo";

async function hasValidToken(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;
  if (!secret) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      audience: ADMIN_JWT_AUDIENCE,
    });
    return (ADMIN_ROLES as readonly string[]).includes(String(payload.role ?? ""));
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (token && (await hasValidToken(token))) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/bo-login";
  url.search = "";
  url.searchParams.set("next", pathname + (search || ""));
  const res = NextResponse.redirect(url);
  if (token) res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

export const config = {
  matcher: ["/bo/:path*", "/bo"],
};
