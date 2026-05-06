"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/archive/ThemeToggle";

export default function Navbar() {
  const { totalItems, dispatch } = useCart();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-archive-line"
        style={{ backgroundColor: `rgba(248,244,239,${bgOpacity})`, backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
          {/* Left links */}
          <nav className="hidden md:flex gap-8">
            {["Products", "About"].map((item) => (
              <Link
                key={item}
                href={`/archive/${item.toLowerCase()}`}
                className="font-sans text-[11px] tracking-[0.25em] uppercase text-archive-charcoal/50 hover:text-archive-terracotta transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Logo centered */}
          <Link href="/archive" className="absolute left-1/2 -translate-x-1/2">
            <div className="text-center">
              <p className="font-serif text-base tracking-[0.6em] uppercase text-archive-charcoal font-bold">
                FlexHaus
              </p>
              <p className="font-mono text-[7px] tracking-[0.5em] uppercase text-archive-terracotta -mt-0.5">
                Curated Luxury
              </p>
            </div>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-5 ml-auto">
            <ThemeToggle />
            <button
              onClick={() => dispatch({ type: "OPEN" })}
              className="relative flex items-center gap-2 text-archive-charcoal/60 hover:text-archive-terracotta transition-colors duration-300"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-archive-terracotta text-archive-cream text-[8px] rounded-full flex items-center justify-center font-mono"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button className="md:hidden text-archive-charcoal/60 hover:text-archive-terracotta" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      <motion.div
        className="fixed inset-0 z-40 bg-archive-cream flex flex-col items-center justify-center gap-10 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        transition={{ duration: 0.4 }}
      >
        {["Products", "About"].map((item) => (
          <Link
            key={item}
            href={`/archive/${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-5xl text-archive-charcoal hover:text-archive-terracotta transition-colors"
          >
            {item}
          </Link>
        ))}
        <button
          onClick={() => { setMenuOpen(false); dispatch({ type: "OPEN" }); }}
          className="font-serif text-5xl text-archive-charcoal hover:text-archive-terracotta transition-colors"
        >
          Bag {totalItems > 0 && `(${totalItems})`}
        </button>
      </motion.div>
    </>
  );
}
