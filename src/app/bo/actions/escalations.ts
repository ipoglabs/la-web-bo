"use server";

import { Types } from "mongoose";
import connectDB from "@/lib/db";
import Escalation, { ESCALATION_TARGETS, type EscalationTarget } from "@/models/escalation";
import Post from "@/models/post";
import User from "@/models/user";
import AdReport from "@/models/adReport";
import { requireAdmin, logAdminAction, cleanReason, MIN_REASON } from "@/lib/adminGuard";
import { reportError } from "@/lib/errorReport";

type Result = { ok: true } | { ok: false; error: string };

/** A label for the queue and the audit log; null when the target doesn't exist. */
async function labelFor(type: EscalationTarget, id: string): Promise<string | null> {
  if (type === "post") {
    const p = await Post.findById(id).select("adsId name").lean();
    return p ? [p.adsId, p.name].filter(Boolean).join(" · ") || id : null;
  }
  if (type === "user") {
    const u = await User.findById(id).select("email fullName").lean();
    return u ? u.email || u.fullName || id : null;
  }
  const r = await AdReport.findById(id).select("ticketId adTitle").lean();
  return r ? `Report ${r.ticketId} · ${r.adTitle}` : null;
}

/** Moderators and Support hand a case to the admins, with what they saw. */
export async function createEscalation(targetType: EscalationTarget, targetId: string, note: string): Promise<Result> {
  try {
    if (!ESCALATION_TARGETS.includes(targetType)) return { ok: false, error: "Invalid target" };
    if (!Types.ObjectId.isValid(targetId)) return { ok: false, error: "Invalid id" };

    const guard = await requireAdmin("escalations.create");
    if (!guard.ok) return guard;
    const { admin } = guard;

    const why = cleanReason(note);
    if (!why) return { ok: false, error: `Say what the admins should look at (at least ${MIN_REASON} characters).` };

    await connectDB();
    const label = await labelFor(targetType, targetId);
    if (!label) return { ok: false, error: "Not found" };

    const open = await Escalation.findOne({ targetType, targetId, status: "open" }).select("createdByEmail").lean();
    if (open) return { ok: false, error: `Already escalated by ${open.createdByEmail}; the admins have it.` };

    const esc = await Escalation.create({
      targetType,
      targetId,
      targetLabel: label,
      note: why,
      createdById: new Types.ObjectId(admin.adminId),
      createdByEmail: admin.email,
      createdByRole: admin.role,
    });

    await logAdminAction(admin, {
      action: "escalation.create",
      targetType,
      targetId,
      targetLabel: label,
      reason: why,
      meta: { escalation: String(esc._id) },
    });
    return { ok: true };
  } catch (e) {
    await reportError(e, { where: "action:createEscalation" });
    return { ok: false, error: "Couldn't escalate." };
  }
}

/** An admin closes an escalation, saying what they decided. The action itself
 *  (suspend, unsuspend, delete…) is done on the ad or user page as usual. */
export async function resolveEscalation(id: string, resolution: string): Promise<Result> {
  try {
    if (!Types.ObjectId.isValid(id)) return { ok: false, error: "Invalid id" };

    const guard = await requireAdmin("escalations.review");
    if (!guard.ok) return guard;
    const { admin } = guard;

    const why = cleanReason(resolution);
    if (!why) return { ok: false, error: `Write what you decided (at least ${MIN_REASON} characters).` };

    await connectDB();
    const esc = await Escalation.findOneAndUpdate(
      { _id: id, status: "open" },
      { $set: { status: "resolved", resolvedByEmail: admin.email, resolvedAt: new Date(), resolution: why } },
      { returnDocument: "after" },
    ).lean();
    if (!esc) return { ok: false, error: "Not found or already resolved." };

    await logAdminAction(admin, {
      action: "escalation.resolve",
      targetType: esc.targetType,
      targetId: esc.targetId,
      targetLabel: esc.targetLabel,
      reason: why,
      meta: { escalation: id, raisedBy: esc.createdByEmail },
    });
    return { ok: true };
  } catch (e) {
    await reportError(e, { where: "action:resolveEscalation" });
    return { ok: false, error: "Couldn't resolve." };
  }
}
