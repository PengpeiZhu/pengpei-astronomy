import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { assetPath } from "../lib/site-path";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pengpei Zhu · Astronomy & Galaxy Evolution",
  description: "Pengpei Zhu, PhD researcher at the Cosmic Dawn Center, DTU Space. Research on galaxy quenching, neutral gas flows and chemical enrichment.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100"),
  alternates: { canonical: assetPath("/") },
  openGraph: { title: "Pengpei Zhu · Astronomy", description: "Galaxies, gas & cosmic history. Research, publications and CV.", url: assetPath("/"), images: [assetPath("/pengpei-zhu.jpg")], type: "website" },
  icons: {
    icon: assetPath("/favicon.svg"),
    shortcut: assetPath("/favicon.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ "--hero-image": `url("${assetPath("/photography/hero-milky-way.jpeg")}")` } as CSSProperties}>{children}</body>
    </html>
  );
}
