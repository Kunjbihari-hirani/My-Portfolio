import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Kunjbihari Hirani — Full Stack Developer",
  description:
    "Full Stack Developer in Ahmedabad. React, Next.js, Node.js, PostgreSQL, MongoDB. Building SaaS, AI and 3D products end to end.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b07" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7f1" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Set the theme before paint: saved choice, else the system preference. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}`,
          }}
        />
      </head>
      <body className="noise font-sans">{children}</body>
    </html>
  );
}
