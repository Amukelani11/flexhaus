"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { featuredProducts, brands, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import WordReveal from "@/components/archive/WordReveal";
import TiltCard from "@/components/archive/TiltCard";

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

const masonryHeights = ["aspect-[3/4]", "aspect-[3/5]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[3/5]", "aspect-[4/5]", "aspect-[3/4]"];

export default function ArchiveHomePage() {
  const { dispatch } = useCart();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <>
      {/* HERO — Split screen */}
      <section ref={heroRef} className="min-h-screen pt-16 grid grid-cols-1 lg:grid-cols-2">
        {/* Left — typographic side */}
        <div className="flex flex-col justify-end pb-16 px-10 lg:px-16 py-20 bg-archive-cream border-r border-archive-line">
          <FadeIn delay={0.2}>
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-archive-terracotta mb-8">
              Vol. 01 — Spring/Summer 2025
            </p>
          </FadeIn>

          <WordReveal
            text="The New"
            className="font-serif font-bold text-archive-charcoal/30"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: 1.0 } as React.CSSProperties}
          />
          <WordReveal
            text="Luxury"
            className="font-serif font-bold text-archive-charcoal"
            delay={0.2}
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: 1.0 } as React.CSSProperties}
          />
          <WordReveal
            text="Archive."
            className="font-serif font-bold text-archive-terracotta"
            delay={0.4}
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: 1.0 } as React.CSSProperties}
          />

          <FadeIn delay={0.8} className="mt-10 max-w-sm">
            <p className="font-sans text-sm leading-relaxed text-archive-charcoal/50 tracking-wide">
              A curated selection of Louis Vuitton, Prada, Goyard, Nike and more — 
              sourced for South Africa&apos;s discerning eye.
            </p>
          </FadeIn>

          <FadeIn delay={1.0} className="mt-8 flex items-center gap-6">
            <Link
              href="/archive/products"
              className="inline-flex items-center gap-3 bg-archive-charcoal text-archive-cream text-[11px] tracking-[0.35em] uppercase font-sans px-8 py-4 hover:bg-archive-terracotta transition-colors duration-500"
            >
              Browse Archive <ArrowRight size={13} />
            </Link>
            <Link
              href="/archive/about"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-sans text-archive-charcoal/50 hover:text-archive-terracotta transition-colors duration-300"
            >
              About <ArrowUpRight size={12} />
            </Link>
          </FadeIn>
        </div>

        {/* Right — editorial image */}
        <div className="relative overflow-hidden min-h-[60vh] lg:min-h-full">
          <motion.div className="absolute inset-0" style={{ y: imgY }}>
            <Image
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80"
              alt="FlexHaus Archive"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          {/* Number overlay */}
          <div className="absolute bottom-8 right-8 z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="font-serif text-[80px] font-bold text-archive-cream/20 leading-none select-none"
            >
              01
            </motion.p>
          </div>
        </div>
      </section>

      {/* LINE SEPARATOR */}
      <div className="border-b border-archive-line" />

      {/* BRANDS STRIP */}
      <section className="py-6 overflow-hidden border-b border-archive-line">
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "marquee_archive 30s linear infinite", width: "max-content" }}
        >
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="font-serif text-lg text-archive-charcoal/20 italic">{b.name}</span>
          ))}
        </div>
        <style>{`
          @keyframes marquee_archive {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* EDITORIAL INTRO */}
      <section className="py-24 px-10 lg:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          <div className="md:col-span-2">
            <FadeIn>
              <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-archive-terracotta mb-6">
                Editorial
              </p>
            </FadeIn>
            <WordReveal
              text="Luxury and street, edited for South Africa."
              className="font-serif font-bold text-archive-charcoal"
              style={{ fontSize: "clamp(1.8rem,4.5vw,4rem)", lineHeight: 1.15 } as React.CSSProperties}
            />
          </div>
          <FadeIn delay={0.3} className="pt-4 md:pt-16">
            <p className="font-sans text-sm leading-relaxed text-archive-charcoal/50 tracking-wide">
              Louis Vuitton, Prada, Goyard, Nike — authenticated where it counts, photographed honestly, 
              and packed to survive a courier van.
            </p>
            <Link
              href="/archive/about"
              className="inline-flex items-center gap-2 mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-archive-terracotta hover:gap-4 transition-all duration-300"
            >
              Read More <ArrowRight size={12} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <div className="border-b border-archive-line" />

      {/* MASONRY PRODUCT GRID */}
      <section className="py-16 px-10 lg:px-16 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <FadeIn>
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-archive-terracotta mb-2">New Arrivals</p>
            <h2 className="font-serif text-[clamp(2rem,6vw,5rem)] font-bold text-archive-charcoal leading-none">
              The Collection
            </h2>
          </FadeIn>
          <Link
            href="/archive/products"
            className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-archive-charcoal/40 hover:text-archive-terracotta transition-colors"
          >
            View All <ArrowUpRight size={12} />
          </Link>
        </div>

        {/* Masonry-style grid with varying heights */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {featuredProducts.slice(0, 8).map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.06} className="break-inside-avoid">
              <TiltCard>
                <Link href={`/archive/products/${product.slug}`} className="group block mb-4">
                  <div className={`relative overflow-hidden bg-archive-line/20 ${masonryHeights[i % masonryHeights.length]}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {product.badge && (
                      <div className={`absolute top-3 left-3 font-mono text-[8px] uppercase tracking-[0.3em] px-2 py-1 ${
                        product.badge === "NEW DROP" ? "bg-archive-terracotta text-archive-cream" :
                        product.badge === "LAST 1" ? "bg-archive-charcoal text-archive-cream" :
                        "bg-archive-cream text-archive-charcoal"
                      }`}>
                        {product.badge}
                      </div>
                    )}
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-archive-charcoal/0 group-hover:bg-archive-charcoal/20 transition-colors duration-500 flex items-end"
                    >
                      <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch({ type: "ADD", product });
                          }}
                          className="w-full bg-archive-cream text-archive-charcoal text-[10px] uppercase tracking-[0.3em] font-sans py-3 hover:bg-archive-terracotta hover:text-archive-cream transition-colors"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </motion.div>
                  </div>
                  <div className="mt-3">
                    <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-archive-terracotta">{product.brand}</p>
                    <p className="font-serif text-sm text-archive-charcoal group-hover:text-archive-terracotta transition-colors mt-0.5">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="font-mono text-xs text-archive-charcoal/60">{formatPrice(product.price)}</p>
                      {product.originalPrice && (
                        <p className="font-mono text-xs text-archive-charcoal/30 line-through">{formatPrice(product.originalPrice)}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <Link
            href="/archive/products"
            className="inline-flex items-center gap-3 border border-archive-charcoal text-archive-charcoal text-[11px] tracking-[0.35em] uppercase font-sans px-10 py-4 hover:bg-archive-charcoal hover:text-archive-cream transition-all duration-500"
          >
            Browse Full Archive <ArrowRight size={13} />
          </Link>
        </FadeIn>
      </section>

      {/* EDITORIAL STORY SECTION */}
      <section className="border-y border-archive-line">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Editorial image */}
          <div className="relative h-[70vh] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1590739225287-bd31519780c3?w=1200&q=80"
              alt="Prada Editorial"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-archive-cream/20" />
          </div>
          {/* Text content */}
          <div className="flex flex-col justify-center px-12 lg:px-16 py-16 bg-archive-charcoal text-archive-cream">
            <FadeIn>
              <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-archive-terracotta mb-6">
                Feature Story
              </p>
            </FadeIn>
            <WordReveal
              text="The Art of Understated Luxury"
              className="font-serif font-bold text-archive-cream"
              style={{ fontSize: "clamp(1.8rem,4vw,3.5rem)", lineHeight: 1.15 } as React.CSSProperties}
            />
            <FadeIn delay={0.4} className="mt-8">
              <p className="font-sans text-sm leading-relaxed text-archive-cream/50 tracking-wide">
                Prada&apos;s Re-Nylon collection redefined what luxury means in the modern era — 
                blending sustainability with the unmistakable triangular plaque that commands 
                attention without demanding it.
              </p>
            </FadeIn>
            <FadeIn delay={0.6} className="mt-8">
              <Link
                href="/archive/products/prada-re-edition-2000-nylon"
                className="inline-flex items-center gap-3 border border-archive-cream/30 text-archive-cream text-[11px] tracking-[0.35em] uppercase font-sans px-8 py-4 hover:border-archive-terracotta hover:text-archive-terracotta transition-all duration-500"
              >
                Shop Prada <ArrowRight size={13} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* BRAND GRID */}
      <section className="py-20 px-10 lg:px-16 max-w-[1400px] mx-auto">
        <FadeIn>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold text-archive-charcoal text-center mb-16">
            The Labels
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-archive-line">
          {brands.map((brand, i) => (
            <FadeIn key={brand.slug} delay={i * 0.06}>
              <div className="bg-archive-cream flex flex-col items-center justify-center py-10 px-4 hover:bg-archive-charcoal group transition-colors duration-500">
                <p className="font-serif text-sm text-archive-charcoal/60 group-hover:text-archive-cream transition-colors text-center">
                  {brand.name}
                </p>
                <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-archive-terracotta/50 group-hover:text-archive-terracotta mt-1">
                  {brand.count} items
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-archive-line bg-archive-charcoal py-20 px-10 lg:px-16">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-archive-terracotta mb-4">Stay Informed</p>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold text-archive-cream mb-6">
              New Arrivals. First Access.
            </h2>
            <p className="font-sans text-sm text-archive-cream/40 tracking-wide mb-10">
              Follow us on TikTok and Instagram for daily drops, unboxings, and exclusive early access.
            </p>
          </FadeIn>
          <FadeIn delay={0.3} className="flex justify-center gap-4 flex-wrap">
            {["TikTok", "Instagram", "WhatsApp"].map((s) => (
              <a
                key={s}
                href="#"
                className="flex items-center gap-2 border border-archive-cream/20 text-archive-cream text-[11px] tracking-[0.3em] uppercase font-sans px-6 py-3 hover:border-archive-terracotta hover:text-archive-terracotta transition-all duration-400"
              >
                {s} <ArrowUpRight size={12} />
              </a>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-archive-charcoal/20 py-12 px-10 lg:px-16 bg-archive-charcoal">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-xl text-archive-cream/60 tracking-[0.4em] uppercase">FlexHaus</p>
            <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-archive-terracotta mt-0.5">Curated Luxury</p>
          </div>
          <div className="flex gap-8">
            {["Products", "About", "Cart"].map((item) => (
              <Link key={item} href={`/archive/${item.toLowerCase()}`} className="font-mono text-[9px] uppercase tracking-[0.3em] text-archive-cream/30 hover:text-archive-terracotta transition-colors">
                {item}
              </Link>
            ))}
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-archive-cream/20">© 2025 FlexHaus SA</p>
        </div>
      </footer>
    </>
  );
}
