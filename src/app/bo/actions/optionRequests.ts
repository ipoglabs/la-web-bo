"use server";

import { Types } from "mongoose";
import connectDB from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/adminGuard";
import OptionRequest from "@/models/optionRequest";
import PostFormSchema, { type FormSection } from "@/models/postFormSchema";
import Post from "@/models/post";

/** Same rule as la-web's CUSTOM_OPTION (posting/form-schema/types.ts). */
const OPTION_PATTERN = /^[\p{L}\p{N} .,'&()/+-]+$/u;
const OPTION_MAX = 40;

type ActionResult = { ok: true } | { ok: false; error: string };

/** Port of la-web's withOption: insert alphabetically (after a leading "Any"), skip duplicates. */
function withOption(sections: FormSection[], fieldKey: string, value: string): { sections: FormSection[]; found: boolean } {
  const key = value.toLowerCase();
  let found = false;
  const next = sections.map((section) => ({
    ...section,
    fields: section.fields.map((field) => {
      const acceptsCustom = field.type === "select" && field.display === "dropdown" && field.allowCustom === true;
      if (field.key !== fieldKey || !acceptsCustom) return field;
      found = true;
      const options = field.options ?? [];
      if (options.some((o) => o.value.toLowerCase() === key || o.label.toLowerCase() === key)) return field;
      const start = options[0]?.value === "Any" ? 1 : 0;
      const after = options.findIndex((o, i) => i >= start && o.label.localeCompare(value, "en", { sensitivity: "base" }) > 0);
      const at = after >= 0 ? after : options.length;
      return { ...field, options: [...options.slice(0, at), { value, label: value }, ...options.slice(at)] };
    }),
  }));
  return { sections: next, found };
}

export async function addOptionRequest(id: string, label: string): Promise<ActionResult> {
  // Changing post forms is configuration — admins only.
  const guard = await requireAdmin("options.review");
  if (!guard.ok) return guard;
  const session = guard.admin;
  if (!Types.ObjectId.isValid(id)) return { ok: false, error: "Invalid request id" };

  const value = label.trim().replace(/\s+/g, " ");
  if (!value || value.length > OPTION_MAX || !OPTION_PATTERN.test(value)) {
    return { ok: false, error: `Use up to ${OPTION_MAX} letters, numbers, spaces and . , ' & ( ) / + -` };
  }

  try {
    await connectDB();
    const request = await OptionRequest.findOne({ _id: id, status: "pending" });
    if (!request) return { ok: false, error: "Request not found or already reviewed" };
    const { category, subcategory, country, fieldKey } = request;

    // la-web serves forms missing from the DB from its code defaults, which bo
    // doesn't have — those must be added from la-web's /admin instead.
    const doc = await PostFormSchema.findOne({ category, subcategory, country }).lean();
    if (!doc?.sections) {
      return { ok: false, error: `The ${category} › ${subcategory} (${country}) form isn't in the database yet — add this one from la-web's /admin.` };
    }

    const { sections, found } = withOption(doc.sections, fieldKey, value);
    if (!found) return { ok: false, error: `The form has no "${request.fieldLabel}" dropdown that accepts new values.` };

    await PostFormSchema.updateOne({ _id: doc._id }, { $set: { sections } });

    // Give the posts that used this value the approved spelling.
    if (value !== request.value) {
      const path = Post.schema.path(fieldKey) ? fieldKey : `attributes.${fieldKey}`;
      await Post.updateMany({ _id: { $in: request.postIds }, [path]: request.value }, { $set: { [path]: value } });
      request.value = value;
    }

    request.status = "added";
    request.reviewedAt = new Date();
    request.reviewedBy = session.email;
    await request.save();
    await logAdminAction(session, {
      action: "option.add",
      targetType: "option_request",
      targetId: id,
      targetLabel: `${category} › ${subcategory} (${country}) · ${request.fieldLabel}: ${value}`,
      meta: { postsUpdated: request.postIds?.length ?? 0 },
    });
    return { ok: true };
  } catch (err) {
    console.error("[option-requests] add failed:", err);
    return { ok: false, error: "Couldn't add the option." };
  }
}

/** Leaves the form as it is; the posts keep the typed value. */
export async function dismissOptionRequest(id: string): Promise<ActionResult> {
  // Changing post forms is configuration — admins only.
  const guard = await requireAdmin("options.review");
  if (!guard.ok) return guard;
  const session = guard.admin;
  if (!Types.ObjectId.isValid(id)) return { ok: false, error: "Invalid request id" };

  try {
    await connectDB();
    const req = await OptionRequest.findOneAndUpdate(
      { _id: id, status: "pending" },
      { $set: { status: "dismissed", reviewedAt: new Date(), reviewedBy: session.email } },
    ).lean();
    if (!req) return { ok: false, error: "Request not found or already reviewed" };
    await logAdminAction(session, {
      action: "option.dismiss",
      targetType: "option_request",
      targetId: id,
      targetLabel: `${req.category} › ${req.subcategory} (${req.country}) · ${req.fieldLabel}: ${req.value}`,
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Couldn't dismiss the request." };
  }
}
