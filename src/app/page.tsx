"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";

// Kiểu dữ liệu cho từng sound item
interface SoundItem {
  id: string;
  name: string;
  audioSrc: string;
  videoSrc: string; // video nền khi play
  thumbSrc: string; // ảnh đại diện hiển thị trên thẻ
  tags?: string[];
}

// Demo dữ liệu – bạn thay đường dẫn thật của bạn vào đây
const SOUND_LIST: SoundItem[] = [
  {
    id: "fire",
    name: "Campfire",
    audioSrc: "/sounds/Fire.m4a",
    videoSrc: "/videos/fire.mp4",
    thumbSrc: "/thumbnails/fire_thumbnail.webp",
    tags: ["relax", "warm", "nature"],
  },
  {
    id: "rain",
    name: "Rain on Leaves",
    audioSrc: "/sounds/rainy_storm.m4a",
    videoSrc: "/videos/rain.mp4",
    thumbSrc: "/thumbnails/rain.webp",
    tags: ["sleep", "calm", "nature"],
  },
  {
    id: "waves",
    name: "Ocean Waves",
    audioSrc: "/sounds/golden_coast.m4a",
    videoSrc: "/videos/golden_coast.mp4",
    thumbSrc: "/thumbnails/golden_coast_thumbnail.webp",
    tags: ["focus", "breathe", "nature"],
  },
];

export default function Page() {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [backgroundVideo, setBackgroundVideo] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const currentItem: SoundItem | undefined = useMemo(
    () => SOUND_LIST.find((s) => s.id === currentId),
    [currentId]
  );

  const handlePlay = (item: SoundItem) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const audio = new Audio(item.audioSrc);
    audio.loop = true;
    audio.play();
    setCurrentAudio(audio);
    setCurrentId(item.id);
    setBackgroundVideo(item.videoSrc);

    // Auto scroll để xem video
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    }
  };

  const handleStop = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setCurrentAudio(null);
    setCurrentId(null);
    setBackgroundVideo(null);
  };

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
    <div className="w-full max-w-[1280px] mx-auto px-3 md:px-6 min-h-screen flex flex-col">
      
      {/* Header (không lồng max-w khác nữa) */}
      <header className="shrink-0 mt-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 rounded-2xl bg-white/70 backdrop-blur p-3 shadow">
          <div className="flex gap-4 flex-row-reverse items-center">
            <h1 className="font-bold text-2xl">RELAX AMBIENT</h1>
            <div id="logo" style={{ mixBlendMode: 'multiply' }}>
              <Image loading="lazy" src="/android-chrome-512x512.png" alt="Relax Ambient logo" title="Relax Ambient Logo" width={56} height={56} className="rounded-lg" />
            </div>
          </div>
          <p className="italic text-center text-sm md:text-base">
            Your source for soothing nature sounds & relaxing ambient music
          </p>
        </div>
      </header>

      {/* HERO chỉ chiếm phần cố định, không làm trang dài thêm */}
      <section className="shrink-0 mt-5">
        <div className="relative h-[38vh] md:h-[44vh] rounded-2xl overflow-hidden" ref={heroRef}>
          <video
            key={backgroundVideo ?? 'default'}
            className="absolute inset-0 block w-full h-full object-cover object-center transform-gpu scale-[1.04]"
            autoPlay loop muted playsInline preload="auto"
            src={backgroundVideo ?? '/videos/default.mp4'}
          />
        </div>
      </section>

      {/* MAIN chiếm hết phần còn lại */}
      <main className="flex-1 flex flex-col mt-4">
        {/* intro ngắn */}
        <section className="mb-3 text-center max-w-2xl mx-auto">
          <p className="text-gray-700">
            Click any sound to play with a matching ambient video. Looping, minimal controls, zero friction.
          </p>
        </section>

        {/* Panel grid: flex-1 + overflow-y-auto => list CAO hơn và chỉ panel cuộn */}
        <section className="flex-1 overflow-y-auto rounded-2xl bg-white/75 backdrop-blur p-4 shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SOUND_LIST.map((item) => {
              const isPlaying = currentId === item.id;
              return (
                <article key={item.id} className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-white/90">
                  <div className="relative w-full h-36">
                    <Image loading="lazy" src={item.thumbSrc} alt={`${item.name} - ambient sound thumbnail`} title={`${item.name}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-base font-semibold text-gray-900">{item.name}</h3>
                    {item.tags && (
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-600">
                        {item.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 border">{t}</span>
                        ))}
                      </div>
                    )}
                    <div className="mt-3 flex items-center gap-3">
                      {!isPlaying ? (
                        <button onClick={() => handlePlay(item)} className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90" aria-label={`Play ${item.name}`}>
                          Play
                        </button>
                      ) : (
                        <button onClick={handleStop} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:opacity-90" aria-label={`Stop ${item.name}`}>
                          Stop
                        </button>
                      )}
                      {isPlaying && <span className="text-sm text-green-700 font-medium">Now playing…</span>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer auto dính đáy nhờ layout flex */}
      <footer className="shrink-0 mt-4 mb-6">
        <div className="rounded-2xl bg-white/70 backdrop-blur p-3 text-center shadow">
          Feedback, suggestions and problems: <i>phamtam102@gmail.com</i>
        </div>
      </footer>
    </div>

    {/* Mini player mobile vẫn giữ nguyên nếu cần */}
    {currentItem && (
      <div className="fixed bottom-3 inset-x-3 z-20 md:hidden">
        <div className="bg-black/70 text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="text-sm">
            <div className="font-semibold leading-tight">{currentItem.name}</div>
            <div className="text-white/80 text-xs leading-tight truncate">{currentItem.tags?.join(' • ')}</div>
          </div>
          <button onClick={handleStop} className="px-3 py-1.5 rounded-xl bg-red-500">Stop</button>
        </div>
      </div>
    )}
  </div>
);

}

