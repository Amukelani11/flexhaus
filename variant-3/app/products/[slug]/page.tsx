"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, formatPrice, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ShoppingBag, ChevronRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import WordReveal from "@/components/WordReveal";

export default function ArchiveProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const { dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const related = products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-16 min-h-screen">
      {/* Breadcrumb */}
      <div className="px-10 lg:px-16 py-4 border-b border-archive-line">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-archive-charcoal/40">
          <Link href="/" className="hover:text-archive-terracotta transition-colors">Home</Link>
          <ChevronRight size={9} />
          <Link href="/products" className="hover:text-archive-terracotta transition-colors">Archive</Link>
          <ChevronRight size={9} />
          <span className="text-archive-charcoal/60">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Images */}
          <div>
            <TiltCard>
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[4/5] overflow-hidden bg-archive-line/20"
              >
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.badge && (
                  <div className={`absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] px-2 py-1 ${
                    product.badge === "NEW DROP" ? "bg-archive-terracotta text-archive-cream" : "bg-archive-charcoal text-archive-cream"
                  }`}>
                    {product.badge}
                  </div>
                )}
              </motion.div>
            </TiltCard>

            {product.images.length > 1 && (
              <div className="flex gap-3 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 aspect-square overflow-hidden transition-all duration-300 ${
                      activeImage === i ? "opacity-100 ring-1 ring-archive-terracotta" : "opacity-40 hover:opacity-60"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:pt-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-archive-terracotta mb-4">{product.brand} — {product.category}</p>

              <WordReveal
                text={product.name}
                className="font-serif font-bold text-archive-charcoal"
                style={{ fontSize: "clamp(2rem,4.5vw,4rem)", lineHeight: 1.1 } as React.CSSProperties}
              />

              <div className="flex items-baseline gap-4 mt-6 mb-8 pb-8 border-b border-archive-line">
                <span className="font-serif text-3xl text-archive-terracotta">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="font-serif text-xl text-archive-charcoal/30 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <p className="font-sans text-sm leading-relaxed text-archive-charcoal/60 tracking-wide mb-8">
                {product.description}
              </p>

              {/* Sizes */}
              {product.sizes && (
                <div className="mb-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-archive-charcoal/40 mb-3">
                    Size — <span className="text-archive-charcoal">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-archive-charcoal text-archive-cream border-archive-charcoal"
                            : "border-archive-line text-archive-charcoal/50 hover:border-archive-charcoal/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors && (
                <div className="mb-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-archive-charcoal/40 mb-3">
                    Color — <span className="text-archive-charcoal">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                          selectedColor === color
                            ? "bg-archive-terracotta text-archive-cream border-archive-terracotta"
                            : "border-archive-line text-archive-charcoal/50 hover:border-archive-charcoal/50"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  dispatch({ type: "ADD", product, size: selectedSize, color: selectedColor });
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                disabled={!product.inStock}
                className={`w-full flex items-center justify-center gap-3 py-5 text-[11px] tracking-[0.4em] uppercase font-sans transition-all duration-500 mb-4 ${
                  !product.inStock
                    ? "bg-archive-line text-archive-charcoal/30 cursor-not-allowed"
                    : added
                    ? "bg-archive-terracotta text-archive-cream"
                    : "bg-archive-charcoal text-archive-cream hover:bg-archive-terracotta"
                }`}
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                {!product.inStock ? "Sold Out" : added ? "Added to Bag ✓" : "Add to Bag"}
              </button>

              <Link href="/products" className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-archive-charcoal/30 hover:text-archive-terracotta transition-colors">
                <ArrowLeft size={11} /> Back to Archive
              </Link>

              <div className="mt-10 pt-8 border-t border-archive-line">
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-archive-terracotta mb-4">Product Details</p>
                <ul className="space-y-2.5">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 font-sans text-sm text-archive-charcoal/50">
                      <span className="text-archive-terracotta mt-0.5">—</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-archive-line">
            <h2 className="font-serif text-3xl font-bold text-archive-charcoal mb-12">More from {product.brand}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <TiltCard>
                    <Link href={`/products/${p.slug}`} className="group block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-archive-line/20 mb-3">
                        <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
                      </div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-archive-terracotta">{p.brand}</p>
                      <p className="font-serif text-sm text-archive-charcoal group-hover:text-archive-terracotta transition-colors">{p.name}</p>
                      <p className="font-mono text-xs text-archive-charcoal/40 mt-0.5">{formatPrice(p.price)}</p>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
