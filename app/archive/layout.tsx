import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/archive/Navbar";
import CartDrawer from "@/components/archive/CartDrawer";

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-archive min-h-screen font-sans">
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
      </CartProvider>
    </div>
  );
}
