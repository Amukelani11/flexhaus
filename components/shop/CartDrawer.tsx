"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2 } from "lucide-react";

const line = "border-flex-black/10";
const muted = "text-flex-mid-gray";
const accent = "text-flex-yellow";

export default function CartDrawer() {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-flex-black/30 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch({ type: "CLOSE" })}
          />
          <motion.aside
            className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-flex-white z-[101] flex flex-col border-l ${line}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className={`flex items-center justify-between px-8 py-6 border-b ${line}`}>
              <div>
                <h2 className="font-serif text-2xl text-flex-black">Bag</h2>
                <p className={`font-mono text-[10px] uppercase tracking-[0.3em] ${muted} mt-0.5`}>{totalItems} items</p>
              </div>
              <button type="button" onClick={() => dispatch({ type: "CLOSE" })} className="text-flex-black/40 hover:text-flex-yellow transition-colors" aria-label="Close">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <AnimatePresence>
                {state.items.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <p className="font-serif text-xl text-flex-black/40">Your bag is empty</p>
                    <p className={`font-mono text-[10px] uppercase tracking-[0.3em] ${muted}`}>Browse the edit</p>
                    <Link
                      href="/products"
                      onClick={() => dispatch({ type: "CLOSE" })}
                      className="font-sans text-[11px] tracking-[0.2em] uppercase text-flex-yellow border-b border-flex-yellow/40 pb-0.5 hover:border-flex-yellow transition-colors"
                    >
                      View products
                    </Link>
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
                      <div className={`relative w-20 h-24 flex-shrink-0 overflow-hidden bg-flex-gray`}>
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className={`font-mono text-[9px] uppercase tracking-[0.3em] ${accent}`}>{item.product.brand}</p>
                          <p className="font-serif text-base text-flex-black mt-0.5">{item.product.name}</p>
                          {item.size && <p className={`font-mono text-[9px] uppercase tracking-widest ${muted} mt-0.5`}>Size: {item.size}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => dispatch({ type: "DECREMENT", id: item.product.id, size: item.size })} className="text-flex-black/40 hover:text-flex-yellow transition-colors"><Minus size={12} /></button>
                            <span className="font-mono text-sm">{item.quantity}</span>
                            <button type="button" onClick={() => dispatch({ type: "INCREMENT", id: item.product.id, size: item.size })} className="text-flex-black/40 hover:text-flex-yellow transition-colors"><Plus size={12} /></button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`font-serif ${accent}`}>{formatPrice(item.product.price * item.quantity)}</span>
                            <button type="button" onClick={() => dispatch({ type: "REMOVE", id: item.product.id, size: item.size })} className="text-flex-black/20 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {state.items.length > 0 && (
              <div className={`px-8 py-6 border-t ${line} space-y-4`}>
                <div className="flex justify-between">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${muted}`}>Total</span>
                  <span className={`font-serif text-2xl ${accent}`}>{formatPrice(totalPrice)}</span>
                </div>
                <button type="button" className="w-full py-4 bg-flex-black text-flex-white font-sans text-[11px] tracking-[0.35em] uppercase hover:bg-flex-yellow hover:text-flex-white transition-colors duration-400">
                  Checkout via WhatsApp
                </button>
                <button type="button" onClick={() => dispatch({ type: "CLEAR" })} className="w-full py-3 text-[10px] font-mono uppercase tracking-[0.3em] text-flex-black/30 hover:text-flex-black/50 transition-colors">
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
