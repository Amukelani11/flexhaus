"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, formatPrice, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ShoppingBag, ChevronRight } from "lucide-react";

export default function ProductPage({ params }: { params: { slug: string } }) {
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
    <div className="pt-24 min-h-screen">
      {/* Breadcrumb */}
      <div className="px-8 py-4 max-w-[1600px] mx-auto flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-sans text-noir-ivory/30">
        <Link href="/noir" className="hover:text-noir-gold transition-colors">Home</Link>
        <ChevronRight size={10} />
        <Link href="/noir/products" className="hover:text-noir-gold transition-colors">Collection</Link>
        <ChevronRight size={10} />
        <span className="text-noir-ivory/60">{product.name}</span>
      </div>

      <div className="px-8 pb-24 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[4/5] overflow-hidden bg-[#111]"
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
                <div className="absolute top-4 left-4 bg-noir-gold text-noir-black text-[9px] tracking-[0.3em] uppercase font-sans px-2 py-1">
                  {product.badge}
                </div>
              )}
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 aspect-square overflow-hidden transition-opacity duration-300 ${
                      activeImage === i ? "opacity-100 ring-1 ring-noir-gold" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-[11px] tracking-[0.5em] uppercase text-noir-gold font-sans mb-4">
                {product.brand}
              </p>
              <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] leading-tight text-noir-ivory mb-6">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-serif text-3xl text-gradient-gold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="font-serif text-lg text-noir-ivory/30 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-noir-ivory/60 font-sans text-sm leading-relaxed tracking-wide mb-8">
                {product.description}
              </p>

              {/* Sizes */}
              {product.sizes && (
                <div className="mb-6">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-noir-ivory/50 font-sans mb-3">
                    Size: <span className="text-noir-ivory">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-[11px] tracking-widest uppercase font-sans border transition-all duration-300 ${
                          selectedSize === size
                            ? "border-noir-gold bg-noir-gold text-noir-black"
                            : "border-noir-gold/20 text-noir-ivory/60 hover:border-noir-gold/50"
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
                  <p className="text-[10px] tracking-[0.4em] uppercase text-noir-ivory/50 font-sans mb-3">
                    Color: <span className="text-noir-ivory">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-[11px] tracking-widest uppercase font-sans border transition-all duration-300 ${
                          selectedColor === color
                            ? "border-noir-gold bg-noir-gold text-noir-black"
                            : "border-noir-gold/20 text-noir-ivory/60 hover:border-noir-gold/50"
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
                className={`w-full flex items-center justify-center gap-3 py-5 text-[11px] tracking-[0.4em] uppercase font-sans transition-all duration-500 mb-4 ${
                  !product.inStock
                    ? "bg-noir-warm-gray text-noir-ivory/30 cursor-not-allowed"
                    : added
                    ? "bg-noir-ivory text-noir-black"
                    : "bg-noir-gold text-noir-black hover:bg-noir-gold-light"
                }`}
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                {!product.inStock ? "Sold Out" : added ? "Added to Bag ✓" : "Add to Bag"}
              </button>

              <Link
                href="/noir/products"
                className="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-noir-ivory/30 font-sans hover:text-noir-gold transition-colors duration-300"
              >
                <ArrowLeft size={12} /> Back to Collection
              </Link>

              {/* Details */}
              <div className="mt-12 pt-8 border-t border-noir-gold/10">
                <p className="text-[10px] tracking-[0.4em] uppercase text-noir-gold font-sans mb-4">Product Details</p>
                <ul className="space-y-2">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-sans text-noir-ivory/50">
                      <span className="text-noir-gold/40 mt-1">—</span>
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
          <div className="mt-24 pt-16 border-t border-noir-gold/10">
            <h2 className="font-serif text-3xl text-noir-ivory mb-12">More from {product.brand}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={`/noir/products/${p.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-3">
                      <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
                    </div>
                    <p className="text-[9px] tracking-[0.4em] uppercase text-noir-gold/70 font-sans mb-1">{p.brand}</p>
                    <p className="font-serif text-sm text-noir-ivory group-hover:text-noir-gold transition-colors">{p.name}</p>
                    <p className="font-serif text-xs text-noir-ivory/50 mt-1">{formatPrice(p.price)}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
