import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import AdminUser from "@/models/adminUser";
import Counter from "@/models/counter";
import { hash } from "bcryptjs";
import { requireAdmin, logAdminAction } from "@/lib/adminGuard";
import { canManageRole, checkAdminPassword, isAdminRole } from "@/lib/adminPermissions";

interface RegisterBody {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  designation?: string;
  age?: number;
  gender?: string;
  country?: string;
  location?: string;
  role?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Atomic, so two admins creating staff at the same moment never collide.
async function getNextEmployeeId() {
  const counter = await Counter.findOneAndUpdate(
    { _id: "employeeId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  return `LA${String(counter.seq).padStart(7, "0")}`;
}

const bad = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  try {
    const guard = await requireAdmin("staff.create");
    if (!guard.ok) return bad(guard.error, 403);
    const { admin } = guard;

    const body: RegisterBody = await req.json().catch(() => ({}));

    const email = String(body?.email ?? "").toLowerCase().trim();
    const password = String(body?.password ?? "");
    const role = String(body?.role ?? "");

    const payload = {
      firstName: String(body?.firstName ?? "").trim(),
      lastName: String(body?.lastName ?? "").trim(),
      designation: String(body?.designation ?? "").trim(),
      age: Number(body?.age ?? 0),
      gender: String(body?.gender ?? ""),
      country: String(body?.country ?? "").trim(),
      location: String(body?.location ?? "").trim(),
      email,
    };

    if (!isAdminRole(role) || !canManageRole(admin.role, role)) {
      return bad("You are not allowed to create this role.", 403);
    }
    if (!payload.firstName || !payload.lastName || !payload.designation || !payload.country || !payload.location) {
      return bad("Fill in name, designation, country and location.");
    }
    if (!Number.isInteger(payload.age) || payload.age < 18 || payload.age > 100) {
      return bad("Age must be a whole number between 18 and 100.");
    }
    if (!["male", "female", "other"].includes(payload.gender)) {
      return bad("Choose a gender.");
    }
    if (!EMAIL_RE.test(email)) return bad("Enter a valid email address.");
    const pwError = checkAdminPassword(password);
    if (pwError) return bad(pwError);

    await dbConnect();

    if (await AdminUser.exists({ email })) return bad("An account with this email already exists.", 409);

    const employeeId = await getNextEmployeeId();
    const passwordHash = await hash(password, 12);

    const created = await AdminUser.create({
      ...payload,
      role,
      employeeId,
      password: passwordHash,
      passwordChangedAt: new Date(),
      mustChangePassword: true, // the creator knows it, so it's only temporary
      createdBy: admin.adminId,
      isActive: true,
    });

    await logAdminAction(admin, {
      action: "staff.create",
      targetType: "admin",
      targetId: String(created._id),
      targetLabel: `${employeeId} · ${email}`,
      meta: { role },
    });

    return NextResponse.json({ ok: true, employeeId }, { status: 201 });
  } catch (e) {
    console.error("BO register failed:", e);
    return bad("Couldn't create the account.", 500);
  }
}
