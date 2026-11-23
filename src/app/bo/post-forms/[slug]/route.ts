// /bo/post-forms/<slug> — one Post Form Review (src/content/post-forms/<slug>.md)
// rendered as a plain, self-contained HTML page. Permission "postforms.view".
import { notFound, redirect } from "next/navigation";
import { requireAdminPage } from "@/lib/adminGuard";
import { getPostForm, renderPostFormHtml } from "@/lib/postForms";

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const admin = await requireAdminPage("postforms.view", `/bo/post-forms/${encodeURIComponent(slug)}`);
  // Same gates the BO layout applies: own password and two-factor first.
  if (admin.mustChangePassword || admin.needsTwoFactorSetup) redirect("/bo");

  const doc = await getPostForm(slug);
  if (!doc) notFound();

  return new Response(renderPostFormHtml(doc), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store",
    },
  });
}
