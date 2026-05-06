"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { featuredProducts, brands, products, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ArrowRight, ArrowUpRight, Activity, Cpu, Radio } from "lucide-react";

const badgeColors: Record<string, string> = {
  "NEW DROP": "bg-steel-accent/20 text-steel-accent border-steel-accent/40",
  "HOT": "bg-red-500/15 text-red-400 border-red-400/40",
  "LAST 1": "bg-steel-cool/15 text-steel-cool border-steel-cool/40",
  "SOLD OUT": "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-steel-line bg-steel-surface px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.15em] text-steel-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      {children}
    </span>
  );
}

function InventoryRow({ product, index }: { product: (typeof products)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const { dispatch } = useCart();
  const sku = product.id.toUpperCase().replace(/-/g, "·");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group border-b border-steel-line hover:bg-steel-surface/80 transition-colors"
    >
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_180px_120px_100px] gap-4 lg:gap-8 items-center">
        <div className="flex gap-4 min-w-0">
          <Link href={`/steel/products/${product.slug}`} className="relative h-20 w-20 shrink-0 rounded-md overflow-hidden bg-steel-surface border border-steel-line">
            <Image src={product.image} alt="" fill className="object-cover" sizes="80px" />
          </Link>
          <div className="min-w-0 py-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9px] text-steel-muted uppercase tracking-[0.2em]">{sku}</span>
              {product.badge && (
                <span className={`rounded border px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.15em] ${badgeColors[product.badge] ?? ""}`}>
                  {product.badge}
                </span>
              )}
            </div>
            <Link href={`/steel/products/${product.slug}`} className="mt-1 block font-sans font-semibold text-sm text-steel-fg hover:text-steel-accent transition-colors truncate">
              {product.name}
            </Link>
            <p className="font-mono text-[10px] text-steel-muted mt-1">
              {product.brand} · {product.category}
            </p>
          </div>
        </div>
        <div className="hidden lg:flex font-mono text-[10px] text-steel-muted uppercase tracking-[0.15em]">{product.inStock ? "In circuit" : "Offline"}</div>
        <div className="font-mono text-sm text-steel-fg tabular-nums">{formatPrice(product.price)}</div>
        <div className="flex lg:justify-end gap-2">
          <Link
            href={`/steel/products/${product.slug}`}
            className="rounded-md border border-steel-line px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-steel-muted hover:border-steel-accent hover:text-steel-accent transition-colors"
          >
            Spec
          </Link>
          {product.inStock && (
            <button
              type="button"
              onClick={() => dispatch({ type: "ADD", product })}
              className="rounded-md bg-steel-accent px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white hover:opacity-90 transition-opacity"
            >
              Pull
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SteelHomePage() {
  const gateRef = useRef(null);
  const heroIn = useInView(gateRef, { once: true });

  return (
    <>
      <div className="min-h-screen bg-steel-bg text-steel-fg pt-16 lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Sticky side rail */}
        <aside className="hidden lg:flex flex-col border-r border-steel-line bg-steel-surface/50 backdrop-blur-sm sticky top-16 h-[calc(100vh-4rem)] p-6 relative overflow-hidden">
          <div className="steel-hero-mesh absolute inset-0 opacity-30 pointer-events-none" aria-hidden />
          <div className="relative z-10 flex flex-col h-full">
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-steel-muted">Steel console</p>
            <nav className="mt-10 space-y-1 flex-1">
              {[
                ["Live board", "/steel/products"],
                ["Signal sheet", "/steel/about"],
                ["Cart relay", "/steel/cart"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block rounded-md px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-steel-fg/70 hover:bg-steel-bg hover:text-steel-accent border border-transparent hover:border-steel-line transition-all"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="pt-6 border-t border-steel-line space-y-3">
              <StatusPill>Feeds stable</StatusPill>
              <p className="font-mono text-[9px] text-steel-muted leading-relaxed">Dispatch queue: SA national · QC on every pull.</p>
            </div>
          </div>
        </aside>

        <div className="relative min-w-0">
          <div className="border-b border-steel-line bg-steel-surface/40">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-steel-muted">
                <Radio className="w-3.5 h-3.5 text-steel-accent" strokeWidth={1.5} />
                <span className="font-mono text-[9px] uppercase tracking-[0.35em]">Channel / resale</span>
              </div>
              <div className="flex gap-6">
                {[
                  ["SKUs", "16+"],
                  ["Latency", "QC"],
                  ["Region", "ZA"],
                ].map(([k, v]) => (
                  <div key={k} className="text-right">
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-steel-muted">{k}</p>
                    <p className="font-sans text-sm font-semibold text-steel-fg tabular-nums">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section ref={gateRef} className="relative px-4 sm:px-8 py-14 lg:py-16 border-b border-steel-line overflow-hidden">
            <div className="absolute inset-0 steel-hero-mesh opacity-20 pointer-events-none" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-br from-steel-accent/5 via-transparent to-transparent pointer-events-none" />
            <div className="max-w-[900px] relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Cpu className="w-5 h-5 text-steel-accent" strokeWidth={1.25} />
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-steel-muted">Build 06 · inventory UI</span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={heroIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="font-sans font-bold text-[clamp(2rem,5vw,3.75rem)] leading-[1.08] tracking-tight"
              >
                Measured
                <span className="text-steel-cool"> inventory.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={heroIn ? { opacity: 1 } : {}}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mt-8 max-w-lg font-mono text-xs text-steel-muted leading-relaxed"
              >
                Line-item clarity on Louis Vuitton, Prada, Goyard, Nike — no editorial fog, just signal: condition, price, and whether you can pull it today.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={heroIn ? { opacity: 1 } : {}} transition={{ delay: 0.25 }} className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/steel/products"
                  className="inline-flex items-center gap-2 rounded-md bg-steel-accent px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white hover:opacity-90 transition-opacity"
                >
                  Open board <ArrowRight size={14} />
                </Link>
                <Link
                  href="/steel/about"
                  className="inline-flex items-center gap-2 rounded-md border border-steel-line px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-steel-fg/80 hover:border-steel-accent hover:text-steel-accent transition-colors"
                >
                  Read protocol
                </Link>
              </motion.div>
            </div>
          </section>

          <section className="border-b border-steel-line bg-steel-surface/30 py-2 overflow-hidden">
            <div className="flex gap-16 whitespace-nowrap text-steel-muted/80" style={{ animation: "marquee 28s linear infinite", width: "max-content" }}>
              {[...brands, ...brands, ...brands].map((b, i) => (
                <span key={`${b.name}-${i}`} className="font-mono text-[10px] uppercase tracking-[0.3em]">
                  {b.name}
                  <span className="mx-4 text-steel-line">/</span>
                </span>
              ))}
            </div>
          </section>

          <section className="px-4 sm:px-8 py-14 border-b border-steel-line">
            <div className="max-w-[1100px] mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-steel-accent" strokeWidth={1.5} />
                  <h2 className="font-mono text-[10px] uppercase tracking-[0.35em] text-steel-muted">High signal</h2>
                </div>
                <Link href="/steel/products" className="font-mono text-[9px] uppercase tracking-[0.25em] text-steel-muted hover:text-steel-accent flex items-center gap-1">
                  Expand <ArrowUpRight size={11} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredProducts.slice(0, 4).map((product) => (
                  <Link
                    key={product.id}
                    href={`/steel/products/${product.slug}`}
                    className="group rounded-lg border border-steel-line bg-steel-surface/40 p-5 hover:border-steel-accent/50 transition-colors grid grid-cols-[120px_1fr] gap-5"
                  >
                    <div className="relative aspect-square rounded-md overflow-hidden bg-steel-bg border border-steel-line">
                      <Image src={product.image} alt="" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" sizes="120px" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-steel-muted uppercase tracking-[0.2em]">{product.brand}</p>
                      <h3 className="font-sans font-semibold text-steel-fg mt-2 leading-snug group-hover:text-steel-accent transition-colors">{product.name}</h3>
                      <dl className="mt-4 space-y-1 font-mono text-[9px] text-steel-muted">
                        <div className="flex justify-between gap-4 border-t border-steel-line/80 pt-2">
                          <dt>Price</dt>
                          <dd className="text-steel-fg tabular-nums">{formatPrice(product.price)}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt>Class</dt>
                          <dd className="text-steel-fg/90">{product.category}</dd>
                        </div>
                      </dl>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="py-6">
            <div className="max-w-[1200px] mx-auto px-4 lg:px-8 flex items-center justify-between py-4">
              <h2 className="font-sans text-lg font-semibold text-steel-fg">Live positions</h2>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-steel-muted">{products.length} rows</span>
            </div>
            <div className="border-y border-steel-line bg-steel-bg">
              <div className="hidden lg:block max-w-[1200px] mx-auto px-8 py-2 grid grid-cols-[minmax(0,1fr)_180px_120px_100px] gap-8 text-[9px] font-mono uppercase tracking-[0.2em] text-steel-muted border-b border-steel-line">
                <span>Asset</span>
                <span>State</span>
                <span>Quote</span>
                <span className="text-right">Action</span>
              </div>
              {products.slice(0, 10).map((product, i) => (
                <InventoryRow key={product.id} product={product} index={i} />
              ))}
            </div>
            <div className="text-center py-10">
              <Link
                href="/steel/products"
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-steel-muted hover:text-steel-accent border border-steel-line rounded-md px-6 py-3 hover:border-steel-accent transition-colors"
              >
                Load full matrix <ArrowRight size={13} />
              </Link>
            </div>
          </section>

          <div className="lg:hidden border-t border-steel-line p-4 bg-steel-surface/50 flex justify-center gap-2">
            <Link href="/steel/products" className="font-mono text-[9px] uppercase tracking-[0.2em] text-steel-accent px-3 py-2">
              Board
            </Link>
            <Link href="/steel/about" className="font-mono text-[9px] uppercase tracking-[0.2em] text-steel-muted px-3 py-2">
              About
            </Link>
            <Link href="/steel/cart" className="font-mono text-[9px] uppercase tracking-[0.2em] text-steel-muted px-3 py-2">
              Cart
            </Link>
          </div>

          <footer className="border-t border-steel-line py-10 px-8 bg-steel-surface/30">
            <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-steel-fg">
                  Steel<span className="text-steel-accent mx-1">/</span>FlexHaus
                </p>
                <p className="font-mono text-[9px] text-steel-muted mt-2">Designer resale · South Africa</p>
              </div>
              <p className="font-mono text-[9px] text-steel-muted/60">© 2026</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
