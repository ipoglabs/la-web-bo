import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import AdminUser from "@/models/adminUser";
import { compare } from "bcryptjs";
import { ADMIN_COOKIE, ADMIN_MAX_AGE, signAdminJwt, isAdminRole } from "@/lib/adminAuth";
import { logAdminAction, requestMeta } from "@/lib/adminGuard";

interface LoginBody {
  employeeId?: string;
  password?: string;
}

const MAX_FAILED = 5;
const LOCK_MINUTES = 15;

// Same message for unknown ID, wrong password and disabled account, so the
// login form can't be used to discover which employee IDs exist.
const INVALID = "Invalid employee ID or password.";

// A real bcrypt hash of a random string: comparing against it when the account
// doesn't exist keeps response times the same as a wrong password.
const DUMMY_HASH = "$2b$10$bUyS2R5ME4pQDvUg2FSlMO2mJv5qyb5U1LXPvNg7g.3oDkX4r3xuq";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body: LoginBody = await req.json().catch(() => ({}));
    const employeeId = String(body?.employeeId ?? "").trim();
    const password = String(body?.password ?? "");

    if (!employeeId || !password) {
      return NextResponse.json({ ok: false, error: "Employee ID and password are required." }, { status: 400 });
    }

    const admin = await AdminUser.findOne({ employeeId }).select("+password");

    if (!admin) {
      await compare(password, DUMMY_HASH);
      await logAdminAction(
        { email: "unknown" },
        { action: "auth.login_failed", targetType: "none", targetLabel: employeeId, meta: { why: "no_account" } },
      );
      return NextResponse.json({ ok: false, error: INVALID }, { status: 401 });
    }

    const actor = { adminId: String(admin._id), email: admin.email, role: admin.role };

    if (admin.lockedUntil && admin.lockedUntil > new Date()) {
      const mins = Math.ceil((admin.lockedUntil.getTime() - Date.now()) / 60000);
      return NextResponse.json(
        { ok: false, error: `Too many failed attempts. Try again in ${mins} minute${mins === 1 ? "" : "s"}.` },
        { status: 429 },
      );
    }

    const passwordOk = await compare(password, admin.password);

    if (!passwordOk) {
      admin.failedLoginCount = (admin.failedLoginCount ?? 0) + 1;
      const locked = admin.failedLoginCount >= MAX_FAILED;
      if (locked) {
        admin.lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60_000);
        admin.failedLoginCount = 0;
      }
      await admin.save();
      await logAdminAction(actor, {
        action: locked ? "auth.locked" : "auth.login_failed",
        targetType: "admin",
        targetId: actor.adminId,
        targetLabel: admin.employeeId,
        meta: { why: "bad_password" },
      });
      return NextResponse.json({ ok: false, error: INVALID }, { status: 401 });
    }

    if (!admin.isActive || !isAdminRole(admin.role)) {
      await logAdminAction(actor, {
        action: "auth.login_failed",
        targetType: "admin",
        targetId: actor.adminId,
        targetLabel: admin.employeeId,
        meta: { why: "inactive" },
      });
      return NextResponse.json({ ok: false, error: INVALID }, { status: 401 });
    }

    const { ip } = await requestMeta();
    admin.failedLoginCount = 0;
    admin.lockedUntil = undefined;
    admin.lastLoginAt = new Date();
    admin.lastLoginIp = ip;
    await admin.save();

    await logAdminAction(actor, {
      action: "auth.login",
      targetType: "admin",
      targetId: actor.adminId,
      targetLabel: admin.employeeId,
    });

    const token = signAdminJwt({
      adminId: actor.adminId,
      email: admin.email,
      role: admin.role,
      country: admin.country,
      tv: admin.tokenVersion ?? 0,
    });

    const res = NextResponse.json(
      {
        ok: true,
        user: {
          id: actor.adminId,
          firstName: admin.firstName,
          lastName: admin.lastName,
          employeeId: admin.employeeId,
          role: admin.role,
          country: admin.country,
        },
      },
      { status: 200 },
    );

    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ADMIN_MAX_AGE,
    });

    return res;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong during admin login." }, { status: 500 });
  }
}
