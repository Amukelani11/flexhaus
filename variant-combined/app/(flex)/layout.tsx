"use client";
import { CartProvider } from "@/context/CartContext";
import FlexNavbar from "@/components/shop/Navbar";
import FlexCartDrawer from "@/components/shop/CartDrawer";
import type React from "react";

export default function FlexLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div style={{ "--theme-display": "var(--font-syne)", "--theme-sans": "var(--font-syne)", "--theme-serif": "var(--font-syne)", "--theme-mono": "var(--font-space-mono)" } as React.CSSProperties}>
        <FlexNavbar />
        <FlexCartDrawer />
        <main>{children}</main>
      </div>
    </CartProvider>
  );
}
