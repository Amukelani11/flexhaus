"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { totalItems, dispatch } = useCart();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.95]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: `rgba(10,10,10,${bgOpacity})` }}
      >
        <div className="max-w-[1600px] mx-auto px-8 py-5 flex items-center justify-between">
          {/* Left nav */}
          <nav className="hidden md:flex gap-10">
            {["Products", "About"].map((item) => (
              <Link
                key={item}
                href={`/noir/${item.toLowerCase()}`}
                className="text-[11px] tracking-[0.35em] uppercase text-noir-ivory/70 hover:text-noir-gold transition-colors duration-300 font-sans"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link href="/noir" className="absolute left-1/2 -translate-x-1/2">
            <span className="font-serif text-xl tracking-[0.5em] uppercase text-noir-ivory">
              FlexHaus
            </span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-6 ml-auto">
            <button
              onClick={() => dispatch({ type: "OPEN" })}
              className="relative text-noir-ivory/70 hover:text-noir-gold transition-colors duration-300"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-noir-gold text-noir-black text-[9px] rounded-full flex items-center justify-center font-sans font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button
              className="md:hidden text-noir-ivory/70 hover:text-noir-gold"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-noir-black flex flex-col items-center justify-center gap-12 md:hidden"
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        {["Products", "About", "Cart"].map((item) => (
          <Link
            key={item}
            href={item === "Cart" ? "#" : `/noir/${item.toLowerCase()}`}
            onClick={() => {
              setMenuOpen(false);
              if (item === "Cart") dispatch({ type: "OPEN" });
            }}
            className="font-serif text-5xl tracking-[0.2em] uppercase text-noir-ivory hover:text-noir-gold transition-colors duration-300"
          >
            {item}
          </Link>
        ))}
      </motion.div>
    </>
  );
}
