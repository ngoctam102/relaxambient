"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BackButton() {
  const pathname = usePathname();

  // Nếu đang ở /blog/... (chi tiết bài) → nút về /blog
  if (pathname.startsWith("/blog/") && pathname !== "/blog") {
    return (
      <Link
        href="/blog"
        className="inline-block px-4 py-2 bg-black text-white rounded hover:scale-105 transition-all duration-300"
        title="Go to Blog index"
      >
        ← Back to Blog
      </Link>
    );
  }

  // Ngược lại → nút về home
  return (
    <Link
      href="/"
      className="inline-block px-4 py-2 bg-black text-white rounded hover:scale-105 transition-all duration-300"
      title="Go to Relax Ambient homepage"
    >
      ← Back to Home
    </Link>
  );
}
