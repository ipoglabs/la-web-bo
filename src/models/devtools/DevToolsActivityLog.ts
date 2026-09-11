import mongoose, { Schema } from "mongoose";

/**
 * Read-only view onto la-web's `activitylogs` collection — see
 * DevToolsUser.ts for why this is a separate model name.
 */
const DevToolsActivityLogSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "DevToolsUser" },
    action: { type: String },
    metadata: { type: Schema.Types.Mixed },
    actorId: { type: Schema.Types.ObjectId, ref: "DevToolsUser" },
  },
  { strict: false, collection: "activitylogs", timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.DevToolsActivityLog ||
  mongoose.model("DevToolsActivityLog", DevToolsActivityLogSchema);
