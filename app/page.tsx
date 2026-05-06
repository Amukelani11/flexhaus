"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5EFE6] flex flex-col">
      <header className="py-8 px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-[clamp(2.5rem,8vw,5rem)] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          FlexHaus
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[11px] tracking-[0.5em] uppercase text-[#C9A84C] mt-2"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          South Africa&apos;s Premier Designer Reseller
        </motion.p>
      </header>

      <main className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] w-full">
          {/* NOIR */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link href="/noir" className="group block">
              <div className="border border-[#C9A84C]/30 p-8 text-center hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-500 min-h-[320px] flex flex-col items-center justify-center gap-6">
                <p className="text-[9px] tracking-[0.5em] uppercase text-[#C9A84C]">Variant 01</p>
                <h2 className="text-4xl tracking-[0.4em] uppercase group-hover:text-[#C9A84C] transition-colors duration-300" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                  NOIR
                </h2>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#F5EFE6]/40 max-w-[200px]">
                  Ultra-Luxury Editorial
                </p>
                <div className="w-12 h-px bg-[#C9A84C]/30 group-hover:w-20 transition-all duration-500" />
                <p className="text-[9px] tracking-[0.2em] text-[#F5EFE6]/30">
                  Celine · Bottega Veneta · The Row
                </p>
              </div>
            </Link>
          </motion.div>

          {/* FLEX */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link href="/flex" className="group block">
              <div className="border border-[#FFD600]/30 p-8 text-center hover:border-[#FFD600] hover:bg-[#FFD600]/5 transition-all duration-500 min-h-[320px] flex flex-col items-center justify-center gap-6">
                <p className="text-[9px] tracking-[0.5em] uppercase text-[#FFD600]">Variant 02</p>
                <h2 className="text-4xl tracking-tight uppercase font-black group-hover:text-[#FFD600] transition-colors duration-300" style={{ fontFamily: "var(--font-syne), system-ui, sans-serif" }}>
                  FLEX
                </h2>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#F5EFE6]/40 max-w-[200px]">
                  Streetwear / Hype Culture
                </p>
                <div className="w-12 h-px bg-[#FFD600]/30 group-hover:w-20 transition-all duration-500" />
                <p className="text-[9px] tracking-[0.2em] text-[#F5EFE6]/30">
                  Supreme · Off-White · Highsnobiety
                </p>
              </div>
            </Link>
          </motion.div>

          {/* ARCHIVE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link href="/archive" className="group block">
              <div className="border border-[#C1440E]/30 p-8 text-center hover:border-[#C1440E] hover:bg-[#C1440E]/5 transition-all duration-500 min-h-[320px] flex flex-col items-center justify-center gap-6">
                <p className="text-[9px] tracking-[0.5em] uppercase text-[#C1440E]">Variant 03</p>
                <h2 className="text-4xl tracking-wide uppercase font-bold group-hover:text-[#C1440E] transition-colors duration-300" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  ARCHIVE
                </h2>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#F5EFE6]/40 max-w-[200px]">
                  Magazine / Curation
                </p>
                <div className="w-12 h-px bg-[#C1440E]/30 group-hover:w-20 transition-all duration-500" />
                <p className="text-[9px] tracking-[0.2em] text-[#F5EFE6]/30">
                  SSENSE · AnOther · Matches
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </main>

      <footer className="py-6 px-8 text-center border-t border-[#C9A84C]/10">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#F5EFE6]/20">
          © 2025 FlexHaus. South Africa. Three designs, one brand.
        </p>
      </footer>
    </div>
  );
}
