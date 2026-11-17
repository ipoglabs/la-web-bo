// Fills a TEST database with made-up data so preview deployments and
// `npm run dev` have something to work with, without touching real users.
//
// Usage (from repo root; MONGODB_DB in .env.local should be lokalads-dev):
//   node --env-file=.env.local scripts/seed-dev-db.mjs            # seed an empty test DB
//   node --env-file=.env.local scripts/seed-dev-db.mjs --reset    # wipe the test DB first
//
// What it creates:
//   - Post-form configuration copied from live (form definitions only; no user data)
//   - One staff account per role (super_admin, admin, moderator, support, analyst)
//     sharing one random password, written to ~/lokalads-bo-dev-accounts.txt (mode 600)
//   - 40 users, 50 ads in every status, 8 ad reports, a few option requests
// All people, emails and phone numbers are fictional (example.test, +91 00000 xxxxx).
//
// It refuses to run against the live database, whatever the environment says.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import os from "node:os";
import path from "node:path";
import { writeFileSync } from "node:fs";
import { LIVE_DB } from "./_db.mjs";

const { MONGODB_URI, MONGODB_DB } = process.env;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Run with --env-file=.env.local");
  process.exit(1);
}
if (!MONGODB_DB || MONGODB_DB === LIVE_DB || !/dev|test/i.test(MONGODB_DB)) {
  console.error(`Refusing: MONGODB_DB must name a test database (e.g. lokalads-dev), got "${MONGODB_DB ?? ""}".`);
  process.exit(1);
}
const reset = process.argv.includes("--reset");

// ignoreUndefined: leave optional fields out instead of storing null, which
// would collide on the unique+sparse email/phone indexes.
const conn = await mongoose.createConnection(MONGODB_URI, { ignoreUndefined: true }).asPromise();
const dev = conn.useDb(MONGODB_DB, { useCache: true }).db;
const live = conn.useDb(LIVE_DB, { useCache: true }).db;

const rand = (n) => crypto.randomInt(n);
const pick = (a) => a[rand(a.length)];
const daysAgo = (d) => new Date(Date.now() - d * 86_400_000 - rand(86_400_000));

const FIRST = ["Aarav", "Diya", "Kabir", "Meera", "Rohan", "Ananya", "Vikram", "Isha", "Arjun", "Nila", "Wei", "Mei", "Farah", "Daniel", "Priya", "Sanjay", "Lakshmi", "Omar", "Tara", "Karthik"];
const LAST = ["Iyer", "Sharma", "Menon", "Reddy", "Tan", "Lim", "Khan", "Nair", "Das", "Pillai"];
const CITIES = [["IN", "Chennai", "India"], ["IN", "Mumbai", "India"], ["IN", "Bengaluru", "India"], ["SG", "Singapore", "Singapore"]];

try {
  console.log(`Seeding test database: ${MONGODB_DB}`);
  const existing = await dev.listCollections().toArray();
  if (existing.length && !reset) {
    console.error(`${MONGODB_DB} already has ${existing.length} collections. Re-run with --reset to wipe and re-seed.`);
    process.exit(1);
  }
  if (reset) {
    // dropDatabase isn't allowed for this Atlas login; drop collections instead.
    for (const c of existing) if (!c.name.startsWith("system.")) await dev.collection(c.name).drop();
    console.log("  wiped");
  }

  // 1. Form configuration from live: read-only, no personal data.
  const schemas = await live.collection("postformschemas").find({}).toArray();
  if (schemas.length) await dev.collection("postformschemas").insertMany(schemas);
  console.log(`  postformschemas: ${schemas.length} copied from live`);

  // 2. Staff, one per role, sharing one random password.
  const password = `Dev-${crypto.randomBytes(6).toString("base64url").replace(/[-_]/g, "x")}-${rand(90) + 10}A`;
  const hash = await bcrypt.hash(password, 12);
  const roles = ["super_admin", "admin", "moderator", "support", "analyst"];
  const staff = roles.map((role, i) => ({
    firstName: "Dev",
    lastName: role.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    designation: `Test ${role}`,
    age: 30,
    gender: "other",
    country: "India",
    location: "Chennai",
    role,
    employeeId: `LA${String(i + 1).padStart(7, "0")}`,
    email: `${role.replace("_", "-")}@example.test`,
    password: hash,
    isActive: true,
    tokenVersion: 0,
    failedLoginCount: 0,
    mustChangePassword: false,
    passwordChangedAt: new Date(),
    audit: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  await dev.collection("adminusers").insertMany(staff);
  await dev.collection("counters").insertOne({ _id: "employeeId", seq: staff.length });
  const file = path.join(os.homedir(), "lokalads-bo-dev-accounts.txt");
  writeFileSync(
    file,
    `LokalAds back office: TEST accounts for database ${MONGODB_DB} only (previews and npm run dev).\n` +
      `They do not work on the live site.\n\n` +
      staff.map((s) => `${s.employeeId}  ${s.role}`).join("\n") +
      `\n\nPassword for all of them: ${password}\n`,
    { mode: 0o600 },
  );
  console.log(`  adminusers: ${staff.length} (LA0000001–LA000000${staff.length}); password in ${file}`);

  // 3. Users.
  const users = Array.from({ length: 40 }, (_, i) => {
    const [flagCode, city, country] = pick(CITIES);
    const fullName = `${pick(FIRST)} ${pick(LAST)}`;
    const deleted = i >= 37;
    const suspended = i === 35 || i === 36;
    return {
      _id: new mongoose.Types.ObjectId(),
      uuid: crypto.randomUUID(),
      userId: `DEVU${String(i + 1).padStart(4, "0")}`,
      fullName: deleted ? "Deleted user" : fullName,
      dateOfBirth: new Date(1980 + rand(25), rand(12), 1 + rand(28)),
      email: deleted ? undefined : `user${i + 1}@example.test`,
      isEmailVerified: true,
      primaryNumber: deleted ? undefined : `+9100000${String(i + 1).padStart(5, "0")}`,
      isPrimaryNumberVerified: i % 3 !== 0,
      locality: city,
      savedLocations: [{ flagCode, city, region: "", country, primary: true }],
      publicRole: pick(["Individual", "Dealer", "Agent"]),
      intent: pick(["buying", "selling", "both", "browsing"]),
      provider: pick(["credentials", "google"]),
      accountStatus: deleted ? "Deleted" : suspended ? "Suspended" : "Active",
      isSuspended: suspended || deleted,
      isDeleted: deleted,
      deletedAt: deleted ? daysAgo(3) : undefined,
      deleteFeedback: deleted ? "Test account closed by seed script" : undefined,
      deletedIdentitySnapshot: deleted ? { email: `old${i + 1}@example.test`, fullName } : undefined,
      isFullyRegistered: i % 5 !== 0,
      audit: [],
      createdAt: daysAgo(120 - i * 3),
      updatedAt: daysAgo(1),
    };
  });
  await dev.collection("users").insertMany(users);
  console.log(`  users: ${users.length} (2 suspended, 3 deleted)`);

  // 4. Ads in every status, using real category/subcategory/country combos from the forms.
  const combos = schemas.length ? schemas.map((s) => [s.category, s.subcategory, s.country]) : [["Electronics", "Mobiles", "in"]];
  const statuses = [...Array(12).fill("pending"), ...Array(25).fill("active"), ...Array(5).fill("rejected"), ...Array(5).fill("off"), ...Array(3).fill("expired")];
  const sellers = users.filter((u) => !u.isDeleted);
  const posts = statuses.map((status, i) => {
    const [category, subcategory, country] = pick(combos);
    const owner = pick(sellers);
    const when = daysAgo(60 - i);
    return {
      _id: new mongoose.Types.ObjectId(),
      name: `Test ${subcategory} #${i + 1}`,
      description: `Made-up ${subcategory} listing for testing the back office.`,
      images: [],
      category,
      subcategory,
      country,
      ownerId: owner._id,
      adsId: `DEV${String(i + 1).padStart(5, "0")}`,
      status,
      rejectionReason: status === "rejected" ? "Photos don't match the item described (test)." : undefined,
      price: 500 + rand(50_000),
      seller_info: { name: owner.fullName, phone: owner.primaryNumber ?? "+910000000000", email: owner.email ?? "seller@example.test" },
      location: { address: owner.locality },
      isSuspended: status === "off" && i % 2 === 0,
      createdAt: when,
      updatedAt: when,
    };
  });
  await dev.collection("posts").insertMany(posts);
  console.log(`  posts: ${posts.length} (12 pending, 25 active, 5 rejected, 5 off, 3 expired)`);

  // 5. Ad reports on active ads.
  const reported = posts.filter((p) => p.status === "active").slice(0, 8);
  await dev.collection("adreports").insertMany(
    reported.map((p, i) => ({
      ticketId: `DEVT${String(i + 1).padStart(4, "0")}`,
      adId: p.adsId,
      adTitle: p.name,
      sellerName: p.seller_info.name,
      issues: [pick(["spam", "fraud", "wrong_category", "offensive"])],
      details: "Test report created by the seed script.",
      status: i < 5 ? "pending" : pick(["reviewed", "actioned", "dismissed"]),
      priority: pick(["low", "medium", "high"]),
      reporterEmail: `user${i + 1}@example.test`,
      hideIdentity: i % 2 === 0,
      createdAt: daysAgo(10 - i),
    })),
  );
  console.log(`  adreports: ${reported.length}`);

  // 6. Option requests, on dropdowns that accept new values.
  const reqs = [];
  for (const s of schemas) {
    for (const sec of s.sections ?? []) {
      for (const f of sec.fields ?? []) {
        if (f.type === "select" && f.display === "dropdown" && f.allowCustom === true && reqs.length < 3) {
          const value = `Test option ${reqs.length + 1}`;
          reqs.push({
            category: s.category, subcategory: s.subcategory, country: s.country,
            fieldKey: f.key, fieldLabel: f.label ?? f.key, value, valueKey: value.toLowerCase(),
            postIds: [], status: "pending", createdAt: daysAgo(2), updatedAt: daysAgo(2),
          });
        }
      }
    }
  }
  if (reqs.length) await dev.collection("optionrequests").insertMany(reqs);
  console.log(`  optionrequests: ${reqs.length}`);

  console.log(`\nDone. Sign in to a preview deployment or npm run dev with LA0000001 (super admin).`);
} catch (e) {
  console.error("Seed failed:", e.message);
  process.exitCode = 1;
} finally {
  await conn.close();
}
