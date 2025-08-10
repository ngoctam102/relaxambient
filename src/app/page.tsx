"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [backgroundVideo, setBackgroundVideo] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlay = (sound: string, video: string) => {
    // Khi phát sound thì nếu sound cũ đang chạy thì ta sẽ tắt nó, để chạy sound mới, tránh phát cùng lúc nhiều sound.
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    // Phát sound mới.
    const audio = new Audio(sound);
    audio.loop = true;
    audio.play();
    // Set audio và video hiện tại được chọn.
    setCurrentAudio(audio);
    setBackgroundVideo(video);
  }

  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, [currentAudio]);

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center">
      {/* Background Layer */}
      <div className="absolute inset-0">
        {!backgroundVideo ? (
          <Image
            src="/thumbnails/landing_page_image.webp"
            alt="Background"
            width= {500}
            height={500}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          ></video>
        )}
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full overflow-auto pb-16">
        {!started ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStarted(true)}
            className="px-6 py-3 bg-white text-black rounded-full shadow-lg text-xl font-bold hover:bg-gray-200 transition"
          >
            Start Relax
          </motion.button>
        ) : (
          <>
            {/* Container grid 3 cột */}
            <div className="max-w-full w-full px-4 sm:px-6 md:px-8 mx-auto grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-6">
              
              {/* Sidebar trái */}
              <div className="hidden md:block">
                <div className="sticky top-20">Quảng cáo bên trái</div>
              </div>

              {/* Nội dung chính */}
              <div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                  {[
                    { id: 1, title: "Fire", thumb: "/thumbnails/fire_thumbnail.webp", video: "/videos/fire.mp4", audio: "/sounds/Fire.m4a" },
                    { id: 2, title: "Rain", thumb: "/thumbnails/rain.webp", video: "/videos/rain.mp4", audio: "/sounds/rainy_storm.m4a" },
                    { id: 3, title: "Waves", thumb: "/thumbnails/golden_coast_thumbnail.webp", video: "/videos/golden_coast.mp4", audio: "/sounds/golden_coast.m4a" },
                  ].map((sound) => (
                    <button
                      key={sound.id}
                      onClick={() => handlePlay(sound.audio, sound.video)}
                      className="bg-white/80 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition"
                    >
                      <img
                        src={sound.thumb}
                        alt={sound.title}
                        className="w-full aspect-[16/9] object-cover rounded-md"
                      />
                      <div className="p-2 text-center font-semibold">{sound.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sidebar phải */}
              <div className="hidden md:block">
                <div className="top-20">Quảng cáo bên phải</div>
              </div>
            </div>

            {/* Quảng cáo mobile dưới cùng - nằm ngoài container grid 3 cột */}
            <div className="fixed bottom-0 w-full mt-5">
              <div className="bg-gray-100 p-4 rounded-t text-center">
                Quảng cáo mobile dưới cùng
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
