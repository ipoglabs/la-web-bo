import mongoose, { Schema, models, model, type Model } from "mongoose";

/** Append-only record of every back-office action. Nothing in bo updates or
 *  deletes these documents; keep it that way. */
export const AUDIT_ACTIONS = [
  // auth
  "auth.login",
  "auth.login_failed",
  "auth.locked",
  "auth.logout",
  "auth.password_reset", // written by scripts/reset-admin-password.mjs
  // staff
  "staff.create",
  "staff.role_change",
  "staff.activate",
  "staff.deactivate",
  // end users
  "user.suspend",
  "user.unsuspend",
  "user.delete",
  // ads
  "post.approve",
  "post.reject",
  "post.pause",
  "post.expire",
  "post.suspend",
  // reports & options
  "report.review",
  "option.add",
  "option.dismiss",
  // sensitive reads
  "devtools.view_user",
  "devtools.view_conversation",
  "devtools.view_deleted_user",
] as const;
export type AuditAction = (typeof AUDIT_ACTIONS)[number];

export type AuditTargetType = "admin" | "user" | "post" | "report" | "option_request" | "conversation" | "none";

export interface IAdminAuditLog {
  actorId?: mongoose.Types.ObjectId;
  actorEmail: string;
  actorRole?: string;
  action: AuditAction;
  targetType: AuditTargetType;
  targetId?: string;
  targetLabel?: string;
  reason?: string;
  meta?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

const AdminAuditLogSchema = new Schema<IAdminAuditLog>(
  {
    actorId: { type: Schema.Types.ObjectId, ref: "AdminUser", index: true },
    actorEmail: { type: String, required: true, lowercase: true, trim: true },
    actorRole: String,
    action: { type: String, enum: AUDIT_ACTIONS, required: true, index: true },
    targetType: { type: String, required: true },
    targetId: { type: String, index: true },
    targetLabel: String,
    reason: { type: String, maxlength: 1000 },
    meta: Schema.Types.Mixed,
    ip: String,
    userAgent: { type: String, maxlength: 400 },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

AdminAuditLogSchema.index({ createdAt: -1 });

export default (models.AdminAuditLog as Model<IAdminAuditLog>) ||
  model<IAdminAuditLog>("AdminAuditLog", AdminAuditLogSchema);
