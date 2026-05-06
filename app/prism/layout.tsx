import { CartProvider } from "@/context/CartContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import Navbar from "@/components/prism/Navbar";
import CartDrawer from "@/components/prism/CartDrawer";

export default function PrismLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeWrapper themeClass="theme-prism" fontClass="font-space">
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
      </CartProvider>
    </ThemeWrapper>
  );
}
