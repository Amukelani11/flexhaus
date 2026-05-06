"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, formatPrice, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ShoppingBag, ChevronRight } from "lucide-react";

export default function FlexProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const { dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const related = products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    dispatch({ type: "ADD", product, size: selectedSize, color: selectedColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-flex-black/10 px-8 py-3 bg-gray-50">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em]">
          <Link href="/flex" className="hover:underline">Home</Link>
          <ChevronRight size={10} />
          <Link href="/flex/products" className="hover:underline">Drop</Link>
          <ChevronRight size={10} />
          <span className="text-flex-black/60">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square overflow-hidden rounded-sm bg-gray-100"
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-flex-yellow text-flex-black font-mono font-bold text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 rounded-sm">
                  {product.badge}
                </div>
              )}
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 aspect-square overflow-hidden rounded-sm bg-gray-100 transition-all ${activeImage === i ? "opacity-100 ring-2 ring-flex-yellow" : "opacity-50 hover:opacity-75"}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-flex-black/50 mb-2">{product.brand} — {product.category}</p>
              <h1 className="font-display font-black uppercase leading-none mb-6" style={{ fontSize: "clamp(1.8rem,4vw,3.5rem)" }}>
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-flex-black/10">
                <span className="font-display font-black text-4xl">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="font-display font-bold text-xl text-flex-black/30 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <p className="font-mono text-[12px] leading-relaxed text-flex-black/60 mb-8">{product.description}</p>

              {/* Sizes */}
              {product.sizes && (
                <div className="mb-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-flex-black/50 mb-3">
                    Size: <span className="text-flex-black font-bold">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 font-mono font-bold text-[10px] uppercase tracking-widest rounded-sm transition-colors ${
                          selectedSize === size ? "bg-flex-yellow text-flex-black" : "bg-gray-100 hover:bg-flex-yellow/60"
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
                  <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-flex-black/50 mb-3">
                    Color: <span className="text-flex-black font-bold">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest rounded-sm transition-colors ${
                          selectedColor === color ? "bg-flex-black text-flex-yellow" : "bg-gray-100 hover:bg-flex-yellow"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to bag */}
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`w-full flex items-center justify-center gap-3 py-4 font-display font-black text-[12px] uppercase tracking-[0.3em] rounded-sm transition-all duration-300 mb-4 ${
                  !product.inStock
                    ? "bg-gray-100 text-flex-black/30 cursor-not-allowed"
                    : added
                    ? "bg-flex-black text-flex-yellow"
                    : "bg-flex-yellow text-flex-black hover:bg-flex-black hover:text-flex-yellow"
                }`}
              >
                <ShoppingBag size={18} />
                {!product.inStock ? "Sold Out" : added ? "✓ Added to Bag" : "Add to Bag"}
              </button>

              <Link href="/flex/products" className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-flex-black/40 hover:text-flex-black transition-colors">
                <ArrowLeft size={12} /> Back to Drop
              </Link>

              {/* Details */}
              <div className="mt-8 pt-8 border-t border-flex-black/10">
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-flex-black/50 mb-4">Product Details</p>
                <ul className="space-y-2">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 font-mono text-[11px] text-flex-black/60">
                      <span className="text-flex-yellow mt-0.5 font-bold">→</span>
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
          <div className="mt-12">
            <h2 className="font-display font-black text-3xl uppercase mb-6">More from {product.brand}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p) => (
                <div key={p.id}>
                  <Link href={`/flex/products/${p.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-sm bg-gray-100">
                      <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="25vw" />
                    </div>
                    <div className="pt-3">
                      <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-flex-black/50">{p.brand}</p>
                      <div className="flex justify-between mt-0.5">
                        <p className="font-display font-bold text-sm uppercase">{p.name}</p>
                        <p className="font-display font-black text-sm">{formatPrice(p.price)}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
