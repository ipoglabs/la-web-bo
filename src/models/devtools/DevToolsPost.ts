import mongoose, { Schema } from "mongoose";

/**
 * Read-only view onto la-web's `posts` collection — see DevToolsUser.ts for
 * why this is a separate model name ("DevToolsPost", not "Post") rather than
 * reusing this repo's own @/models/post.
 */
const DevToolsPostSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "DevToolsUser" },
    adsId: { type: String },
    name: { type: String },
    category: { type: String },
    subcategory: { type: String },
    status: { type: String },
    seller_info: {
      _id: false,
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },
  },
  { strict: false, collection: "posts", timestamps: true }
);

export default mongoose.models.DevToolsPost ||
  mongoose.model("DevToolsPost", DevToolsPostSchema);
