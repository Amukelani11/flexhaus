"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { featuredProducts, brands, products, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import WordReveal from "@/components/archive/WordReveal";
import TiltCard from "@/components/archive/TiltCard";

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

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { dispatch } = useCart();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/flex/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm mb-3">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.badge && (
            <div className={`absolute top-3 left-3 text-[9px] tracking-[0.25em] uppercase font-mono font-bold px-2.5 py-1 rounded-sm ${badgeColors[product.badge] ?? "bg-flex-yellow-bright text-flex-black"}`}>
              {product.badge}
            </div>
          )}
          {product.inStock && (
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: "ADD", product });
                }}
                className="w-full bg-flex-black text-flex-yellow font-mono font-bold text-[10px] uppercase tracking-[0.3em] py-3 hover:bg-flex-yellow-bright hover:text-flex-black transition-colors"
              >
                Add to Bag
              </button>
            </div>
          )}
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-flex-black/40 mb-0.5">{product.brand}</p>
          <div className="flex justify-between items-start gap-2">
            <p className="font-display font-bold text-[13px] uppercase leading-tight group-hover:text-flex-black/60 transition-colors">{product.name}</p>
            <p className="font-display font-black text-[13px] flex-shrink-0">{formatPrice(product.price)}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function TapeStrip({ product, flip }: { product: (typeof products)[0]; flip: boolean }) {
  const { dispatch } = useCart();
  return (
    <div className={`grid md:grid-cols-2 gap-0 border-y border-flex-black/10 bg-flex-white ${flip ? "md:[direction:rtl]" : ""}`}>
      <Link href={`/flex/products/${product.slug}`} className="relative min-h-[260px] md:min-h-[320px] block md:[direction:ltr] group overflow-hidden bg-flex-gray">
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="50vw" />
        <div className="absolute top-5 left-5 flex flex-wrap gap-2 md:[direction:ltr]">
          {product.badge && (
            <span className={`font-mono font-bold text-[9px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-sm ${badgeColors[product.badge] ?? ""}`}>{product.badge}</span>
          )}
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] bg-flex-black/80 text-flex-yellow px-3 py-1.5 rounded-sm">The edit</span>
        </div>
      </Link>
      <div className={`flex flex-col justify-center p-8 md:p-12 md:[direction:ltr] border-t md:border-t-0 md:border-l border-flex-black/10 bg-flex-white`}>
        <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-flex-yellow">{product.brand}</p>
        <h3 className="font-display font-black text-2xl md:text-3xl uppercase mt-3 leading-none">{product.name}</h3>
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
          <Link href={`/flex/products/${product.slug}`} className="font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/45 hover:text-flex-black flex items-center gap-1">
            View <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FlexHomePage() {
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
      {/* HERO — Archive split + Flex signal */}
      <section ref={heroRef} className="min-h-screen pt-16 grid grid-cols-1 lg:grid-cols-2 relative">
        <AnimatePresence>
          {scanActive && (
            <motion.div
              className="absolute left-0 top-16 bottom-0 w-full lg:w-1/2 h-[calc(100%-4rem)] pointer-events-none z-20 lg:border-r border-flex-black/5"
              initial={{ opacity: 0 }}
            >
              <motion.div
                className="absolute left-0 right-0 h-px bg-flex-yellow-bright"
                initial={{ top: 0, opacity: 0.7 }}
                animate={{ top: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col justify-end pb-12 lg:pb-16 px-8 lg:px-14 py-16 bg-[#F0EBE3] border-b lg:border-b-0 lg:border-r border-flex-black/10">
          <FadeIn delay={0.15}>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-flex-yellow mb-6 flex items-center gap-2">
              <span className="h-px w-8 bg-flex-yellow-bright" />
              Street × Archive · South Africa
            </p>
          </FadeIn>

          <WordReveal
            text="The"
            className="font-serif font-bold text-flex-black/35"
            style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)", lineHeight: 1.05 } as React.CSSProperties}
          />
          <WordReveal
            text="Living"
            className="font-serif font-bold text-flex-black"
            delay={0.15}
            style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)", lineHeight: 1.05 } as React.CSSProperties}
          />
          <WordReveal
            text="Edit."
            className="font-display font-black text-flex-yellow uppercase tracking-tight"
            delay={0.3}
            style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)", lineHeight: 1.05 } as React.CSSProperties}
          />

          <FadeIn delay={0.65} className="mt-8 max-w-md">
            <p className="font-sans text-sm leading-relaxed text-flex-black/55 tracking-wide">
              Magazine pacing meets drop energy — Louis Vuitton, Prada, Goyard, Nike, QC&apos;d and priced straight, nationwide.
            </p>
          </FadeIn>

          <FadeIn delay={0.8} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/flex/products"
              className="inline-flex items-center gap-3 bg-flex-black text-flex-white text-[11px] tracking-[0.3em] uppercase font-mono px-7 py-3.5 hover:bg-flex-yellow-bright hover:text-flex-black transition-colors duration-300"
            >
              Shop the edit <ArrowRight size={14} />
            </Link>
            <Link
              href="/flex/about"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-mono text-flex-black/50 hover:text-flex-black border border-flex-black/15 px-5 py-3.5 transition-colors"
            >
              About <ArrowUpRight size={12} />
            </Link>
          </FadeIn>
        </div>

        <div className="relative overflow-hidden min-h-[55vh] lg:min-h-full">
          <motion.div className="absolute inset-0" style={{ y: imgY }}>
            <Image
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1400&q=80"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-flex-black/25 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 right-6 z-10 text-right">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="font-display font-black text-[clamp(3rem,12vw,5rem)] text-white/15 leading-none select-none"
            >
              01
            </motion.p>
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/60 mt-2">Cover drop</p>
          </div>
        </div>
      </section>

      <div className="border-b border-flex-black/10" />

      {/* Flex marquee */}
      <section className="py-4 bg-flex-yellow-bright overflow-hidden border-b border-flex-black/10">
        <div className="flex gap-10 whitespace-nowrap" style={{ animation: "marquee 22s linear infinite", width: "max-content" }}>
          {[...brands, ...brands, ...brands].map((b, i) => (
            <span key={i} className="font-display font-black text-sm md:text-base uppercase tracking-tight text-flex-black/85">
              {b.name} <span className="text-flex-black/30 mx-1">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* Archive-style serif ticker */}
      <section className="py-5 bg-[#E8E3DB] overflow-hidden border-b border-flex-black/10">
        <div className="flex gap-16 whitespace-nowrap" style={{ animation: "marquee 32s linear infinite", width: "max-content" }}>
          {[...brands, ...brands].map((b, i) => (
            <span key={`${b.name}-${i}`} className="font-serif text-base md:text-lg text-flex-black/25 italic">
              {b.name}
            </span>
          ))}
        </div>
      </section>

      {/* Editorial bridge */}
      <section className="py-20 px-8 lg:px-14 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-20 items-start">
          <div className="md:col-span-2">
            <FadeIn>
              <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-flex-yellow mb-5">Editorial</p>
            </FadeIn>
            <WordReveal
              text="Luxury and street, edited for South Africa."
              className="font-serif font-bold text-flex-black"
              style={{ fontSize: "clamp(1.65rem, 4vw, 3.25rem)", lineHeight: 1.15 } as React.CSSProperties}
            />
          </div>
          <FadeIn delay={0.25} className="pt-2 md:pt-12">
            <p className="font-sans text-sm leading-relaxed text-flex-black/50 tracking-wide">
              Authenticated where it counts, shot honestly, packed for couriers — same standard whether it reads like a glossy spread or a grail post.
            </p>
            <Link
              href="/flex/about"
              className="inline-flex items-center gap-2 mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-flex-yellow hover:gap-4 transition-all duration-300"
            >
              Read more <ArrowRight size={12} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <div className="border-b border-flex-black/10" />

      {/* Masonry — Archive motion, Flex chrome */}
      <section className="py-16 px-8 lg:px-14 max-w-[1400px] mx-auto bg-flex-white">
        <div className="flex items-end justify-between mb-12">
          <FadeIn>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-flex-yellow mb-2">New arrivals</p>
            <h2 className="font-serif text-[clamp(1.85rem, 5vw, 4rem)] font-bold text-flex-black leading-none">The collection</h2>
          </FadeIn>
          <Link
            href="/flex/products"
            className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/40 hover:text-flex-black transition-colors"
          >
            View all <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {featuredProducts.slice(0, 8).map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.05} className="break-inside-avoid">
              <TiltCard>
                <Link href={`/flex/products/${product.slug}`} className="group block mb-4">
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
            href="/flex/products"
            className="inline-flex items-center gap-3 border-2 border-flex-black text-flex-black text-[11px] tracking-[0.3em] uppercase font-mono px-9 py-4 hover:bg-flex-black hover:text-flex-white transition-all duration-300"
          >
            Browse full rack <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </section>

      {/* Rotation tapes — Flex pacing */}
      <section className="bg-flex-gray/40 border-y border-flex-black/10">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-14 pt-14 pb-4 flex items-end justify-between">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display font-black text-[clamp(1.5rem,4vw,2.75rem)] uppercase">
              Rotation tapes
            </motion.h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/45 mt-2">Full-width drops</p>
          </div>
          <Link href="/flex/products" className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/50 hover:text-flex-black">
            All pieces <ArrowUpRight size={11} />
          </Link>
        </div>
        <div className="flex flex-col">
          {featuredProducts.slice(0, 3).map((product, i) => (
            <TapeStrip key={product.id} product={product} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* Poster grid */}
      <section className="py-16 px-8 lg:px-14 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <motion.h2 initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-display font-black text-[clamp(1.5rem,4vw,2.75rem)] uppercase">
            More heat
          </motion.h2>
          <Link href="/flex/products" className="font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/50 hover:text-flex-black flex items-center gap-1.5">
            View all <ArrowRight size={11} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {products.slice(0, 6).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Feature split — Archive storytelling + Flex contrast */}
      <section className="border-y border-flex-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[60vh] lg:min-h-[70vh]">
            <Image
              src="https://images.unsplash.com/photo-1590739225287-bd31519780c3?w=1200&q=80"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-flex-black/10" />
          </div>
          <div className="flex flex-col justify-center px-10 lg:px-14 py-16 bg-flex-black text-flex-white">
            <FadeIn>
              <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-flex-yellow mb-5">Feature</p>
            </FadeIn>
            <WordReveal
              text="Understated luxury hits different in-hand."
              className="font-serif font-bold text-flex-white"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)", lineHeight: 1.15 } as React.CSSProperties}
            />
            <FadeIn delay={0.3} className="mt-6">
              <p className="font-sans text-sm leading-relaxed text-white/55 tracking-wide max-w-md">
                Editor&apos;s note: we chase pieces that feel quiet on the rack and loud once you wear them — nylon, leather, soles, all vetted.
              </p>
            </FadeIn>
            <FadeIn delay={0.45} className="mt-8">
              <Link
                href="/flex/products/prada-re-edition-2000-nylon"
                className="inline-flex items-center gap-3 border border-white/25 text-white text-[11px] tracking-[0.3em] uppercase font-mono px-7 py-3.5 hover:border-flex-yellow-bright hover:text-flex-yellow-bright transition-all duration-300"
              >
                Shop Prada <ArrowRight size={13} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Labels grid */}
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

      {/* Stay close */}
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

      <footer className="bg-flex-black text-flex-white py-10 px-8 border-t border-flex-yellow-bright/30">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display font-black text-2xl uppercase tracking-tight">
              FLEX<span className="bg-flex-yellow-bright text-[#0a0a0a] px-1.5 py-0.5 ml-0.5">HAUS</span>
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-flex-white/45 mt-1">The edit — Street × Archive · South Africa</p>
          </div>
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
