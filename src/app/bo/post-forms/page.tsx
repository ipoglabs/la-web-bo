import { requireAdminPage } from "@/lib/adminGuard"
import { listPostForms, type PostFormDoc } from "@/lib/postForms"

export default async function PostFormsPage() {
  await requireAdminPage("postforms.view", "/bo/post-forms")
  const docs = await listPostForms()

  const byCategory = new Map<string, PostFormDoc[]>()
  for (const d of docs) byCategory.set(d.category, [...(byCategory.get(d.category) ?? []), d])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Post form reviews</h1>
        <p className="text-sm text-muted-foreground">
          The review of every post form, category by category: current fields, suggested changes and what was
          built. Copies of the team&apos;s Claude docs; {docs.length} pages in {byCategory.size} categories.
        </p>
      </div>

      {docs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews imported yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...byCategory].map(([category, items]) => (
            <section key={category} className="bg-white rounded-xl border shadow p-5">
              <h2 className="font-semibold mb-2">{category}</h2>
              <ul className="space-y-1 text-sm">
                {items.map((d) => (
                  <li key={d.slug}>
                    {/* A route handler serves the page as plain HTML: full page load, not <Link>. */}
                    <a href={`/bo/post-forms/${d.slug}`} className="text-blue-600 underline">
                      {d.sub ?? (d.title.includes("To-do") ? "Category to-do" : d.title.split(" — ")[1] ?? "Overview")}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
