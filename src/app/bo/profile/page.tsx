import Link from "next/link";
import { requireAdminPage } from "@/lib/adminGuard";
import { ROLE_LABELS, ROLE_SUMMARY } from "@/lib/adminPermissions";
import ChangePasswordForm from "./ChangePasswordForm";
import TwoFactorSetup, { RegenerateRecoveryCodes } from "./TwoFactorSetup";
import TestAlertButton from "./TestAlertButton";

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
          Forgot your password or locked out? Ask a Super Admin (or your Admin) to reset or unlock it from the Staff page. You&apos;ll be asked to choose a new one when you next
          sign in.
        </p>
      </div>

      <div id="two-factor" className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Two-factor sign-in</h2>
        {admin.twoFactorEnabled ? (
          <>
            <p className="text-sm">
              <b className="text-green-700">On.</b> You sign in with your password and a code from your authenticator
              app.
            </p>
            <RegenerateRecoveryCodes />
            <p className="text-xs text-muted-foreground">
              Lost your phone? Sign in with a recovery code, then ask a Super Admin to reset your two-factor so you can
              set it up on a new phone.
            </p>
          </>
        ) : (
          <TwoFactorSetup />
        )}
      </div>

      {admin.role === "super_admin" && (
        <div id="alerts" className="bg-white p-6 rounded-xl shadow space-y-3">
          <h2 className="text-lg font-semibold">Error alerts</h2>
          <p className="text-sm text-muted-foreground">
            Server errors in the back office are sent to Rollbar (personal data removed), which emails an alert when a
            new kind of error appears. Use this to check alerts still reach you.
          </p>
          <TestAlertButton />
        </div>
      )}
    </div>
  );
}
