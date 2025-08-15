import type { Metadata } from "next";
import ShareBar from "@/components/ShareBar";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | Relax Ambient",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-400">
      <header className="w-full">
        <div className="mx-auto max-w-[1280px] px-3 md:px-6 py-4">
          <div className="rounded-2xl bg-white/70 backdrop-blur p-4 shadow flex items-center justify-center">
            <h1 className="font-bold text-xl md:text-2xl">
              RELAX AMBIENT — BLOG
            </h1>
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-[1280px] px-3 md:px-6 py-6">
        <div className="rounded-2xl bg-white/90 backdrop-blur p-6 shadow">
            <div className="my-4">
                <BackButton />
            </div>
          {/* mdx-content: áp style chữ trong globals.css */}
          <article className="mdx-content">
            {children}
            <ShareBar />
            </article>
        </div>
      </main>

      <footer className="mx-auto max-w-[1280px] px-3 md:px-6 pb-10">
        <div className="rounded-2xl bg-white/70 backdrop-blur p-3 text-center shadow">
          Feedback, suggestions and problems: <i>phamtam102@gmail.com</i>
          <span className="mx-2 opacity-40">•</span>
            <a href="/" title="Relax Ambient Home Page" className="underline underline-offset-4 hover:opacity-80">
              Home
            </a>
            <span className="mx-2 opacity-40">•</span>
            <a href="/sitemap.xml" title="site map" className="underline underline-offset-4 hover:opacity-80">
              Sitemap
            </a>
        </div>
      </footer>
    </div>
  );
}
