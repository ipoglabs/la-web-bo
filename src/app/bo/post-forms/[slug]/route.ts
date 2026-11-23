// /bo/post-forms/<slug> — one Post Form Review (src/content/post-forms/<slug>.md)
// rendered as a plain, self-contained HTML page, with the form as it is live now
// (la-web's postformschemas) on top. Permission "postforms.view".
import { notFound, redirect } from "next/navigation";
import { requireAdminPage } from "@/lib/adminGuard";
import { getPostForm, renderPostFormHtml } from "@/lib/postForms";
import { loadLiveForm, renderLiveFormHtml } from "@/lib/postFormLive";
import { reportError } from "@/lib/errorReport";

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const admin = await requireAdminPage("postforms.view", `/bo/post-forms/${encodeURIComponent(slug)}`);
  // Same gates the BO layout applies: own password and two-factor first.
  if (admin.mustChangePassword || admin.needsTwoFactorSetup) redirect("/bo");

  const doc = await getPostForm(slug);
  if (!doc) notFound();

  // Subcategory pages also show the form as it is live now; a DB hiccup must not hide the review.
  let live: string | null = null;
  if (doc.sub) {
    try {
      live = renderLiveFormHtml(await loadLiveForm(doc.category, doc.sub), `${doc.category} › ${doc.sub}`);
    } catch (e) {
      await reportError(e, { where: "page:bo-post-form-live", level: "warning" });
      live = `<p class="muted">Couldn't read the live form just now. Reload to try again.</p>`;
    }
  }

  return new Response(renderPostFormHtml(doc, live), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store",
    },
  });
}
