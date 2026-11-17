"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { changeOwnPassword, type ChangePasswordState } from "./actions/changePassword";

export default function ChangePasswordForm({ forced = false }: { forced?: boolean }) {
  const [state, action, pending] = useActionState<ChangePasswordState, FormData>(changeOwnPassword, null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
      router.refresh(); // clears the forced-change screen
    }
  }, [state, router]);

  return (
    <form ref={formRef} action={action} className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="current">{forced ? "Temporary password" : "Current password"}</Label>
        <Input id="current" name="current" type="password" autoComplete="current-password" required />
      </div>
      <div className="space-y-1">
        <Label htmlFor="next">New password</Label>
        <Input id="next" name="next" type="password" autoComplete="new-password" minLength={12} required />
        <p className="text-xs text-muted-foreground">
          At least 12 characters with upper-case, lower-case and a number. A short phrase works well,
          e.g. &ldquo;Mango-Lake-Train-42&rdquo; (don&apos;t use that one).
        </p>
      </div>
      <div className="space-y-1">
        <Label htmlFor="confirm">Repeat new password</Label>
        <Input id="confirm" name="confirm" type="password" autoComplete="new-password" required />
      </div>

      {state && !state.ok && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.ok && (
        <p className="text-sm text-emerald-700">Password changed. You&apos;ve been signed out on every other device.</p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Change password"}
      </Button>
    </form>
  );
}
