import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/noir/Navbar";
import CartDrawer from "@/components/noir/CartDrawer";
import CustomCursor from "@/components/noir/CustomCursor";

export default function NoirLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-noir min-h-screen font-serif">
      <CartProvider>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
      </CartProvider>
    </div>
  );
}
