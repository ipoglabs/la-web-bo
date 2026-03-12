"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteUser } from "../../../actions/deleteUser";
import { reportUser } from "@/app/bo/actions/reportUser";
import { clearUserReport } from "@/app/bo/actions/clearUserReport";
import { suspendUser } from "@/app/bo/actions/suspendUser";

const CAN_REPORT = ["super_admin", "admin", "moderator"] as const;
const CAN_SUSPEND = ["super_admin", "admin"] as const;
const CAN_DELETE = ["super_admin"] as const;

export default function AdminUserActions({
  viewerRole,
  userId,
  userEmail,
  isReported,
  isSuspended,
}: {
  viewerRole: string;
  userId: string;
  userEmail?: string;
  isReported: boolean;
  isSuspended: boolean;
}) {
  const [pending, start] = useTransition();
  const router = useRouter();

  const canReport = CAN_REPORT.includes(viewerRole as any);
  const canSuspend = CAN_SUSPEND.includes(viewerRole as any);
  const canDelete = CAN_DELETE.includes(viewerRole as any);

  const [localReported, setLocalReported] = useState(isReported);
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

  const onReport = () => {
    if (!canReport || localReported) return;

    const reason = prompt("Report reason (optional):") || "";

    start(async () => {
      const res = await reportUser(userId, reason);
      if (!res?.ok) {
        alert(res?.error || "Report failed");
        return;
      }
      setLocalReported(true);
      router.refresh();
    });
  };

  const onClearReport = () => {
    if (!canSuspend) return;

    const ok = confirm("Clear report for this user?");
    if (!ok) return;

    start(async () => {
      const res = await clearUserReport(userId);
      if (!res?.ok) {
        alert(res?.error || "Clear failed");
        return;
      }
      setLocalReported(false);
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

      {canReport && !localReported && (
        <Button
          variant="default"
          size="sm"
          disabled={pending}
          onClick={onReport}
        >
          {pending ? "Saving..." : "Report"}
        </Button>
      )}

      {canSuspend && localReported && (
        <Button
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={onClearReport}
        >
          {pending ? "Saving..." : "Clear Report"}
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