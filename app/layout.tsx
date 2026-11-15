import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { AnalyticsTracker } from "@/components/analytics-tracker";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060805",
};

export const metadata: Metadata = {
  title: "AIFindr — Discover Curated AI Tools for Creators & Builders",
  description: "Find your next favorite AI tool. A thoughtfully curated, high-voltage directory of 120+ AI software tools for writing, coding, images, audio, and research.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png" },
    ],
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "AIFindr — Curated AI Directory",
    description: "Discover top-tier AI software for makers, developers, and creative teams.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "AIFindr Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="bg-[#060805] text-[#f0f5ee] selection:bg-[#a3ff12] selection:text-[#060805]">
        <AnalyticsTracker />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
