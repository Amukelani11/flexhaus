import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Syne,
  Space_Mono,
  Playfair_Display,
  DM_Sans,
  DM_Mono,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ weight: ["300","400","500","600","700"], subsets: ["latin"], variable: "--font-cormorant", display: "swap" });
const syne      = Syne({ weight: ["400","500","600","700","800"], subsets: ["latin"], variable: "--font-syne", display: "swap" });
const spaceMono = Space_Mono({ weight: ["400","700"], subsets: ["latin"], variable: "--font-space-mono", display: "swap" });
const playfair  = Playfair_Display({ weight: ["400","500","600","700","800","900"], subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const dmSans    = DM_Sans({ weight: ["300","400","500","600","700"], subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const dmMono    = DM_Mono({ weight: ["300","400","500"], subsets: ["latin"], variable: "--font-dm-mono", display: "swap" });

export const metadata: Metadata = {
  title: "FlexHaus — SA Designer Reseller",
  description: "LV, Prada, Goyard, Nike — real pieces, delivered across South Africa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable} ${spaceMono.variable} ${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
