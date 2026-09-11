import mongoose, { Schema } from "mongoose";

/**
 * Read-only view onto la-web's `messages` collection — see DevToolsUser.ts
 * for why this is a separate model name.
 */
const DevToolsMessageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "DevToolsConversation" },
    senderId: { type: Schema.Types.ObjectId, ref: "DevToolsUser" },
    text: { type: String },
  },
  { strict: false, collection: "messages", timestamps: true }
);

export default mongoose.models.DevToolsMessage ||
  mongoose.model("DevToolsMessage", DevToolsMessageSchema);
