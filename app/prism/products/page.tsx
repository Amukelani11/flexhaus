"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products, categories, brands, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Filter, Grid, LayoutList } from "lucide-react";

const badgeColors: Record<string, string> = {
  "NEW DROP": "bg-prism-accent text-prism-fg",
  "HOT": "bg-red-500 text-white",
  "LAST 1": "bg-prism-fg text-prism-hot",
  "SOLD OUT": "bg-gray-200 text-gray-500",
};

export default function FlexProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const { dispatch } = useCart();

  const filtered = products.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const brandMatch = activeBrand === "All" || p.brand === activeBrand;
    return catMatch && brandMatch;
  });

  return (
    <div className="pt-16 min-h-screen">
      {/* Page header */}
      <div className="px-8 py-12 border-b border-prism-fg/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-space font-black uppercase leading-none"
              style={{ fontSize: "clamp(2.5rem,8vw,6rem)", lineHeight: 0.95 }}
            >
              The Drop
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-[10px] uppercase tracking-[0.4em] mt-3 text-prism-fg/40"
          >
            {products.length} Items — All Designer, All Heat
          </motion.p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 bg-prism-bg border-b border-prism-fg/10 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-8 py-3 flex flex-wrap gap-2 items-center">
          <Filter size={12} className="text-prism-fg/30 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[9px] uppercase tracking-[0.3em] px-3 py-2 rounded-sm transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-prism-fg text-prism-hot"
                  : "text-prism-fg/50 hover:text-prism-fg hover:bg-prism-accent/30"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="w-px h-4 bg-prism-fg/15 mx-1" />
          {brands.map((b) => (
            <button
              key={b.slug}
              onClick={() => setActiveBrand(activeBrand === b.name ? "All" : b.name)}
              className={`font-mono text-[9px] uppercase tracking-[0.25em] px-3 py-2 rounded-sm transition-colors duration-200 ${
                activeBrand === b.name
                  ? "bg-prism-accent text-prism-fg font-bold"
                  : "text-prism-fg/40 hover:text-prism-fg"
              }`}
            >
              {b.name}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <button onClick={() => setView("grid")} className={`p-2 rounded-sm transition-colors ${view === "grid" ? "bg-prism-fg text-prism-hot" : "text-prism-fg/40 hover:text-prism-fg"}`}>
              <Grid size={14} />
            </button>
            <button onClick={() => setView("list")} className={`p-2 rounded-sm transition-colors ${view === "list" ? "bg-prism-fg text-prism-hot" : "text-prism-fg/40 hover:text-prism-fg"}`}>
              <LayoutList size={14} />
            </button>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-prism-fg/30 flex items-center ml-2">
              {filtered.length} items
            </span>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-[1400px] mx-auto px-8 py-10">
        <motion.div
          layout
          className={view === "grid"
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            : "flex flex-col divide-y divide-prism-fg/10"
          }
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
              >
                {view === "grid" ? (
                  <Link href={`/prism/products/${product.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 mb-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {product.badge && (
                        <div className={`absolute top-3 left-3 font-mono font-bold text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-sm ${badgeColors[product.badge] ?? "bg-prism-accent text-prism-fg"}`}>
                          {product.badge}
                        </div>
                      )}
                      {product.inStock && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                          <button onClick={(e) => { e.preventDefault(); dispatch({ type: "ADD", product }); }} className="w-full bg-prism-fg text-prism-hot font-mono font-bold text-[9px] uppercase tracking-[0.3em] py-3 hover:bg-prism-accent hover:text-prism-fg transition-colors">
                            Add to Bag
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-prism-fg/40 mb-0.5">{product.brand}</p>
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-space font-bold text-[13px] uppercase leading-tight">{product.name}</p>
                        <p className="font-space font-black text-[13px] flex-shrink-0">{formatPrice(product.price)}</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link href={`/prism/products/${product.slug}`} className="group flex items-center gap-5 py-4 hover:bg-prism-accent/20 px-3 rounded-sm transition-colors duration-200">
                    <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100">
                      <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-prism-fg/40">{product.brand}</p>
                      <p className="font-space font-bold text-base uppercase">{product.name}</p>
                    </div>
                    {product.badge && (
                      <div className={`font-mono font-bold text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm ${badgeColors[product.badge] ?? "bg-prism-accent text-prism-fg"}`}>
                        {product.badge}
                      </div>
                    )}
                    <p className="font-space font-black text-lg">{formatPrice(product.price)}</p>
                  </Link>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-space font-black text-4xl uppercase">No items found</p>
            <button onClick={() => { setActiveCategory("All"); setActiveBrand("All"); }} className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] underline">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
