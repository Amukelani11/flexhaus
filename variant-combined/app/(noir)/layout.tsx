"use client";
import { CartProvider } from "@/context/CartContext";
import NoirNavbar from "@/components/noir/Navbar";
import NoirCartDrawer from "@/components/noir/CartDrawer";
import NoirCursor from "@/components/noir/CustomCursor";
import type React from "react";

export default function NoirLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div style={{ "--theme-serif": "var(--font-cormorant)", "--theme-sans": "var(--font-cormorant)", "--theme-display": "var(--font-cormorant)", "--theme-mono": "monospace" } as React.CSSProperties}>
        <NoirCursor />
        <NoirNavbar />
        <NoirCartDrawer />
        <main>{children}</main>
      </div>
    </CartProvider>
  );
}
