"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { featuredProducts, brands, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/editorial/TiltCard";
import Logo from "@/components/shop/Logo";

const badgeColors: Record<string, string> = {
  "NEW DROP": "bg-flex-yellow-bright text-flex-black",
  "HOT": "bg-red-500 text-white",
  "LAST 1": "bg-flex-black text-flex-yellow",
  "SOLD OUT": "bg-gray-100 text-gray-400",
};

const masonryHeights = ["aspect-[3/4]", "aspect-[3/5]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[3/5]", "aspect-[4/5]", "aspect-[3/4]"];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TapeStrip({ product, flip }: { product: (typeof featuredProducts)[0]; flip: boolean }) {
  const { dispatch } = useCart();
  return (
    <div className={`grid md:grid-cols-2 gap-0 border-y border-flex-black/10 bg-flex-white ${flip ? "md:[direction:rtl]" : ""}`}>
      <Link href={`/products/${product.slug}`} className="relative min-h-[260px] md:min-h-[320px] block md:[direction:ltr] group overflow-hidden bg-flex-gray">
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="50vw" />
        <div className="absolute top-5 left-5 flex flex-wrap gap-2 md:[direction:ltr]">
          {product.badge && (
            <span className={`font-mono font-bold text-[9px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-sm ${badgeColors[product.badge] ?? ""}`}>{product.badge}</span>
          )}
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] bg-flex-black/80 text-flex-yellow px-3 py-1.5 rounded-sm">Featured</span>
        </div>
      </Link>
      <div className={`flex flex-col justify-center p-8 md:p-12 md:[direction:ltr] border-t md:border-t-0 md:border-l border-flex-black/10 bg-flex-white`}>
        <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-flex-yellow">{product.brand}</p>
        <h3 className="font-serif font-bold text-2xl md:text-3xl mt-3 leading-none text-flex-black">{product.name}</h3>
        <p className="font-serif text-sm text-flex-black/60 mt-5 max-w-md leading-relaxed">{product.description.slice(0, 130)}…</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="font-display font-black text-xl text-flex-black">{formatPrice(product.price)}</span>
          {product.inStock && (
            <button
              type="button"
              onClick={() => dispatch({ type: "ADD", product })}
              className="bg-flex-yellow-bright text-[#0a0a0a] font-mono font-bold text-[10px] uppercase tracking-[0.3em] px-5 py-2.5 rounded-sm hover:bg-flex-black hover:text-flex-yellow transition-colors"
            >
              Add to bag
            </button>
          )}
          <Link href={`/products/${product.slug}`} className="font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/45 hover:text-flex-black flex items-center gap-1">
            View <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { dispatch } = useCart();
  const [scanActive, setScanActive] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setScanActive(false), 2600);
    return () => clearTimeout(t);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <>
      <section ref={heroRef} className="min-h-screen pt-16 grid grid-cols-1 lg:grid-cols-2 relative bg-[linear-gradient(165deg,#fdfaf6_0%,#f7f3ee_45%,#fff_100%)]">
        <AnimatePresence>
          {scanActive && (
            <motion.div
              className="absolute left-0 top-16 bottom-0 w-full lg:w-1/2 h-[calc(100%-4rem)] pointer-events-none z-20 lg:border-r border-flex-black/5"
              initial={{ opacity: 0 }}
            >
              <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-flex-yellow-bright to-transparent animate-hero-line-glow shadow-[0_0_14px_rgba(232,97,74,0.55)]"
                initial={{ top: 0, opacity: 0.75 }}
                animate={{ top: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex flex-col justify-end pb-12 lg:pb-16 px-8 lg:px-14 py-16 border-b lg:border-b-0 lg:border-r border-flex-black/10 min-h-[50vh] lg:min-h-0">
          <FadeIn delay={0.15}>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-flex-yellow mb-6 flex items-center gap-2">
              <motion.span
                className="h-px w-8 bg-gradient-to-r from-flex-yellow-bright to-transparent origin-left opacity-80"
                initial={{ scaleX: 0.2, opacity: 0.4 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
              Designer &amp; streetwear resale · South Africa
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="max-w-xl">
            <h1 className="font-bold text-[clamp(2rem,6.5vw,3.75rem)] leading-[1.08] tracking-tight text-flex-black">
              Pre-owned luxury and hype pieces — checked, photographed, couriered to your door.
            </h1>
          </FadeIn>

          <FadeIn delay={0.45} className="mt-6 max-w-md">
            <p className="text-sm leading-relaxed text-flex-black/60">
              FlexHaus is a curated resale store: real brands (bags, sneakers, accessories), honest listings, and nationwide shipping — so you know what you&apos;re buying before it leaves our hands.
            </p>
          </FadeIn>

          <FadeIn delay={0.55} className="mt-8 flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-flex-black via-flex-black to-[#3d3830] text-flex-white text-[11px] tracking-[0.3em] uppercase font-mono px-7 py-3.5 shadow-lg shadow-flex-yellow/10 transition-[box-shadow,filter] duration-300 hover:shadow-xl hover:shadow-flex-yellow/20 hover:brightness-110"
              >
                Shop now <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-mono text-flex-black/50 hover:text-flex-black border border-flex-black/15 px-5 py-3.5 transition-colors hover:border-flex-yellow/50 hover:bg-flex-yellow/5"
              >
                How it works <ArrowUpRight size={12} />
              </Link>
            </motion.div>
          </FadeIn>
        </div>

        <div className="relative overflow-hidden min-h-[55vh] lg:min-h-full isolate">
          <motion.div
            className="absolute -left-[14%] top-[10%] z-[1] h-[min(60vw,360px)] w-[min(60vw,360px)] rounded-full bg-gradient-to-br from-flex-yellow-bright/35 via-orange-300/20 to-transparent blur-3xl"
            animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="absolute right-[-14%] bottom-[2%] z-[1] h-[min(56vw,340px)] w-[min(56vw,340px)] rounded-full bg-gradient-to-tr from-indigo-300/18 via-violet-300/14 to-transparent blur-3xl"
            animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            aria-hidden
          />

          <div className="absolute inset-0 z-[5] p-5 md:p-7 lg:p-10 pointer-events-none">
            <motion.div
              className="absolute left-[10%] top-[12%] w-[42%] h-[48%] rounded-sm overflow-hidden border border-black/10 shadow-2xl shadow-black/10"
              animate={{ y: [0, -10, 0], rotate: [-0.7, 0.7, -0.7] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={featuredProducts[0].image} alt={featuredProducts[0].name} fill className="object-cover" sizes="30vw" />
            </motion.div>
            <motion.div
              className="absolute right-[9%] top-[18%] w-[38%] h-[42%] rounded-sm overflow-hidden border border-black/10 shadow-2xl shadow-black/12"
              animate={{ y: [0, 12, 0], rotate: [0.9, -0.8, 0.9] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <Image src={featuredProducts[1].image} alt={featuredProducts[1].name} fill className="object-cover" sizes="28vw" />
            </motion.div>
            <motion.div
              className="absolute left-[28%] bottom-[10%] w-[48%] h-[38%] rounded-sm overflow-hidden border border-black/10 shadow-2xl shadow-black/14"
              animate={{ y: [0, -8, 0], rotate: [-0.6, 0.5, -0.6] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <Image src={featuredProducts[2].image} alt={featuredProducts[2].name} fill className="object-cover" sizes="34vw" />
            </motion.div>
          </div>

          <div className="absolute bottom-6 right-6 z-10 text-right">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="font-logo font-bold text-[clamp(3rem,12vw,5rem)] bg-gradient-to-br from-flex-black/55 via-flex-black/22 to-flex-yellow bg-clip-text text-transparent leading-none select-none"
            >
              01
            </motion.p>
          </div>
        </div>
      </section>

      <div className="border-b border-flex-black/10" />

      <section className="py-5 bg-flex-gray overflow-hidden border-b border-flex-black/10">
        <div className="flex gap-14 whitespace-nowrap items-baseline" style={{ animation: "marquee 28s linear infinite", width: "max-content" }}>
          {[...brands, ...brands, ...brands].map((b, i) => (
            <span key={`${b.slug}-${i}`} className="font-serif text-base md:text-lg text-flex-black/35 italic">
              {b.name}
              <span className="font-mono not-italic text-[10px] uppercase tracking-[0.35em] text-flex-yellow mx-4">·</span>
            </span>
          ))}
        </div>
      </section>

      <section className="py-16 px-8 lg:px-14 max-w-[1400px] mx-auto bg-flex-white">
        <div className="flex items-end justify-between mb-12">
          <FadeIn>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-flex-yellow mb-2">Step 1 · New arrivals</p>
            <h2 className="font-serif text-[clamp(1.85rem, 5vw, 4rem)] font-bold text-flex-black leading-none">Shop latest pieces</h2>
          </FadeIn>
          <Link href="/products" className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/40 hover:text-flex-black transition-colors">
            View all <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {featuredProducts.slice(0, 8).map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.05} className="break-inside-avoid">
              <TiltCard>
                <Link href={`/products/${product.slug}`} className="group block mb-4">
                  <div className={`relative overflow-hidden bg-flex-gray/40 ${masonryHeights[i % masonryHeights.length]}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {product.badge && (
                      <div className={`absolute top-3 left-3 font-mono text-[8px] uppercase tracking-[0.25em] px-2 py-1 rounded-sm ${badgeColors[product.badge] ?? "bg-flex-yellow-bright text-flex-black"}`}>
                        {product.badge}
                      </div>
                    )}
                    <motion.div className="absolute inset-0 bg-flex-black/0 group-hover:bg-flex-black/15 transition-colors duration-500 flex items-end">
                      <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch({ type: "ADD", product });
                          }}
                          className="w-full bg-flex-yellow-bright text-flex-black text-[10px] uppercase tracking-[0.3em] font-mono py-3 hover:bg-flex-black hover:text-flex-yellow transition-colors rounded-sm"
                        >
                          Add to bag
                        </button>
                      </div>
                    </motion.div>
                  </div>
                  <div className="mt-3">
                    <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-flex-yellow">{product.brand}</p>
                    <p className="font-serif text-sm text-flex-black group-hover:text-flex-yellow transition-colors mt-0.5">{product.name}</p>
                    <p className="font-mono text-xs text-flex-black/55 mt-1">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 border-2 border-flex-black text-flex-black text-[11px] tracking-[0.3em] uppercase font-mono px-9 py-4 hover:bg-flex-black hover:text-flex-white transition-all duration-300"
          >
            Browse full rack <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </section>

      <section className="bg-flex-gray/40 border-y border-flex-black/10">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-14 pt-14 pb-4 flex items-end justify-between">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold text-[clamp(1.5rem,4vw,2.75rem)] text-flex-black">
              Step 2 · Featured drops
            </motion.h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/45 mt-2">Focused picks, full details</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/50 hover:text-flex-black">
            All pieces <ArrowUpRight size={11} />
          </Link>
        </div>
        <div className="flex flex-col">
          {featuredProducts.slice(0, 3).map((product, i) => (
            <TapeStrip key={product.id} product={product} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="py-16 px-8 lg:px-14 max-w-[1400px] mx-auto">
        <FadeIn>
          <h2 className="font-serif text-[clamp(1.65rem,4vw,3rem)] font-bold text-flex-black text-center mb-12">The labels</h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-flex-black/15">
          {brands.map((brand, i) => (
            <FadeIn key={brand.slug} delay={i * 0.05}>
              <div className="bg-flex-white flex flex-col items-center justify-center py-9 px-3 hover:bg-flex-black group transition-colors duration-500">
                <p className="font-serif text-sm text-flex-black/65 group-hover:text-flex-white transition-colors text-center">{brand.name}</p>
                <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-flex-yellow/80 group-hover:text-flex-yellow mt-1">{brand.count} pieces</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-t border-flex-black/10 bg-flex-black py-16 px-8 lg:px-14">
        <div className="max-w-[720px] mx-auto text-center">
          <FadeIn>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-flex-yellow mb-3">Stay close</p>
            <h2 className="font-serif text-[clamp(1.65rem,4vw,2.75rem)] font-bold text-white mb-4">Drops, unboxings, first dibs</h2>
            <p className="font-sans text-sm text-white/45 tracking-wide mb-8">TikTok, Instagram, WhatsApp — pick your lane.</p>
          </FadeIn>
          <FadeIn delay={0.2} className="flex justify-center gap-3 flex-wrap">
            {["TikTok", "Instagram", "WhatsApp"].map((s) => (
              <a
                key={s}
                href="#"
                className="flex items-center gap-2 border border-white/15 text-white text-[10px] tracking-[0.3em] uppercase font-mono px-5 py-3 hover:border-flex-yellow-bright hover:text-flex-yellow-bright transition-all duration-300"
              >
                {s} <ArrowUpRight size={12} />
              </a>
            ))}
          </FadeIn>
        </div>
      </section>

      <footer className="bg-flex-black text-flex-white py-10 px-8 border-t border-flex-yellow/40">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Logo variant="dark" align="start" />
          <div className="flex gap-3">
            {["TikTok", "Instagram", "WhatsApp"].map((s) => (
              <a
                key={s}
                href="#"
                className="font-mono text-[9px] uppercase tracking-[0.3em] text-flex-white/45 hover:text-flex-yellow-bright transition-colors border border-white/15 hover:border-flex-yellow-bright px-3 py-2"
              >
                {s}
              </a>
            ))}
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">© 2026 FlexHaus SA</p>
        </div>
      </footer>
    </>
  );
}
