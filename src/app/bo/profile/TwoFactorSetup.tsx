"use client";

import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  confirmTwoFactorSetup,
  regenerateRecoveryCodes,
  startTwoFactorSetup,
  type CodesResult,
} from "./actions/twoFactor";

/** Shows freshly created recovery codes once, with copy/download, and makes
 *  the person confirm they've saved them before moving on. */
export function RecoveryCodes({ codes, onDone, doneLabel = "Continue" }: { codes: string[]; onDone: () => void; doneLabel?: string }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const text = `LokalAds back office recovery codes (each works once)\n\n${codes.join("\n")}\n`;

  const download = () => {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "lokalads-bo-recovery-codes.txt" });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm">
        <b>Save these recovery codes</b> somewhere safe, such as your password manager. If you lose your phone, each
        code lets you sign in once. They won&apos;t be shown again.
      </p>
      <ol className="grid grid-cols-2 gap-2 rounded-md border bg-slate-50 p-3 font-mono text-sm">
        {codes.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ol>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => navigator.clipboard.writeText(text).then(() => setCopied(true))}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={download}>
          Download .txt
        </Button>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={saved} onChange={(e) => setSaved(e.target.checked)} />
        I&apos;ve saved my recovery codes
      </label>
      <Button type="button" disabled={!saved} onClick={onDone}>
        {doneLabel}
      </Button>
    </div>
  );
}

export default function TwoFactorSetup() {
  const router = useRouter();
  const [starting, startTransition] = useTransition();
  const [setup, setSetup] = useState<{ qr: string; secret: string } | null>(null);
  const [startError, setStartError] = useState<string | null>(null);
  const [state, action, pending] = useActionState<CodesResult, FormData>(confirmTwoFactorSetup, null);

  const begin = () =>
    startTransition(async () => {
      setStartError(null);
      const res = await startTwoFactorSetup();
      if (res.ok) setSetup({ qr: res.qr, secret: res.secret });
      else setStartError(res.error);
    });

  if (state?.ok) {
    return <RecoveryCodes codes={state.recoveryCodes} onDone={() => router.refresh()} />;
  }

  if (!setup) {
    return (
      <div className="space-y-3">
        <p className="text-sm">
          You&apos;ll need an authenticator app on your phone, such as Google Authenticator, Microsoft Authenticator,
          1Password or Authy.
        </p>
        {startError && <p className="text-sm text-red-600">{startError}</p>}
        <Button type="button" onClick={begin} disabled={starting}>
          {starting ? "Preparing..." : "Set up two-factor sign-in"}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ol className="list-decimal pl-5 space-y-1 text-sm">
        <li>In your authenticator app, add an account and scan this QR code.</li>
        <li>Enter the 6-digit code the app shows.</li>
      </ol>
      {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data URL, nothing to optimise */}
      <img src={setup.qr} alt="QR code for your authenticator app" width={200} height={200} className="rounded border" />
      <details className="text-sm">
        <summary className="cursor-pointer text-blue-600">Can&apos;t scan? Enter this key instead</summary>
        <code className="mt-2 block select-all rounded bg-slate-100 p-2 font-mono tracking-wider">{setup.secret}</code>
      </details>
      <form action={action} className="space-y-2">
        <Label htmlFor="code">6-digit code</Label>
        <Input
          id="code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9 ]{6,7}"
          maxLength={7}
          required
          className="w-40 font-mono tracking-widest"
        />
        {state && !state.ok && <p className="text-sm text-red-600">{state.error}</p>}
        <Button type="submit" disabled={pending}>
          {pending ? "Checking..." : "Turn on two-factor"}
        </Button>
      </form>
    </div>
  );
}

export function RegenerateRecoveryCodes() {
  const [open, setOpen] = useState(false);
  const [round, setRound] = useState(0); // fresh form state each time it's opened

  if (!open) {
    return (
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
        New recovery codes
      </Button>
    );
  }
  return (
    <RegenerateForm
      key={round}
      onClose={() => {
        setOpen(false);
        setRound((r) => r + 1);
      }}
    />
  );
}

function RegenerateForm({ onClose }: { onClose: () => void }) {
  const [state, action, pending] = useActionState<CodesResult, FormData>(regenerateRecoveryCodes, null);

  if (state?.ok) {
    return <RecoveryCodes codes={state.recoveryCodes} onDone={onClose} doneLabel="Done" />;
  }
  return (
    <form action={action} className="space-y-2">
      <p className="text-sm text-muted-foreground">Your old recovery codes will stop working.</p>
      <Label htmlFor="regen-code">Code from your app</Label>
      <Input id="regen-code" name="code" inputMode="numeric" autoComplete="one-time-code" maxLength={7} required className="w-40 font-mono tracking-widest" />
      {state && !state.ok && <p className="text-sm text-red-600">{state.error}</p>}
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "Checking..." : "Create new codes"}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
