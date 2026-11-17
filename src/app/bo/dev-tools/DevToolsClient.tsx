"use client";

import { useState } from "react";
import { useDebounced } from "@/components/hooks/useDebounced";
import { LOOKUP_LIMIT } from "@/lib/listQuery";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/shadcn/tabs";
import { DevToolsBadge } from "./DevToolsBadge";
import { DevToolsSkeleton } from "./DevToolsSkeleton";
import { listUsers } from "./actions/listUsers";
import { useAsyncList } from "@/components/hooks/useAsyncList";
import DeletedUsersPanel from "./DeletedUsersPanel";
import ActivityPanel from "./ActivityPanel";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-sm text-slate-900 text-right">{children}</span>
    </div>
  );
}

export default function DevToolsClient() {
  const [tab, setTab] = useState<"users" | "deleted" | "activity">("users");
  const [filter, setFilter] = useState("");
  const query = useDebounced(filter.trim());
  // Searched in the database; returns at most LOOKUP_LIMIT newest matches.
  const { data: users, error, refresh } = useAsyncList(() => listUsers(query), [query]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [auditUserId, setAuditUserId] = useState<string | null>(null);

  const filtered = users ?? [];

  const selected = users?.find((u) => u.id === selectedId) ?? null;

  return (
    <div className="max-w-3xl py-4 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dev Tools — Users</h1>
        <p className="text-sm text-slate-500 mt-1">
          User lookup, deleted-user inspection, and audit history — moved here from la-web&apos;s
          /dev-tools so it lives alongside the rest of the admin tooling.
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList className="bg-slate-100 rounded-lg p-1">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="deleted">Deleted users</TabsTrigger>
          <TabsTrigger value="activity">Audit History</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="flex flex-col gap-6 pt-4">
          <p className="text-sm text-slate-500">
            Select a user to inspect their registration status. For their full activity trail, use
            Audit History.
          </p>

          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by name, email, phone or user ID…"
          />
          {users?.length === LOOKUP_LIMIT && (
            <p className="text-xs text-slate-500 -mt-4">
              Showing the newest {LOOKUP_LIMIT} matches. Type more to narrow it down.
            </p>
          )}

          <Card className="p-0 divide-y divide-slate-100 overflow-hidden">
            {error ? (
              <div className="flex flex-col items-start gap-2 p-4">
                <p className="text-sm text-rose-600">{error}</p>
                <Button variant="outline" size="sm" onClick={refresh}>
                  Retry
                </Button>
              </div>
            ) : users === null ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <DevToolsSkeleton shape="text" className="w-1/3" />
                    <DevToolsSkeleton shape="text" className="h-3 w-1/2" />
                  </div>
                  <DevToolsSkeleton shape="block" className="h-6 w-24 rounded-full" />
                </div>
              ))
            ) : filtered.length === 0 ? (
              <p className="text-sm text-slate-500 p-4">No users found.</p>
            ) : (
              filtered.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setSelectedId(u.id)}
                  className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                    u.id === selectedId ? "bg-slate-50" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{u.fullName}</p>
                    <p className="text-sm text-slate-500 truncate">{u.email || u.primaryNumber || "—"}</p>
                  </div>
                  <DevToolsBadge intent={u.isFullyRegistered ? "success" : "warning"}>
                    {u.isFullyRegistered ? "Fully registered" : "Incomplete"}
                  </DevToolsBadge>
                </button>
              ))
            )}
          </Card>

          {selected && (
            <Card className="p-5 flex flex-col gap-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-900">{selected.fullName}</span>
                <DevToolsBadge intent={selected.isFullyRegistered ? "success" : "warning"}>
                  {selected.isFullyRegistered ? "Fully registered" : "Incomplete"}
                </DevToolsBadge>
              </div>

              <Row label="User ID">{selected.userId}</Row>
              <Row label="Email">
                {selected.email ?? "—"}{" "}
                {selected.email && (
                  <DevToolsBadge intent={selected.isEmailVerified ? "success" : "danger"} className="ml-1">
                    {selected.isEmailVerified ? "verified" : "unverified"}
                  </DevToolsBadge>
                )}
              </Row>
              <Row label="Phone">
                {selected.primaryNumber ?? "—"}{" "}
                {selected.primaryNumber && (
                  <DevToolsBadge intent={selected.isPrimaryNumberVerified ? "success" : "danger"} className="ml-1">
                    {selected.isPrimaryNumberVerified ? "verified" : "unverified"}
                  </DevToolsBadge>
                )}
              </Row>
              <Row label="Date of birth">
                {selected.dateOfBirth ? new Date(selected.dateOfBirth).toLocaleDateString() : "—"}
              </Row>
              <Row label="Location">{selected.locality || "—"}</Row>
              <Row label="Provider">{selected.provider}</Row>
              <Row label="Account status">{selected.accountStatus}</Row>
              <Row label="New user">{selected.isNewUser ? "Yes" : "No"}</Row>
              <Row label="Created">{new Date(selected.createdAt).toLocaleString()}</Row>

              <div className="pt-4 mt-2 border-t border-slate-100">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAuditUserId(selected.id);
                    setTab("activity");
                  }}
                >
                  View activity history →
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="deleted" className="pt-4">
          <DeletedUsersPanel />
        </TabsContent>

        <TabsContent value="activity" className="pt-4">
          <ActivityPanel initialUserId={auditUserId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
