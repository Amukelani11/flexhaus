"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
      <Link href={`/velvet/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm mb-3">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.badge && (
            <div className={`absolute top-3 left-3 text-[9px] tracking-[0.25em] uppercase font-mono font-bold px-2.5 py-1 rounded-sm ${badgeColors[product.badge] ?? "bg-velvet-gold text-velvet-fg"}`}>
              {product.badge}
            </div>
          )}
          {product.inStock && (
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <button
                onClick={(e) => { e.preventDefault(); dispatch({ type: "ADD", product }); }}
                className="w-full bg-velvet-fg text-velvet-accent font-mono font-bold text-[10px] uppercase tracking-[0.3em] py-3 hover:bg-velvet-gold hover:text-velvet-fg transition-colors"
              >
                Add to Bag
              </button>
            </div>
          )}
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-velvet-fg/40 mb-0.5">{product.brand}</p>
          <div className="flex justify-between items-start gap-2">
            <p className="font-serif font-bold text-[13px] uppercase leading-tight group-hover:text-velvet-fg/60 transition-colors">{product.name}</p>
            <p className="font-serif font-black text-[13px] flex-shrink-0">{formatPrice(product.price)}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function VelvetHomePage() {
  const [scanActive, setScanActive] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setScanActive(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* HERO — light surface; headline uses fade-up (no overflow-hidden = no clipped glyphs) */}
      <section className="relative min-h-screen pt-16 bg-velvet-bg text-velvet-fg flex items-center border-y border-velvet-gold/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <AnimatePresence>
          {scanActive && (
            <motion.div
              className="absolute left-0 right-0 h-px bg-velvet-gold z-20 pointer-events-none"
              initial={{ top: 0, opacity: 0.6 }}
              animate={{ top: "100vh" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "linear" }}
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1800&q=80"
            alt=""
            fill
            priority
            className="object-cover opacity-[0.06] scale-105 object-[center_35%]"
            sizes="100vw"
          />
          <div className="velvet-hero-mesh" />
          <motion.div
            className="absolute inset-0 z-[1]"
            initial={false}
            animate={{
              opacity: [0.55, 0.85, 0.55],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "radial-gradient(ellipse 55% 42% at 72% 18%, rgba(232, 201, 160, 0.2), transparent 62%)",
              transformOrigin: "70% 20%",
            }}
          />
          <div className="absolute inset-0 z-[2] bg-gradient-to-b from-velvet-bg/65 via-velvet-bg/25 to-velvet-bg/90" />
          <div className="absolute inset-0 z-[3] bg-gradient-to-r from-velvet-bg/80 via-transparent to-velvet-gold/[0.06]" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="w-full max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="flex items-center gap-3 mb-6 sm:mb-8"
            >
              <div className="w-6 h-px shrink-0 bg-velvet-gold" />
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-velvet-accent">
                Salon light · QC before dispatch
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-black uppercase text-velvet-fg text-[clamp(2rem,5.2vw+0.2rem,4.25rem)] leading-[1.05] max-w-full [text-wrap:balance]"
            >
              Soft<br className="sm:hidden" /> glare
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-black uppercase text-velvet-accent text-[clamp(2rem,5.2vw+0.2rem,4.25rem)] leading-[1.05] mt-1 mb-8 sm:mb-10 max-w-full [text-wrap:balance]"
            >
              on sharp goods.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="font-mono text-[11px] text-velvet-fg/55 tracking-wide mb-8 max-w-md leading-relaxed"
            >
              A quieter room for the same roster — Louis Vuitton, Prada, Goyard, Nike — inspected, priced plainly, courier nationwide.
            </motion.p>

            <div className="flex flex-wrap gap-3">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}>
                <Link
                  href="/velvet/products"
                  className="inline-flex items-center gap-2.5 bg-velvet-gold text-[#0a0a0a] font-mono font-bold text-[11px] uppercase tracking-[0.3em] px-7 py-3.5 hover:bg-velvet-fg hover:text-velvet-bg transition-colors duration-200"
                >
                  Browse pieces <ArrowRight size={13} />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}>
                <Link
                  href="/velvet/about"
                  className="inline-flex items-center gap-2.5 border border-velvet-fg/20 text-velvet-fg font-mono font-bold text-[11px] uppercase tracking-[0.3em] px-7 py-3.5 hover:border-velvet-fg hover:bg-velvet-line/80 transition-all duration-200"
                >
                  About
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="mt-16 sm:mt-20 sm:absolute sm:bottom-12 sm:left-8 sm:mt-0 flex flex-wrap gap-8 sm:gap-10"
          >
            {[{ num: "16+", label: "SKUs" }, { num: "QC", label: "Every order" }, { num: "SA", label: "Shipping" }].map((s) => (
              <div key={s.label}>
                <p className="font-serif font-black text-xl text-velvet-accent">{s.num}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-velvet-fg/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BRANDS STRIP */}
      <section className="py-5 bg-velvet-gold overflow-hidden border-y border-velvet-fg/10">
        <div className="flex gap-10 whitespace-nowrap" style={{ animation: "marquee 22s linear infinite", width: "max-content" }}>
          {[...brands, ...brands, ...brands].map((b, i) => (
            <span key={i} className="font-serif font-black text-base uppercase tracking-tight text-velvet-fg/80">
              {b.name} <span className="text-velvet-fg/25 mx-1">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED BENTO */}
      <section className="py-16 px-8 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-black text-[clamp(1.8rem,5vw,3.5rem)] uppercase leading-none">
              New Drop
            </motion.h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} style={{ originX: 0 }} className="h-1 bg-velvet-gold w-14 mt-2" />
          </div>
          <Link href="/velvet/products" className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-velvet-fg/50 hover:text-velvet-fg transition-colors">
            All Products <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Hero + sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <Link href={`/velvet/products/${featuredProducts[0]?.slug}`} className="group block relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-100">
              <Image src={featuredProducts[0]?.image ?? ""} alt={featuredProducts[0]?.name ?? ""} fill className="object-cover transition-transform duration-600 group-hover:scale-105" sizes="66vw" priority />
              {featuredProducts[0]?.badge && (
                <div className={`absolute top-4 left-4 font-mono font-bold text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 rounded-sm ${badgeColors[featuredProducts[0].badge] ?? "bg-velvet-gold text-velvet-fg"}`}>
                  {featuredProducts[0].badge}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-velvet-fg/90 to-transparent p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-velvet-accent mb-1">{featuredProducts[0]?.brand}</p>
                <div className="flex items-center justify-between">
                  <p className="font-serif font-black text-xl uppercase text-velvet-bg">{featuredProducts[0]?.name}</p>
                  <p className="font-serif font-black text-xl text-velvet-accent">{formatPrice(featuredProducts[0]?.price ?? 0)}</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {featuredProducts.slice(1, 3).map((product) => (
              <Link key={product.id} href={`/velvet/products/${product.slug}`} className="group relative flex-1 min-h-[180px] overflow-hidden rounded-sm bg-gray-100 block">
                <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="22vw" />
                {product.badge && (
                  <div className={`absolute top-3 left-3 font-mono font-bold text-[9px] uppercase tracking-[0.25em] px-2 py-1 rounded-sm ${badgeColors[product.badge] ?? "bg-velvet-gold text-velvet-fg"}`}>
                    {product.badge}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-velvet-fg/75 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-velvet-accent">{product.brand}</p>
                  <div className="flex justify-between mt-0.5">
                    <p className="font-serif font-bold text-xs uppercase text-velvet-bg">{product.name}</p>
                    <p className="font-serif font-black text-xs text-velvet-accent">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* 4-col row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.slice(3, 7).map((product) => (
            <Link key={product.id} href={`/velvet/products/${product.slug}`} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 block">
              <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="25vw" />
              {product.badge && (
                <div className={`absolute top-3 left-3 font-mono font-bold text-[9px] uppercase tracking-[0.25em] px-2 py-1 rounded-sm ${badgeColors[product.badge] ?? "bg-velvet-gold text-velvet-fg"}`}>
                  {product.badge}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-velvet-fg/75 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-velvet-accent">{product.brand}</p>
                <div className="flex justify-between mt-0.5">
                  <p className="font-serif font-bold text-xs uppercase text-velvet-bg truncate mr-2">{product.name}</p>
                  <p className="font-serif font-black text-xs text-velvet-accent flex-shrink-0">{formatPrice(product.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FULL DROP */}
      <section className="py-16 px-8 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-serif font-black text-[clamp(1.8rem,5vw,3.5rem)] uppercase leading-none">
            The Full Drop
          </motion.h2>
          <Link href="/velvet/products" className="font-mono text-[10px] uppercase tracking-[0.3em] text-velvet-fg/50 hover:text-velvet-fg flex items-center gap-1.5 transition-colors">
            View All <ArrowRight size={11} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden mx-8 mb-16 rounded-sm">
        <div className="relative h-[42vh] flex items-center">
          <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1800&q=80" alt="Nike Drop" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 px-10 w-full">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-black text-white uppercase leading-[1.05] mb-6 max-w-[95%] [text-wrap:balance] text-[clamp(1.65rem,4.5vw+0.2rem,3.25rem)]"
            >
              Fresh stock.
              <br />
              <span className="text-[#E5B80F]">Same standard.</span>
            </motion.h2>
            <Link href="/velvet/products" className="inline-flex items-center gap-2.5 bg-[#E5B80F] text-[#0a0a0a] font-mono font-bold text-[11px] uppercase tracking-[0.3em] px-7 py-3.5 hover:bg-white transition-colors">
              View products <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="py-12 px-8 bg-velvet-line border-t border-velvet-fg/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-4">
          {[
            { icon: "📱", platform: "TikTok", desc: "Drops and close-ups" },
            { icon: "📸", platform: "Instagram", desc: "Editorial and stock" },
            { icon: "💬", platform: "WhatsApp", desc: "Orders and sizing" },
          ].map((s) => (
            <div
              key={s.platform}
              className="flex flex-col items-center py-8 px-4 text-center hover:bg-velvet-gold group rounded-sm transition-colors duration-200 cursor-pointer"
            >
              <span className="text-2xl mb-3">{s.icon}</span>
              <p className="font-serif font-black uppercase text-base tracking-tight text-velvet-fg group-hover:text-[#0a0a0a] transition-colors">{s.platform}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-velvet-fg/45 group-hover:text-[#0a0a0a]/70 mt-1 transition-colors">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-velvet-fg text-velvet-bg py-10 px-8 border-t border-velvet-gold/25">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-serif font-black text-2xl uppercase tracking-tight">
              FLEX<span className="bg-velvet-gold text-[#0a0a0a] px-1.5 py-0.5 ml-0.5">HAUS</span>
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-velvet-bg/40 mt-1">Designer resale · South Africa</p>
          </div>
          <div className="flex gap-3">
            {["TikTok", "Instagram", "WhatsApp"].map((s) => (
              <a
                key={s}
                href="#"
                className="font-mono text-[9px] uppercase tracking-[0.3em] text-velvet-bg/45 hover:text-velvet-gold transition-colors border border-velvet-bg/15 hover:border-velvet-gold px-3 py-2"
              >
                {s}
              </a>
            ))}
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-velvet-bg/25">© 2026 FlexHaus SA</p>
        </div>
      </footer>
    </>
  );
}
