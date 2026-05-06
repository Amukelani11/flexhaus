"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import WordReveal from "@/components/archive/WordReveal";

export default function ArchiveCartPage() {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  return (
    <div className="pt-16 min-h-screen">
      <div className="px-10 lg:px-16 py-16 border-b border-archive-line">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-archive-terracotta mb-3">Your Selection</p>
          <WordReveal
            text="Bag"
            className="font-serif font-bold text-archive-charcoal"
            style={{ fontSize: "clamp(3rem,8vw,7rem)", lineHeight: 1.0 } as React.CSSProperties}
          />
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-archive-charcoal/40 mt-3">{totalItems} items</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 lg:px-16 py-12">
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 py-28 text-center">
            <p className="font-serif text-3xl text-archive-charcoal/30">Nothing here yet</p>
            <Link href="/archive/products" className="font-mono text-[10px] uppercase tracking-[0.4em] text-archive-terracotta hover:underline">
              Browse the Archive
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              {state.items.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-6 pb-8 border-b border-archive-line"
                >
                  <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden bg-archive-line/20">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-archive-terracotta mb-0.5">{item.product.brand}</p>
                      <p className="font-serif text-xl text-archive-charcoal">{item.product.name}</p>
                      {item.size && <p className="font-mono text-[9px] uppercase tracking-widest text-archive-charcoal/40 mt-0.5">Size: {item.size}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button onClick={() => dispatch({ type: "DECREMENT", id: item.product.id, size: item.size })} className="text-archive-charcoal/30 hover:text-archive-terracotta transition-colors"><Minus size={13} /></button>
                        <span className="font-mono text-sm text-archive-charcoal">{item.quantity}</span>
                        <button onClick={() => dispatch({ type: "INCREMENT", id: item.product.id, size: item.size })} className="text-archive-charcoal/30 hover:text-archive-terracotta transition-colors"><Plus size={13} /></button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-lg text-archive-terracotta">{formatPrice(item.product.price * item.quantity)}</span>
                        <button onClick={() => dispatch({ type: "REMOVE", id: item.product.id, size: item.size })} className="text-archive-charcoal/20 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <Link href="/archive/products" className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-archive-charcoal/30 hover:text-archive-terracotta transition-colors">
                <ArrowLeft size={11} /> Continue Browsing
              </Link>
            </div>

            <div className="lg:col-span-1">
              <div className="border border-archive-line p-8 space-y-6">
                <h2 className="font-serif text-2xl font-bold text-archive-charcoal">Summary</h2>
                <div className="space-y-3 font-sans text-sm">
                  <div className="flex justify-between text-archive-charcoal/50">
                    <span>Items ({totalItems})</span><span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-archive-charcoal/50">
                    <span>Shipping</span><span>Calculated at checkout</span>
                  </div>
                  <div className="pt-4 border-t border-archive-line flex justify-between items-center">
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-archive-charcoal/40">Total</span>
                    <span className="font-serif text-2xl text-archive-terracotta">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-archive-charcoal text-archive-cream text-[11px] tracking-[0.35em] uppercase font-sans hover:bg-archive-terracotta transition-colors duration-400">
                  Checkout via WhatsApp
                </button>
                <button onClick={() => dispatch({ type: "CLEAR" })} className="w-full py-3 font-mono text-[9px] uppercase tracking-[0.3em] text-archive-charcoal/25 hover:text-archive-charcoal/40 transition-colors">
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
