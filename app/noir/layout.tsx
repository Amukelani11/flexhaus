import { CartProvider } from "@/context/CartContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import Navbar from "@/components/noir/Navbar";
import CartDrawer from "@/components/noir/CartDrawer";
import CustomCursor from "@/components/noir/CustomCursor";

export default function NoirLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeWrapper themeClass="theme-noir" fontClass="font-serif">
      <CartProvider>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
      </CartProvider>
    </ThemeWrapper>
  );
}
