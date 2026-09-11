"use server";

import { Types } from "mongoose";
import connectDB from "@/config/database";
import DevToolsMessage from "@/models/devtools/DevToolsMessage";
import DevToolsConversation from "@/models/devtools/DevToolsConversation";
import type { DevToolsConversationDetail } from "./types";

type PopulatedSender = { _id: Types.ObjectId; fullName?: string } | Types.ObjectId;

type MessageLean = {
  _id: unknown;
  senderId: PopulatedSender;
  text: string;
  createdAt: Date;
};

type PopulatedParticipant = { _id: Types.ObjectId; fullName?: string };

type ConversationLean = {
  adId: string;
  adTitle: string;
  participants: (PopulatedParticipant | null)[];
};

/** Full message thread + who/what it's about (ad, both participants) for one
 * conversation — gated by the /bo admin session, see getDeletedUserData.ts. */
export async function getConversationMessages(conversationId: string): Promise<DevToolsConversationDetail> {
  if (!Types.ObjectId.isValid(conversationId)) return { conversation: null, messages: [] };
  await connectDB();

  const [convo, messages] = await Promise.all([
    DevToolsConversation.findById(conversationId)
      .populate<{ participants: PopulatedParticipant[] }>("participants", "fullName _id")
      .lean<ConversationLean | null>(),
    DevToolsMessage.find({ conversationId })
      .sort({ _id: 1 })
      .populate<{ senderId: { _id: Types.ObjectId; fullName?: string } }>("senderId", "fullName")
      .lean<MessageLean[]>(),
  ]);

  return {
    conversation: convo
      ? {
          adId: convo.adId,
          adTitle: convo.adTitle,
          participants: convo.participants
            .filter((p): p is PopulatedParticipant => p != null)
            .map((p) => ({ id: String(p._id), fullName: p.fullName || "Unknown" })),
        }
      : null,
    messages: messages.map((m) => {
      const sender = m.senderId as { _id: Types.ObjectId; fullName?: string };
      return {
        id: String(m._id),
        senderId: String(sender._id),
        senderName: sender.fullName || "Unknown",
        text: m.text,
        createdAt: new Date(m.createdAt).toISOString(),
      };
    }),
  };
}
