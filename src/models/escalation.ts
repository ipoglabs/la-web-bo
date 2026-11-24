import { Schema, models, model, type Model, type Types } from "mongoose";

/**
 * A case a Moderator or Support member hands up to the admins: a scam,
 * illegal item, a seller with repeated valid reports, an appeal. bo's own
 * collection (`boescalations`); la-web never reads it.
 *
 * Every create and resolve is also in the audit log, against the escalated
 * ad / user / report, so the target's history shows it.
 */
export const ESCALATION_TARGETS = ["post", "user", "report"] as const;
export type EscalationTarget = (typeof ESCALATION_TARGETS)[number];

export interface IEscalation {
  targetType: EscalationTarget;
  targetId: string;
  targetLabel?: string;
  note: string;
  status: "open" | "resolved";
  createdById?: Types.ObjectId;
  createdByEmail: string;
  createdByRole?: string;
  resolvedByEmail?: string;
  resolvedAt?: Date;
  resolution?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EscalationSchema = new Schema<IEscalation>(
  {
    targetType: { type: String, enum: ESCALATION_TARGETS, required: true },
    targetId: { type: String, required: true },
    targetLabel: String,
    note: { type: String, required: true, maxlength: 1000 },
    status: { type: String, enum: ["open", "resolved"], default: "open" },
    createdById: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    createdByEmail: { type: String, required: true, lowercase: true, trim: true },
    createdByRole: String,
    resolvedByEmail: { type: String, lowercase: true, trim: true },
    resolvedAt: Date,
    resolution: { type: String, maxlength: 1000 },
  },
  { timestamps: true, collection: "boescalations" },
);

EscalationSchema.index({ status: 1, createdAt: 1 });
EscalationSchema.index({ targetType: 1, targetId: 1, status: 1 });

export default (models.Escalation as Model<IEscalation>) || model<IEscalation>("Escalation", EscalationSchema);
