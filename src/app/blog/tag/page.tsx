import Link from "next/link";
import { posts } from "../_posts";

export const dynamic = "error";

export default function TagIndex() {
  const s = new Set<string>();
  posts.forEach(p => p.tags?.forEach(t => s.add(t)));
  const tags = Array.from(s).sort();

  return (
    <main id="main" className="mx-auto max-w-[1280px] px-3 md:px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">All tags</h1>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Link
            key={tag}
            href={`/blog/tag/${encodeURIComponent(tag)}`}
            title={`Browse posts about ${tag}`}
            className="px-3 py-1.5 rounded-xl border hover:bg-black hover:text-white transition"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </main>
  );
}
