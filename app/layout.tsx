import type { Metadata, Viewport } from "next";
import {
  Geist_Mono,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Kunjbihari Hirani — Full Stack AI Engineer",
  description:
    "Full Stack AI Engineer in Ahmedabad, focused on React, Next.js, Python APIs, LLM integrations and RAG-powered products.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistMono.variable} ${serif.variable} ${spaceGrotesk.variable}`}
    >
      <body className="noise font-sans">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
