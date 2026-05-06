"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import { X, Plus, Minus, Trash2 } from "lucide-react";

export default function CartDrawer() {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-archive-charcoal/30 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch({ type: "CLOSE" })}
          />
          <motion.aside
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-archive-warm-white z-[101] flex flex-col border-l border-archive-line"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-archive-line">
              <div>
                <h2 className="font-serif text-2xl text-archive-charcoal">Bag</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-archive-stone mt-0.5">{totalItems} items</p>
              </div>
              <button onClick={() => dispatch({ type: "CLOSE" })} className="text-archive-charcoal/40 hover:text-archive-terracotta transition-colors">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <AnimatePresence>
                {state.items.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                    <p className="font-serif text-xl text-archive-charcoal/40">Your bag is empty</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-archive-stone">Explore the archive</p>
                  </motion.div>
                ) : (
                  state.items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4"
                    >
                      <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-archive-line/30">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-archive-terracotta">{item.product.brand}</p>
                          <p className="font-serif text-base text-archive-charcoal mt-0.5">{item.product.name}</p>
                          {item.size && <p className="font-mono text-[9px] uppercase tracking-widest text-archive-stone mt-0.5">Size: {item.size}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button onClick={() => dispatch({ type: "DECREMENT", id: item.product.id, size: item.size })} className="text-archive-charcoal/40 hover:text-archive-terracotta transition-colors"><Minus size={12} /></button>
                            <span className="font-mono text-sm">{item.quantity}</span>
                            <button onClick={() => dispatch({ type: "INCREMENT", id: item.product.id, size: item.size })} className="text-archive-charcoal/40 hover:text-archive-terracotta transition-colors"><Plus size={12} /></button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-serif text-archive-terracotta">{formatPrice(item.product.price * item.quantity)}</span>
                            <button onClick={() => dispatch({ type: "REMOVE", id: item.product.id, size: item.size })} className="text-archive-charcoal/20 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {state.items.length > 0 && (
              <div className="px-8 py-6 border-t border-archive-line space-y-4">
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-archive-stone">Total</span>
                  <span className="font-serif text-2xl text-archive-terracotta">{formatPrice(totalPrice)}</span>
                </div>
                <button className="w-full py-4 bg-archive-charcoal text-archive-cream font-sans text-[11px] tracking-[0.35em] uppercase hover:bg-archive-terracotta transition-colors duration-400">
                  Checkout via WhatsApp
                </button>
                <button onClick={() => dispatch({ type: "CLEAR" })} className="w-full py-3 text-[10px] font-mono uppercase tracking-[0.3em] text-archive-charcoal/30 hover:text-archive-charcoal/50 transition-colors">
                  Clear Bag
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
