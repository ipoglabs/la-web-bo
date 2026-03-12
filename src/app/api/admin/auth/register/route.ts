import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AdminUser from "@/models/adminUser";
import Counter from "@/models/counter"; // ✅ using your existing file
import { hash } from "bcryptjs";
import { ADMIN_COOKIE, verifyAdminJwt } from "@/lib/adminAuth";

function canCreateRole(creatorRole: string, targetRole: string) {
  if (creatorRole === "super_admin") {
    return ["admin", "moderator", "support", "analyst"].includes(targetRole);
  }

  if (creatorRole === "admin") {
    return ["moderator", "support", "analyst"].includes(targetRole);
  }

  return false;
}

// 🔢 Production Safe Atomic Generator
async function getNextEmployeeId() {
  const counter = await Counter.findOneAndUpdate(
    { _id: "employeeId" },      // sequence name
    { $inc: { seq: 1 } },       // atomic increment
    { new: true, upsert: true } // create if not exists
  );

  const nextNumber = counter.seq;

  return `LA${String(nextNumber).padStart(7, "0")}`;
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const token = req.headers
      .get("cookie")
      ?.split(";")
      .map((s) => s.trim())
      .find((s) => s.startsWith(`${ADMIN_COOKIE}=`))
      ?.split("=")[1];

    const session = token ? verifyAdminJwt(token) : null;

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({} as any));

    const email = String(body?.email ?? "").toLowerCase().trim();
    const password = String(body?.password ?? "");

    const payload: any = {
      firstName: String(body?.firstName ?? "").trim(),
      lastName: String(body?.lastName ?? "").trim(),
      designation: String(body?.designation ?? "").trim(),
      age: Number(body?.age ?? 0),
      gender: String(body?.gender ?? ""),
      country: String(body?.country ?? "").trim(),
      location: String(body?.location ?? "").trim(),
      role: String(body?.role ?? ""),
      email,
    };

    // 🔐 ROLE PERMISSION CHECK
    if (!canCreateRole(session.role, payload.role)) {
      return NextResponse.json(
        { ok: false, error: "You are not allowed to create this role" },
        { status: 403 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email/password required" },
        { status: 400 }
      );
    }

    // 🔍 Email duplicate check
    const emailExists = await AdminUser.findOne({ email }).lean();
    if (emailExists) {
      return NextResponse.json(
        { ok: false, error: "Email already exists" },
        { status: 409 }
      );
    }

    // 🔢 Generate employee ID safely
    const employeeId = await getNextEmployeeId();

    const passwordHash = await hash(password, 10);

    await AdminUser.create({
      ...payload,
      employeeId,
      password: passwordHash,
      createdBy: session.adminId,
      isActive: true,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Register failed" },
      { status: 500 }
    );
  }
}