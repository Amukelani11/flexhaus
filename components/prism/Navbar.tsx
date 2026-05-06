"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/prism/ThemeToggle";

export default function Navbar() {
  const { totalItems, dispatch } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 56], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 56], [0, 1]);
  const headerBg = useMotionTemplate`rgba(var(--prism-nav-bg), ${bgOpacity})`;
  const headerBorder = useMotionTemplate`rgba(var(--prism-fg-rgb), ${borderOpacity})`;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: headerBg, borderBottom: "1px solid", borderColor: headerBorder }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/prism" className="font-space font-black text-2xl tracking-[-0.03em] uppercase select-none flex items-center text-prism-fg">
            FLEX
            <span className="bg-[#E5B80F] text-[#0a0a0a] px-1.5 py-0.5 ml-0.5">HAUS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {["Products", "About"].map((item) => (
              <Link
                key={item}
                href={`/prism/${item.toLowerCase()}`}
                className="px-5 py-2 text-[11px] tracking-[0.3em] uppercase font-mono font-bold text-prism-fg/60 hover:text-prism-fg hover:bg-prism-accent transition-all duration-200 rounded-sm"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => dispatch({ type: "OPEN" })}
              className="relative flex items-center gap-2 bg-prism-fg text-prism-bg px-5 py-2.5 text-[11px] tracking-[0.25em] uppercase font-mono font-bold hover:bg-prism-accent hover:text-prism-fg transition-colors duration-200"
            >
              <ShoppingBag size={13} strokeWidth={2} />
              Bag
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-prism-accent text-prism-fg w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button
              className="md:hidden border-2 border-prism-fg p-2 hover:bg-prism-accent transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      <motion.div
        className="fixed inset-0 z-40 bg-prism-accent flex flex-col items-start justify-center gap-5 px-8 md:hidden"
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute top-5 right-6">
          <button type="button" onClick={() => setMenuOpen(false)} className="border-2 border-prism-fg p-2">
            <X size={18} />
          </button>
        </div>
        {["Products", "About"].map((item) => (
          <Link
            key={item}
            href={`/prism/${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className="font-space font-black text-5xl uppercase tracking-tight text-prism-fg hover:text-prism-bg transition-colors"
          >
            {item}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            dispatch({ type: "OPEN" });
          }}
          className="font-space font-black text-5xl uppercase tracking-tight text-prism-fg hover:text-prism-bg transition-colors"
        >
          Bag{totalItems > 0 && ` (${totalItems})`}
        </button>
      </motion.div>
    </>
  );
}
