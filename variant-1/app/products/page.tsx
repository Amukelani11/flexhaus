"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products, categories, brands, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const { dispatch } = useCart();

  const filtered = products.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const brandMatch = activeBrand === "All" || p.brand === activeBrand;
    return catMatch && brandMatch;
  });

  return (
    <div className="pt-24 min-h-screen">
      {/* Page header */}
      <div className="px-8 py-16 max-w-[1600px] mx-auto">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif text-[clamp(3rem,10vw,9rem)] leading-none text-noir-ivory"
          >
            The Collection
          </motion.h1>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ originX: 0 }}
          className="mt-3 h-px bg-noir-gold w-32"
        />
      </div>

      {/* Filters */}
      <div className="sticky top-[72px] z-30 bg-noir-black/95 backdrop-blur-sm border-y border-noir-gold/10 px-8 py-4">
        <div className="max-w-[1600px] mx-auto flex flex-wrap gap-6 items-center">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] tracking-[0.35em] uppercase font-sans px-4 py-2 transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-noir-gold text-noir-black"
                    : "text-noir-ivory/40 hover:text-noir-ivory border border-transparent hover:border-noir-gold/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-noir-gold/20 hidden md:block" />
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveBrand("All")}
              className={`text-[10px] tracking-[0.35em] uppercase font-sans px-4 py-2 transition-all duration-300 ${
                activeBrand === "All"
                  ? "text-noir-gold"
                  : "text-noir-ivory/30 hover:text-noir-ivory/60"
              }`}
            >
              All Brands
            </button>
            {brands.map((b) => (
              <button
                key={b.slug}
                onClick={() => setActiveBrand(b.name)}
                className={`text-[10px] tracking-[0.35em] uppercase font-sans px-4 py-2 transition-all duration-300 ${
                  activeBrand === b.name
                    ? "text-noir-gold"
                    : "text-noir-ivory/30 hover:text-noir-ivory/60"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
          <span className="ml-auto text-[10px] tracking-[0.3em] uppercase text-noir-ivory/30 font-sans hidden md:block">
            {filtered.length} items
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="px-8 py-12 max-w-[1600px] mx-auto">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <Link href={`/products/${product.slug}`} className="group block" data-cursor-label="View">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {product.badge && (
                      <div className={`absolute top-3 left-3 text-[9px] tracking-[0.3em] uppercase font-sans px-2 py-1 ${
                        product.badge === "SOLD OUT" ? "bg-noir-ivory/20 text-noir-ivory backdrop-blur-sm" :
                        product.badge === "LAST 1" ? "bg-red-900/80 text-white backdrop-blur-sm" :
                        "bg-noir-gold text-noir-black"
                      }`}>
                        {product.badge}
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-noir-black/50 flex items-center justify-center">
                        <span className="text-[10px] tracking-[0.4em] uppercase text-noir-ivory/60 font-sans">Sold Out</span>
                      </div>
                    )}
                    {product.inStock && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch({ type: "ADD", product });
                          }}
                          className="w-full bg-noir-gold text-noir-black text-[10px] tracking-[0.3em] uppercase font-sans py-3"
                        >
                          Add to Bag
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.4em] uppercase text-noir-gold/70 font-sans mb-1">{product.brand}</p>
                    <p className="font-serif text-base text-noir-ivory group-hover:text-noir-gold transition-colors duration-300">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="font-serif text-sm text-noir-ivory/60">{formatPrice(product.price)}</p>
                      {product.originalPrice && (
                        <p className="font-serif text-xs text-noir-ivory/30 line-through">{formatPrice(product.originalPrice)}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
