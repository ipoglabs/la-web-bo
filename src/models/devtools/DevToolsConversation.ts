import mongoose, { Schema } from "mongoose";

/**
 * Read-only view onto la-web's `conversations` collection — see
 * DevToolsUser.ts for why this is a separate model name.
 */
const DevToolsConversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "DevToolsUser" }],
    adId: { type: String },
    adTitle: { type: String },
    lastMessage: { type: String },
    lastMessageAt: { type: Date },
  },
  { strict: false, collection: "conversations", timestamps: true }
);

export default mongoose.models.DevToolsConversation ||
  mongoose.model("DevToolsConversation", DevToolsConversationSchema);
