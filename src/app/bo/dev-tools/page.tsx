import DevToolsClient from "./DevToolsClient";

/**
 * /bo/dev-tools — user lookup, deleted-user inspection, and audit history.
 * Moved here from la-web's /dev-tools (Basic-Auth gated there); this route
 * inherits the real admin session gate from bo/layout.tsx instead.
 */
export default function DevToolsPage() {
  return <DevToolsClient />;
}
