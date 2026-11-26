// /bo/journeys — a plain, self-contained HTML page (src/content/journeys.html)
// a BRD of every user journey on the live site, one section at a time from a sidebar menu.
// Super Admin and Admin only (permission "journeys.view").
import { readFile } from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";
import { requireAdminPage } from "@/lib/adminGuard";

const FILE = path.join(process.cwd(), "src/content/journeys.html");

export async function GET() {
  const admin = await requireAdminPage("journeys.view", "/bo/journeys");
  // Same gates the BO layout applies: own password and two-factor first.
  if (admin.mustChangePassword || admin.needsTwoFactorSetup) redirect("/bo");

  const html = await readFile(FILE, "utf8");
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store",
    },
  });
}
