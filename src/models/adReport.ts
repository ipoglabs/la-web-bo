/**
 * models/adReport.ts
 *
 * Mirrors la-web's real `ad_reports` collection schema exactly (same
 * MongoDB database, src/components/report-ad/model.ts there) — this is
 * where real end-user ad reports live. bo only reviews these; it never
 * creates them (reports are submitted from the live site's listing pages).
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export type ReportIssue =
  | "scam_fraud"
  | "misleading"
  | "spam"
  | "prohibited_item"
  | "offensive"
  | "illegal_content"
  | "counterfeit"
  | "duplicate"
  | "wrong_category"
  | "already_sold";

export interface IAdReport extends Document {
  ticketId: string;

  adId: string;
  adTitle: string;
  adThumbnail: string;
  sellerName: string;
  sellerId: string;
  location: string;

  reporterId: string | null;
  reporterEmail: string | null;
  hideIdentity: boolean;

  issues: ReportIssue[];
  details: string;

  status: "pending" | "reviewed" | "actioned" | "dismissed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  reviewedAt: Date | null;
  reviewedBy: string | null;
  resolution: string | null;
}

const AdReportSchema = new Schema<IAdReport>(
  {
    ticketId: { type: String, required: true, unique: true, index: true },

    adId: { type: String, required: true, index: true },
    adTitle: { type: String, required: true },
    adThumbnail: { type: String, default: "" },
    sellerName: { type: String, required: true },
    sellerId: { type: String, default: "" },
    location: { type: String, default: "" },

    reporterId: { type: String, default: null, index: true },
    reporterEmail: { type: String, default: null },
    hideIdentity: { type: Boolean, default: true },

    issues: { type: [String], required: true },
    details: { type: String, default: "", maxlength: 500 },

    status: { type: String, enum: ["pending", "reviewed", "actioned", "dismissed"], default: "pending" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    reviewedAt: { type: Date, default: null },
    reviewedBy: { type: String, default: null },
    resolution: { type: String, default: null },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

AdReportSchema.index({ status: 1, createdAt: -1 });

const AdReport: Model<IAdReport> =
  (mongoose.models.AdReport as Model<IAdReport>) ?? mongoose.model<IAdReport>("AdReport", AdReportSchema);

export default AdReport;
