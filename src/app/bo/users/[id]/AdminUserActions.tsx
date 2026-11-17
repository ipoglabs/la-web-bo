"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/app/bo/actions/deleteUser";
import { suspendUser } from "@/app/bo/actions/suspendUser";

/** Asks for the reason that goes into the audit log. null = cancelled. */
function askReason(question: string): string | null {
  const r = window.prompt(`${question}\n\nReason (saved to the audit log, min 5 characters):`);
  if (r === null) return null;
  if (r.trim().length < 5) {
    alert("A reason of at least 5 characters is required.");
    return null;
  }
  return r.trim();
}

export default function AdminUserActions({
  canSuspend,
  canDelete,
  userId,
  userEmail,
  isSuspended,
}: {
  canSuspend: boolean;
  canDelete: boolean;
  userId: string;
  userEmail?: string;
  isSuspended: boolean;
}) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const [localSuspended, setLocalSuspended] = useState(isSuspended);

  const who = userEmail || userId;

  const onDelete = () => {
    const reason = askReason(`Delete this user account?\n${who}\n\nThe account is closed and hidden; data is kept.`);
    if (!reason) return;

    start(async () => {
      const res = await deleteUser(userId, reason);
      if (!res?.ok) {
        alert(res?.error || "Delete failed");
        return;
      }
      router.push("/bo/users");
      router.refresh();
    });
  };

  const onToggleSuspend = () => {
    const next = !localSuspended;
    const reason = askReason(`${next ? "Suspend" : "Unsuspend"} this user?\n${who}`);
    if (!reason) return;

    start(async () => {
      const res = await suspendUser(userId, next, reason);
      if (!res?.ok) {
        alert(res?.error || "Suspend failed");
        return;
      }
      setLocalSuspended(next);
      router.refresh();
    });
  };

  if (!canSuspend && !canDelete) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {canSuspend && (
        <Button variant={localSuspended ? "outline" : "secondary"} size="sm" disabled={pending} onClick={onToggleSuspend}>
          {pending ? "Saving..." : localSuspended ? "Unsuspend" : "Suspend"}
        </Button>
      )}

      {canDelete && (
        <Button variant="destructive" size="sm" disabled={pending} onClick={onDelete}>
          {pending ? "Deleting..." : "Delete User"}
        </Button>
      )}
    </div>
  );
}
