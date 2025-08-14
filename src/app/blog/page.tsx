import Image from "next/image";
import Link from "next/link";
import { posts } from "./_posts";

export const metadata = {
  title: "Blog",
  description: "Share about ambient, sleep, focus...",
};

export default function BlogIndex() {
  // Sắp xếp mới → cũ theo date nếu có
  const sorted = [...posts].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return (
    <main id="main" className="mx-auto max-w-[1280px] py-3">
      <div className="rounded-2xl bg-gray-300 backdrop-blur p-3 md:p-5 shadow w-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Blog</h1>

        {/* Danh sách dạng card chữ nhật */}
        <ul>
          {sorted.map((p) => (
            <li 
              key={p.slug}
              className="mb-3"
              >
              <article
                className="rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-black/10 w-full"
              >
                {/* Khu vực click vào bài (ảnh + nội dung) */}
                <Link
                  href={p.href}
                  title={`Read: ${p.title} | Relax Ambient`}
                  className="no-underline flex flex-col md:flex-row items-stretch gap-4 p-3 md:p-4"
                >
                  {/* Thumbnail: mobile full-width (stack), md trở lên cố định trái */}
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 w-full h-44 md:w-56 md:h-36 shrink-0">
                    {p.thumbnail ? (
                      <Image
                        src={p.thumbnail}
                        alt={p.thumbnailAlt ?? `${p.title} - Relax Ambient`}
                        title={p.thumbnailTitle ?? `${p.title} thumbnail`}
                        fill
                        sizes="(max-width: 768px) 100vw, 224px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        priority={false}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
                        No thumbnail
                      </div>
                    )}
                  </div>

                  {/* Nội dung */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-md md:text-lg leading-snug line-clamp-2">
                      {p.title}
                    </h2>

                    {p.excerpt && (
                      <p className="text-sm md:text-base text-gray-600 mt-1 line-clamp-2">
                        {p.excerpt}
                      </p>
                    )}

                    <div className="mt-3 text-xs text-gray-500">
                      {p.date ?? ""}
                    </div>
                  </div>
                </Link>

                {/* Tags (ngoài Link để tránh nested anchor) */}
                {p.tags?.length ? (
                  <div className="px-3 md:px-4 pb-3 md:pb-4 -mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <a
                        key={tag}
                        href={`/blog/tag/${encodeURIComponent(tag)}`}
                        title={`Browse posts about ${tag}`}
                        className="no-underline text-xs px-2 py-0.5 rounded-lg border hover:bg-black hover:text-white transition"
                      >
                        #{tag}
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
