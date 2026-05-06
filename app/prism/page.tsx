"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { featuredProducts, brands, products, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const badgeColors: Record<string, string> = {
  "NEW DROP": "bg-prism-accent text-prism-fg",
  "HOT": "bg-red-500 text-white",
  "LAST 1": "bg-prism-fg text-prism-hot",
  "SOLD OUT": "bg-gray-100 text-gray-400",
};

/** Mosaic cell — sharp grid, no bento */
function MosaicCell({ product, index }: { product: (typeof products)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const { dispatch } = useCart();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group bg-prism-bg border-2 border-prism-fg hover:bg-prism-surface transition-colors"
    >
      <Link href={`/prism/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-prism-fg/5">
          <Image src={product.image} alt={product.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" sizes="25vw" />
          {product.badge && (
            <div className={`absolute top-2 left-2 text-[8px] tracking-[0.2em] uppercase font-mono font-bold px-2 py-1 border border-prism-fg ${badgeColors[product.badge] ?? ""}`}>
              {product.badge}
            </div>
          )}
        </div>
        <div className="p-3 border-t-2 border-prism-fg flex justify-between gap-2 items-start">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-prism-fg/50">{product.brand}</p>
            <p className="font-space font-bold text-[11px] uppercase leading-tight mt-1">{product.name}</p>
          </div>
          <p className="font-space font-black text-xs shrink-0">{formatPrice(product.price)}</p>
        </div>
      </Link>
      {product.inStock && (
        <button
          type="button"
          onClick={() => dispatch({ type: "ADD", product })}
          className="w-full font-mono text-[9px] uppercase tracking-[0.35em] py-2.5 border-t-2 border-prism-fg bg-prism-fg text-prism-bg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Add
        </button>
      )}
    </motion.div>
  );
}

/** Ledger row — inventory table feel */
function LedgerRow({ product, index }: { product: (typeof products)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const { dispatch } = useCart();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="grid grid-cols-[72px_1fr_auto] md:grid-cols-[88px_1fr_auto_auto] gap-3 md:gap-6 items-center px-3 py-3 border-b-2 border-prism-fg hover:bg-prism-accent/15 transition-colors"
    >
      <Link href={`/prism/products/${product.slug}`} className="relative h-[72px] md:h-[88px] border-2 border-prism-fg overflow-hidden bg-prism-fg/5 block shrink-0">
        <Image src={product.image} alt="" fill className="object-cover" sizes="88px" />
      </Link>
      <Link href={`/prism/products/${product.slug}`} className="min-w-0 block">
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-prism-fg/45">{product.brand}</p>
        <p className="font-space font-bold text-sm uppercase truncate">{product.name}</p>
        <p className="font-mono text-[9px] text-prism-fg/40 mt-0.5 hidden md:block">{product.category}</p>
      </Link>
      <Link href={`/prism/products/${product.slug}`} className="text-right md:text-left block">
        {product.badge && (
          <span className={`inline-block font-mono text-[8px] uppercase tracking-[0.2em] px-1.5 py-0.5 border border-prism-fg mb-1 ${badgeColors[product.badge] ?? ""}`}>
            {product.badge}
          </span>
        )}
        <p className="font-space font-black text-sm">{formatPrice(product.price)}</p>
      </Link>
      {product.inStock && (
        <button
          type="button"
          onClick={() => dispatch({ type: "ADD", product })}
          className="hidden md:block font-mono text-[9px] uppercase tracking-[0.25em] border-2 border-prism-fg px-3 py-2 hover:bg-prism-fg hover:text-prism-bg transition-colors justify-self-end"
        >
          Bag
        </button>
      )}
    </motion.div>
  );
}

export default function PrismHomePage() {
  const [scanActive, setScanActive] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setScanActive(false), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* HERO — brutalist split: type block | full bleed image */}
      <section className="relative pt-16 lg:grid lg:grid-cols-2 lg:min-h-[calc(100vh-0px)] border-b-4 border-prism-fg">
        <AnimatePresence>
          {scanActive && (
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-prism-accent z-30 pointer-events-none lg:w-1/2"
              initial={{ top: 64, opacity: 0.8 }}
              animate={{ top: "100vh" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "linear" }}
            />
          )}
        </AnimatePresence>

        <div className="flex flex-col justify-between gap-12 p-6 sm:p-10 lg:p-14 border-b-4 lg:border-b-0 lg:border-r-4 border-prism-fg bg-prism-bg relative overflow-hidden">
          <div className="prism-hero-mesh absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-3 w-3 bg-prism-accent border-2 border-prism-fg shrink-0" />
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-prism-fg">Build 04 · QC log</span>
            </div>
            <h1 className="font-space font-black uppercase text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.92] tracking-tight">
              Loud
              <br />
              <span className="text-prism-accent">grid</span>
            </h1>
            <p className="font-mono text-[11px] text-prism-fg/55 max-w-sm mt-8 leading-relaxed border-l-4 border-prism-fg pl-4">
              No soft corners. Same stock as everywhere else — just sliced into a harder layout: proof over polish.
            </p>
            <div className="flex flex-wrap gap-3 mt-10">
              <Link
                href="/prism/products"
                className="inline-flex items-center gap-2 bg-prism-fg text-prism-bg font-mono text-[10px] uppercase tracking-[0.35em] px-6 py-3.5 border-2 border-prism-fg hover:bg-prism-accent hover:text-prism-fg transition-colors"
              >
                Catalog <ArrowRight size={14} />
              </Link>
              <Link
                href="/prism/about"
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] px-6 py-3.5 border-2 border-prism-fg text-prism-fg hover:bg-prism-surface"
              >
                Readme
              </Link>
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-3 gap-0 border-2 border-prism-fg divide-x-2 divide-prism-fg">
            {[
              ["16+", "SKUs"],
              ["100%", "Auth check"],
              ["SA", "Dispatch"],
            ].map(([a, b]) => (
              <div key={b} className="py-4 text-center bg-prism-bg">
                <p className="font-space font-black text-lg text-prism-hot">{a}</p>
                <p className="font-mono text-[7px] uppercase tracking-[0.25em] text-prism-fg/45 mt-1">{b}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[48vh] lg:min-h-full border-prism-fg bg-prism-fg">
          <Image
            src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1600&q=80"
            alt=""
            fill
            className="object-cover opacity-90 contrast-125"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-prism-accent/10 mix-blend-multiply pointer-events-none" aria-hidden />
          <div className="absolute bottom-0 left-0 right-0 border-t-4 border-prism-fg bg-prism-bg p-4 flex justify-between items-end gap-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-prism-fg max-w-[200px]">
              Figure 01 — reference still. Not a moodboard.
            </p>
            <span className="font-space font-black text-4xl text-prism-accent leading-none">01</span>
          </div>
        </div>
      </section>

      {/* Brand index — cells, not marquee */}
      <section className="border-b-4 border-prism-fg bg-prism-bg">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((b) => (
            <div key={b.name} className="font-mono text-[9px] uppercase tracking-[0.35em] py-4 px-3 text-center border-r-2 border-b-2 border-prism-fg last:border-r-0 lg:last:border-r-2 text-prism-fg/55 hover:text-prism-fg hover:bg-prism-surface transition-colors">
              {b.name}
            </div>
          ))}
        </div>
      </section>

      {/* Alternating runway rows */}
      <section className="bg-prism-bg">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-10 border-b-4 border-prism-fg pb-4">
            <h2 className="font-space font-black text-3xl sm:text-4xl uppercase tracking-tight">Runway</h2>
            <Link href="/prism/products" className="font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-1 text-prism-fg/50 hover:text-prism-fg">
              Index <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="flex flex-col gap-0 border-2 border-prism-fg">
            {featuredProducts.slice(0, 4).map((product, i) => (
              <Link
                key={product.id}
                href={`/prism/products/${product.slug}`}
                className={`grid md:grid-cols-2 gap-0 border-b-2 border-prism-fg last:border-b-0 group ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
              >
                <div className={`relative min-h-[280px] md:min-h-[340px] border-prism-fg ${i % 2 === 0 ? "md:border-r-2" : "md:border-l-2"}`}>
                  <Image src={product.image} alt={product.name} fill className="object-cover md:[direction:ltr] grayscale group-hover:grayscale-0 transition-all duration-700" sizes="50vw" />
                  {product.badge && (
                    <div className={`absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.25em] px-2 py-1 border-2 border-prism-fg ${badgeColors[product.badge] ?? ""}`}>
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12 bg-prism-bg md:[direction:ltr] border-prism-fg">
                  <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-prism-fg/45">0{i + 1}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-prism-hot mt-4">{product.brand}</p>
                  <h3 className="font-space font-black text-2xl sm:text-3xl uppercase mt-2 leading-tight">{product.name}</h3>
                  <p className="font-space font-black text-xl mt-6">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mosaic grid */}
      <section className="py-16 px-4 sm:px-6 bg-prism-surface border-t-4 border-prism-fg">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="font-space font-black text-3xl uppercase mb-2">Mosaic</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-prism-fg/45 mb-8">Square tiles · 1:1 crops</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-prism-fg p-0.5">
            {products.slice(0, 8).map((product, i) => (
              <MosaicCell key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Ledger */}
      <section className="py-16 px-4 sm:px-6 bg-prism-bg border-t-4 border-prism-fg">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-space font-black text-3xl uppercase">Ledger</h2>
            <Link href="/prism/products" className="font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-1">
              Full file <ArrowRight size={12} />
            </Link>
          </div>
          <div className="border-2 border-prism-fg bg-prism-bg">
            <div className="hidden md:grid grid-cols-[88px_1fr_auto_auto] gap-6 px-3 py-2 border-b-2 border-prism-fg font-mono text-[9px] uppercase tracking-[0.3em] text-prism-fg/50">
              <span>Thumb</span>
              <span>Line item</span>
              <span>Flag</span>
              <span className="text-right pr-3">Action</span>
            </div>
            {products.slice(0, 8).map((product, i) => (
              <LedgerRow key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA slab */}
      <section className="mx-4 sm:mx-6 mb-16 border-4 border-prism-fg bg-prism-fg text-prism-bg">
        <div className="px-8 py-14 sm:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-prism-accent mb-2">Signal</p>
            <h2 className="font-space font-black text-2xl sm:text-4xl uppercase leading-none max-w-lg">
              Fresh units.
              <br />
              <span className="text-prism-accent">Same grid.</span>
            </h2>
          </div>
          <Link
            href="/prism/products"
            className="inline-flex items-center justify-center gap-2 bg-prism-accent text-prism-fg font-mono text-[11px] uppercase tracking-[0.3em] px-8 py-4 border-2 border-prism-bg hover:bg-prism-bg hover:text-prism-accent transition-colors self-start"
          >
            Open stock <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="bg-prism-fg text-prism-bg py-10 px-8 border-t-4 border-prism-accent">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-space font-black text-2xl uppercase tracking-tight">
              PRISM<span className="bg-prism-accent text-prism-fg px-1.5 py-0.5 ml-1 text-lg">÷</span>
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-prism-bg/40 mt-1">FlexHaus line · South Africa</p>
          </div>
          <div className="flex gap-2">
            {["TikTok", "Instagram", "WhatsApp"].map((s) => (
              <a key={s} href="#" className="font-mono text-[9px] uppercase tracking-[0.3em] border-2 border-prism-bg/30 px-3 py-2 hover:border-prism-accent hover:text-prism-accent transition-colors">
                {s}
              </a>
            ))}
          </div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-prism-bg/25">© 2026</p>
        </div>
      </footer>
    </>
  );
}
