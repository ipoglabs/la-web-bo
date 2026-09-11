import mongoose, { Schema } from "mongoose";

/**
 * Read-only view onto la-web's `alerts` collection — see DevToolsUser.ts for
 * why this is a separate model name.
 */
const DevToolsAlertSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "DevToolsUser" },
    category: { type: String },
    subCategory: { type: String },
    location: { type: String },
    priceMin: { type: Number },
    priceMax: { type: Number },
    keywords: [{ type: String }],
  },
  { strict: false, collection: "alerts", timestamps: true }
);

export default mongoose.models.DevToolsAlert ||
  mongoose.model("DevToolsAlert", DevToolsAlertSchema);
