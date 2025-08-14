import Image from "next/image";
import PostContent, { faq, metadata, thumbnail, thumbnailAlt, thumbnailTitle } from "./post.mdx";

function buildFaqSchema() {
  if (!faq?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(x => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
}

export default function BlogPost() {
  const faqSchema = buildFaqSchema();

  return (
    <>
      {thumbnail && (
        <div className="mx-auto max-w-[1280px] px-3 md:px-6 pt-6">
          <div className="rounded-2xl overflow-hidden shadow">
            <Image
              src={thumbnail}
              alt={(thumbnailAlt ?? "Thumbnail") + " - Relax Ambient"}
              title={(thumbnailTitle ?? "Thumbnail") + " - Relax Ambient"}
              width={1280}
              height={640}
              className="w-full h-auto object-cover"
              priority={false}
            />
          </div>
        </div>
      )}
      
      <PostContent />

      {faqSchema && (
        <script type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </>
  );
}

export { metadata };
