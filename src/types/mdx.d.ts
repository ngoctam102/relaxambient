declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { Metadata } from "next";

  // metadata sẽ tuân theo kiểu của Next.js
  export const metadata: Metadata;

  // faq là mảng câu hỏi/đáp hoặc undefined
  export const faq: { q: string; a: string }[] | undefined;

  export const thumbnail: string | undefined;
  export const thumbnailAlt: string | undefined;
  export const thumbnailTitle: string | undefined;
  export const excerpt: string | undefined;
  export const date: string | undefined;

  export const tags: string[] | undefined;

  // Component MDX
  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
