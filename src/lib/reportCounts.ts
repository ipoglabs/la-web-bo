// How many reports a seller's ads have collected, for the "3+ valid reports →
// escalate for suspension review" rule. Counted through the seller's own ads
// (Post.ownerId), not AdReport.sellerId, which the reporting page fills in
// from the browser.
import { Types } from "mongoose";
import Post from "@/models/post";
import AdReport from "@/models/adReport";

export type ReportCounts = { open: number; valid: number; dismissed: number; total: number };

/** Valid = actioned. This many valid reports on one seller means an admin should review the account. */
export const VALID_REPORTS_ESCALATE = 3;

export async function reportCountsByOwner(ownerIds: string[]): Promise<Map<string, ReportCounts>> {
  const ids = [...new Set(ownerIds)].filter((id) => Types.ObjectId.isValid(id));
  const out = new Map<string, ReportCounts>(ids.map((id) => [id, { open: 0, valid: 0, dismissed: 0, total: 0 }]));
  if (!ids.length) return out;

  const posts = await Post.find({ ownerId: { $in: ids.map((id) => new Types.ObjectId(id)) } })
    .select("adsId ownerId")
    .lean();
  // la-web stores the display id (adsId), occasionally the Mongo _id.
  const ownerByKey = new Map<string, string>();
  for (const p of posts) {
    const owner = String(p.ownerId);
    ownerByKey.set(String(p._id), owner);
    if (p.adsId) ownerByKey.set(p.adsId, owner);
  }
  if (!ownerByKey.size) return out;

  const rows = await AdReport.aggregate<{ _id: { adId: string; status: string }; n: number }>([
    { $match: { adId: { $in: [...ownerByKey.keys()] } } },
    { $group: { _id: { adId: "$adId", status: "$status" }, n: { $sum: 1 } } },
  ]);
  for (const r of rows) {
    const c = out.get(ownerByKey.get(r._id.adId) ?? "");
    if (!c) continue;
    c.total += r.n;
    if (r._id.status === "actioned") c.valid += r.n;
    else if (r._id.status === "dismissed") c.dismissed += r.n;
    else c.open += r.n;
  }
  return out;
}
