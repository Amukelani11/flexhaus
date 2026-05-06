"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { featuredProducts, brands, products, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const badgeColors: Record<string, string> = {
  "NEW DROP": "bg-flex-yellow-bright text-flex-black",
  "HOT": "bg-red-500 text-white",
  "LAST 1": "bg-flex-black text-flex-yellow",
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
                onClick={(e) => { e.preventDefault(); dispatch({ type: "ADD", product }); }}
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

export default function FlexHomePage() {
  const [scanActive, setScanActive] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setScanActive(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* HERO — always dark surface (theme tokens invert in mode-dark; avoids white-on-white) */}
      <section className="relative min-h-screen pt-16 bg-[#0a0a0a] text-white overflow-hidden flex items-center">
        <AnimatePresence>
          {scanActive && (
            <motion.div
              className="absolute left-0 right-0 h-px bg-[#E5B80F] z-20 pointer-events-none"
              initial={{ top: 0, opacity: 0.6 }}
              animate={{ top: "100vh" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "linear" }}
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1800&q=80" alt="Hero" fill priority className="object-cover opacity-15" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/88 to-black/35" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 w-full py-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-[#E5B80F]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/70">South Africa · QC before dispatch</span>
            </motion.div>

            <div className="overflow-hidden mb-1">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} className="font-display font-black uppercase text-white" style={{ fontSize: "clamp(3.5rem,10vw,9rem)", lineHeight: 0.92 }}>
                Luxury & street
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ fontSize: "clamp(3.5rem,10vw,9rem)", lineHeight: 0.92 }} className="font-display font-black uppercase text-[#E5B80F]">
                in rotation.
              </motion.h1>
            </div>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} className="font-mono text-[11px] text-white/55 tracking-wide mb-8 max-w-md leading-relaxed">
              Louis Vuitton, Prada, Goyard, Nike — inspected arrivals, straight answers on pricing, courier nationwide.
            </motion.p>

            <div className="flex flex-wrap gap-3">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
                <Link href="/flex/products" className="inline-flex items-center gap-2.5 bg-[#E5B80F] text-[#0a0a0a] font-mono font-bold text-[11px] uppercase tracking-[0.3em] px-7 py-3.5 hover:bg-white transition-colors duration-200">
                  Browse pieces <ArrowRight size={13} />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}>
                <Link href="/flex/about" className="inline-flex items-center gap-2.5 border border-white/35 text-white font-mono font-bold text-[11px] uppercase tracking-[0.3em] px-7 py-3.5 hover:border-white hover:bg-white/10 transition-all duration-200">
                  About
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="absolute bottom-12 left-8 flex flex-wrap gap-10">
            {[{ num: "16+", label: "SKUs" }, { num: "QC", label: "Every order" }, { num: "SA", label: "Shipping" }].map((s) => (
              <div key={s.label}>
                <p className="font-display font-black text-xl text-[#E5B80F]">{s.num}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BRANDS STRIP */}
      <section className="py-5 bg-flex-yellow-bright overflow-hidden border-y border-flex-black/10">
        <div className="flex gap-10 whitespace-nowrap" style={{ animation: "marquee 22s linear infinite", width: "max-content" }}>
          {[...brands, ...brands, ...brands].map((b, i) => (
            <span key={i} className="font-display font-black text-base uppercase tracking-tight text-flex-black/80">
              {b.name} <span className="text-flex-black/25 mx-1">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED BENTO */}
      <section className="py-16 px-8 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display font-black text-[clamp(1.8rem,5vw,3.5rem)] uppercase leading-none">
              New Drop
            </motion.h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} style={{ originX: 0 }} className="h-1 bg-flex-yellow-bright w-14 mt-2" />
          </div>
          <Link href="/flex/products" className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/50 hover:text-flex-black transition-colors">
            All Products <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Hero + sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <Link href={`/flex/products/${featuredProducts[0]?.slug}`} className="group block relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-100">
              <Image src={featuredProducts[0]?.image ?? ""} alt={featuredProducts[0]?.name ?? ""} fill className="object-cover transition-transform duration-600 group-hover:scale-105" sizes="66vw" priority />
              {featuredProducts[0]?.badge && (
                <div className={`absolute top-4 left-4 font-mono font-bold text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 rounded-sm ${badgeColors[featuredProducts[0].badge] ?? "bg-flex-yellow-bright text-flex-black"}`}>
                  {featuredProducts[0].badge}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-flex-black/90 to-transparent p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-flex-yellow mb-1">{featuredProducts[0]?.brand}</p>
                <div className="flex items-center justify-between">
                  <p className="font-display font-black text-xl uppercase text-flex-white">{featuredProducts[0]?.name}</p>
                  <p className="font-display font-black text-xl text-flex-yellow">{formatPrice(featuredProducts[0]?.price ?? 0)}</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {featuredProducts.slice(1, 3).map((product) => (
              <Link key={product.id} href={`/flex/products/${product.slug}`} className="group relative flex-1 min-h-[180px] overflow-hidden rounded-sm bg-gray-100 block">
                <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="22vw" />
                {product.badge && (
                  <div className={`absolute top-3 left-3 font-mono font-bold text-[9px] uppercase tracking-[0.25em] px-2 py-1 rounded-sm ${badgeColors[product.badge] ?? "bg-flex-yellow-bright text-flex-black"}`}>
                    {product.badge}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-flex-black/75 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-flex-yellow">{product.brand}</p>
                  <div className="flex justify-between mt-0.5">
                    <p className="font-display font-bold text-xs uppercase text-flex-white">{product.name}</p>
                    <p className="font-display font-black text-xs text-flex-yellow">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* 4-col row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.slice(3, 7).map((product) => (
            <Link key={product.id} href={`/flex/products/${product.slug}`} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 block">
              <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="25vw" />
              {product.badge && (
                <div className={`absolute top-3 left-3 font-mono font-bold text-[9px] uppercase tracking-[0.25em] px-2 py-1 rounded-sm ${badgeColors[product.badge] ?? "bg-flex-yellow-bright text-flex-black"}`}>
                  {product.badge}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-flex-black/75 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-flex-yellow">{product.brand}</p>
                <div className="flex justify-between mt-0.5">
                  <p className="font-display font-bold text-xs uppercase text-flex-white truncate mr-2">{product.name}</p>
                  <p className="font-display font-black text-xs text-flex-yellow flex-shrink-0">{formatPrice(product.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FULL DROP */}
      <section className="py-16 px-8 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-display font-black text-[clamp(1.8rem,5vw,3.5rem)] uppercase leading-none">
            The Full Drop
          </motion.h2>
          <Link href="/flex/products" className="font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/50 hover:text-flex-black flex items-center gap-1.5 transition-colors">
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
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display font-black text-white uppercase leading-none mb-6" style={{ fontSize: "clamp(2rem,7vw,6rem)", lineHeight: 0.92 }}>
              Fresh stock.<br /><span className="text-[#E5B80F]">Same standard.</span>
            </motion.h2>
            <Link href="/flex/products" className="inline-flex items-center gap-2.5 bg-[#E5B80F] text-[#0a0a0a] font-mono font-bold text-[11px] uppercase tracking-[0.3em] px-7 py-3.5 hover:bg-white transition-colors">
              View products <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="py-12 px-8 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-4">
          {[
            { icon: "📱", platform: "TikTok", desc: "Drops and close-ups" },
            { icon: "📸", platform: "Instagram", desc: "Editorial and stock" },
            { icon: "💬", platform: "WhatsApp", desc: "Orders and sizing" },
          ].map((s) => (
            <div key={s.platform} className="flex flex-col items-center py-8 px-4 text-center hover:bg-[#E5B80F] group rounded-sm transition-colors duration-200 cursor-pointer">
              <span className="text-2xl mb-3">{s.icon}</span>
              <p className="font-display font-black uppercase text-base tracking-tight text-white group-hover:text-[#0a0a0a] transition-colors">{s.platform}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45 group-hover:text-[#0a0a0a]/70 mt-1 transition-colors">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] text-white py-10 px-8 border-t border-[#E5B80F]/35">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display font-black text-2xl uppercase tracking-tight text-white">
              FLEX<span className="bg-[#E5B80F] text-[#0a0a0a] px-1.5 py-0.5 ml-0.5">HAUS</span>
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 mt-1">Designer resale · South Africa</p>
          </div>
          <div className="flex gap-3">
            {["TikTok", "Instagram", "WhatsApp"].map((s) => (
              <a key={s} href="#" className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/45 hover:text-[#E5B80F] transition-colors border border-white/15 hover:border-[#E5B80F] px-3 py-2">{s}</a>
            ))}
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">© 2026 FlexHaus SA</p>
        </div>
      </footer>
    </>
  );
}
