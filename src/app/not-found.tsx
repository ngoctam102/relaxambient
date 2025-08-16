import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-400 overflow-x-clip">
      {/* Container cột */}
      <div className="w-full max-w-[1280px] mx-auto px-3 md:px-6 min-h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <header className="shrink-0 mt-3">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2 rounded-2xl bg-white/70 backdrop-blur p-3 shadow">
            <div className="flex gap-4 flex-row-reverse items-center">
              <h1 className="font-bold text-2xl">RELAX AMBIENT</h1>
              <div id="logo" style={{ mixBlendMode: "multiply" }}>
                <Image
                  src="/android-chrome-56x56.png"
                  alt="Relax Ambient logo"
                  title="Relax Ambient Logo"
                  width={56}
                  height={56}
                  className="rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="italic text-center text-sm md:text-base">
              Your source for soothing nature sounds & relaxing ambient music
            </p>
          </div>
        </header>

        {/* Main – chiếm hết phần còn lại để đẩy footer xuống đáy */}
        <main
          id="main"
          className="flex-1 flex flex-col mt-4 min-h-0 overflow-hidden rounded-2xl bg-white/60 backdrop-blur p-6 shadow"
        >
          {/* nội dung 404 của bạn ở đây */}
          <div className="m-auto text-center space-y-3">
            <h2 className="text-3xl font-bold">404 — Page not found</h2>
            <Link
              href="/"
              className="inline-block px-4 py-3 rounded-lg bg-black text-white hover:scale-110 transition-all duration-400"
            >
              Back to home page
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="shrink-0 mt-4 mb-6">
          <div className="rounded-2xl bg-white/70 backdrop-blur p-3 text-center shadow">
            Feedback, suggestions and problems: <i>phamtam102@gmail.com</i>
            <span className="mx-2 opacity-40">•</span>
            <a
              href="/blog"
              title="Read ambient sound blog posts"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Blog
            </a>
            <span className="mx-2 opacity-40">•</span>
            <a
              href="/sitemap.xml"
              title="site map"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Sitemap
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
