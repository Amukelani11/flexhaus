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

function TapeStrip({ product, flip }: { product: (typeof products)[0]; flip: boolean }) {
  const { dispatch } = useCart();
  return (
    <div className={`grid md:grid-cols-2 gap-0 border-y border-flex-black/10 bg-flex-white ${flip ? "md:[direction:rtl]" : ""}`}>
      <Link href={`/flex/products/${product.slug}`} className="relative min-h-[280px] md:min-h-[360px] block md:[direction:ltr] group overflow-hidden bg-flex-gray">
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="50vw" />
        <div className="absolute top-5 left-5 flex gap-2 md:[direction:ltr]">
          {product.badge && (
            <span className={`font-mono font-bold text-[9px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-sm ${badgeColors[product.badge] ?? ""}`}>{product.badge}</span>
          )}
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] bg-flex-black/75 text-flex-yellow px-3 py-1.5 rounded-sm">Flex tape</span>
        </div>
      </Link>
      <div className={`flex flex-col justify-center p-10 md:p-14 md:[direction:ltr] border-t md:border-t-0 md:border-l border-flex-black/10`}>
        <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-flex-yellow">{product.brand}</p>
        <h3 className="font-display font-black text-3xl md:text-4xl uppercase mt-4 leading-none">{product.name}</h3>
        <p className="font-mono text-sm text-flex-black/55 mt-6 max-w-sm leading-relaxed">{product.description.slice(0, 120)}…</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <span className="font-display font-black text-2xl text-flex-black">{formatPrice(product.price)}</span>
          {product.inStock && (
            <button
              type="button"
              onClick={() => dispatch({ type: "ADD", product })}
              className="bg-flex-yellow-bright text-[#0a0a0a] font-mono font-bold text-[10px] uppercase tracking-[0.3em] px-6 py-3 rounded-sm hover:bg-flex-black hover:text-flex-yellow transition-colors"
            >
              Add — quick
            </button>
          )}
          <Link href={`/flex/products/${product.slug}`} className="font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/45 hover:text-flex-black flex items-center gap-1">
            Open <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </div>
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
      {/* HERO — light surface; headline uses fade-up (no overflow-hidden = no clipped glyphs) */}
      <section className="relative min-h-screen pt-16 bg-flex-white text-flex-black flex items-center">
        <AnimatePresence>
          {scanActive && (
            <motion.div
              className="absolute left-0 right-0 h-px bg-flex-yellow-bright z-20 pointer-events-none"
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
          <div className="flex-hero-mesh" />
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
              background: "radial-gradient(ellipse 55% 42% at 72% 18%, rgba(229, 184, 15, 0.14), transparent 62%)",
              transformOrigin: "70% 20%",
            }}
          />
          <div className="absolute inset-0 z-[2] bg-gradient-to-b from-flex-white/65 via-flex-white/25 to-flex-white/90" />
          <div className="absolute inset-0 z-[3] bg-gradient-to-r from-flex-white/80 via-transparent to-flex-yellow-bright/[0.06]" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 py-20 sm:py-24 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="w-full min-w-0">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="flex items-center gap-3 mb-6 sm:mb-8"
            >
              <div className="w-6 h-px shrink-0 bg-flex-yellow-bright" />
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-flex-yellow">
                South Africa · QC before dispatch
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black uppercase text-flex-black text-[clamp(2rem,5.2vw+0.2rem,4.25rem)] leading-[1.05] max-w-full [text-wrap:balance]"
            >
              Luxury · street
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black uppercase text-flex-yellow text-[clamp(2rem,5.2vw+0.2rem,4.25rem)] leading-[1.05] mt-1 mb-8 sm:mb-10 max-w-full [text-wrap:balance]"
            >
              In rotation.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="font-mono text-[11px] text-flex-black/55 tracking-wide mb-8 max-w-md leading-relaxed"
            >
              Louis Vuitton, Prada, Goyard, Nike — inspected arrivals, straight answers on pricing, courier nationwide.
            </motion.p>

            <div className="flex flex-wrap gap-3">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}>
                <Link
                  href="/flex/products"
                  className="inline-flex items-center gap-2.5 bg-flex-yellow-bright text-[#0a0a0a] font-mono font-bold text-[11px] uppercase tracking-[0.3em] px-7 py-3.5 hover:bg-flex-black hover:text-flex-white transition-colors duration-200"
                >
                  Browse pieces <ArrowRight size={13} />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}>
                <Link
                  href="/flex/about"
                  className="inline-flex items-center gap-2.5 border border-flex-black/20 text-flex-black font-mono font-bold text-[11px] uppercase tracking-[0.3em] px-7 py-3.5 hover:border-flex-black hover:bg-flex-gray/80 transition-all duration-200"
                >
                  About
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              className="mt-14 flex flex-wrap gap-8 sm:gap-10"
            >
              {[{ num: "16+", label: "SKUs" }, { num: "QC", label: "Every order" }, { num: "SA", label: "Shipping" }].map((s) => (
                <div key={s.label}>
                  <p className="font-display font-black text-xl text-flex-yellow">{s.num}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-flex-black/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Heat stack — layout unique to Flex */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block h-[min(520px,70vh)]"
          >
            {featuredProducts.slice(0, 3).map((product, i) => (
              <Link
                key={product.id}
                href={`/flex/products/${product.slug}`}
                className="absolute w-[55%] aspect-[3/4] overflow-hidden rounded-sm border-4 border-flex-black shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:z-20 hover:scale-[1.02]"
                style={{
                  left: `${8 + i * 18}%`,
                  top: `${i * 12}%`,
                  zIndex: i + 1,
                  transform: `rotate(${-6 + i * 5}deg)`,
                }}
              >
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40vw" />
                {product.badge && (
                  <div className={`absolute top-3 left-3 font-mono font-bold text-[8px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm ${badgeColors[product.badge] ?? ""}`}>
                    {product.badge}
                  </div>
                )}
              </Link>
            ))}
            <p className="absolute bottom-0 right-0 font-mono text-[9px] uppercase tracking-[0.35em] text-flex-black/35 max-w-[140px] text-right leading-relaxed">
              Stack view — three live heats. Tap any card.
            </p>
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

      {/* Full-bleed flex tapes — alternating rails */}
      <section className="bg-flex-white">
        <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-6 flex items-end justify-between">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display font-black text-[clamp(1.8rem,5vw,3.5rem)] uppercase leading-none">
              Rotation tapes
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/45 mt-2">
              Full-width drops · hype pacing
            </motion.p>
          </div>
          <Link href="/flex/products" className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/50 hover:text-flex-black transition-colors">
            Rack view <ArrowUpRight size={11} />
          </Link>
        </div>
        <div className="flex flex-col">
          {featuredProducts.slice(0, 4).map((product, i) => (
            <TapeStrip key={product.id} product={product} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* FULL DROP — poster grid (2-up) */}
      <section className="py-16 px-8 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-display font-black text-[clamp(1.8rem,5vw,3.5rem)] uppercase leading-none">
            The Full Drop
          </motion.h2>
          <Link href="/flex/products" className="font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/50 hover:text-flex-black flex items-center gap-1.5 transition-colors">
            View All <ArrowRight size={11} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {products.slice(0, 6).map((product, i) => (
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
              className="font-display font-black text-white uppercase leading-[1.05] mb-6 max-w-[95%] [text-wrap:balance] text-[clamp(1.65rem,4.5vw+0.2rem,3.25rem)]"
            >
              Fresh stock.
              <br />
              <span className="text-[#E5B80F]">Same standard.</span>
            </motion.h2>
            <Link href="/flex/products" className="inline-flex items-center gap-2.5 bg-[#E5B80F] text-[#0a0a0a] font-mono font-bold text-[11px] uppercase tracking-[0.3em] px-7 py-3.5 hover:bg-white transition-colors">
              View products <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="py-12 px-8 bg-flex-gray border-t border-flex-black/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-4">
          {[
            { icon: "📱", platform: "TikTok", desc: "Drops and close-ups" },
            { icon: "📸", platform: "Instagram", desc: "Editorial and stock" },
            { icon: "💬", platform: "WhatsApp", desc: "Orders and sizing" },
          ].map((s) => (
            <div
              key={s.platform}
              className="flex flex-col items-center py-8 px-4 text-center hover:bg-flex-yellow-bright group rounded-sm transition-colors duration-200 cursor-pointer"
            >
              <span className="text-2xl mb-3">{s.icon}</span>
              <p className="font-display font-black uppercase text-base tracking-tight text-flex-black group-hover:text-[#0a0a0a] transition-colors">{s.platform}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-flex-black/45 group-hover:text-[#0a0a0a]/70 mt-1 transition-colors">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-flex-black text-flex-white py-10 px-8 border-t border-flex-yellow-bright/25">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display font-black text-2xl uppercase tracking-tight">
              FLEX<span className="bg-flex-yellow-bright text-[#0a0a0a] px-1.5 py-0.5 ml-0.5">HAUS</span>
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-flex-white/40 mt-1">Designer resale · South Africa</p>
          </div>
          <div className="flex gap-3">
            {["TikTok", "Instagram", "WhatsApp"].map((s) => (
              <a
                key={s}
                href="#"
                className="font-mono text-[9px] uppercase tracking-[0.3em] text-flex-white/45 hover:text-flex-yellow-bright transition-colors border border-flex-white/15 hover:border-flex-yellow-bright px-3 py-2"
              >
                {s}
              </a>
            ))}
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-flex-white/25">© 2026 FlexHaus SA</p>
        </div>
      </footer>
    </>
  );
}
