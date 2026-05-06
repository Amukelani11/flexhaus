"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { featuredProducts, brands, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ArrowRight } from "lucide-react";

function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay }}
        className={className}
      >
        {text}
      </motion.div>
    </div>
  );
}

function ClipRevealImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-full"
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const { dispatch } = useCart();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1558171813-3b17e9f8f9d5?w=1800&q=80"
            alt="FlexHaus Hero"
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-black/30 via-noir-black/20 to-noir-black" />
        </motion.div>

        <motion.div className="relative z-10 text-center px-8" style={{ opacity: heroOpacity }}>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="text-[10px] text-noir-gold uppercase font-sans mb-8 tracking-[0.5em]"
          >
            South Africa&apos;s Finest
          </motion.p>

          {/* Main title */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-[clamp(5rem,18vw,18rem)] leading-none tracking-[-0.02em] text-noir-ivory"
            >
              FLEX
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-[clamp(5rem,18vw,18rem)] leading-none tracking-[-0.02em] text-gradient-gold"
            >
              HAUS
            </motion.h1>
          </div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[12px] tracking-[0.4em] uppercase text-noir-ivory/60 font-sans max-w-md mx-auto"
          >
            LV · Prada · Goyard · Nike · Designer Labels
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3 }}
            className="mt-10"
          >
            <Link
              href="/noir/products"
              className="inline-flex items-center gap-3 border border-noir-gold/50 text-noir-gold text-[11px] tracking-[0.4em] uppercase font-sans px-8 py-4 hover:bg-noir-gold hover:text-noir-black transition-all duration-500"
            >
              Explore the Collection
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-noir-gold/80 to-transparent"
          />
          <span className="text-[9px] tracking-[0.4em] uppercase text-noir-gold/50 font-sans">Scroll</span>
        </motion.div>
      </section>

      {/* BRANDS MARQUEE */}
      <section className="py-8 border-y border-noir-gold/10 overflow-hidden">
        <div className="flex gap-16 animate-[marquee_25s_linear_infinite]" style={{ width: "max-content" }}>
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="text-[11px] tracking-[0.5em] uppercase text-noir-ivory/30 font-sans whitespace-nowrap">
              {b.name}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED EDITORIAL SECTION */}
      <section className="py-32 px-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <AnimatedText
              text="The Art of"
              className="font-serif text-[clamp(3rem,7vw,7rem)] leading-none text-noir-ivory/30"
            />
            <AnimatedText
              text="Designer Living"
              delay={0.1}
              className="font-serif text-[clamp(3rem,7vw,7rem)] leading-none text-noir-ivory"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 text-noir-ivory/50 font-sans text-[14px] leading-relaxed tracking-wide max-w-md"
            >
              We source the most coveted pieces from Louis Vuitton, Prada, Goyard and more — 
              bringing authentic luxury within reach of the South African market.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10"
            >
              <Link
                href="/noir/about"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase text-noir-gold font-sans hover:gap-6 transition-all duration-300"
              >
                Our Story <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ClipRevealImage
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"
              alt="LV Bag"
              className="relative aspect-[3/4]"
            />
            <ClipRevealImage
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
              alt="Nike Sneaker"
              className="relative aspect-[3/4] mt-12"
            />
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 px-8 max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <AnimatedText
              text="New Arrivals"
              className="font-serif text-[clamp(2rem,5vw,4.5rem)] text-noir-ivory"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ originX: 0 }}
              className="mt-2 h-px w-24 bg-noir-gold"
            />
          </div>
          <Link
            href="/noir/products"
            className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-noir-ivory/50 font-sans hover:text-noir-gold transition-colors duration-300"
          >
            View All <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link
                href={`/noir/products/${product.slug}`}
                className="group block"
                data-cursor-label="View"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-noir-warm-gray mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-noir-gold text-noir-black text-[9px] tracking-[0.3em] uppercase font-sans px-2 py-1">
                      {product.badge}
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-noir-black/0 group-hover:bg-noir-black/30 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch({ type: "ADD", product });
                      }}
                      className="w-full bg-noir-gold text-noir-black text-[10px] tracking-[0.3em] uppercase font-sans py-3 hover:bg-noir-gold-light transition-colors"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.4em] uppercase text-noir-gold/80 font-sans mb-1">
                    {product.brand}
                  </p>
                  <p className="font-serif text-base text-noir-ivory group-hover:text-noir-gold transition-colors duration-300">
                    {product.name}
                  </p>
                  <p className="font-serif text-sm text-noir-ivory/60 mt-1">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FULL-BLEED CTA */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden my-12">
        <Image
          src="https://images.unsplash.com/photo-1590739225287-bd31519780c3?w=1800&q=80"
          alt="Prada Collection"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir-black via-noir-black/50 to-noir-black" />
        <div className="relative z-10 text-center px-8">
          <AnimatedText
            text="New Season. New Flex."
            className="font-serif text-[clamp(2.5rem,8vw,8rem)] text-noir-ivory leading-none"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Link
              href="/noir/products"
              className="inline-flex items-center gap-3 bg-noir-gold text-noir-black text-[11px] tracking-[0.4em] uppercase font-sans px-10 py-4 hover:bg-noir-gold-light transition-colors duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BRAND GRID */}
      <section className="py-20 px-8 max-w-[1600px] mx-auto">
        <AnimatedText
          text="The Labels"
          className="font-serif text-[clamp(2rem,5vw,4rem)] text-noir-ivory text-center mb-16"
        />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-noir-gold/10">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-noir-black flex flex-col items-center justify-center py-10 px-4 hover:bg-noir-warm-gray transition-colors duration-300 group"
            >
              <p className="font-serif text-base text-center text-noir-ivory/60 group-hover:text-noir-gold transition-colors duration-300">
                {brand.name}
              </p>
              <span className="text-[9px] tracking-[0.3em] uppercase text-noir-gold/40 font-sans mt-1">
                {brand.count} items
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-noir-gold/10 py-16 px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="font-serif text-2xl tracking-[0.4em] uppercase text-noir-ivory/40">FlexHaus</p>
            <div className="flex gap-8">
              {["TikTok", "Instagram", "WhatsApp"].map((s) => (
                <a key={s} href="#" className="text-[10px] tracking-[0.3em] uppercase text-noir-ivory/30 hover:text-noir-gold transition-colors font-sans">
                  {s}
                </a>
              ))}
            </div>
            <p className="text-[10px] tracking-[0.2em] text-noir-ivory/20 font-sans">
              © 2025 FlexHaus. South Africa.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
