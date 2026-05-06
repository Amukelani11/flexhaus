"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5EFE6] flex flex-col relative overflow-hidden">
      <div className="landing-hero-mesh" aria-hidden />
      <div className="landing-hero-glow" aria-hidden />

      <header className="relative z-10 py-10 md:py-14 px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-[clamp(2.5rem,8vw,5rem)] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          FlexHaus
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="text-[11px] tracking-[0.45em] uppercase text-[#C9A84C]/90 mt-3 max-w-md mx-auto leading-relaxed"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          Designer resale — five storefronts, one house. /archive opens the Flex edit.
        </motion.p>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-[1400px] w-full">
          {/* NOIR */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Link href="/noir" className="group block">
              <div className="border border-[#C9A84C]/30 p-8 text-center hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-500 min-h-[320px] flex flex-col items-center justify-center gap-6 backdrop-blur-[1px] bg-[#0A0A0A]/20">
                <p className="text-[9px] tracking-[0.5em] uppercase text-[#C9A84C]">Variant 01</p>
                <h2
                  className="text-4xl tracking-[0.4em] uppercase group-hover:text-[#C9A84C] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  NOIR
                </h2>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#F5EFE6]/40 max-w-[200px]">
                  Ultra-Luxury Editorial
                </p>
                <div className="w-12 h-px bg-[#C9A84C]/30 group-hover:w-20 transition-all duration-500" />
                <p className="text-[9px] tracking-[0.2em] text-[#F5EFE6]/30">
                  Celine · Bottega · The Row
                </p>
              </div>
            </Link>
          </motion.div>

          {/* FLEX + ARCHIVE merged */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <Link href="/flex" className="group block">
              <div className="border border-[#CFA20C]/40 border-l-4 border-l-[#C1440E]/70 p-8 text-center hover:border-[#CFA20C] transition-all duration-500 min-h-[320px] flex flex-col items-center justify-center gap-5 backdrop-blur-[1px] bg-[#0A0A0A]/20 hover:bg-[#CFA20C]/8">
                <p className="text-[9px] tracking-[0.5em] uppercase text-[#CFA20C] font-medium">Variant 02 · The edit</p>
                <h2
                  className="text-4xl tracking-tight uppercase font-black text-[#CFA20C] group-hover:text-[#E8C547] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-syne), system-ui, sans-serif" }}
                >
                  FLEX
                </h2>
                <p className="text-[10px] tracking-[0.28em] uppercase text-[#F5EFE6]/40 max-w-[220px] leading-relaxed">
                  Street energy × Archive curation (fan vote)
                </p>
                <div className="w-12 h-px bg-[#CFA20C]/35 group-hover:w-[5.5rem] transition-all duration-500" />
                <p className="text-[9px] tracking-[0.2em] text-[#F5EFE6]/32">
                  Hype drops · magazine pacing · /archive redirects here
                </p>
              </div>
            </Link>
          </motion.div>

          {/* PRISM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <Link href="/prism" className="group block">
              <div className="border-2 border-[#00D9AA]/40 p-8 text-center hover:border-[#00D9AA] hover:bg-[#00D9AA]/8 transition-all duration-500 min-h-[280px] md:min-h-[320px] flex flex-col items-center justify-center gap-6 backdrop-blur-[1px] bg-[#0A0A0A]/25">
                <p className="text-[9px] tracking-[0.5em] uppercase text-[#00D9AA] font-mono">Variant 03</p>
                <h2
                  className="text-4xl tracking-tight uppercase font-black text-[#00D9AA] group-hover:text-[#5EFFC7] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-space-mono), ui-monospace, monospace" }}
                >
                  PRISM
                </h2>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#F5EFE6]/40 max-w-[200px]">
                  Neo-brutalist / mono grid
                </p>
                <div className="w-12 h-px bg-[#00D9AA]/40 group-hover:w-20 transition-all duration-500" />
                <p className="text-[9px] tracking-[0.2em] text-[#F5EFE6]/30 font-mono">
                  Scan lines · hard contrast
                </p>
              </div>
            </Link>
          </motion.div>

          {/* VELVET */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72 }}
          >
            <Link href="/velvet" className="group block">
              <div className="border border-[#C4A574]/45 p-8 text-center hover:border-[#D4B896] hover:bg-[#C4A574]/8 transition-all duration-500 min-h-[280px] md:min-h-[320px] flex flex-col items-center justify-center gap-6 backdrop-blur-[2px] bg-[#1a1510]/30 rounded-sm">
                <p className="text-[9px] tracking-[0.5em] uppercase text-[#C4A574]">Variant 04</p>
                <h2
                  className="text-4xl tracking-[0.12em] uppercase font-semibold text-[#E8D5BC] group-hover:text-[#C4A574] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  VELVET
                </h2>
                <p className="text-[10px] tracking-[0.28em] uppercase text-[#F5EFE6]/38 max-w-[200px]">
                  Salon warmth · soft editorial
                </p>
                <div className="w-12 h-px bg-[#C4A574]/35 group-hover:w-20 transition-all duration-500" />
                <p className="text-[9px] tracking-[0.2em] text-[#F5EFE6]/28">
                  Champagne light · serif rails
                </p>
              </div>
            </Link>
          </motion.div>

          {/* STEEL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.88 }}
            className="sm:col-span-2 xl:col-span-1"
          >
            <Link href="/steel" className="group block h-full">
              <div className="border-l-4 border-[#EF4444] border-y border-r border-[#F5EFE6]/15 p-8 text-left hover:border-[#F5EFE6]/35 transition-all duration-500 min-h-[280px] md:min-h-[320px] flex flex-col justify-center gap-5 backdrop-blur-[1px] bg-[#0f1218]/40 h-full">
                <p className="text-[9px] tracking-[0.45em] uppercase text-[#94A3B8] font-medium">Variant 05</p>
                <h2
                  className="text-4xl tracking-[0.08em] uppercase font-bold text-[#F1F5F9] group-hover:text-[#EF4444] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                >
                  STEEL
                </h2>
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#94A3B8]/90 max-w-[220px] leading-relaxed">
                  Spec-driven UI · cool neutrals
                </p>
                <div className="w-full max-w-[72px] h-1 bg-[#EF4444]/70 group-hover:max-w-[96px] transition-all duration-500" />
                <p className="text-[9px] tracking-[0.18em] text-[#64748B]">
                  Left rail · white-on-crimson strip
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 py-6 px-8 text-center border-t border-[#C9A84C]/10">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#F5EFE6]/20">
          © 2026 FlexHaus. South Africa.
        </p>
      </footer>
    </div>
  );
}
