import Link from "next/link";
import { requireAdminPage } from "@/lib/adminGuard";
import { ROLE_LABELS, ROLE_SUMMARY } from "@/lib/adminPermissions";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function AdminProfilePage() {
  const admin = await requireAdminPage(undefined, "/bo/profile");

  return (
    <div className="max-w-xl space-y-6">
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-xl font-semibold">My Profile</h1>

        <div className="space-y-2 text-sm">
          <div>Name: <b>{admin.name}</b></div>
          <div>Email: <b>{admin.email}</b></div>
          <div>Role: <b>{ROLE_LABELS[admin.role]}</b></div>
          <div className="text-muted-foreground">{ROLE_SUMMARY[admin.role]}</div>
          <div>Country: <b>{admin.country || "-"}</b></div>
        </div>

        <p className="text-sm">
          Read the <Link href="/bo/handbook" className="text-blue-600 underline">staff handbook</Link> for the rules
          of your role.
        </p>
      </div>

      <div id="password" className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Change password</h2>
        <ChangePasswordForm />
        <p className="text-xs text-muted-foreground">
          Forgot your password? Ask a Super Admin to reset it. You&apos;ll be asked to choose a new one when you next
          sign in.
        </p>
      </div>
    </div>
  );
}
