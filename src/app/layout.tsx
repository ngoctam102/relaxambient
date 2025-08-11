import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://relaxambient.com"),
  title: {
    default: "Relax Ambient – Listen to Nature Sounds & Relaxing Music",
    template: "%s | Relax Ambient",
  },
  description:
    "Relax Ambient offers soothing nature sounds and ambient music to help you relax, meditate, focus, and sleep better. Play your favorite soundscape instantly.",
  keywords:
    "nature sounds, relaxing ambient music, meditation sounds, sleep sounds, focus music, ambient soundscape",
  alternates: { canonical: "https://relaxambient.com" },
  openGraph: {
    type: "website",
    url: "https://relaxambient.com",
    siteName: "Relax Ambient",
    title: "Relax Ambient – Nature Sounds & Relaxing Music",
    description:
      "Listen to high-quality ambient and nature sounds for sleep, study, and relaxation.",
    images: [
      {
        url: "https://relaxambient.com/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "Relax Ambient – nature sounds for relaxation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Relax Ambient – Nature Sounds & Relaxing Music",
    description: "Ambient & nature sounds for sleep, focus and calm.",
    images: ["https://relaxambient.com/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Robots meta viết tay để có max-image-preview */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* Google AdSense (external) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1407887553123641"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* JSON-LD (inline) – nhớ có id để khỏi lỗi @next/next/inline-script-id */}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Relax Ambient",
              url: "https://relaxambient.com",
              logo: "https://relaxambient.com/android-chrome-512x512.png",
            }),
          }}
        />

        {/* Accessibility skip link */}
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
