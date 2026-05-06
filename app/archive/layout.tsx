import { CartProvider } from "@/context/CartContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import Navbar from "@/components/archive/Navbar";
import CartDrawer from "@/components/archive/CartDrawer";

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeWrapper themeClass="theme-archive" fontClass="font-sans">
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
      </CartProvider>
    </ThemeWrapper>
  );
}
