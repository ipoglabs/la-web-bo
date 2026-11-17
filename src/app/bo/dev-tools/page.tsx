import DevToolsClient from "./DevToolsClient";
import { requireAdminPage } from "@/lib/adminGuard";

/**
 * /bo/dev-tools — user lookup, deleted-user inspection, and audit history.
 * Moved here from la-web's /dev-tools (Basic-Auth gated there); this route
 * shows private user data (chats, deleted accounts), so it's super admin only
 * and every lookup is written to the audit log.
 */
export default async function DevToolsPage() {
  await requireAdminPage("devtools.view", "/bo/dev-tools");
  return <DevToolsClient />;
}
