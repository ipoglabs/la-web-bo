// Creates the key pair for database backups.
//   - public key  -> scripts/backup-public-key.pem (committed; can only LOCK backups)
//   - private key -> ~/lokalads-backup-private-key.pem (mode 600; OPENS backups)
//
// Keep the private key in your password manager AND somewhere offline. Without
// it, every backup is unreadable, by design. Never put it in GitHub or Vercel.
//
// Rotating: run with --force, commit the new public key, keep the OLD private
// key too until the old backups have expired (90 days).

import crypto from "node:crypto";
import { existsSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { keyId } from "./_backupCrypto.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const pubFile = path.join(here, "backup-public-key.pem");
const privFile = path.join(os.homedir(), "lokalads-backup-private-key.pem");

if ((existsSync(pubFile) || existsSync(privFile)) && !process.argv.includes("--force")) {
  console.error("A backup key already exists. Re-run with --force to replace it (read the notes at the top first).");
  process.exit(1);
}

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});
writeFileSync(privFile, privateKey, { mode: 0o600, flag: process.argv.includes("--force") ? "w" : "wx" });
writeFileSync(pubFile, publicKey);
console.log(`Key id ${keyId(publicKey)}`);
console.log(`Public key  -> ${pubFile} (commit this)`);
console.log(`Private key -> ${privFile} (save it in your password manager and offline, then you may delete this file)`);
