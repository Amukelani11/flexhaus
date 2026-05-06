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
            className="fixed inset-0 bg-flex-black/50 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch({ type: "CLOSE" })}
          />
          <motion.aside
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[101] flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-flex-black/10">
              <div>
                <h2 className="font-display font-black text-xl uppercase tracking-tight">Your Bag</h2>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-flex-black/40 mt-0.5">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
              </div>
              <button onClick={() => dispatch({ type: "CLOSE" })} className="p-2 hover:bg-flex-yellow-bright rounded-sm transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <AnimatePresence>
                {state.items.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                    <p className="font-display font-black text-2xl uppercase">Bag Empty</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-flex-black/40">Add some heat</p>
                  </motion.div>
                ) : (
                  state.items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      className="flex gap-4 p-3 bg-gray-50 rounded-sm"
                    >
                      <div className="relative w-18 h-22 flex-shrink-0 rounded-sm overflow-hidden bg-gray-100 w-[72px] h-[88px]">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="72px" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-flex-black/40">{item.product.brand}</p>
                          <p className="font-display font-bold text-sm uppercase leading-tight mt-0.5">{item.product.name}</p>
                          {item.size && <p className="font-mono text-[9px] uppercase tracking-widest text-flex-black/40 mt-0.5">Size: {item.size}</p>}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-flex-black/15 rounded-sm">
                            <button onClick={() => dispatch({ type: "DECREMENT", id: item.product.id, size: item.size })} className="p-1.5 hover:bg-flex-yellow-bright transition-colors rounded-l-sm"><Minus size={10} /></button>
                            <span className="px-3 font-mono text-xs font-bold border-x border-flex-black/15">{item.quantity}</span>
                            <button onClick={() => dispatch({ type: "INCREMENT", id: item.product.id, size: item.size })} className="p-1.5 hover:bg-flex-yellow-bright transition-colors rounded-r-sm"><Plus size={10} /></button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-black text-sm">{formatPrice(item.product.price * item.quantity)}</span>
                            <button onClick={() => dispatch({ type: "REMOVE", id: item.product.id, size: item.size })} className="p-1 text-flex-black/30 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="px-6 py-5 border-t border-flex-black/10 space-y-3 bg-gray-50">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-flex-black/50">Subtotal</span>
                  <span className="font-display font-black text-2xl">{formatPrice(totalPrice)}</span>
                </div>
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-flex-black/30 pb-1">DM us on WhatsApp — we&apos;ll sort your order &amp; delivery no stress.</p>
                <button className="w-full py-4 bg-flex-yellow-bright text-flex-black font-display font-black text-[11px] tracking-[0.3em] uppercase hover:bg-flex-black hover:text-flex-yellow transition-colors duration-200 rounded-sm">
                  DM us on WhatsApp
                </button>
                <button onClick={() => dispatch({ type: "CLEAR" })} className="w-full py-2 font-mono text-[9px] uppercase tracking-[0.3em] text-flex-black/30 hover:text-flex-black transition-colors">
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
