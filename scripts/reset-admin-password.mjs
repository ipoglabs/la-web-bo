// One-off admin password reset for the back office.
//
// Uses MONGODB_DB from .env.local (the test database). For the LIVE database
// see scripts/_db.mjs: prefix MONGODB_DB=lokalads-staging and confirm.
//
// Usage (from repo root, needs MONGODB_URI in .env.local):
//   node --env-file=.env.local scripts/reset-admin-password.mjs --list
//   node --env-file=.env.local scripts/reset-admin-password.mjs <employeeId|email>
//
// The new password is prompted for (hidden) and never stored in plain text.
// Resetting also unlocks the account, signs out all its sessions, makes them
// choose their own password at next sign-in, and writes to the audit log.

import { connectForScript, disconnect } from "./_db.mjs";
import bcrypt from "bcryptjs";
import readline from "node:readline";
import os from "node:os";


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

const db = await connectForScript({ writes: arg !== "--list" });
const admins = db.collection("adminusers");

try {
  if (arg === "--list") {
    const rows = await admins
      .find({}, { projection: { employeeId: 1, email: 1, firstName: 1, lastName: 1, role: 1, isActive: 1, lastLoginAt: 1 } })
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
      const pw = await promptHidden("New password (12+ chars, upper, lower, number): ");
      const pw2 = await promptHidden("Repeat new password: ");
      const weak = pw.length < 12 || !/[a-z]/.test(pw) || !/[A-Z]/.test(pw) || !/\d/.test(pw);
      if (weak || pw !== pw2) {
        console.error("Password too weak or doesn't match. Nothing changed.");
        process.exitCode = 1;
      } else {
        const ok = await prompt(`Reset password for ${admin.employeeId}? (yes/no) `);
        if (ok.trim().toLowerCase() !== "yes") {
          console.log("Aborted. Nothing changed.");
        } else {
          const hash = await bcrypt.hash(pw, 12);
          const now = new Date();
          await admins.updateOne(
            { _id: admin._id },
            {
              $set: { password: hash, passwordChangedAt: now, failedLoginCount: 0, mustChangePassword: true, updatedAt: now },
              $unset: { lockedUntil: 1 },
              $inc: { tokenVersion: 1 },
            },
          );
          await db.collection("adminauditlogs").insertOne({
            actorEmail: `script:${os.userInfo().username}@${os.hostname()}`,
            actorRole: "script",
            action: "auth.password_reset",
            targetType: "admin",
            targetId: String(admin._id),
            targetLabel: `${admin.employeeId} · ${admin.email}`,
            createdAt: now,
          });
          console.log(`Password updated. Log in at /bo-login with Employee ID ${admin.employeeId}.`);
        }
      }
    }
  }
} finally {
  await disconnect();
}
