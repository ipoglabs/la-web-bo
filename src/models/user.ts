import mongoose from "mongoose";
import { randomUUID } from "crypto";

/**
 * Mirrors la-web's real `users` collection schema exactly (same MongoDB
 * database) — this used to be a bo-only guess (firstName/lastName, required
 * password, plain `role`) that never matched the real documents. Keep this
 * in sync with la-web's src/models/user.ts if that schema changes.
 */

const AddressSchema = new mongoose.Schema(
  {
    country: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    postalCode: { type: String, trim: true },
  },
  { _id: false }
);

const SavedLocationSchema = new mongoose.Schema({
  flagCode: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  region: { type: String, trim: true, default: "" },
  country: { type: String, required: true, trim: true },
  primary: { type: Boolean, default: false },
});

const RecentSearchSchema = new mongoose.Schema({
  keyword: { type: String, trim: true, default: "" },
  scopeCat: { type: String, trim: true },
  scopeLabel: { type: String, trim: true },
  scopeSub: { type: String, trim: true },
  scopeSubLabel: { type: String, trim: true },
  searchedAt: { type: Date, default: Date.now },
});

const AuditSchema = new mongoose.Schema(
  {
    action: { type: String },
    IPAddress: { type: String, trim: true },
    Device: { type: String, trim: true },
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    // Never selected by default — only dev-tools-style admin lookups opt in
    // with `.select("+uuid")`.
    uuid: { type: String, required: true, unique: true, default: randomUUID, select: false },

    userId: { type: String, required: true, unique: true },

    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String },

    nationality: { type: String, trim: true },
    residency: { type: String, trim: true },

    locality: { type: String, trim: true },
    address: AddressSchema,
    savedLocations: { type: [SavedLocationSchema], default: [] },
    recentSearches: { type: [RecentSearchSchema], default: [] },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    isEmailVerified: { type: Boolean, default: false },

    appleEmailId: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    // sparse (not required): passwordless accounts (magic-link/Google/Apple)
    // never collect a phone number. At least one of email/primaryNumber is
    // enforced below in the pre-validate hook.
    primaryNumber: { type: String, unique: true, sparse: true, trim: true },
    isPrimaryNumberVerified: { type: Boolean, default: false },

    secondaryNumber1: { type: String, trim: true },
    secondaryNumber2: { type: String, trim: true },

    // optional — passwordless accounts never set this.
    password: { type: String },

    // Public-facing identity badge — NOT an access-level role. Real admin
    // access is bo's own AdminUser/adminAuth session, unrelated to this.
    publicRole: { type: String, required: true },

    roleTitle: { type: String, trim: true },
    roleDescription: { type: String, trim: true },

    roles: { type: [String], default: [] },
    roleSpecialties: { type: mongoose.Schema.Types.Mixed, default: {} },
    customRole: { type: String, trim: true },

    intent: {
      type: String,
      enum: ["buying", "selling", "both", "browsing"],
      default: "both",
    },

    provider: {
      type: String,
      enum: ["credentials", "google", "apple"],
      default: "credentials",
    },

    accountStatus: {
      type: String,
      enum: ["Pending", "Active", "Suspended", "Deleted"],
      default: "Pending",
    },

    isNewUser: { type: Boolean, default: true },

    isTermsAndConditionAccepted: { type: Boolean, default: false },
    isPrivacyAndPolicyAccepted: { type: Boolean, default: false },
    isCookiesPolicyAccepted: { type: Boolean, default: false },

    marketingOptIn: { type: Boolean, default: false },

    // Moderation — real ad reports live in the separate AdReport collection
    // (@/models/adReport), not embedded here. There is no user-level
    // "reported" concept in the real schema.
    isSuspended: { type: Boolean, default: false, index: true },

    audit: {
      type: [AuditSchema],
      default: [],
    },

    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
    deleteFeedback: { type: String, trim: true },

    deletedIdentitySnapshot: {
      email: { type: String, trim: true },
      primaryNumber: { type: String, trim: true },
      fullName: { type: String, trim: true },
    },

    lastLoginAt: { type: Date, index: true },
    dormantNudgedAt: { type: Date },

    // Derived — true only once email, primaryNumber, dateOfBirth, and
    // locality are all present. Kept in sync by the pre-validate hook below.
    isFullyRegistered: { type: Boolean, default: false },

    image: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("validate", function (this: any) {
  if (!this.email && !this.primaryNumber) {
    throw new Error("At least one of email or primaryNumber is required.");
  }

  this.isFullyRegistered = Boolean(
    this.email && this.primaryNumber && this.dateOfBirth && this.locality
  );
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
