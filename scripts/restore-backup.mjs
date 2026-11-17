// Restore (or just inspect) an encrypted backup made by scripts/backup-db.mjs.
//
// Usage (from repo root):
//   # what's inside (counts only):
//   node scripts/restore-backup.mjs --file x.lkbk --key ~/lokalads-backup-private-key.pem --inspect
//
//   # restore into a scratch database and compare with live (the monthly drill):
//   node --env-file=.env.local scripts/restore-backup.mjs --file x.lkbk \
//        --key ~/lokalads-backup-private-key.pem --to lokalads-restore-test --verify-against lokalads-staging --drop-after
//
//   # disaster recovery: put a backup back INTO live (replaces everything there):
//   node --env-file=.env.local scripts/restore-backup.mjs --file x.lkbk --key ... \
//        --to lokalads-staging --replace --confirm-live lokalads-staging
//
// Safety: refuses to write into a database that already has data unless
// --replace; refuses the live database unless --confirm-live lokalads-staging.

import mongoose from "mongoose";
import { gunzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { parseArgs } from "node:util";
import os from "node:os";
import { decrypt, readHeader } from "./_backupCrypto.mjs";
import { LIVE_DB } from "./_db.mjs";

const { EJSON } = mongoose.mongo.BSON;
const { values: a } = parseArgs({
  options: {
    file: { type: "string" },
    key: { type: "string" },
    inspect: { type: "boolean", default: false },
    to: { type: "string" },
    replace: { type: "boolean", default: false },
    "confirm-live": { type: "string" },
    "verify-against": { type: "string" },
    "drop-after": { type: "boolean", default: false },
  },
});

// The Atlas login may not be allowed dropDatabase, so empty a database by
// dropping its collections one by one.
async function wipe(db) {
  for (const c of await db.listCollections({}, { nameOnly: true }).toArray()) {
    if (!c.name.startsWith("system.")) await db.collection(c.name).drop();
  }
}

const die = (m) => {
  console.error(m);
  process.exit(1);
};
if (!a.file || !a.key) die("Pass --file <backup.lkbk> and --key <private key .pem>.");

const raw = readFileSync(a.file);
const { header } = readHeader(raw);
let backup;
try {
  backup = EJSON.parse(gunzipSync(decrypt(raw, readFileSync(a.key.replace(/^~/, os.homedir()), "utf8"))).toString(), {
    relaxed: false,
  });
} catch (e) {
  die(`Couldn't open the backup (wrong key? file damaged?): ${e.message}. Backup key id: ${header.keyId}`);
}
if (backup.format !== "lokalads-backup-v1") die(`Unknown backup format ${backup.format}`);

const total = backup.collections.reduce((n, c) => n + c.docs.length, 0);
console.log(`Backup of "${backup.db}" taken ${backup.createdAt.toISOString()}: ${backup.collections.length} collections, ${total} documents`);
for (const c of backup.collections) console.log(`  ${c.name.padEnd(24)} ${String(c.docs.length).padStart(7)} docs`);
if (a.inspect || !a.to) {
  if (!a.to && !a.inspect) console.log("\n(Nothing restored: pass --to <database> to restore.)");
  process.exit(0);
}

if (a.to === LIVE_DB && a["confirm-live"] !== LIVE_DB) {
  die(`Refusing to write into the LIVE database. If you really mean it, add --confirm-live ${LIVE_DB}.`);
}
if (a["drop-after"] && a.to === LIVE_DB) die("--drop-after can't be used on the live database.");

const uri = process.env.MONGODB_URI;
if (!uri) die("MONGODB_URI is not set. Run with node --env-file=.env.local");

const conn = await mongoose.createConnection(uri).asPromise();
let failed = false;
try {
  const target = conn.useDb(a.to, { useCache: true }).db;
  const existing = (await target.listCollections().toArray()).filter((c) => !c.name.startsWith("system."));
  if (existing.length && !a.replace) die(`"${a.to}" already has ${existing.length} collections. Add --replace to wipe it first.`);
  if (existing.length) {
    await wipe(target);
    console.log(`\nWiped "${a.to}".`);
  }

  for (const c of backup.collections) {
    const opts = { ...(c.options ?? {}) };
    delete opts.autoIndexId; // legacy option newer servers reject
    await target.createCollection(c.name, opts);
    const col = target.collection(c.name);
    for (let i = 0; i < c.docs.length; i += 1000) await col.insertMany(c.docs.slice(i, i + 1000), { ordered: true });
    for (const ix of c.indexes) {
      const ixOpts = { ...ix };
      for (const k of ["key", "v", "ns"]) delete ixOpts[k]; // not createIndex options
      await col.createIndex(ix.key, ixOpts);
    }
  }
  console.log(`\nRestored into "${a.to}".`);

  if (a["verify-against"]) {
    // Compares the restore with another database (e.g. live) collection by
    // collection: counts and every _id. Live may have moved on since the backup,
    // so small differences in busy collections are expected; big ones aren't.
    const other = conn.useDb(a["verify-against"], { useCache: true }).db;
    console.log(`\nComparing with "${a["verify-against"]}" (live may have changed since the backup was taken):`);
    for (const c of backup.collections) {
      const [restoredIds, otherIds] = await Promise.all([
        target.collection(c.name).distinct("_id"),
        other.collection(c.name).distinct("_id"),
      ]);
      const key = (id) => EJSON.stringify(id);
      const o = new Set(otherIds.map(key));
      const r = new Set(restoredIds.map(key));
      const missing = [...o].filter((x) => !r.has(x)).length;
      const extra = [...r].filter((x) => !o.has(x)).length;
      const ok = missing === 0 && extra === 0 && restoredIds.length === c.docs.length;
      if (!ok && restoredIds.length !== c.docs.length) failed = true;
      console.log(
        `  ${ok ? "same " : "diff "} ${c.name.padEnd(24)} restored ${String(restoredIds.length).padStart(6)}  live ${String(otherIds.length).padStart(6)}` +
          (ok ? "" : `  (${missing} only in live, ${extra} only in backup)`),
      );
    }
  }
} finally {
  if (a["drop-after"]) {
    await wipe(conn.useDb(a.to, { useCache: true }).db);
    console.log(`\nDropped scratch database "${a.to}".`);
  }
  await conn.close();
}
if (failed) die("\nRestore check FAILED: a collection didn't restore every document.");
