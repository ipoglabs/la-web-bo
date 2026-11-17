import mongoose, { Schema, models, model, type Model } from "mongoose"

import { ADMIN_ROLES, type AdminRole } from "@/lib/adminPermissions"

export type { AdminRole }

export interface IAdminUserAudit {
  action: "role_change" | "status_change";
  from?: string;
  to?: string;
  by?: mongoose.Types.ObjectId;
  at?: Date;
}

export interface IAdminUser {
  firstName: string;
  lastName: string;
  designation: string;
  age: number;
  gender: "male" | "female" | "other";
  country: string;
  location: string;
  role: AdminRole;
  employeeId: string;
  email: string;
  password: string;
  isActive: boolean;
  /** Bump to sign the account out everywhere (deactivate, role change, password reset). */
  tokenVersion: number;
  failedLoginCount: number;
  lockedUntil?: Date;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  passwordChangedAt?: Date;
  /** Set when someone else chose the password (new account, reset). Cleared once they pick their own. */
  mustChangePassword: boolean;
  /** Two-factor sign-in (authenticator app). Secrets are sealed with ADMIN_2FA_KEY. */
  twoFactorEnabled: boolean;
  twoFactorEnabledAt?: Date;
  totpSecret?: string;
  totpPendingSecret?: string;
  totpLastStep?: number;
  recoveryCodeHashes?: string[];
  audit: IAdminUserAudit[];
  createdBy?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    designation: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 18, max: 100 },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    country: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },

    role: {
      type: String,
      enum: ADMIN_ROLES,
      required: true,
      index: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    tokenVersion: { type: Number, default: 0 },
    failedLoginCount: { type: Number, default: 0 },
    lockedUntil: Date,
    lastLoginAt: Date,
    lastLoginIp: String,
    passwordChangedAt: Date,
    mustChangePassword: { type: Boolean, default: false },

    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorEnabledAt: Date,
    totpSecret: { type: String, select: false },
    totpPendingSecret: { type: String, select: false },
    totpLastStep: { type: Number, select: false },
    recoveryCodeHashes: { type: [String], select: false, default: undefined },

    // ✅ AUDIT TRAIL
    audit: [
      {
        action: {
          type: String,
          enum: ["role_change", "status_change"],
          required: true,
        },
        from: String,
        to: String,
        by: { type: Schema.Types.ObjectId, ref: "AdminUser" },
        at: { type: Date, default: Date.now },
      },
    ],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "AdminUser",
    },
  },
  { timestamps: true }
)

export default (models.AdminUser as Model<IAdminUser>) ||
  model<IAdminUser>("AdminUser", AdminUserSchema)
