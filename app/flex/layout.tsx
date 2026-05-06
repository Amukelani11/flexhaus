import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/flex/Navbar";
import CartDrawer from "@/components/flex/CartDrawer";

export default function FlexLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-flex min-h-screen font-display">
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
      </CartProvider>
    </div>
  );
}
