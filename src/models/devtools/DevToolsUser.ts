import mongoose, { Schema } from "mongoose";

/**
 * Read-only view onto la-web's `users` collection (same MongoDB database).
 * Registered under a distinct model name ("DevToolsUser", not "User") so it
 * never collides with this repo's own, differently-shaped `@/models/user`
 * model — both would otherwise fight over `mongoose.models.User`.
 *
 * Only declares the fields dev-tools actually reads. `strict: false` so any
 * field this schema doesn't know about still survives hydration instead of
 * being silently dropped — la-web's real schema (src/models/user.ts) is the
 * source of truth and may have more fields than this trimmed-down copy.
 */
const DevToolsUserSchema = new Schema(
  {
    uuid: { type: String, select: false },
    userId: { type: String },
    fullName: { type: String },
    email: { type: String },
    isEmailVerified: { type: Boolean },
    primaryNumber: { type: String },
    isPrimaryNumberVerified: { type: Boolean },
    dateOfBirth: { type: Date },
    locality: { type: String },
    provider: { type: String },
    accountStatus: { type: String },
    isFullyRegistered: { type: Boolean },
    isNewUser: { type: Boolean },
    isDeleted: { type: Boolean },
    deletedAt: { type: Date },
    deleteFeedback: { type: String },
    audit: [
      {
        _id: false,
        action: { type: String },
        at: { type: Date },
      },
    ],
    deletedIdentitySnapshot: {
      _id: false,
      email: { type: String },
      primaryNumber: { type: String },
      fullName: { type: String },
    },
    publicRole: { type: String },
    roleTitle: { type: String },
    roleDescription: { type: String },
    customRole: { type: String },
  },
  { strict: false, collection: "users" }
);

export default mongoose.models.DevToolsUser ||
  mongoose.model("DevToolsUser", DevToolsUserSchema);
