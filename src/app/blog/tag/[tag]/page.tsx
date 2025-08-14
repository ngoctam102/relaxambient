// app/blog/tag/[tag]/page.tsx
import Link from "next/link";
import { posts } from "../../_posts";

export const dynamic = "error";

export async function generateStaticParams() {
  const s = new Set<string>();
  posts.forEach(p => p.tags?.forEach(t => s.add(t)));
  return Array.from(s).map(tag => ({ tag }));
}

type TagParams = { tag: string };

export default async function TagPage(
  { params }: { params: Promise<TagParams> }
) {
  const { tag } = await params;            // 👈 await vì params là Promise
  const decoded = decodeURIComponent(tag);
  const list = posts.filter(p => p.tags?.includes(decoded));

  return (
    <main id="main" className="mx-auto max-w-[1280px] px-3 md:px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Posts tagged: {decoded}
      </h1>

      {list.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map(p => (
            <li key={p.slug} className="rounded-2xl overflow-hidden border bg-white">
              <Link href={p.href} title={`Read: ${p.title}`} className="block p-4">
                <h2 className="font-semibold text-lg leading-snug">{p.title}</h2>
                {p.excerpt && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.excerpt}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
