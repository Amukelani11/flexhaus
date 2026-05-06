"use client";
import { CartProvider } from "@/context/CartContext";
import ArchiveNavbar from "@/components/archive/Navbar";
import ArchiveCartDrawer from "@/components/archive/CartDrawer";
import type React from "react";

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div style={{ "--theme-serif": "var(--font-playfair)", "--theme-sans": "var(--font-dm-sans)", "--theme-display": "var(--font-playfair)", "--theme-mono": "var(--font-dm-mono)" } as React.CSSProperties}>
        <ArchiveNavbar />
        <ArchiveCartDrawer />
        <main>{children}</main>
      </div>
    </CartProvider>
  );
}
