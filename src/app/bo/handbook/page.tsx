import { requireAdminPage } from "@/lib/adminGuard"
import { ADMIN_ROLES, ROLE_LABELS, ROLE_PERMS, ROLE_SUMMARY, type AdminRole } from "@/lib/adminPermissions"

const GOLDEN_RULES = [
  "Your account is yours alone. Never share your Employee ID, password or a signed-in browser.",
  "Keep two-factor sign-in on your own phone only, and keep your recovery codes in a password manager, not on paper by your desk. Never read a sign-in code to anyone: no one at LokalAds will ever ask for it.",
  "Everything you do here is recorded in the audit log with your name, time and IP address. Act as if it will be reviewed, because it will be.",
  "Only open a user's data when a ticket, report or moderation task needs it. Curiosity is not a reason.",
  "Never copy user data (phone numbers, emails, chats, IDs) out of the back office into WhatsApp, personal email, screenshots or spreadsheets.",
  "Never contact a user from a personal phone or account. Use official support channels only.",
  "Write a clear, factual reason for every suspend, delete, reject and role change. Other staff and the user may read it.",
  "Don't act on a case that involves you, a friend, a family member or a competitor. Hand it to a colleague.",
  "If you're unsure, don't act. Escalate to the next role up (Moderator → Admin → Super Admin).",
  "Lock your screen when you step away and sign out on shared computers.",
  "Report a mistake, suspicious login or data leak to a Super Admin straight away. Reporting quickly is never punished; hiding it is.",
]

type Duty = { title: string; items: string[] }

const DUTIES: Record<AdminRole, Duty[]> = {
  super_admin: [
    {
      title: "Access & accounts",
      items: [
        "Create Admin accounts; keep at least two active Super Admins, and no more than needed.",
        "Deactivate staff on their last day, before they leave the building, not after.",
        "Monthly access review on BO Employees: remove anyone inactive 60+ days or whose job changed.",
        "Super Admin accounts are created only with scripts/create-super-admin.mjs, never shared.",
        "Reset someone's password or two-factor, or unlock them (Staff → their page), only after confirming it's really them: call them back on a number you already have. A \"lost my phone\" message is exactly what an attacker would send.",
      ],
    },
    {
      title: "Oversight",
      items: [
        "Weekly: skim the audit log for failed logins/lock-outs, wrong two-factor codes, recovery-code sign-ins, deletes, role changes and Dev Tools access.",
        "Check every Dev Tools view (chats, deleted users) has a matching ticket or legal request.",
        "Approve permanent user deletions; only Super Admins can delete.",
      ],
    },
    {
      title: "Security & incidents",
      items: [
        "Rotate ADMIN_JWT_SECRET if a secret or laptop may be compromised; this signs everyone out.",
        "Never change or lose ADMIN_2FA_KEY: it decrypts everyone's authenticator setup. If it changes, every account has to have two-factor reset.",
        "Lead incident response: contain, preserve the audit log, notify affected users if required by law.",
        "Handle law-enforcement and legal data requests personally, and log the request reference as the reason.",
      ],
    },
  ],
  admin: [
    {
      title: "Team",
      items: [
        "Create Moderator / Support / Analyst accounts for new joiners; share Employee ID and password separately.",
        "Deactivate team members who leave or move role, the same day.",
        "Unlock or reset the password of Moderators, Support and Analysts from Staff → their page, after confirming by phone it's them. Give the temporary password in person or by call, never in the same chat as their Employee ID.",
        "Spot-check 10 moderator decisions a week from the audit log; coach on wrong calls.",
      ],
    },
    {
      title: "Escalations",
      items: [
        "Decide user suspensions escalated by moderators. Suspend for: fraud/scams, repeated prohibited ads, harassment, fake identity.",
        "Suspend ads that are illegal, dangerous or fraudulent; these need an Admin to restore.",
        "Unsuspend only after checking the original reason in the audit log; write why you're reversing it.",
      ],
    },
    {
      title: "Platform",
      items: [
        "Review Option requests: add values that are real and spelled correctly; dismiss spam, slurs and duplicates.",
        "Keep the pending queue under 24 hours; redistribute work if it builds up.",
      ],
    },
  ],
  moderator: [
    {
      title: "Ad queue (daily)",
      items: [
        "Work the Pending queue oldest-first; target a decision within 24 hours of posting.",
        "Approve when: photos match the item, price is realistic, category is right, contact details aren't in the description.",
        "Reject (with a reason the seller can act on) when: wrong category, misleading photos, missing info, duplicate ad, contact info in text.",
        "Escalate to an Admin (don't just reject) for: scams, weapons, drugs, adult content, stolen goods, counterfeit items, anything involving minors.",
      ],
    },
    {
      title: "User reports",
      items: [
        "Review new Reports daily. Mark Actioned only if you changed something; Dismissed if the report was unfounded. Always add a note.",
        "If one user collects 3+ valid reports, escalate their account to an Admin for suspension review.",
      ],
    },
    {
      title: "Writing reject reasons",
      items: [
        "Be specific and polite: \"The photos show a different phone model than the title. Please upload photos of the item you're selling.\"",
        "Never insult, guess at motives or share internal notes in a seller-facing reason.",
      ],
    },
  ],
  support: [
    {
      title: "Helping users",
      items: [
        "Look up a user or ad only when answering their ticket. Note the ticket number in your support tool.",
        "Verify identity before discussing an account: registered email or phone OTP, never just a name.",
        "Never read out or send full phone numbers, emails or passwords; never ask a user for their password or OTP.",
        "Explain rejections using the reason on the ad; if the user disagrees, pass it to a Moderator.",
        "Pass reports of scams, threats or account takeover to an Admin immediately.",
      ],
    },
  ],
  analyst: [
    {
      title: "Reporting",
      items: [
        "Use aggregate numbers only. Don't export or share individual user or ad details.",
        "Raise unusual spikes (sudden ad volume from one user/area, report surges) with an Admin; they may be spam or fraud.",
      ],
    },
  ],
}

const CADENCE: { when: string; who: string; items: string[] }[] = [
  {
    when: "Every day",
    who: "Moderators (Admin covers gaps)",
    items: ["Clear the Pending ads queue", "Review new Reports", "Escalate scams and illegal content"],
  },
  {
    when: "Every week",
    who: "Admin / Super Admin",
    items: [
      "Spot-check moderator decisions in the Audit log",
      "Review failed logins and lock-outs",
      "Clear Option requests",
      "Review all user suspensions and deletions for correct reasons",
    ],
  },
  {
    when: "Every month",
    who: "Super Admin",
    items: [
      "Access review: deactivate leavers and inactive accounts",
      "Review every Dev Tools access against tickets",
      "Check backups and that the audit log is growing (logging still works)",
    ],
  },
  {
    when: "Staff leaves or changes job",
    who: "Their manager (Admin / Super Admin)",
    items: ["Deactivate or change role the same day", "Reassign their open work", "Log the reason"],
  },
]

const INCIDENT_STEPS = [
  "Contain: deactivate the affected staff account(s) on BO Employees (signs them out at once). If a secret may have leaked, a Super Admin rotates ADMIN_JWT_SECRET.",
  "Preserve: don't delete anything. Filter the Audit log by the account and save what it did.",
  "Assess: what data or accounts were touched, from which IPs, during what time window.",
  "Fix: undo wrong actions (unsuspend, restore ads), each with a reason referencing the incident.",
  "Notify: Super Admin decides on informing users or authorities as the law requires.",
  "Review: write up what happened and what changes prevent it next time.",
]

export default async function HandbookPage() {
  const admin = await requireAdminPage(undefined, "/bo/handbook")
  const order: AdminRole[] = [admin.role, ...ADMIN_ROLES.filter((r) => r !== admin.role)]

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold">Staff handbook</h1>
        <p className="text-sm text-muted-foreground">
          The rules everyone with back-office access follows, and what each role is responsible for. Your role is{" "}
          <b>{ROLE_LABELS[admin.role]}</b>.
        </p>
      </div>

      <section className="bg-white rounded-xl border shadow p-6 space-y-3">
        <h2 className="text-lg font-semibold">Golden rules: everyone, every day</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          {GOLDEN_RULES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Roles & responsibilities</h2>
        {order.map((role) => (
          <details
            key={role}
            open={role === admin.role}
            className={`bg-white rounded-xl border shadow p-5 ${role === admin.role ? "border-blue-300" : ""}`}
          >
            <summary className="cursor-pointer font-medium">
              {ROLE_LABELS[role]}
              {role === admin.role && <span className="ml-2 text-xs text-blue-600">(you)</span>}
              <span className="block text-sm font-normal text-muted-foreground">{ROLE_SUMMARY[role]}</span>
            </summary>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {DUTIES[role].map((d) => (
                <div key={d.title}>
                  <h3 className="text-sm font-semibold mb-1">{d.title}</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {d.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Permissions: <span className="font-mono">{ROLE_PERMS[role].join(", ")}</span>
            </div>
          </details>
        ))}
      </section>

      <section className="bg-white rounded-xl border shadow p-6 space-y-3">
        <h2 className="text-lg font-semibold">Routine</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {CADENCE.map((c) => (
            <div key={c.when}>
              <h3 className="text-sm font-semibold">
                {c.when} <span className="font-normal text-muted-foreground">· {c.who}</span>
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-red-200 shadow p-6 space-y-3">
        <h2 className="text-lg font-semibold">If something goes wrong</h2>
        <p className="text-sm text-muted-foreground">
          Suspicious login, leaked password, wrong mass action, or data shared by mistake: tell a Super Admin
          immediately, then:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          {INCIDENT_STEPS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>
    </div>
  )
}
