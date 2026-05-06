"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { featuredProducts, brands, products, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const badgeColors: Record<string, string> = {
  "NEW DROP": "bg-velvet-gold text-velvet-fg",
  "HOT": "bg-red-500 text-white",
  "LAST 1": "bg-velvet-fg text-velvet-accent",
  "SOLD OUT": "bg-gray-100 text-gray-400",
};

function RailCard({ product }: { product: (typeof products)[0] }) {
  const { dispatch } = useCart();
  return (
    <div className="snap-start shrink-0 w-[72vw] max-w-[320px] group">
      <div className="rounded-[2rem] overflow-hidden bg-velvet-line/30 border border-velvet-gold/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
        <Link href={`/velvet/products/${product.slug}`} className="block relative aspect-[4/5]">
          <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="320px" />
          {product.badge && (
            <div className={`absolute top-5 left-5 rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-mono ${badgeColors[product.badge] ?? ""}`}>
              {product.badge}
            </div>
          )}
        </Link>
        <div className="p-6 bg-velvet-bg/90 backdrop-blur-sm">
          <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-velvet-fg/45">{product.brand}</p>
          <div className="flex items-end justify-between gap-4 mt-2">
            <Link href={`/velvet/products/${product.slug}`} className="font-serif font-semibold text-lg text-velvet-fg leading-snug hover:text-velvet-gold transition-colors">
              {product.name}
            </Link>
            <p className="font-serif font-bold text-lg text-velvet-gold shrink-0">{formatPrice(product.price)}</p>
          </div>
          {product.inStock && (
            <button
              type="button"
              onClick={() => dispatch({ type: "ADD", product })}
              className="mt-4 w-full rounded-full border border-velvet-gold/40 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-velvet-fg hover:bg-velvet-gold hover:text-velvet-fg transition-colors"
            >
              Reserve in bag
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function QuietStackItem({ product, large }: { product: (typeof products)[0]; large?: boolean }) {
  const { dispatch } = useCart();
  return (
    <div className={`flex flex-col ${large ? "lg:col-span-2 lg:row-span-2" : ""}`}>
      <Link
        href={`/velvet/products/${product.slug}`}
        className={`group relative overflow-hidden rounded-3xl bg-velvet-line/20 border border-velvet-gold/15 ${large ? "min-h-[420px] lg:min-h-full" : "aspect-[4/5]"}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
          sizes={large ? "(max-width:1024px) 100vw, 66vw" : "33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-velvet-fg/50 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-velvet-bg/80">{product.brand}</p>
          <h3 className={`font-serif font-bold text-velvet-bg mt-2 ${large ? "text-3xl lg:text-4xl" : "text-xl"}`}>{product.name}</h3>
          <p className="font-serif text-velvet-gold text-xl mt-3">{formatPrice(product.price)}</p>
        </div>
      </Link>
      {product.inStock && (
        <button
          type="button"
          onClick={() => dispatch({ type: "ADD", product })}
          className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-velvet-gold hover:text-velvet-fg transition-colors text-left"
        >
          + Add to bag
        </button>
      )}
    </div>
  );
}

export default function VelvetHomePage() {
  const railRef = useRef(null);
  const quoteRef = useRef(null);
  const qInView = useInView(quoteRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* HERO — centered editorial + air */}
      <section className="relative pt-24 pb-8 px-6 sm:px-10 bg-velvet-bg text-velvet-fg">
        <div className="velvet-hero-mesh absolute inset-0 pointer-events-none opacity-70" aria-hidden />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[9px] uppercase tracking-[0.55em] text-velvet-gold mb-10"
          >
            Velvet room · evening stock
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="font-serif font-medium text-[clamp(2.75rem,9vw,5.5rem)] leading-[1.05] text-velvet-fg"
          >
            Soft glare
            <span className="block italic font-light text-velvet-gold/95 mt-2">on sharp goods.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-10 font-sans text-sm text-velvet-fg/55 leading-relaxed max-w-md mx-auto"
          >
            A slower read on the same roster — light first, then fabric, then price. Nothing shouts; everything is legible.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/velvet/products"
              className="rounded-full bg-velvet-gold text-velvet-fg px-10 py-4 font-mono text-[10px] uppercase tracking-[0.35em] hover:bg-velvet-fg hover:text-velvet-accent transition-colors duration-500"
            >
              View salon floor
            </Link>
            <Link href="/velvet/about" className="rounded-full border border-velvet-gold/35 px-10 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-velvet-fg/70 hover:border-velvet-gold hover:text-velvet-fg transition-colors">
              Our note
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 1 }}
          className="relative mt-20 max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden border border-velvet-gold/20 aspect-[21/10] min-h-[200px] shadow-[0_40px_100px_-40px_rgba(196,165,116,0.35)]"
        >
          <Image
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:1200px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-velvet-fg/25 via-transparent to-velvet-gold/10" />
        </motion.div>
      </section>

      {/* Marquee — soft italic drift */}
      <section className="py-8 bg-velvet-line/40 border-y border-velvet-gold/10 overflow-hidden">
        <div className="flex gap-20 animate-[marquee_32s_linear_infinite] whitespace-nowrap w-max px-6" style={{ width: "max-content" }}>
          {[...brands, ...brands].map((b, i) => (
            <span key={`${b.name}-${i}`} className="font-serif text-lg md:text-xl text-velvet-fg/25 italic">
              {b.name}
            </span>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section ref={quoteRef} className="py-24 px-8 max-w-[720px] mx-auto">
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={qInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="font-serif text-[clamp(1.65rem,4.5vw,2.75rem)] leading-snug text-velvet-fg text-center"
        >
          &ldquo;We leave hype at the door. What remains is cloth, hardware, and a fair ticket.&rdquo;
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          animate={qInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center font-mono text-[9px] uppercase tracking-[0.4em] text-velvet-gold mt-10"
        >
          — FlexHaus, velvet edition
        </motion.p>
      </section>

      {/* Horizontal rail — distinct from any grid homepage */}
      <section ref={railRef} className="pb-20 pt-4 bg-velvet-bg border-t border-velvet-gold/10">
        <div className="max-w-[1400px] mx-auto px-6 mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-velvet-gold mb-2">Along the wall</p>
            <h2 className="font-serif text-4xl md:text-5xl text-velvet-fg">Tonight&apos;s line</h2>
          </div>
          <Link href="/velvet/products" className="hidden sm:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-velvet-fg/45 hover:text-velvet-gold transition-colors">
            See all <ArrowUpRight size={12} />
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-6 scrollbar-thin">
          {featuredProducts.map((product) => (
            <RailCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Staggered salon grid — one hero tile + satellites */}
      <section className="py-20 px-6 bg-velvet-line/25 border-t border-velvet-gold/10">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-velvet-fg mb-12 text-center md:text-left">Still life</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 lg:grid-rows-2">
            <QuietStackItem product={featuredProducts[0]} large />
            <QuietStackItem product={featuredProducts[1]} />
            <QuietStackItem product={featuredProducts[2]} />
          </div>
        </div>
      </section>

      {/* Whisper list — single column */}
      <section className="py-20 px-6 bg-velvet-bg">
        <div className="max-w-xl mx-auto">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.45em] text-velvet-gold mb-12 text-center">Also arriving</h2>
          <ul className="divide-y divide-velvet-gold/15 border-t border-b border-velvet-gold/15">
            {products.slice(0, 6).map((product) => (
              <li key={product.id}>
                <Link href={`/velvet/products/${product.slug}`} className="flex items-center gap-5 py-6 group">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0">
                    <Image src={product.image} alt="" fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-velvet-fg/40">{product.brand}</p>
                    <p className="font-serif text-base text-velvet-fg truncate group-hover:text-velvet-gold transition-colors">{product.name}</p>
                  </div>
                  <span className="font-serif font-semibold text-velvet-gold">{formatPrice(product.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-center mt-12">
            <Link href="/velvet/products" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-velvet-fg/50 hover:text-velvet-gold">
              Full list <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-velvet-fg text-velvet-accent py-14 px-8 rounded-t-[3rem] mt-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <p className="font-serif text-3xl italic text-velvet-bg">Velvet</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-velvet-bg/40 mt-2">FlexHaus · South Africa</p>
          </div>
          <div className="flex gap-4">
            {["Instagram", "TikTok", "WhatsApp"].map((s) => (
              <a key={s} href="#" className="font-mono text-[9px] uppercase tracking-[0.25em] text-velvet-bg/45 hover:text-velvet-gold transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
