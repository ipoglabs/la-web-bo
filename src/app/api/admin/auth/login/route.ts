import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import AdminUser from "@/models/adminUser";
import { compare } from "bcryptjs";
import { isAdminRole } from "@/lib/adminAuth";
import { logAdminAction } from "@/lib/adminGuard";
import {
  actorOf,
  completeLogin,
  isLocked,
  lockedResponse,
  recordFailure,
  twoFactorChallengeResponse,
} from "@/lib/adminLogin";
import { reportError } from "@/lib/errorReport";

interface LoginBody {
  employeeId?: string;
  password?: string;
}

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

    if (isLocked(admin)) return lockedResponse(admin);

    if (!(await compare(password, admin.password))) {
      await recordFailure(admin, "bad_password", "auth.login_failed");
      return NextResponse.json({ ok: false, error: INVALID }, { status: 401 });
    }

    if (!admin.isActive || !isAdminRole(admin.role)) {
      await logAdminAction(actorOf(admin), {
        action: "auth.login_failed",
        targetType: "admin",
        targetId: String(admin._id),
        targetLabel: admin.employeeId,
        meta: { why: "inactive" },
      });
      return NextResponse.json({ ok: false, error: INVALID }, { status: 401 });
    }

    // Password is right. With two-factor on, nothing is issued until the code
    // is checked too, and the failure counter is NOT reset yet.
    if (admin.twoFactorEnabled) return twoFactorChallengeResponse(admin);

    // No two-factor yet: sign in; the panel then shows only the setup screen
    // if their role requires it (see bo/layout.tsx).
    return await completeLogin(admin, "password");
  } catch (err) {
    await reportError(err, { where: "route:/api/admin/auth/login", level: "critical" });
    return NextResponse.json({ ok: false, error: "Something went wrong during admin login." }, { status: 500 });
  }
}
