"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DevToolsBadge } from "./DevToolsBadge";
import { DevToolsSkeleton } from "./DevToolsSkeleton";
import { listDeletedUsers } from "./actions/listDeletedUsers";
import { getDeletedUserData } from "./actions/getDeletedUserData";
import { getConversationMessages } from "./actions/getConversationMessages";
import type { DevToolsConversationMessage } from "./actions/types";
import { useAsyncList } from "@/components/hooks/useAsyncList";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-sm text-slate-900 text-right">{children}</span>
    </div>
  );
}

const statusIntent: Record<string, "success" | "warning" | "danger" | "neutral"> = {
  active: "success",
  pending: "warning",
  off: "neutral",
  expired: "neutral",
  deleted: "danger",
};

export default function DeletedUsersPanel() {
  const { data: users, error: usersError, refresh: refreshUsers } = useAsyncList(listDeletedUsers, []);
  const [filter, setFilter] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {
    data,
    error: dataError,
    refresh: refreshData,
  } = useAsyncList(async () => {
    if (!selectedId) return null;
    return getDeletedUserData(selectedId);
  }, [selectedId]);
  const [openConvoId, setOpenConvoId] = useState<string | null>(null);
  const [messages, setMessages] = useState<DevToolsConversationMessage[] | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);

  const loadingData = !!selectedId && data === null && !dataError;

  // Reset the conversation view whenever the selected user changes.
  useEffect(() => {
    setOpenConvoId(null);
    setMessages(null);
    setMessagesError(null);
  }, [selectedId]);

  const filtered = useMemo(() => {
    if (!users) return [];
    const q = filter.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.userId.toLowerCase().includes(q) ||
        u.deleteFeedback?.toLowerCase().includes(q) ||
        u.originalFullName?.toLowerCase().includes(q) ||
        u.originalEmail?.toLowerCase().includes(q) ||
        u.originalPrimaryNumber?.toLowerCase().includes(q)
    );
  }, [users, filter]);

  const selected = users?.find((u) => u.id === selectedId) ?? null;

  async function loadMessages(convoId: string) {
    setLoadingMessages(true);
    setMessages(null);
    setMessagesError(null);
    try {
      setMessages((await getConversationMessages(convoId)).messages);
    } catch {
      setMessagesError("Couldn't load these messages. Please try again.");
    } finally {
      setLoadingMessages(false);
    }
  }

  function toggleConversation(convoId: string) {
    if (openConvoId === convoId) {
      setOpenConvoId(null);
      return;
    }
    setOpenConvoId(convoId);
    loadMessages(convoId);
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-slate-500">
        Accounts a user has deleted themselves. Their email/phone/name are already anonymized
        (see softDeleteAccount in la-web) — this view is read-only and exists so a deleted
        account&apos;s original listings and chat history can still be looked up when needed.
      </p>

      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by name, email, phone, user ID, or feedback…"
      />

      <Card className="p-0 divide-y divide-slate-100 overflow-hidden">
        {usersError ? (
          <div className="flex flex-col items-start gap-2 p-4">
            <p className="text-sm text-rose-600">{usersError}</p>
            <Button variant="outline" size="sm" onClick={refreshUsers}>
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
              <DevToolsSkeleton shape="text" className="h-3 w-20 shrink-0" />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <p className="text-sm text-slate-500 p-4">No deleted users found.</p>
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
                <p className="text-sm font-medium text-slate-900 truncate">
                  {u.originalFullName || u.userId}
                </p>
                <p className="text-sm text-slate-500 truncate">
                  {u.originalEmail || u.originalPrimaryNumber || u.userId}
                </p>
              </div>
              <span className="text-sm text-slate-500 shrink-0">
                {u.deletedAt ? new Date(u.deletedAt).toLocaleDateString() : "—"}
              </span>
            </button>
          ))
        )}
      </Card>

      {selected && (
        <Card className="p-5 flex flex-col gap-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-900">{selected.userId}</span>
            <DevToolsBadge intent="danger">Deleted</DevToolsBadge>
          </div>

          <Row label="Registered">{new Date(selected.createdAt).toLocaleString()}</Row>
          <Row label="Deleted">{selected.deletedAt ? new Date(selected.deletedAt).toLocaleString() : "—"}</Row>
          <Row label="Delete feedback">{selected.deleteFeedback || "—"}</Row>

          <div className="pt-3 mt-2 border-t border-slate-100">
            <p className="text-sm font-medium text-slate-500 mb-1">Original identity (admin-only)</p>
            <Row label="Name">{selected.originalFullName || "—"}</Row>
            <Row label="Email">{selected.originalEmail || "—"}</Row>
            <Row label="Phone">{selected.originalPrimaryNumber || "—"}</Row>
          </div>

          {selected.audit.length > 0 && (
            <div className="pt-3 mt-2 border-t border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">Audit trail</p>
              {selected.audit.map((a, i) => (
                <p key={i} className="text-sm text-slate-700">
                  {a.action} — {new Date(a.at).toLocaleString()}
                </p>
              ))}
            </div>
          )}

          <div className="pt-4 mt-2 border-t border-slate-100">
            <p className="text-sm font-semibold text-slate-900 mb-2">Listings</p>
            {dataError ? (
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-rose-600">{dataError}</p>
                <Button variant="outline" size="sm" onClick={refreshData}>
                  Retry
                </Button>
              </div>
            ) : loadingData ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <DevToolsSkeleton shape="text" className="w-1/2" />
                      <DevToolsSkeleton shape="block" className="h-5 w-16 rounded-full" />
                    </div>
                    <DevToolsSkeleton shape="text" className="h-3 w-2/3" />
                  </div>
                ))}
              </div>
            ) : !data || data.listings.length === 0 ? (
              <p className="text-sm text-slate-500">No listings.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {data.listings.map((l) => (
                  <div key={l.id} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-slate-900 truncate">{l.name}</p>
                      <DevToolsBadge intent={statusIntent[l.status] ?? "neutral"}>
                        {l.status}
                      </DevToolsBadge>
                    </div>
                    <p className="text-sm text-slate-500">
                      {l.category} / {l.subcategory} · {new Date(l.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-slate-500">
                      Seller snapshot: {l.sellerInfo.name} · {l.sellerInfo.phone} · {l.sellerInfo.email}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100">
            <p className="text-sm font-semibold text-slate-900 mb-2">Conversations</p>
            {dataError ? (
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-rose-600">{dataError}</p>
                <Button variant="outline" size="sm" onClick={refreshData}>
                  Retry
                </Button>
              </div>
            ) : loadingData ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 p-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0 space-y-2">
                      <DevToolsSkeleton shape="text" className="w-1/2" />
                      <DevToolsSkeleton shape="text" className="h-3 w-1/3" />
                    </div>
                    <DevToolsSkeleton shape="block" className="h-9 w-28 rounded-full shrink-0" />
                  </div>
                ))}
              </div>
            ) : !data || data.conversations.length === 0 ? (
              <p className="text-sm text-slate-500">No conversations.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {data.conversations.map((c) => (
                  <div key={c.id} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {c.adTitle || "(untitled ad)"}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          with {c.otherParticipant.name}
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => toggleConversation(c.id)}>
                        {openConvoId === c.id ? "Hide messages" : "View messages"}
                      </Button>
                    </div>

                    {openConvoId === c.id && (
                      <div className="mt-3 pt-3 border-t border-slate-100 max-h-80 overflow-y-auto space-y-2">
                        {messagesError ? (
                          <div className="flex flex-col items-start gap-2">
                            <p className="text-sm text-rose-600">{messagesError}</p>
                            <Button variant="outline" size="sm" onClick={() => loadMessages(c.id)}>
                              Retry
                            </Button>
                          </div>
                        ) : loadingMessages ? (
                          <div className="flex flex-col gap-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <DevToolsSkeleton key={i} shape="text" className="w-2/3" />
                            ))}
                          </div>
                        ) : !messages || messages.length === 0 ? (
                          <p className="text-sm text-slate-500">No messages.</p>
                        ) : (
                          messages.map((m) => (
                            <div key={m.id} className="text-sm">
                              <span className="font-medium text-slate-900">{m.senderName}: </span>
                              <span className="text-slate-700">{m.text}</span>
                              <span className="text-slate-500"> · {new Date(m.createdAt).toLocaleString()}</span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
