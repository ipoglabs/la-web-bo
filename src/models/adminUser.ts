import mongoose, { Schema, models, model, type Model } from "mongoose"

export type AdminRole = "super_admin" | "admin" | "moderator" | "support" | "analyst";

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
      enum: ["super_admin", "admin", "moderator", "support", "analyst"],
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
