export interface SoundItem {
  id: string;
  name: string;
  audioSrc: string;
  videoSrc: string; // video nền khi play
  thumbSrc: string; // ảnh đại diện hiển thị trên thẻ
  tags?: string[];
  slug: string;
}

export const SOUND_LIST: SoundItem[] = [
  {
    id: "fire",
    name: "Campfire",
    audioSrc: "https://video.relaxambient.com/fire.m4a",
    videoSrc: "https://video.relaxambient.com/fire.mp4",
    thumbSrc: "/thumbnails/fire_thumbnail.webp",
    tags: ["relax", "warm", "nature"],
    slug: "campfire-sounds"
  },
  {
    id: "rain",
    name: "Rain on Leaves",
    audioSrc: "https://video.relaxambient.com/rain.m4a",
    videoSrc: "https://video.relaxambient.com/rain.mp4",
    thumbSrc: "/thumbnails/rain.webp",
    tags: ["sleep", "calm", "nature"],
    slug: "rain-sounds"
  },
  {
    id: "waves",
    name: "Ocean Waves",
    audioSrc: "https://video.relaxambient.com/coast.m4a",
    videoSrc: "https://video.relaxambient.com/coast.mp4",
    thumbSrc: "/thumbnails/golden_coast_thumbnail.webp",
    tags: ["focus", "breathe", "nature"],
    slug: "ocean-waves"
  },
  {
    id: "storm",
    name: "The Storm",
    audioSrc: "https://video.relaxambient.com/storm.m4a",
    videoSrc: "https://video.relaxambient.com/storm.mp4",
    thumbSrc: "/thumbnails/storm.webp",
    tags: ["relax", "storm", "nature"],
    slug: "storm-sounds"
  },
  {
    id: "summer-forest",
    name: "Summer Forest",
    audioSrc: "https://video.relaxambient.com/summer-forest.m4a",
    videoSrc: "https://video.relaxambient.com/summer-forest.mp4",
    thumbSrc: "/thumbnails/summer-forest.webp",
    tags: ["breathe", "forest", "nature"],
    slug: "summer-forest-sounds"
  },
  {
    id: "forest-Stream-wildlife",
    name: "Forest Stream & Wildlife",
    audioSrc: "https://video.relaxambient.com/forest-stream.m4a",
    videoSrc: "https://video.relaxambient.com/forest-stream.mp4",
    thumbSrc: "/thumbnails/forest-stream.webp",
    tags: ["breathe", "forest", "relax"],
    slug: "forest-stream-wildlife"
  },
];