// Data retention for the live database: deletes or anonymises personal data
// once we no longer need it, so we keep the promises in the privacy policies:
//   India: deleted/anonymised within 90 days of account closure
//   Singapore: within 60 days      UK: within 30 days of a closure request
// We use the strictest (UK) with a safety margin: closed accounts are wiped
// 28 days after closure. Run nightly by .github/workflows/data-retention.yml.
//
// Usage (from repo root):
//   node --env-file=.env.local scripts/retention.mjs                 # report only, test DB
//   MONGODB_DB=lokalads-staging node --env-file=.env.local scripts/retention.mjs   # report on live
//   ... --apply [--confirm-live lokalads-staging]                    # actually do it
//
// Report mode never writes. --apply writes a summary (counts only, no personal
// data) to the staff audit log as action "system.retention".
//
// RULES is the source of truth; the handbook mirrors it. Change both together.

import mongoose from "mongoose";
import { parseArgs } from "node:util";
import { LIVE_DB } from "./_db.mjs";

const DAY = 86_400_000;
export const RULES = {
  closedAccountDays: 28, // then the account is anonymised and its personal data deleted
  revokedSessionDays: 30, // signed-out sessions (IP, device)
  idleSessionDays: 60, // longest "stay signed in" is 30 days, so 60 idle days = dead
  activityLogDays: 365,
  staffAuditLogDays: 730,
  resolvedReportReporterDays: 365, // reporter's email on closed ad reports
  searchEventDays: 400, // keyword + country only, not personal
  jobRunDays: 90, // background job history, not personal
  // Safety brake: a nightly run should wipe a handful of accounts. If it's about
  // to wipe more than this, something is wrong (bug, or mass deletions): stop.
  maxAccountsPerRun: 50,
};

// Fields kept on a wiped account: no person can be identified from these, and
// they keep counts, foreign keys and history consistent. EVERYTHING ELSE is
// dropped, so a personal field added to the user model later is wiped by default.
const KEEP_USER_FIELDS = [
  "_id", "userId", "uuid", "accountStatus", "isDeleted", "deletedAt", "isSuspended",
  "provider", "publicRole", "intent", "createdAt", "updatedAt", "__v",
];

const { values: a } = parseArgs({
  options: {
    apply: { type: "boolean", default: false },
    "confirm-live": { type: "string" },
  },
});

const uri = process.env.MONGODB_RETENTION_URI || process.env.MONGODB_URI;
if (!uri) {
  console.error("Set MONGODB_RETENTION_URI (or MONGODB_URI).");
  process.exit(1);
}
const dbName = process.env.MONGODB_DB || new URL(uri.replace(/^mongodb(\+srv)?:/, "http:")).pathname.slice(1) || "test";
if (a.apply && dbName === LIVE_DB && a["confirm-live"] !== LIVE_DB && process.env.RETENTION_CONFIRM_LIVE !== LIVE_DB) {
  console.error(`Refusing to change the LIVE database without --confirm-live ${LIVE_DB}.`);
  process.exit(1);
}

const now = Date.now();
const before = (days) => new Date(now - days * DAY);
const mode = a.apply ? "APPLY" : "REPORT ONLY (nothing changed)";
const summary = {};
const note = (k, n) => {
  summary[k] = n;
  console.log(`  ${k.padEnd(44)} ${String(n).padStart(6)}`);
};

const conn = await mongoose.createConnection(uri).asPromise();
try {
  const db = conn.useDb(dbName, { useCache: true }).db;
  const col = (n) => db.collection(n);
  console.log(`Data retention on "${dbName}": ${mode}\n`);

  // ── 1. Closed accounts past the grace period ────────────────────────────────
  // Covers both deletion paths: the site's self-service delete (isDeleted) and
  // the back office's delete (which now sets isDeleted/deletedAt too). Accounts
  // already wiped have purgedAt and are skipped.
  const closed = await col("users")
    .find(
      { isDeleted: true, deletedAt: { $lte: before(RULES.closedAccountDays) }, purgedAt: { $exists: false } },
      { projection: { _id: 1, deletedIdentitySnapshot: 1, email: 1 } },
    )
    .toArray();
  note("closed accounts to wipe", closed.length);
  if (closed.length > RULES.maxAccountsPerRun) {
    throw new Error(
      `Safety brake: ${closed.length} accounts due for wiping in one run (limit ${RULES.maxAccountsPerRun}). ` +
        `Nothing was changed. Check for a bug or mass deletions, then raise maxAccountsPerRun deliberately if it's genuine.`,
    );
  }

  const ids = closed.map((u) => u._id);
  const idStrings = ids.map(String);
  const oldEmails = closed.flatMap((u) => [u.email, u.deletedIdentitySnapshot?.email]).filter(Boolean);

  const userFilter = { _id: { $in: ids } };
  const counts = {
    "  their sessions (IP, device)": await col("sessions").countDocuments({ userId: { $in: ids } }),
    "  their activity log entries": await col("activitylogs").countDocuments({ userId: { $in: ids } }),
    "  their saved-search alerts": await col("alerts").countDocuments({ userId: { $in: ids } }),
    "  their favourites": await col("favourites").countDocuments({ userId: { $in: ids } }),
    "  reviews about them": await col("reviews").countDocuments({ userId: { $in: ids } }),
    "  reviews they wrote (name removed)": await col("reviews").countDocuments({ reviewerId: { $in: ids } }),
    "  their ads (contact details removed)": await col("posts").countDocuments({ ownerId: { $in: ids } }),
    "  their listings (name/photo removed)": await col("listings").countDocuments({ userId: { $in: ids } }),
    "  ad reports they filed (email removed)": oldEmails.length
      ? await col("adreports").countDocuments({ $or: [{ reporterId: { $in: [...ids, ...idStrings] } }, { reporterEmail: { $in: oldEmails } }] })
      : await col("adreports").countDocuments({ reporterId: { $in: [...ids, ...idStrings] } }),
    "  staff audit entries naming them (label masked)": await col("adminauditlogs").countDocuments({ targetType: "user", targetId: { $in: idStrings } }),
  };
  for (const [k, n] of Object.entries(counts)) note(k, n);

  if (a.apply && ids.length) {
    const users = await col("users").find(userFilter).toArray();
    for (const u of users) {
      const kept = Object.fromEntries(KEEP_USER_FIELDS.filter((k) => k in u).map((k) => [k, u[k]]));
      await col("users").replaceOne({ _id: u._id }, { ...kept, fullName: "Deleted User", isDeleted: true, purgedAt: new Date() });
    }
    await col("sessions").deleteMany({ userId: { $in: ids } });
    await col("activitylogs").deleteMany({ userId: { $in: ids } });
    await col("alerts").deleteMany({ userId: { $in: ids } });
    await col("favourites").deleteMany({ userId: { $in: ids } });
    await col("reviews").deleteMany({ userId: { $in: ids } });
    await col("reviews").updateMany({ reviewerId: { $in: ids } }, { $set: { name: "Deleted User" } });
    await col("posts").updateMany(
      { ownerId: { $in: ids } },
      {
        $set: { status: "deleted", seller_info: { name: "Deleted User", phone: "", email: "" }, description: "[removed: account closed]", images: [] },
        $unset: { location: 1, rejectionReason: 1 },
      },
    );
    await col("listings").updateMany(
      { userId: { $in: ids } },
      { $set: { "seller.fullName": "Deleted User", images: [], description: "[removed: account closed]" }, $unset: { "seller.image": 1, "seller.locality": 1, image: 1, fullName: 1 } },
    );
    await col("adreports").updateMany(
      { $or: [{ reporterId: { $in: [...ids, ...idStrings] } }, ...(oldEmails.length ? [{ reporterEmail: { $in: oldEmails } }] : [])] },
      { $unset: { reporterEmail: 1, reporterId: 1 } },
    );
    await col("adminauditlogs").updateMany(
      { targetType: "user", targetId: { $in: idStrings } },
      { $set: { targetLabel: "[wiped account]" } },
    );
  }

  // ── 2. Time limits for everyone ─────────────────────────────────────────────
  const timed = [
    ["signed-out sessions > 30 days", "sessions", { revokedAt: { $lte: before(RULES.revokedSessionDays) } }],
    ["idle sessions > 60 days", "sessions", { revokedAt: null, lastActiveAt: { $lte: before(RULES.idleSessionDays) } }],
    ["activity log > 1 year", "activitylogs", { createdAt: { $lte: before(RULES.activityLogDays) } }],
    ["staff audit log > 2 years", "adminauditlogs", { createdAt: { $lte: before(RULES.staffAuditLogDays) } }],
    ["search analytics > 400 days", "searchevents", { searchedAt: { $lte: before(RULES.searchEventDays) } }],
    ["job history > 90 days", "jobruns", { createdAt: { $lte: before(RULES.jobRunDays) } }],
  ];
  console.log("");
  for (const [label, name, filter] of timed) {
    note(label, await col(name).countDocuments(filter));
    if (a.apply) await col(name).deleteMany(filter);
  }
  const oldReports = {
    status: { $in: ["reviewed", "actioned", "dismissed"] },
    updatedAt: { $lte: before(RULES.resolvedReportReporterDays) },
    $or: [{ reporterEmail: { $exists: true } }, { reporterId: { $exists: true } }],
  };
  note("resolved reports > 1 year (reporter removed)", await col("adreports").countDocuments(oldReports));
  if (a.apply) await col("adreports").updateMany(oldReports, { $unset: { reporterEmail: 1, reporterId: 1 } });

  if (a.apply) {
    await col("adminauditlogs").insertOne({
      actorEmail: "system:retention",
      actorRole: "system",
      action: "system.retention",
      targetType: "none",
      meta: { ...summary, rules: RULES },
      createdAt: new Date(),
    });
  }
  console.log(`\nDone (${mode}).`);
} finally {
  await conn.close();
}
