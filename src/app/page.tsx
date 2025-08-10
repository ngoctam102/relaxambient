"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [backgroundVideo, setBackgroundVideo] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlay = (sound: any, video: any) => {
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
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0">
        {!backgroundVideo ? (
          <img
            src="/thumbnails/landing_page_image.webp"
            alt="Background"
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
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
          <div className="max-w-5xl w-full px-4">
            {/* Grid sound list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
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
                    className="w-full h-50 object-cover"
                  />
                  <div className="p-2 text-center font-semibold">
                    {sound.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
