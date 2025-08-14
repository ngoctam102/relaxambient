// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { posts } from "./blog/_posts";

export const dynamic = "force-static"; // cần cho output: "export"
const BASE = "https://relaxambient.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/blog/tag`, changeFrequency: "weekly", priority: 0.5 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}${p.href}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));

  const tagRoutes: MetadataRoute.Sitemap = Array.from(tagSet).map((tag) => ({
    url: `${BASE}/blog/tag/${encodeURIComponent(tag)}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // Ép kiểu rõ ràng để TS khỏi cằn nhằn
  return [...baseRoutes, ...postRoutes, ...tagRoutes] as MetadataRoute.Sitemap;
}
