"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/shop/ThemeToggle";
import Logo from "@/components/shop/Logo";

export default function Navbar() {
  const { totalItems, dispatch } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink =
    "font-sans text-[11px] tracking-[0.25em] uppercase text-flex-black/70 hover:text-flex-yellow transition-colors duration-300";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-flex-black/10 backdrop-blur-xl bg-[rgba(var(--flex-nav-bg),0.96)] shadow-[0_10px_28px_rgba(0,0,0,0.06)]"
      >
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
          <nav className="hidden md:flex gap-8 items-center">
            {[
              { label: "Products", href: "/products" },
              { label: "About", href: "/about" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className={navLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Logo />
          </Link>

          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => dispatch({ type: "OPEN" })}
              className="relative flex items-center gap-2 px-0 py-1 text-flex-black/60 hover:text-flex-yellow transition-colors duration-300"
              aria-label="Open bag"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 min-w-[1rem] h-4 px-0.5 bg-flex-yellow text-flex-white text-[8px] rounded-full flex items-center justify-center font-mono"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button
              type="button"
              className="md:hidden text-flex-black/60 hover:text-flex-yellow p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      <motion.div
        className="fixed inset-0 z-40 bg-flex-white flex flex-col items-center justify-center gap-10 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        transition={{ duration: 0.4 }}
      >
        {[
          { label: "Products", href: "/products" },
          { label: "About", href: "/about" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="font-logo text-4xl font-semibold tracking-[-0.04em] text-flex-black hover:text-flex-yellow transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            dispatch({ type: "OPEN" });
          }}
          className="font-logo text-4xl font-semibold tracking-[-0.04em] text-flex-black hover:text-flex-yellow transition-colors"
        >
          Bag {totalItems > 0 && `(${totalItems})`}
        </button>
      </motion.div>
    </>
  );
}
