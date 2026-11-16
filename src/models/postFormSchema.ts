/**
 * Read/patch view of la-web's `postformschemas` collection — the post form
 * definition per (category, subcategory, country). la-web owns the full
 * schema and the code defaults; bo only inserts dropdown options into forms
 * that already exist in the DB (see bo/actions/optionRequests.ts).
 */

import mongoose, { Schema, type Model } from "mongoose";

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormFieldDef {
  key: string;
  type: string;
  label: string;
  display?: string;
  allowCustom?: boolean;
  options?: FormFieldOption[];
  [extra: string]: unknown;
}

export interface FormSection {
  title?: string;
  fields: FormFieldDef[];
  [extra: string]: unknown;
}

export interface IPostFormSchema {
  category: string;
  subcategory: string;
  country: string;
  sections: FormSection[];
}

// strict: false — la-web owns the shape; never drop fields we don't model.
const PostFormSchemaSchema = new Schema<IPostFormSchema>(
  {
    category: String,
    subcategory: String,
    country: String,
    sections: { type: Schema.Types.Mixed },
  },
  { strict: false, timestamps: true },
);

export default (mongoose.models.PostFormSchema as Model<IPostFormSchema>) ??
  mongoose.model<IPostFormSchema>("PostFormSchema", PostFormSchemaSchema);
