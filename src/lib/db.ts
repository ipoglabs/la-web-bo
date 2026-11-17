import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI missing in env");

/** The database real users are on. Despite the name, it is production. */
export const LIVE_DB = "lokalads-staging";

/** MONGODB_DB if set, otherwise the database named in the URI path. */
export function targetDbName(uri = MONGODB_URI, override = process.env.MONGODB_DB): string {
  if (override) return override;
  const path = uri.replace(/^mongodb(\+srv)?:\/\/[^/]+/, "").split("?")[0];
  return decodeURIComponent(path.replace(/^\//, "")) || "test";
}

/** Preview deployments and `next dev` must never touch live data. Production
 *  builds run with VERCEL_ENV=production; set ALLOW_LIVE_DB=1 only for a
 *  deliberate local investigation against live data. */
function assertNotLiveOutsideProduction(db: string) {
  const isPreview = process.env.VERCEL_ENV === "preview";
  const isDev = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "development";
  if (db === LIVE_DB && (isPreview || isDev) && process.env.ALLOW_LIVE_DB !== "1") {
    throw new Error(
      `Refusing to connect to the live database "${LIVE_DB}" from a ${isPreview ? "preview deployment" : "development server"}. ` +
        `Set MONGODB_DB=lokalads-dev (see scripts/seed-dev-db.mjs).`,
    );
  }
}

type MongooseGlobal = typeof globalThis & { _mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } };

const g = global as MongooseGlobal;

if (!g._mongoose) {
  g._mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (g._mongoose!.conn) return g._mongoose!.conn;

  if (!g._mongoose!.promise) {
    const dbName = targetDbName();
    assertNotLiveOutsideProduction(dbName);
    g._mongoose!.promise = mongoose
      .connect(MONGODB_URI, { dbName })
      .catch((err) => {
        g._mongoose!.promise = null;
        throw err;
      });
  }
  g._mongoose!.conn = await g._mongoose!.promise;
  return g._mongoose!.conn;
}
