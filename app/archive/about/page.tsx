"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WordReveal from "@/components/archive/WordReveal";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ArchiveAboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="relative min-h-[55vh] flex items-end border-b border-archive-line overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=80"
          alt="About FlexHaus"
          fill
          className="object-cover opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-archive-cream via-archive-cream/60 to-transparent" />
        <div className="relative z-10 px-10 lg:px-16 pb-16 max-w-[1400px] mx-auto w-full">
          <FadeIn>
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-archive-terracotta mb-4">Est. 2025</p>
          </FadeIn>
          <WordReveal
            text="The FlexHaus Story"
            className="font-serif font-bold text-archive-charcoal"
            style={{ fontSize: "clamp(3rem,9vw,8rem)", lineHeight: 1.0 } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-10 lg:px-16 py-20 space-y-24">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-archive-terracotta mb-6">Our Mission</p>
            <h2 className="font-serif font-bold text-[clamp(2rem,5vw,4rem)] text-archive-charcoal leading-tight mb-8">
              Bringing luxury<br />within reach.
            </h2>
            <p className="font-sans text-sm leading-relaxed text-archive-charcoal/50 tracking-wide mb-5">
              FlexHaus is a designer reseller founded by five equal partners with a combined startup capital 
              of R5,000 and an unshakeable belief: South Africans deserve access to the world&apos;s finest 
              labels without the gatekeeping.
            </p>
            <p className="font-sans text-sm leading-relaxed text-archive-charcoal/50 tracking-wide">
              We source from OopBuy (Nike, streetwear) and AcBuy (LV, Prada, Goyard — quality-inspected, 
              photographed, shipped with care). Every piece that arrives in your hands passes through 
              our meticulous quality review.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="relative aspect-[4/5] overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" alt="FlexHaus" fill className="object-cover" sizes="50vw" />
          </FadeIn>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-archive-line">
          {[
            { num: "5", label: "Equal Partners" },
            { num: "R5,000", label: "Startup Capital" },
            { num: "16+", label: "Products" },
            { num: "R100K+", label: "Year 1 Target" },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} className="bg-archive-cream py-12 px-8 text-center hover:bg-archive-charcoal group transition-colors duration-500">
              <p className="font-serif font-bold text-5xl text-archive-terracotta group-hover:text-archive-terracotta">{s.num}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-archive-charcoal/40 group-hover:text-archive-cream/50 mt-2 transition-colors">{s.label}</p>
            </FadeIn>
          ))}
        </div>

        {/* Brands */}
        <div>
          <FadeIn className="mb-12">
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-archive-terracotta mb-3">The Labels We Carry</p>
            <h2 className="font-serif font-bold text-[clamp(2rem,5vw,4rem)] text-archive-charcoal">Our Portfolio</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { brand: "Louis Vuitton", desc: "Bags, wallets, card holders, belts — iconic monogram and Damier canvas from the world's most recognised house.", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
              { brand: "Prada", desc: "Re-Nylon bags, sunglasses, hats — Milan's most progressive luxury house, now available in South Africa.", img: "https://images.unsplash.com/photo-1590739225287-bd31519780c3?w=600&q=80" },
              { brand: "Goyard", desc: "The Parisian house of measured discretion. Saint Louis totes, Honoré card holders in hand-painted Goyardine.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80" },
              { brand: "Nike", desc: "Air Force 1s, Dunk Lows, Tech Fleece, Club hoodies — the heat that defines the streets, now easier to access.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group flex gap-5 p-6 border border-archive-line hover:border-archive-charcoal transition-colors duration-400">
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                    <Image src={item.img} alt={item.brand} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="96px" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-xl text-archive-charcoal group-hover:text-archive-terracotta transition-colors">{item.brand}</p>
                    <p className="font-sans text-xs leading-relaxed text-archive-charcoal/40 mt-2">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn className="text-center py-16 border-y border-archive-line">
          <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-archive-terracotta mb-4">Start Here</p>
          <h2 className="font-serif font-bold text-[clamp(2rem,6vw,5rem)] text-archive-charcoal mb-8">Browse the Archive</h2>
          <Link
            href="/archive/products"
            className="inline-flex items-center gap-3 bg-archive-charcoal text-archive-cream text-[11px] tracking-[0.35em] uppercase font-sans px-10 py-4 hover:bg-archive-terracotta transition-colors duration-500"
          >
            View Collection <ArrowRight size={13} />
          </Link>
        </FadeIn>
      </div>

      <footer className="border-t border-archive-charcoal/20 py-12 px-10 lg:px-16 bg-archive-charcoal">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif text-xl text-archive-cream/60 tracking-[0.4em] uppercase">FlexHaus</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-archive-cream/20">© 2025 FlexHaus SA</p>
        </div>
      </footer>
    </div>
  );
}
