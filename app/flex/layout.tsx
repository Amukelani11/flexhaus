import { CartProvider } from "@/context/CartContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import Navbar from "@/components/flex/Navbar";
import CartDrawer from "@/components/flex/CartDrawer";

export default function FlexLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeWrapper themeClass="theme-flex" fontClass="font-display">
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
      </CartProvider>
    </ThemeWrapper>
  );
}
