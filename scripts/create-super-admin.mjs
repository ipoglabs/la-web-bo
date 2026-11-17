// Creates a Super Admin back-office account. Super Admins can't be created from
// the UI on purpose. This deliberate, offline step needs database credentials.
//
// Usage (from repo root, needs MONGODB_URI in .env.local):
//   node --env-file=.env.local scripts/create-super-admin.mjs
//   node --env-file=.env.local scripts/create-super-admin.mjs --promote <employeeId|email>
//
// You are prompted for every detail; the password is hidden and only its hash is stored.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readline from "node:readline";
import os from "node:os";

const { MONGODB_URI, MONGODB_DB } = process.env;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Run with --env-file=.env.local");
  process.exit(1);
}

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    if (hidden) {
      rl._writeToOutput = (s) => {
        if (s.startsWith(question)) rl.output.write(s);
        else if (s.includes("\n")) rl.output.write("\n");
      };
    }
    rl.question(question, (a) => {
      rl.close();
      resolve(a.trim());
    });
  });
}

function passwordProblem(pw) {
  if (pw.length < 12) return "at least 12 characters";
  if (!/[a-z]/.test(pw) || !/[A-Z]/.test(pw) || !/\d/.test(pw)) return "upper-case, lower-case and a number";
  return null;
}

await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB || undefined });
const db = mongoose.connection.db;
const admins = db.collection("adminusers");
const audit = db.collection("adminauditlogs");
const counters = db.collection("counters");

console.log(`Database: ${db.databaseName}`);

async function log(action, target, meta) {
  await audit.insertOne({
    actorEmail: `script:${os.userInfo().username}@${os.hostname()}`,
    actorRole: "script",
    action,
    targetType: "admin",
    targetId: String(target._id),
    targetLabel: `${target.employeeId} · ${target.email}`,
    meta,
    createdAt: new Date(),
  });
}

try {
  if (process.argv[2] === "--promote") {
    const arg = process.argv[3];
    if (!arg) throw new Error("Pass the employeeId or email to promote.");
    const query = arg.includes("@") ? { email: arg.toLowerCase() } : { employeeId: arg };
    const a = await admins.findOne(query);
    if (!a) throw new Error(`No admin found for ${arg}`);
    console.log(`Account: ${a.employeeId} · ${a.email} · ${a.role} · active=${a.isActive}`);
    if ((await ask(`Promote to super_admin? (yes/no) `)).toLowerCase() !== "yes") {
      console.log("Aborted. Nothing changed.");
    } else {
      await admins.updateOne(
        { _id: a._id },
        { $set: { role: "super_admin", isActive: true, updatedAt: new Date() }, $inc: { tokenVersion: 1 } },
      );
      await log("staff.role_change", a, { from: a.role, to: "super_admin", via: "create-super-admin.mjs" });
      console.log("Done. They must sign in again.");
    }
  } else {
    const firstName = await ask("First name: ");
    const lastName = await ask("Last name: ");
    const email = (await ask("Email: ")).toLowerCase();
    const designation = (await ask("Designation [Founder]: ")) || "Founder";
    const country = await ask("Country: ");
    const location = await ask("City / location: ");
    const age = Number(await ask("Age: "));
    const gender = (await ask("Gender (male/female/other): ")).toLowerCase();

    if (!firstName || !lastName || !email.includes("@") || !country || !location) throw new Error("Missing details.");
    if (!Number.isInteger(age) || age < 18 || age > 100) throw new Error("Age must be 18–100.");
    if (!["male", "female", "other"].includes(gender)) throw new Error("Gender must be male, female or other.");
    if (await admins.findOne({ email })) throw new Error("That email already has an account. Use --promote instead.");

    const pw = await ask("Password: ", { hidden: true });
    const problem = passwordProblem(pw);
    if (problem) throw new Error(`Password needs ${problem}.`);
    if ((await ask("Repeat password: ", { hidden: true })) !== pw) throw new Error("Passwords don't match.");

    const { seq } = await counters.findOneAndUpdate(
      { _id: "employeeId" },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    const employeeId = `LA${String(seq).padStart(7, "0")}`;
    const now = new Date();

    const doc = {
      firstName, lastName, designation, age, gender, country, location, email,
      role: "super_admin",
      employeeId,
      password: await bcrypt.hash(pw, 12),
      isActive: true,
      tokenVersion: 0,
      failedLoginCount: 0,
      passwordChangedAt: now,
      audit: [],
      createdAt: now,
      updatedAt: now,
    };
    const { insertedId } = await admins.insertOne(doc);
    await log("staff.create", { ...doc, _id: insertedId }, { role: "super_admin", via: "create-super-admin.mjs" });

    console.log(`\nSuper Admin created. Employee ID: ${employeeId}. Sign in at /bo-login.`);
  }
} catch (e) {
  console.error("Error:", e.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
