"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteUser } from "../../../actions/deleteUser";
import { suspendUser } from "@/app/bo/actions/suspendUser";

const CAN_SUSPEND = ["super_admin", "admin"] as const;
const CAN_DELETE = ["super_admin"] as const;

export default function AdminUserActions({
  viewerRole,
  userId,
  userEmail,
  isSuspended,
}: {
  viewerRole: string;
  userId: string;
  userEmail?: string;
  isSuspended: boolean;
}) {
  const [pending, start] = useTransition();
  const router = useRouter();

  const canSuspend = CAN_SUSPEND.includes(viewerRole as any);
  const canDelete = CAN_DELETE.includes(viewerRole as any);

  const [localSuspended, setLocalSuspended] = useState(isSuspended);

  const onDelete = () => {
    if (!canDelete) return;

    const ok = confirm(`Soft delete this user?\n\n${userEmail || userId}`);
    if (!ok) return;

    start(async () => {
      const res = await deleteUser(userId);
      if (!res?.ok) {
        alert(res?.error || "Delete failed");
        return;
      }
      router.push("/bo/users");
      router.refresh();
    });
  };

  const onToggleSuspend = () => {
    if (!canSuspend) return;

    const next = !localSuspended;
    const ok = confirm(
      `${next ? "Suspend" : "Unsuspend"} this user?\n\n${userEmail || userId}`
    );
    if (!ok) return;

    start(async () => {
      const res = await suspendUser(userId, next);
      if (!res?.ok) {
        alert(res?.error || "Suspend failed");
        return;
      }
      setLocalSuspended(next);
      router.refresh();
    });
  };

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {canSuspend && (
        <Button
          variant={localSuspended ? "outline" : "secondary"}
          size="sm"
          disabled={pending}
          onClick={onToggleSuspend}
        >
          {pending ? "Saving..." : localSuspended ? "Unsuspend" : "Suspend"}
        </Button>
      )}

      {canDelete && (
        <Button
          variant="destructive"
          size="sm"
          disabled={pending}
          onClick={onDelete}
        >
          {pending ? "Deleting..." : "Delete User"}
        </Button>
      )}
    </div>
  );
}
