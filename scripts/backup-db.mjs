// Nightly backup of the live database (run by .github/workflows/db-backup.yml).
//
// Reads every collection of the database (default: lokalads-staging, the live
// one; read-only), keeps documents in Extended JSON so types like ObjectId and
// Date survive, plus each collection's indexes, gzips it and encrypts it with
// scripts/backup-public-key.pem. Only the private key can open the result.
//
// Usage:
//   MONGODB_BACKUP_URI=... node scripts/backup-db.mjs [--db lokalads-staging] [--out backups/]
// (falls back to MONGODB_URI, so `node --env-file=.env.local ...` works locally)
//
// Prints per-collection counts (no data) so the job log shows what was saved.

import mongoose from "mongoose";
import { gzipSync } from "node:zlib";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { encrypt, keyId } from "./_backupCrypto.mjs";
import { LIVE_DB } from "./_db.mjs";

const { EJSON } = mongoose.mongo.BSON;
const here = path.dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({
  options: {
    db: { type: "string", default: LIVE_DB },
    out: { type: "string", default: "backups" },
    "public-key": { type: "string", default: path.join(here, "backup-public-key.pem") },
  },
});

const uri = process.env.MONGODB_BACKUP_URI || process.env.MONGODB_URI;
if (!uri) {
  console.error("Set MONGODB_BACKUP_URI (or MONGODB_URI).");
  process.exit(1);
}
const publicKey = readFileSync(values["public-key"], "utf8");

const conn = await mongoose.createConnection(uri).asPromise();
try {
  const db = conn.useDb(values.db, { useCache: true }).db;
  const infos = (await db.listCollections({}, { nameOnly: false }).toArray())
    .filter((c) => c.type !== "view" && !c.name.startsWith("system."))
    .sort((a, b) => a.name.localeCompare(b.name));
  if (!infos.length) throw new Error(`Database ${values.db} has no collections; refusing to write an empty backup.`);

  const collections = [];
  let total = 0;
  for (const info of infos) {
    const col = db.collection(info.name);
    const docs = await col.find({}).toArray();
    const indexes = (await col.indexes()).filter((ix) => ix.name !== "_id_");
    collections.push({ name: info.name, options: info.options ?? {}, indexes, count: docs.length, docs });
    total += docs.length;
    console.log(`  ${info.name.padEnd(24)} ${String(docs.length).padStart(7)} docs  ${indexes.length} indexes`);
  }

  const createdAt = new Date();
  const json = EJSON.stringify(
    { format: "lokalads-backup-v1", db: values.db, createdAt, collections },
    { relaxed: false },
  );
  const sealed = encrypt(gzipSync(Buffer.from(json)), publicKey);

  mkdirSync(values.out, { recursive: true });
  const stamp = createdAt.toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const file = path.join(values.out, `${values.db}-${stamp}Z.lkbk`);
  writeFileSync(file, sealed);
  console.log(
    `\nBacked up ${values.db}: ${collections.length} collections, ${total} documents, ` +
      `${(sealed.length / 1024).toFixed(0)} KB encrypted (key ${keyId(publicKey)}) -> ${file}`,
  );
} finally {
  await conn.close();
}
