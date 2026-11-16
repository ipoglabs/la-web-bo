// One-off admin password reset for the back office.
//
// Usage (from repo root, needs MONGODB_URI in .env.local):
//   node --env-file=.env.local scripts/reset-admin-password.mjs --list
//   node --env-file=.env.local scripts/reset-admin-password.mjs <employeeId|email>
//
// The new password is prompted for (hidden) and never stored in plain text.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readline from "node:readline";

const { MONGODB_URI, MONGODB_DB } = process.env;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Run with --env-file=.env.local");
  process.exit(1);
}

function promptHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl._writeToOutput = (s) => {
      if (s.startsWith(question)) rl.output.write(s);
      else if (s.includes("\n")) rl.output.write("\n");
    };
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function prompt(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, (a) => { rl.close(); resolve(a); });
  });
}

const arg = process.argv[2];
if (!arg) {
  console.error("Pass --list or an employeeId / email.");
  process.exit(1);
}

await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB || undefined });
const admins = mongoose.connection.db.collection("adminusers");

try {
  if (arg === "--list") {
    const rows = await admins
      .find({}, { projection: { employeeId: 1, email: 1, firstName: 1, lastName: 1, role: 1, isActive: 1 } })
      .sort({ employeeId: 1 })
      .toArray();
    console.table(rows.map(({ _id, ...r }) => r));
  } else {
    const query = arg.includes("@") ? { email: arg.toLowerCase().trim() } : { employeeId: arg.trim() };
    const admin = await admins.findOne(query);
    if (!admin) {
      console.error("No admin found for", arg);
      process.exitCode = 1;
    } else {
      console.log(`Account: ${admin.employeeId} · ${admin.email} · ${admin.role} · active=${admin.isActive}`);
      const pw = await promptHidden("New password (min 8 chars): ");
      const pw2 = await promptHidden("Repeat new password: ");
      if (pw.length < 8 || pw !== pw2) {
        console.error("Passwords too short or don't match. Nothing changed.");
        process.exitCode = 1;
      } else {
        const ok = await prompt(`Reset password for ${admin.employeeId}? (yes/no) `);
        if (ok.trim().toLowerCase() !== "yes") {
          console.log("Aborted. Nothing changed.");
        } else {
          const hash = await bcrypt.hash(pw, 10);
          await admins.updateOne({ _id: admin._id }, { $set: { password: hash, updatedAt: new Date() } });
          console.log(`Password updated. Log in at /bo-login with Employee ID ${admin.employeeId}.`);
        }
      }
    }
  }
} finally {
  await mongoose.disconnect();
}
