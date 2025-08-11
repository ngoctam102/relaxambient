import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Relax Ambient – Listen to Nature Sounds & Relaxing Music",
  description: "Relax Ambient offers soothing nature sounds and ambient music to help you relax, meditate, focus, and sleep better. Play your favorite soundscape instantly.",
  keywords: "nature sounds, relaxing ambient music, meditation sounds, sleep sounds, focus music, ambient soundscape",
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
    apple: "/apple-touch-icon.png", 
  },
  manifest: "/site.webmanifest",  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="keywords"
          content="nature sounds, relaxing ambient music, meditation sounds, sleep sounds, focus music, ambient soundscape, relaxing sounds, ambient sounds, concentration music, study music, relaxation music, sleep music, white noise, natural sounds, mindfulness sounds, calm music, deep sleep sounds, stress relief sounds, online ambient sounds, soothing sounds, background music for work, meditation music online, peaceful sounds, sleep aid sounds, nature ambient sounds" 
          />
        <link
          rel="preload"
          as="image"
          href="/thumbnails/landing_page_image.webp" 
          />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1407887553123641"
        crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
