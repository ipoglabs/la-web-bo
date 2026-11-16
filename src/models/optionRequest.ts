/**
 * Mirrors la-web's models/OptionRequest.ts (collection `optionrequests`).
 *
 * Dropdown values sellers typed that aren't options in their post form
 * (e.g. a car make we don't list). la-web records them when a post is saved;
 * bo reviews them: "added" puts the value into that form's options in
 * `postformschemas` (la-web's form sync re-applies added values), "dismissed"
 * leaves the form alone. Posts keep the typed value either way.
 */

import mongoose, { Schema, type Model, type Types } from "mongoose";

export type OptionRequestStatus = "pending" | "added" | "dismissed";

export interface IOptionRequest {
  category: string;
  subcategory: string;
  country: string;
  fieldKey: string;
  fieldLabel: string;
  value: string;
  valueKey: string;
  postIds: Types.ObjectId[];
  status: OptionRequestStatus;
  reviewedAt?: Date;
  reviewedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OptionRequestSchema = new Schema<IOptionRequest>(
  {
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    country: { type: String, required: true },
    fieldKey: { type: String, required: true },
    fieldLabel: { type: String, required: true },
    value: { type: String, required: true, trim: true },
    valueKey: { type: String, required: true },
    postIds: { type: [Schema.Types.ObjectId], default: [] },
    status: { type: String, enum: ["pending", "added", "dismissed"], default: "pending", index: true },
    reviewedAt: Date,
    reviewedBy: String,
  },
  { timestamps: true },
);

export default (mongoose.models.OptionRequest as Model<IOptionRequest>) ??
  mongoose.model<IOptionRequest>("OptionRequest", OptionRequestSchema);
