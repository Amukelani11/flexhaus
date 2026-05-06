"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/flex/ThemeToggle";

export default function Navbar() {
  const { totalItems, dispatch } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const headerBg = useMotionTemplate`rgba(var(--flex-nav-bg), ${bgOpacity})`;
  const headerBorder = useMotionTemplate`rgba(var(--flex-black-rgb), ${borderOpacity})`;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: headerBg, borderBottom: "1px solid", borderColor: headerBorder }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/flex" className="font-display font-black text-2xl tracking-[-0.03em] uppercase select-none">
            FLEX<span className="text-flex-yellow bg-flex-black px-1.5 py-0.5 ml-0.5">HAUS</span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {["Products", "About"].map((item) => (
              <Link
                key={item}
                href={`/flex/${item.toLowerCase()}`}
                className="px-5 py-2 text-[11px] tracking-[0.3em] uppercase font-mono font-bold text-flex-black/60 hover:text-flex-black hover:bg-flex-yellow-bright transition-all duration-200 rounded-sm"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Right — bag */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => dispatch({ type: "OPEN" })}
              className="relative flex items-center gap-2 bg-flex-black text-flex-white px-5 py-2.5 text-[11px] tracking-[0.25em] uppercase font-mono font-bold hover:bg-flex-yellow-bright hover:text-flex-black transition-colors duration-200"
            >
              <ShoppingBag size={13} strokeWidth={2} />
              Bag
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-flex-yellow-bright text-flex-black w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button
              className="md:hidden border-2 border-flex-black p-2 hover:bg-flex-yellow-bright transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-flex-yellow-bright flex flex-col items-start justify-center gap-5 px-8 md:hidden"
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute top-5 right-6">
          <button onClick={() => setMenuOpen(false)} className="border-2 border-flex-black p-2">
            <X size={18} />
          </button>
        </div>
        {["Products", "About"].map((item) => (
          <Link
            key={item}
            href={`/flex/${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className="font-display font-black text-5xl uppercase tracking-tight text-flex-black hover:text-flex-white transition-colors"
          >
            {item}
          </Link>
        ))}
        <button
          onClick={() => { setMenuOpen(false); dispatch({ type: "OPEN" }); }}
          className="font-display font-black text-5xl uppercase tracking-tight text-flex-black hover:text-flex-white transition-colors"
        >
          Bag{totalItems > 0 && ` (${totalItems})`}
        </button>
      </motion.div>
    </>
  );
}
