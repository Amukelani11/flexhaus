import { CartProvider } from "@/context/CartContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import Navbar from "@/components/velvet/Navbar";
import CartDrawer from "@/components/velvet/CartDrawer";

export default function VelvetLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeWrapper themeClass="theme-velvet" fontClass="font-serif">
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
      </CartProvider>
    </ThemeWrapper>
  );
}
