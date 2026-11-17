"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { sendTestAlert } from "./actions/testAlert";

export default function TestAlertButton() {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  return (
    <div className="space-y-2">
      <Button type="button" variant="outline" size="sm" disabled={pending} onClick={() => start(async () => setResult(await sendTestAlert()))}>
        {pending ? "Sending..." : "Send test alert"}
      </Button>
      {result && <p className={`text-sm ${result.ok ? "text-green-700" : "text-red-600"}`}>{result.message}</p>}
    </div>
  );
}
