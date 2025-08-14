// Thêm import cho mỗi bài mới
import {
  metadata as fireMeta,
  thumbnail as fireThumb,
  excerpt as fireExcerpt,
  date as fireDate,
  thumbnailAlt as fireThumbAlt,       
  thumbnailTitle as fireThumbTitle,
  tags as fireTags,
} from "./campfire-sounds/post.mdx";

import {
  metadata as rainMeta,
  thumbnail as rainThumb,
  excerpt as rainExcerpt,
  date as rainDate,
  thumbnailAlt as rainThumbAlt,        
  thumbnailTitle as rainThumbTitle,
  tags as rainTags,
} from "./rain-sounds/post.mdx";

import {
  metadata as oceanWavesMeta,
  thumbnail as oceanWavesThumb,
  excerpt as oceanWavesExcerpt,
  date as oceanWavesDate,
  thumbnailAlt as oceanWavesThumbAlt,        
  thumbnailTitle as oceanWavesThumbTitle,
  tags as oceanWavesTags,
} from "./ocean-waves/post.mdx";

import {
  metadata as stormMeta,
  thumbnail as stormThumb,
  excerpt as stormExcerpt,
  date as stormDate,
  thumbnailAlt as stormThumbAlt,        
  thumbnailTitle as stormThumbTitle,
  tags as stormTags,
} from "./storm-sounds/post.mdx";

import {
  metadata as summerForestMeta,
  thumbnail as summerForestThumb,
  excerpt as summerForestExcerpt,
  date as summerForestDate,
  thumbnailAlt as summerForestThumbAlt,        
  thumbnailTitle as summerForestThumbTitle,
  tags as summerForestTags,
} from "./summer-forest-sounds/post.mdx";

import {
  metadata as forestStreamMeta,
  thumbnail as forestStreamThumb,
  excerpt as forestStreamExcerpt,
  date as forestStreamDate,
  thumbnailAlt as forestStreamThumbAlt,        
  thumbnailTitle as forestStreamThumbTitle,
  tags as forestStreamTags,
} from "./forest-stream-wildlife/post.mdx";

// Định nghĩa type cho item
export type BlogPostItem = {
  slug: string;
  title: string;
  href: string;
  thumbnail?: string;
  thumbnailAlt?: string;               
  thumbnailTitle?: string; 
  excerpt?: string;
  tags?: string[];
  date?: string; // yyyy-mm-dd
};

// Danh sách bài — thêm entry cho bài mới
export const posts: BlogPostItem[] = [
  {
    slug: "campfire-sounds",
    title: String(fireMeta?.title ?? "Untitled"),
    href: "/blog/campfire-sounds",
    thumbnail: fireThumb,
    thumbnailAlt: fireThumbAlt,        
    thumbnailTitle: fireThumbTitle,   
    excerpt: fireExcerpt,
    date: fireDate,
    tags: fireTags,
  },
  {
    slug: "rain-sounds",
    title: String(rainMeta?.title ?? "Untitled"),
    href: "/blog/rain-sounds",
    thumbnail: rainThumb,
    thumbnailAlt: rainThumbAlt,        
    thumbnailTitle: rainThumbTitle,   
    excerpt: rainExcerpt,
    date: rainDate,
    tags: rainTags,
  },
  {
    slug: "ocean-waves",
    title: String(oceanWavesMeta?.title ?? "Untitled"),
    href: "/blog/ocean-waves",
    thumbnail: oceanWavesThumb,
    thumbnailAlt: oceanWavesThumbAlt,        
    thumbnailTitle: oceanWavesThumbTitle,   
    excerpt: oceanWavesExcerpt,
    date: oceanWavesDate,
    tags: oceanWavesTags,
  },
  {
    slug: "storm-sounds",
    title: String(stormMeta?.title ?? "Untitled"),
    href: "/blog/storm-sounds",
    thumbnail: stormThumb,
    thumbnailAlt: stormThumbAlt,        
    thumbnailTitle: stormThumbTitle,   
    excerpt: stormExcerpt,
    date: stormDate,
    tags: stormTags,
  },
  {
    slug: "summer-forest-sounds",
    title: String(summerForestMeta?.title ?? "Untitled"),
    href: "/blog/summer-forest-sounds",
    thumbnail: summerForestThumb,
    thumbnailAlt: summerForestThumbAlt,        
    thumbnailTitle: summerForestThumbTitle,   
    excerpt: summerForestExcerpt,
    date: summerForestDate,
    tags: summerForestTags,
  },
  {
    slug: "forest-stream-wildlife",
    title: String(forestStreamMeta?.title ?? "Untitled"),
    href: "/blog/forest-stream-wildlife",
    thumbnail: forestStreamThumb,
    thumbnailAlt: forestStreamThumbAlt,        
    thumbnailTitle: forestStreamThumbTitle,   
    excerpt: forestStreamExcerpt,
    date: forestStreamDate,
    tags: forestStreamTags,
  },
];
