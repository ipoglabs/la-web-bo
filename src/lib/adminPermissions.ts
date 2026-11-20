// Single source of truth for who can do what in the back office.
// Every page and server action checks a permission from here (via
// requireAdmin / requireAdminPage in adminGuard.ts) — never a hardcoded role list.

export const ADMIN_ROLES = ["super_admin", "admin", "moderator", "support", "analyst"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export const PERMISSIONS = [
  "dashboard.view",
  "users.view",
  "users.suspend",
  "users.delete",
  "posts.view",
  "posts.moderate", // approve / reject / pause
  "posts.suspend",
  "reports.view",
  "reports.review",
  "options.review", // add values to live post forms
  "staff.view",
  "staff.create",
  "staff.manage", // change role, activate / deactivate
  "audit.view",
  "devtools.view", // private conversations, deleted-user data — PII
  "journeys.view", // how every site journey works, step by step
] as const;
export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_PERMS: Record<AdminRole, readonly Permission[]> = {
  super_admin: PERMISSIONS,
  admin: [
    "dashboard.view",
    "users.view",
    "users.suspend",
    "posts.view",
    "posts.moderate",
    "posts.suspend",
    "reports.view",
    "reports.review",
    "options.review",
    "staff.view",
    "staff.create",
    "staff.manage",
    "audit.view",
    "journeys.view",
  ],
  moderator: [
    "dashboard.view",
    "users.view",
    "posts.view",
    "posts.moderate",
    "reports.view",
    "reports.review",
  ],
  support: ["dashboard.view", "users.view", "posts.view", "reports.view"],
  analyst: ["dashboard.view", "posts.view"],
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  moderator: "Moderator",
  support: "Support",
  analyst: "Analyst",
};

export const ROLE_SUMMARY: Record<AdminRole, string> = {
  super_admin: "Owns the platform. Manages admins, deletes users, accesses private data (Dev Tools).",
  admin: "Runs day-to-day operations. Manages moderators/support/analysts, suspends users and ads, edits form options.",
  moderator: "Reviews the ad queue and user reports. Approves, rejects and pauses ads.",
  support: "Read-only access to users, ads and reports to answer customer questions.",
  analyst: "Read-only access to ads for reporting.",
};

// Higher rank can manage lower rank. Equal ranks cannot manage each other.
const ROLE_RANK: Record<AdminRole, number> = {
  super_admin: 100,
  admin: 50,
  moderator: 10,
  support: 10,
  analyst: 10,
};

export function isAdminRole(role?: unknown): role is AdminRole {
  return (ADMIN_ROLES as readonly string[]).includes(String(role ?? ""));
}

export function hasPerm(role: AdminRole | undefined | null, perm: Permission): boolean {
  if (!role || !isAdminRole(role)) return false;
  return ROLE_PERMS[role].includes(perm);
}

/** Can `actor` create, re-role or (de)activate a staff member with role `target`?
 *  super_admin accounts are never created or managed from the UI — use
 *  scripts/create-super-admin.mjs so there's always a deliberate, offline step. */
export function canManageRole(actor: AdminRole, target: AdminRole): boolean {
  if (target === "super_admin") return false;
  return ROLE_RANK[actor] > ROLE_RANK[target];
}

export function assignableRoles(actor: AdminRole): AdminRole[] {
  return ADMIN_ROLES.filter((r) => canManageRole(actor, r));
}

/** Roles that must use two-factor sign-in. Everyone can see users' personal
 *  data, so everyone needs it; narrow this list only with a good reason. */
export const TWO_FACTOR_REQUIRED_ROLES: readonly AdminRole[] = ADMIN_ROLES;

export function requiresTwoFactor(role: AdminRole): boolean {
  return TWO_FACTOR_REQUIRED_ROLES.includes(role);
}

/** Password rules for back-office accounts. Returns an error message or null. */
export function checkAdminPassword(pw: string): string | null {
  if (pw.length < 12) return "Password must be at least 12 characters.";
  if (!/[a-z]/.test(pw) || !/[A-Z]/.test(pw) || !/\d/.test(pw)) {
    return "Password needs upper-case, lower-case and a number.";
  }
  return null;
}
