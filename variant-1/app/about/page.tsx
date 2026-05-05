"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] flex items-end pb-16 px-8 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=80"
          alt="FlexHaus Story"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-black to-transparent" />
        <div className="relative z-10 max-w-[1600px] mx-auto w-full">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-[clamp(3rem,10vw,9rem)] leading-none text-noir-ivory"
            >
              Our Story
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="px-8 max-w-[1600px] mx-auto py-24 space-y-32">
        {/* Who we are */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <p className="text-[10px] tracking-[0.5em] uppercase text-noir-gold font-sans mb-6">Who We Are</p>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] leading-tight text-noir-ivory mb-8">
              Five Partners.<br />One Vision.
            </h2>
            <p className="text-noir-ivory/60 font-sans text-sm leading-relaxed tracking-wide mb-6">
              FlexHaus was born from a shared obsession with designer fashion and the belief that South Africans 
              deserve access to the world&apos;s most coveted labels. Five equal partners, one startup capital of R5,000, 
              and an unwavering drive to bring luxury closer to home.
            </p>
            <p className="text-noir-ivory/60 font-sans text-sm leading-relaxed tracking-wide">
              We source exclusively from premium international wholesale platforms — OopBuy for streetwear and 
              Nike, AcBuy for luxury labels including Louis Vuitton, Prada, and Goyard. Every piece is 
              quality-checked before it reaches you.
            </p>
          </FadeUp>
          <FadeUp delay={0.2} className="relative aspect-square overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="FlexHaus Team"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </FadeUp>
        </div>

        {/* Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-noir-gold/10">
          {[
            { num: "5", label: "Founding Partners" },
            { num: "R5K", label: "Startup Capital" },
            { num: "16+", label: "Products" },
            { num: "R100K+", label: "Year 1 Target" },
          ].map((stat, i) => (
            <FadeUp key={i} delay={i * 0.1} className="bg-noir-black p-10 text-center">
              <p className="font-serif text-5xl text-gradient-gold mb-2">{stat.num}</p>
              <p className="text-[10px] tracking-[0.4em] uppercase text-noir-ivory/40 font-sans">{stat.label}</p>
            </FadeUp>
          ))}
        </div>

        {/* The brands */}
        <div>
          <FadeUp>
            <p className="text-[10px] tracking-[0.5em] uppercase text-noir-gold font-sans mb-4">The Labels</p>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-noir-ivory mb-12">What We Carry</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { brand: "Louis Vuitton", desc: "Bags, wallets, card holders, belts and accessories in iconic monogram and Damier canvas.", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
              { brand: "Prada", desc: "Re-Nylon bags, sunglasses, bucket hats and clothing from Milan's most forward house.", img: "https://images.unsplash.com/photo-1590739225287-bd31519780c3?w=600&q=80" },
              { brand: "Goyard", desc: "The Parisian house of discretion. Saint Louis totes, card holders and more in Goyardine.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80" },
              { brand: "Nike", desc: "Air Force 1s, Dunk Lows, Tech Fleece — the heat your wardrobe demands.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="group flex gap-6 items-start p-6 border border-noir-gold/10 hover:border-noir-gold/30 transition-colors duration-500">
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                    <Image src={item.img} alt={item.brand} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <p className="font-serif text-xl text-noir-ivory group-hover:text-noir-gold transition-colors mb-2">{item.brand}</p>
                    <p className="text-noir-ivory/40 font-sans text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeUp className="text-center py-16">
          <h2 className="font-serif text-[clamp(2rem,6vw,5rem)] text-noir-ivory mb-8">
            Ready to Flex?
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 border border-noir-gold text-noir-gold text-[11px] tracking-[0.4em] uppercase font-sans px-10 py-4 hover:bg-noir-gold hover:text-noir-black transition-all duration-500"
          >
            Shop the Collection <ArrowRight size={14} />
          </Link>
        </FadeUp>
      </div>

      {/* Footer */}
      <footer className="border-t border-noir-gold/10 py-16 px-8">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="font-serif text-2xl tracking-[0.4em] uppercase text-noir-ivory/40">FlexHaus</p>
          <div className="flex gap-8">
            {["TikTok", "Instagram", "WhatsApp"].map((s) => (
              <a key={s} href="#" className="text-[10px] tracking-[0.3em] uppercase text-noir-ivory/30 hover:text-noir-gold transition-colors font-sans">{s}</a>
            ))}
          </div>
          <p className="text-[10px] tracking-[0.2em] text-noir-ivory/20 font-sans">© 2025 FlexHaus. South Africa.</p>
        </div>
      </footer>
    </div>
  );
}
