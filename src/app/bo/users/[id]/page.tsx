import connectDB from "@/lib/db";
import Post from "@/models/post";
import User, { type IUser } from "@/models/user";
import { notFound } from "next/navigation";
import { toClientPost, type LeanPost } from "@/lib/serialize";
import AdminUserAdCard from "./AdminUserAdCard";
import AdminUserActions from "./AdminUserActions";
import { Types } from "mongoose";
import Link from "next/link";
import { requireAdminPage } from "@/lib/adminGuard";
import { hasPerm } from "@/lib/adminPermissions";
import { reportCountsByOwner, VALID_REPORTS_ESCALATE } from "@/lib/reportCounts";
import EscalateButton from "../../components/EscalateButton";
import OpenEscalation from "../../components/OpenEscalation";

function Pill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
        ok
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-amber-50 text-amber-700 border-amber-200"
      }`}
    >
      {label}
    </span>
  );
}

export default async function BoUserAds({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const admin = await requireAdminPage("users.view", "/bo/users/" + id);

  if (!Types.ObjectId.isValid(id)) return notFound();

  await connectDB();

  type UserSummary = Pick<
    IUser,
    "fullName" | "email" | "image" | "isEmailVerified" | "isPrimaryNumberVerified" | "accountStatus" | "isSuspended"
  > & { _id: Types.ObjectId };

  const user = await User.findById(id)
    .select([
      "fullName",
      "email",
      "image",
      "isEmailVerified",
      "isPrimaryNumberVerified",
      "accountStatus",
      "isSuspended",
    ])
    .lean<UserSummary | null>();

  if (!user) return notFound();

  const isSuspended =
    !!user.isSuspended || user.accountStatus === "Suspended";

  const or: Record<string, unknown>[] = [{ ownerId: new Types.ObjectId(id) }];

  if (user.email) {
    or.push({
      $and: [
        { "seller_info.email": { $type: "string" } },
        { "seller_info.email": new RegExp(`^${user.email}$`, "i") },
      ],
    });
  }

  const posts = await Post.find({ $or: or }).sort({ updatedAt: -1 }).lean<LeanPost[]>();
  const reports = (await reportCountsByOwner([id])).get(id) ?? { open: 0, valid: 0, dismissed: 0, total: 0 };
  const canEscalate = hasPerm(admin.role, "escalations.create") && !hasPerm(admin.role, "escalations.review");
  const safePosts = posts.flatMap((p) => toClientPost(p) ?? []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/bo/users" className="text-sm text-blue-600 underline">
          ← Back to users
        </Link>

        <AdminUserActions
          canSuspend={hasPerm(admin.role, "users.suspend")}
          canDelete={hasPerm(admin.role, "users.delete")}
          userId={id}
          userEmail={user.email}
          isSuspended={isSuspended}
        />
      </div>

      <OpenEscalation targetType="user" targetId={id} canReview={hasPerm(admin.role, "escalations.review")} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">
            Ads by {user.fullName}
          </h1>
          <div className="text-sm text-slate-600">{user.email}</div>

          <div className="mt-2 flex flex-wrap gap-2">
            <Pill
              ok={!!user.isEmailVerified}
              label={user.isEmailVerified ? "Email verified" : "Email not verified"}
            />

            <Pill
              ok={!!user.isPrimaryNumberVerified}
              label={
                user.isPrimaryNumberVerified
                  ? "Phone verified"
                  : "Phone not verified"
              }
            />

            {isSuspended ? <Pill ok={false} label="Suspended" /> : null}
          </div>
        </div>

        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- external R2 URL, admin-only page
          <img
            src={user.image}
            alt={user.fullName}
            className="h-16 w-16 rounded-full border object-cover"
          />
        ) : null}
      </div>

      <div
        className={`rounded-xl border p-5 ${
          reports.valid >= VALID_REPORTS_ESCALATE ? "bg-red-50 border-red-200" : "bg-white shadow"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold">Reports against this user&apos;s ads</h2>
            <p className="text-sm text-slate-700">
              {reports.total === 0
                ? "None."
                : `${reports.valid} valid (actioned) · ${reports.open} open · ${reports.dismissed} dismissed`}
            </p>
            {reports.valid >= VALID_REPORTS_ESCALATE && (
              <p className="mt-1 text-sm font-medium text-red-700">
                {VALID_REPORTS_ESCALATE}+ valid reports: this account needs an admin&apos;s suspension review.
              </p>
            )}
          </div>
          {canEscalate && !isSuspended && <EscalateButton targetType="user" targetId={id} />}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Ads</h2>
          <span className="text-sm text-slate-600">
            Total: <b>{safePosts.length}</b>
          </span>
        </div>

        {safePosts.length === 0 ? (
          <div className="text-sm text-slate-500">No ads found for this user.</div>
        ) : (
          <div className="space-y-3">
            {safePosts.map((p) => (
              <AdminUserAdCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}