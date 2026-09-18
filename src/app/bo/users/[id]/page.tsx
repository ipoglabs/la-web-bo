import connectDB from "@/lib/db";
import Post from "@/models/post";
import User from "@/models/user";
import { notFound, redirect } from "next/navigation";
import { toClientPost } from "@/lib/serialize";
import AdminUserAdCard from "./AdminUserAdCard";
import AdminUserActions from "./AdminUserActions";
import { Types } from "mongoose";
import Link from "next/link";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminJwt, isAdminRole } from "@/lib/adminAuth";

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

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value || "";
  const session = token ? verifyAdminJwt(token) : null;

  if (!session || !isAdminRole(session.role)) {
    redirect("/bo-login?next=/bo/users/" + id);
  }

  if (!Types.ObjectId.isValid(id)) return notFound();

  await connectDB();

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
    .lean<any>();

  if (!user) return notFound();

  const isSuspended =
    !!user.isSuspended || user.accountStatus === "Suspended";

  const or: any[] = [{ ownerId: new Types.ObjectId(id) }];

  if (user.email) {
    or.push({
      $and: [
        { "seller_info.email": { $type: "string" } },
        { "seller_info.email": new RegExp(`^${user.email}$`, "i") },
      ],
    });
  }

  const posts = await Post.find({ $or: or }).sort({ updatedAt: -1 }).lean();
  const safePosts = posts.map((p: any) => toClientPost(p));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/bo/users" className="text-sm text-blue-600 underline">
          ← Back to users
        </Link>

        <AdminUserActions
          viewerRole={session.role}
          userId={id}
          userEmail={user.email}
          isSuspended={isSuspended}
        />
      </div>

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
          <img
            src={user.image}
            alt={user.fullName}
            className="h-16 w-16 rounded-full border object-cover"
          />
        ) : null}
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
            {safePosts.map((p: any) => (
              <AdminUserAdCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}