// Shared database connection for the admin scripts.
//
// Scripts use MONGODB_DB (from .env.local that's the test database,
// lokalads-dev). To run one against the LIVE database you must ask for it
// explicitly AND confirm it, e.g.:
//
//   MONGODB_DB=lokalads-staging node --env-file=.env.local scripts/reset-admin-password.mjs --list
//
// Variables already set in your shell win over --env-file, so the line above
// targets live without editing .env.local. Writing to live also needs
// --confirm-live lokalads-staging (or typing the name when prompted).

import mongoose from "mongoose";
import readline from "node:readline";

export const LIVE_DB = "lokalads-staging";

function dbFromUri(uri) {
  const path = uri.replace(/^mongodb(\+srv)?:\/\/[^/]+/, "").split("?")[0];
  return decodeURIComponent(path.replace(/^\//, "")) || "test";
}

function ask(q) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(q, (a) => {
      rl.close();
      resolve(a.trim());
    });
  });
}

/** Connects and returns the db handle. `writes` = this run may change data. */
export async function connectForScript({ writes }) {
  const { MONGODB_URI, MONGODB_DB } = process.env;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set. Run with --env-file=.env.local");
    process.exit(1);
  }
  const dbName = MONGODB_DB || dbFromUri(MONGODB_URI);

  if (dbName === LIVE_DB) {
    console.log(`\n⚠  LIVE DATABASE: ${dbName} (real users and staff)\n`);
    if (writes) {
      const i = process.argv.indexOf("--confirm-live");
      const confirmed = i > -1 ? process.argv[i + 1] : await ask(`Type ${LIVE_DB} to continue: `);
      if (confirmed !== LIVE_DB) {
        console.error("Not confirmed. Nothing changed.");
        process.exit(1);
      }
    }
  } else {
    console.log(`Database: ${dbName}`);
  }

  await mongoose.connect(MONGODB_URI, { dbName });
  return mongoose.connection.db;
}

export const disconnect = () => mongoose.disconnect();
