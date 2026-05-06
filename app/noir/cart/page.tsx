"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  return (
    <div className="pt-24 min-h-screen px-8 pb-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="overflow-hidden mb-12">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif text-[clamp(3rem,8vw,7rem)] leading-none text-noir-ivory"
          >
            Your Bag
          </motion.h1>
        </div>

        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-32">
            <p className="font-serif text-3xl text-noir-ivory/30">Your bag is empty</p>
            <Link href="/noir/products" className="text-[11px] tracking-[0.4em] uppercase text-noir-gold font-sans hover:underline">
              Explore the Collection
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
                  exit={{ opacity: 0 }}
                  className="flex gap-6 pb-8 border-b border-noir-gold/10"
                >
                  <div className="relative w-28 h-36 flex-shrink-0 overflow-hidden">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="112px" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-noir-gold font-sans mb-1">{item.product.brand}</p>
                    <p className="font-serif text-xl text-noir-ivory mb-1">{item.product.name}</p>
                    {item.size && <p className="text-[10px] tracking-widest uppercase text-noir-ivory/40 font-sans">Size: {item.size}</p>}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <button onClick={() => dispatch({ type: "DECREMENT", id: item.product.id, size: item.size })} className="text-noir-ivory/40 hover:text-noir-gold transition-colors"><Minus size={14} /></button>
                        <span className="font-sans text-noir-ivory">{item.quantity}</span>
                        <button onClick={() => dispatch({ type: "INCREMENT", id: item.product.id, size: item.size })} className="text-noir-ivory/40 hover:text-noir-gold transition-colors"><Plus size={14} /></button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-lg text-noir-gold">{formatPrice(item.product.price * item.quantity)}</span>
                        <button onClick={() => dispatch({ type: "REMOVE", id: item.product.id, size: item.size })} className="text-noir-ivory/20 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <Link href="/noir/products" className="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-noir-ivory/30 font-sans hover:text-noir-gold transition-colors">
                <ArrowLeft size={12} /> Continue Shopping
              </Link>
            </div>
            <div className="lg:col-span-1">
              <div className="border border-noir-gold/20 p-8 space-y-6">
                <h2 className="font-serif text-2xl text-noir-ivory tracking-widest">Order Summary</h2>
                <div className="space-y-3 text-sm font-sans">
                  <div className="flex justify-between text-noir-ivory/50">
                    <span>Items ({totalItems})</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-noir-ivory/50">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="pt-4 border-t border-noir-gold/10 flex justify-between">
                    <span className="text-[10px] tracking-[0.4em] uppercase text-noir-ivory/60">Total</span>
                    <span className="font-serif text-2xl text-gradient-gold">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-noir-gold text-noir-black text-[11px] tracking-[0.4em] uppercase font-sans hover:bg-noir-gold-light transition-colors">
                  Checkout via WhatsApp
                </button>
                <button onClick={() => dispatch({ type: "CLEAR" })} className="w-full py-3 text-[10px] tracking-[0.3em] uppercase text-noir-ivory/30 font-sans hover:text-noir-ivory/50 transition-colors">
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
