"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginClient() {
  const sp = useSearchParams();
  // Only ever send people back inside bo — never to an outside URL.
  const raw = sp.get("next") || "";
  const next = /^\/bo(\/|\?|$)/.test(raw) ? raw : "/bo";

  const [step, setStep] = useState<"password" | "code">("password");
  const [useRecovery, setUseRecovery] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const post = async (url: string, body: object) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    return { res, data: await res.json().catch(() => ({})) };
  };

  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { res, data } = await post("/api/admin/auth/login", { employeeId, password });
      if (!res.ok || !data?.ok) {
        setErr(data?.error || "Login failed");
        return;
      }
      if (data.twoFactorRequired) {
        setPassword("");
        setStep("code");
        return;
      }
      window.location.href = next;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { res, data } = await post("/api/admin/auth/2fa", useRecovery ? { recoveryCode: code } : { code });
      if (!res.ok || !data?.ok) {
        setErr(data?.error || "Sign-in failed");
        setCode("");
        if (data?.restart) setStep("password");
        return;
      }
      window.location.href = next;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-semibold">BO Login</h1>

        {err && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        )}

        {step === "password" ? (
          <form className="space-y-3" onSubmit={submitPassword}>
            <Input
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              autoComplete="username"
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <Button className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* No self-service reset on purpose: a person resets it after
                confirming who's asking (see Staff → their page). */}
            <button
              type="button"
              className="text-sm text-blue-600 underline"
              aria-expanded={showForgot}
              onClick={() => setShowForgot((v) => !v)}
            >
              Forgot password?
            </button>
            {showForgot && (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 space-y-2">
                <p>Back-office passwords can&apos;t be reset by email. Ask a person instead:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Moderator, Support or Analyst: ask your Admin (or a Super Admin).</li>
                  <li>Admin or Super Admin: ask a Super Admin.</li>
                </ul>
                <p>
                  They&apos;ll call you back on a number they already have to check it&apos;s really you, then give you a
                  temporary password. You&apos;ll choose your own when you next sign in.
                </p>
                <p>Locked out after too many tries? They can unlock you the same way, or wait 15 minutes.</p>
              </div>
            )}
          </form>
        ) : (
          <form className="space-y-3" onSubmit={submitCode}>
            <p className="text-sm text-slate-600">
              {useRecovery
                ? "Enter one of the recovery codes you saved when you set up two-factor sign-in. Each works once."
                : "Enter the 6-digit code from your authenticator app."}
            </p>
            <Input
              key={useRecovery ? "recovery" : "totp"}
              placeholder={useRecovery ? "xxxx-xxxx-xxxx" : "123456"}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              inputMode={useRecovery ? "text" : "numeric"}
              autoComplete="one-time-code"
              autoFocus
              maxLength={useRecovery ? 20 : 7}
              className="font-mono tracking-widest"
            />
            <Button className="w-full" disabled={loading || !code.trim()}>
              {loading ? "Checking..." : "Verify"}
            </Button>
            <div className="flex justify-between text-xs">
              <button
                type="button"
                className="text-blue-600 underline"
                onClick={() => {
                  setUseRecovery((v) => !v);
                  setCode("");
                  setErr(null);
                }}
              >
                {useRecovery ? "Use authenticator app instead" : "Lost your phone? Use a recovery code"}
              </button>
              <button
                type="button"
                className="text-slate-500 underline"
                onClick={() => {
                  setStep("password");
                  setCode("");
                  setUseRecovery(false);
                  setErr(null);
                }}
              >
                Start over
              </button>
            </div>
          </form>
        )}

        <div className="text-xs text-slate-500">
          After login you will be redirected to: <b>{next}</b>
        </div>
      </div>
    </div>
  );
}
