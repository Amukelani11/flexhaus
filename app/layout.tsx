import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import Navbar from "@/components/shop/Navbar";
import CartDrawer from "@/components/shop/CartDrawer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FLEXHAUS — Designer Reseller SA",
  description: "South Africa designer resale — FlexHaus: curated designer and streetwear resale.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased">
        <ThemeWrapper themeClass="theme-shop" fontClass="font-sans">
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <CartDrawer />
          </CartProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
