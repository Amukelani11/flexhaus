import { CartProvider } from "@/context/CartContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import Navbar from "@/components/steel/Navbar";
import CartDrawer from "@/components/steel/CartDrawer";

export default function SteelLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeWrapper themeClass="theme-steel" fontClass="font-sans">
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
      </CartProvider>
    </ThemeWrapper>
  );
}
