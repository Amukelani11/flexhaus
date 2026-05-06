"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

export default function FlexCartPage() {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-velvet-fg/10 px-8 py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-black uppercase leading-none"
              style={{ fontSize: "clamp(2.5rem,7vw,5rem)", lineHeight: 0.95 }}
            >
              Your Bag
            </motion.h1>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] mt-3 text-velvet-fg/60">{totalItems} Items</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-10">
        {state.items.length === 0 ? (
          <div className="bg-gray-50 rounded-sm p-20 text-center">
            <p className="font-serif font-black text-4xl uppercase mb-4">Bag Empty</p>
            <Link href="/velvet/products" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] bg-velvet-gold px-6 py-3 hover:bg-velvet-fg hover:text-velvet-accent transition-colors">
              Browse the Drop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border border-velvet-fg/10 rounded-sm p-6">
            <div className="lg:col-span-2">
              {state.items.map((item, idx) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex gap-5 py-5 ${idx !== state.items.length - 1 ? "border-b border-velvet-fg/10" : ""}`}
                >
                  <div className="relative w-24 h-28 flex-shrink-0 rounded-sm overflow-hidden bg-gray-100">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-velvet-fg/50">{item.product.brand}</p>
                      <p className="font-serif font-bold text-base uppercase leading-tight">{item.product.name}</p>
                      {item.size && <p className="font-mono text-[9px] uppercase mt-0.5">Size: {item.size}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex border border-velvet-fg/20 rounded-sm">
                        <button onClick={() => dispatch({ type: "DECREMENT", id: item.product.id, size: item.size })} className="px-3 py-2 hover:bg-velvet-gold transition-colors rounded-l-sm"><Minus size={12} /></button>
                        <span className="px-4 py-2 font-mono font-bold text-sm border-x border-velvet-fg/20">{item.quantity}</span>
                        <button onClick={() => dispatch({ type: "INCREMENT", id: item.product.id, size: item.size })} className="px-3 py-2 hover:bg-velvet-gold transition-colors rounded-r-sm"><Plus size={12} /></button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-serif font-black text-lg">{formatPrice(item.product.price * item.quantity)}</span>
                        <button onClick={() => dispatch({ type: "REMOVE", id: item.product.id, size: item.size })} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="pt-5 border-t border-velvet-fg/10">
                <Link href="/velvet/products" className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-velvet-fg/40 hover:text-velvet-fg transition-colors">
                  <ArrowLeft size={12} /> Continue Shopping
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-between bg-gray-50 rounded-sm p-6">
              <div className="space-y-4">
                <h2 className="font-serif font-black text-2xl uppercase">Summary</h2>
                <div className="space-y-2 font-mono text-[11px] text-velvet-fg/60">
                  <div className="flex justify-between"><span>Items ({totalItems})</span><span>{formatPrice(totalPrice)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>TBD</span></div>
                </div>
                  <div className="pt-4 border-t border-velvet-fg/10 flex justify-between items-center">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Total</span>
                  <span className="font-serif font-black text-3xl">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-velvet-fg/30">DM us on WhatsApp — we&apos;ll confirm &amp; sort delivery. No BS.</p>
                <button className="w-full py-4 bg-velvet-gold text-velvet-fg font-serif font-black text-[11px] uppercase tracking-[0.3em] rounded-sm hover:bg-velvet-fg hover:text-velvet-accent transition-colors">
                  DM us on WhatsApp 💬
                </button>
                <button onClick={() => dispatch({ type: "CLEAR" })} className="w-full py-3 font-mono text-[9px] uppercase tracking-[0.3em] text-velvet-fg/30 hover:text-velvet-fg transition-colors">
                  Clear Bag
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
