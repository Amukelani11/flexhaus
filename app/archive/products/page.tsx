"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products, categories, brands, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { SlidersHorizontal } from "lucide-react";
import TiltCard from "@/components/archive/TiltCard";
import WordReveal from "@/components/archive/WordReveal";

const masonryHeights = ["aspect-[3/4]", "aspect-[3/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[3/5]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/5]", "aspect-[3/4]", "aspect-square", "aspect-[3/5]", "aspect-[3/4]", "aspect-[4/5]"];

export default function ArchiveProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const { dispatch } = useCart();

  const filtered = products.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const brandMatch = activeBrand === "All" || p.brand === activeBrand;
    return catMatch && brandMatch;
  });

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="px-10 lg:px-16 py-16 border-b border-archive-line">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-archive-terracotta mb-4">The Archive</p>
          <WordReveal
            text="Full Collection"
            className="font-serif font-bold text-archive-charcoal"
            style={{ fontSize: "clamp(3rem,9vw,8rem)", lineHeight: 1.0 } as React.CSSProperties}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ originX: 0 }}
            className="mt-4 h-px bg-archive-terracotta w-20"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-archive-cream/95 backdrop-blur-sm border-b border-archive-line">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-16 py-4 flex flex-wrap gap-4 items-center">
          <SlidersHorizontal size={13} className="text-archive-charcoal/30" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[9px] uppercase tracking-[0.3em] px-4 py-2 transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-archive-charcoal text-archive-cream"
                  : "text-archive-charcoal/40 hover:text-archive-charcoal border border-transparent hover:border-archive-line"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="h-4 w-px bg-archive-line hidden md:block" />
          {brands.map((b) => (
            <button
              key={b.slug}
              onClick={() => setActiveBrand(activeBrand === b.name ? "All" : b.name)}
              className={`font-mono text-[9px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                activeBrand === b.name ? "text-archive-terracotta" : "text-archive-charcoal/30 hover:text-archive-charcoal/60"
              }`}
            >
              {b.name}
            </button>
          ))}
          <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.3em] text-archive-charcoal/30 hidden md:block">
            {filtered.length} items
          </span>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1400px] mx-auto px-10 lg:px-16 py-12">
        <AnimatePresence>
          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-5">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="break-inside-avoid mb-5"
              >
                <TiltCard>
                  <Link href={`/archive/products/${product.slug}`} className="group block">
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
                          product.badge === "SOLD OUT" ? "bg-archive-cream/80 text-archive-charcoal/50 backdrop-blur-sm" :
                          "bg-archive-charcoal text-archive-cream"
                        }`}>
                          {product.badge}
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-archive-cream/40 backdrop-blur-[2px] flex items-center justify-center">
                          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-archive-charcoal/50">Sold Out</span>
                        </div>
                      )}
                      {product.inStock && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch({ type: "ADD", product });
                            }}
                            className="w-full bg-archive-cream text-archive-charcoal text-[9px] uppercase tracking-[0.3em] font-sans py-2.5 hover:bg-archive-terracotta hover:text-archive-cream transition-colors"
                          >
                            Add to Bag
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="mt-2.5">
                      <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-archive-terracotta">{product.brand}</p>
                      <p className="font-serif text-sm text-archive-charcoal group-hover:text-archive-terracotta transition-colors mt-0.5">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="font-mono text-xs text-archive-charcoal/50">{formatPrice(product.price)}</p>
                        {product.originalPrice && <p className="font-mono text-xs text-archive-charcoal/25 line-through">{formatPrice(product.originalPrice)}</p>}
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif text-3xl text-archive-charcoal/30">No items found</p>
            <button
              onClick={() => { setActiveCategory("All"); setActiveBrand("All"); }}
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-archive-terracotta hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
