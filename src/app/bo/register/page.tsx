"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RegisterForm {
  firstName: string;
  lastName: string;
  designation: string;
  age: string;
  gender: string;
  country: string;
  location: string;
  role: string;
  employeeId: string;
  email: string;
  password: string;
}

export default function AdminRegisterPage() {
  const router = useRouter();

  const [allowedRoles, setAllowedRoles] = useState<string[]>([]);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    designation: "",
    age: "",
    gender: "male",
    country: "",
    location: "",
    role: "moderator",
    employeeId: "",
    email: "",
    password: "",
  });

  // 🔐 Load current role safely
  useEffect(() => {
    fetch("/api/admin/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        const roles: string[] = Array.isArray(d.assignableRoles) ? d.assignableRoles : [];
        setAllowedRoles(roles);
        if (roles.length && !roles.includes("moderator")) setForm((f) => ({ ...f, role: roles[0] }));
        setLoadingSession(false);
      })
      .catch(() => {
        setAllowedRoles([]);
        setLoadingSession(false);
      });
  }, []);

  if (loadingSession) {
    return <div className="p-10 text-center">Loading session...</div>;
  }

  if (allowedRoles.length === 0) {
    return (
      <div className="p-10 text-center text-red-600 text-lg">
        You are not allowed to create users.
      </div>
    );
  }

  const update = <K extends keyof RegisterForm>(k: K, v: RegisterForm[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...form, age: Number(form.age) }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setErr(data?.error || "Register failed");
        return;
      }

      setCreatedId(data.employeeId);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-2xl bg-white border rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Create Backoffice User</h1>

        {err && <div className="text-red-600 text-sm">{err}</div>}

        {createdId && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Account created. Employee ID: <b>{createdId}</b>. Share the ID and the temporary password with them
            separately (never in the same message). They&apos;ll be asked to choose their own password the
            first time they sign in at /bo-login.
          </div>
        )}

        <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={submit}>
          <Input placeholder="First name" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
          <Input placeholder="Last name" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
          <Input placeholder="Designation" value={form.designation} onChange={(e) => update("designation", e.target.value)} />
          {/* <Input placeholder="Employee ID (Auto Generated)"  value="Auto Generated"  disabled /> */}
          <Input placeholder="Age" inputMode="numeric" value={form.age} onChange={(e) => update("age", e.target.value)} />

          <select className="border h-10 px-3" value={form.role} onChange={(e) => update("role", e.target.value)}>
            {allowedRoles.map((r) => (
              <option key={r} value={r}>{r.replace("_", " ")}</option>
            ))}
          </select>

          <select className="border h-10 px-3" value={form.gender} onChange={(e) => update("gender", e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <Input placeholder="Country" value={form.country} onChange={(e) => update("country", e.target.value)} />
          <Input placeholder="Location" value={form.location} onChange={(e) => update("location", e.target.value)} />
          <Input placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} />
          <Input placeholder="Temporary password" type="password" autoComplete="new-password" value={form.password} onChange={(e) => update("password", e.target.value)} />
          <p className="md:col-span-2 text-xs text-slate-500">
            Password: at least 12 characters with upper-case, lower-case and a number.
          </p>

          <div className="md:col-span-2">
            <Button className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
