"use client";

import { useState } from "react";

export default function ShareBar({
  title,
}: {
  title?: string;
}) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined" ? window.location.href : "";

  const doWebShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: title ?? document.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {}
  };

  const openWin = (u: string) =>
    window.open(u, "_blank", "noopener,noreferrer,width=700,height=560");

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <button
        onClick={doWebShare}
        className="px-3 py-1.5 rounded-xl bg-black text-white hover:opacity-90"
      >
        {copied ? "Copied!" : "Share"}
      </button>

      <button
        onClick={() =>
          openWin(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`
          )
        }
        className="px-3 py-1.5 rounded-xl border hover:bg-black/5"
        aria-label="Share on Facebook"
      >
        Facebook
      </button>

      <button
        onClick={() =>
          openWin(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url
            )}&text=${encodeURIComponent(title ?? document.title)}`
          )
        }
        className="px-3 py-1.5 rounded-xl border hover:bg-black/5"
        aria-label="Share on X"
      >
        X (Twitter)
      </button>

      <button
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="px-3 py-1.5 rounded-xl border hover:bg-black/5"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
