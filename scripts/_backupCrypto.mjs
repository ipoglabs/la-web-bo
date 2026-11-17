// Encryption for database backups.
//
// Each backup gets a fresh random AES-256-GCM key; that key is locked with an
// RSA-4096 public key (RSA-OAEP, SHA-256). The public key is in the repo
// (scripts/backup-public-key.pem) and can only LOCK backups. The private key
// that opens them lives only with the owner (never in GitHub or Vercel).
//
// File layout: "LKBK1" | uint32 header length | header JSON | ciphertext
import crypto from "node:crypto";

const MAGIC = Buffer.from("LKBK1");

export function keyId(publicKeyPem) {
  const der = crypto.createPublicKey(publicKeyPem).export({ type: "spki", format: "der" });
  return crypto.createHash("sha256").update(der).digest("hex").slice(0, 16);
}

export function encrypt(plain, publicKeyPem) {
  const dataKey = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", dataKey, iv);
  const ct = Buffer.concat([cipher.update(plain), cipher.final()]);
  const wrapped = crypto.publicEncrypt(
    { key: publicKeyPem, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256" },
    dataKey,
  );
  const header = Buffer.from(
    JSON.stringify({
      alg: "RSA-OAEP-256+A256GCM",
      keyId: keyId(publicKeyPem),
      wrappedKey: wrapped.toString("base64"),
      iv: iv.toString("base64"),
      tag: cipher.getAuthTag().toString("base64"),
    }),
  );
  const len = Buffer.alloc(4);
  len.writeUInt32BE(header.length);
  return Buffer.concat([MAGIC, len, header, ct]);
}

export function readHeader(file) {
  if (!file.subarray(0, 5).equals(MAGIC)) throw new Error("Not a LokalAds backup file");
  const n = file.readUInt32BE(5);
  return { header: JSON.parse(file.subarray(9, 9 + n).toString()), body: file.subarray(9 + n) };
}

export function decrypt(file, privateKeyPem) {
  const { header, body } = readHeader(file);
  const dataKey = crypto.privateDecrypt(
    { key: privateKeyPem, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256" },
    Buffer.from(header.wrappedKey, "base64"),
  );
  const decipher = crypto.createDecipheriv("aes-256-gcm", dataKey, Buffer.from(header.iv, "base64"));
  decipher.setAuthTag(Buffer.from(header.tag, "base64"));
  return Buffer.concat([decipher.update(body), decipher.final()]);
}
