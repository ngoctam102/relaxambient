"use client";
import { useEffect, useState, useMemo, useRef, useCallback, Suspense } from "react";
import Image from "next/image";
import { SOUND_LIST, SoundItem } from "@/app/data/sounds";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/** Component nhỏ chỉ để đọc query (?s=) và kích hoạt phát */
function QuerySync({
  currentId,
  playItem,
  router,
  stoppingRef,
}: {
  currentId: string | null;
  playItem: (item: SoundItem) => void;
  router: ReturnType<typeof useRouter>;
  stoppingRef: React.MutableRefObject<boolean>;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (stoppingRef.current) return; // đang stop → bỏ qua

    const s = searchParams.get("s");
    if (!s) return;
    if (currentId === s) return;

    const item = SOUND_LIST.find((x) => x.id === s);
    if (!item) {
      router.replace("/", { scroll: false });
      return;
    }
    playItem(item);
  }, [searchParams, currentId, playItem, router, stoppingRef]);

  return null;
}

function HomeInner() {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [backgroundVideo, setBackgroundVideo] = useState<string | null>(null);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [manualPlaying, setManualPlaying] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const stoppingRef = useRef(false);
  const router = useRouter();

  const currentItem: SoundItem | undefined = useMemo(
    () => SOUND_LIST.find((s) => s.id === currentId),
    [currentId]
  );

  // Play item chịu trách nhiệm phát sound và cập nhật state
  const playItem = useCallback(
    async (item: SoundItem) => {
      // Dừng audio cũ
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      // Tạo audio mới, phát, setState cho id,audio,video
      const audio = new Audio(item.audioSrc);
      audio.loop = true;
      try {
        await audio.play();

        setCurrentAudio(audio);
        setCurrentId(item.id);
        setBackgroundVideo(item.videoSrc);

        setAutoplayFailed(false);
        setManualPlaying(false);
        console.log("Playing", item.name);
      } catch (error) {
        setCurrentId(item.id);
        setBackgroundVideo(item.videoSrc);
        console.warn("Unable autoplay", error);
        setAutoplayFailed(true);
        setManualPlaying(false);
      }

      // Auto scroll khi màn hình có chiều không đủ sẽ scroll lên đầu trang để dễ nhìn thấy video.
      if (typeof window !== "undefined" && window.matchMedia("(max-width: 1280px)").matches) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    },
    [currentAudio]
  );

  // Handle Play gọi play item đồng thời điều chỉnh URL.
  const handlePlay = (item: SoundItem) => {
    playItem(item);
    router.replace(`/?s=${encodeURIComponent(item.id)}`);
  };

  // Xử lí khi người dùng bấm nút STOP.
  const handleStop = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.src = "";
    }
    setCurrentAudio(null);
    setCurrentId(null);
    setBackgroundVideo(null);
    // Reset trạng thái auto play và manual play
    setAutoplayFailed(false);
    setManualPlaying(false);

    stoppingRef.current = true;
    // Đảm bảo xoá sạch url liên quan đến sound đó nếu bấm stop
    router.replace("/", { scroll: false });
    setTimeout(() => {
      stoppingRef.current = false;
    }, 0);
  };

  // Clean up audio khi unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, [currentAudio]);

  return (
    <div className="min-h-screen bg-gray-400 overflow-x-clip">
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

        {/* HERO */}
        <AnimatePresence initial={false}>
          {backgroundVideo && (
            <motion.section
              key="hero"
              className="shrink-0 mt-5"
              initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0.6 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              exit={{
                clipPath: "inset(0% 0% 100% 0%)",
                opacity: 0.8,
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "clip-path, opacity" }}
            >
              <div className="relative h-[38vh] md:h-[44vh] rounded-2xl overflow-hidden" ref={heroRef}>
                <video
                  className="absolute inset-0 block w-full h-full object-cover object-center transform-gpu"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  src={backgroundVideo}
                />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* MAIN */}
        <main id="main" className="flex-1 flex flex-col mt-4 min-h-0 overflow-hidden">
          {autoplayFailed && !manualPlaying && (
            <button
              onClick={() => {
                if (!currentId) return;
                const item = SOUND_LIST.find((x) => x.id === currentId);
                if (!item) return;

                const audio = new Audio(item.audioSrc);
                audio.loop = true;
                audio.play().then(() => {
                  setCurrentAudio(audio);
                  setCurrentId(item.id);
                  setBackgroundVideo(item.videoSrc);
                  setAutoplayFailed(false);
                  setManualPlaying(true);
                });
              }}
              className="mb-2 p-3 max-w-[120px] bg-black text-white font-semibold rounded-lg mx-auto"
            >
              Click to play
            </button>
          )}
          {manualPlaying && (
            <div className="mb-2 p-3 max-w-[120px] bg-black text-white font-semibold rounded-lg mx-auto">
              Playing....
            </div>
          )}

          {/* intro ngắn */}
          <section className="mb-3 text-center max-w-2xl mx-auto">
            <p className="text-gray-800 font-semibold">
              Click any sound to play with a matching ambient video. Looping, minimal controls.
            </p>
          </section>

          {/* Grid panel */}
          <section className="flex-1 overflow-y-auto min-h-0 rounded-2xl bg-white/75 backdrop-blur p-4 shadow">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SOUND_LIST.map((item, idx) => {
                const isPlaying = currentId === item.id;
                const isLcpCandidate = idx === 0; // Ảnh đầu tiên: LCP candidate

                return (
                  <article
                    key={item.id}
                    className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-white/90"
                  >
                    <div className="relative w-full h-36">
                      <Image
                        src={item.thumbSrc}
                        alt={`${item.name} - ambient sound thumbnail`}
                        title={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        {...(isLcpCandidate
                          ? { priority: true as const, fetchPriority: "high" as const }
                          : { loading: "lazy" as const }
                        )}
                      />
                    </div>
                    <div className="p-3">
                      <h2 className="text-base font-semibold text-gray-900">{item.name}</h2>
                      {item.tags && (
                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-600">
                          {item.tags.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 border">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-3 flex items-center gap-3">
                        {!isPlaying ? (
                          <button
                            onClick={() => handlePlay(item)}
                            className="px-4 py-2 rounded-xl bg-black text-white hover:scale-105 transition-all duration-400"
                            aria-label={`Play ${item.name}`}
                          >
                            Play
                          </button>
                        ) : (
                          <button
                            onClick={handleStop}
                            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:scale-105 transition-all duration-400"
                            aria-label={`Stop ${item.name}`}
                          >
                            Stop
                          </button>
                        )}
                        {isPlaying && (
                          <div>
                            <span className="text-sm text-green-700 font-medium">Now playing…</span>
                            <a
                              href={`/blog/${item.slug}`}
                              className="text-sm p-2 ml-2 rounded-full border text-gray-600 hover:bg-black hover:text-white transition-all duration-400"
                              title={`Read ${item.name} sounds guide`}
                            >
                              Learn more
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="shrink-0 mt-4 mb-6">
          <div className="rounded-2xl bg-white/70 backdrop-blur p-3 text-center shadow">
            Feedback, suggestions and problems: <i>phamtam102@gmail.com</i>
            <span className="mx-2 opacity-40">•</span>
            <a href="/blog" title="Read ambient sound blog posts" className="underline underline-offset-4 hover:opacity-80">
              Blog
            </a>
            <span className="mx-2 opacity-40">•</span>
            <a href="/sitemap.xml" title="site map" className="underline underline-offset-4 hover:opacity-80">
              Sitemap
            </a>
          </div>
        </footer>
      </div>

      {/* Mini player mobile */}
      {currentItem && (
        <div className="fixed bottom-3 inset-x-3 z-20 md:hidden">
          <div className="bg-black/70 text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg">
            <div className="text-sm">
              <div className="font-semibold leading-tight">{currentItem.name}</div>
              <div className="text-white/80 text-xs leading-tight truncate">
                {currentItem.tags?.join(" • ")}
              </div>
            </div>
            <button onClick={handleStop} className="px-3 py-1.5 rounded-xl bg-red-500">
              Stop
            </button>
          </div>
        </div>
      )}

      {/* ✅ Chỉ bọc phần đọc searchParams bằng Suspense để thỏa yêu cầu Next,
          đồng thời vẫn giữ UI/ảnh LCP được SSR đầy đủ */}
      <Suspense fallback={null}>
        <QuerySync
          currentId={currentId}
          playItem={playItem}
          router={router}
          stoppingRef={stoppingRef}
        />
      </Suspense>
    </div>
  );
}

export default function Page() {
  // Không bọc toàn trang bằng Suspense để LCP ảnh vẫn discoverable
  return <HomeInner />;
}
