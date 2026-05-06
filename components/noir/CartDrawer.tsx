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
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-noir-black/70 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch({ type: "CLOSE" })}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-noir-warm-gray z-[101] flex flex-col border-l border-noir-gold/20"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-noir-gold/20">
              <div>
                <h2 className="font-serif text-2xl tracking-[0.2em] uppercase text-noir-ivory">
                  Your Bag
                </h2>
                <p className="text-[11px] tracking-[0.3em] uppercase text-noir-muted font-sans mt-1">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => dispatch({ type: "CLOSE" })}
                className="text-noir-ivory/50 hover:text-noir-gold transition-colors duration-300"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <AnimatePresence>
                {state.items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center gap-4 py-20"
                  >
                    <p className="font-serif text-xl text-noir-ivory/40 tracking-widest">Your bag is empty</p>
                    <p className="text-[11px] tracking-[0.3em] uppercase text-noir-muted font-sans">
                      Discover the collection
                    </p>
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
                      <div className="relative w-20 h-24 overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] tracking-[0.3em] uppercase text-noir-gold font-sans">
                            {item.product.brand}
                          </p>
                          <p className="font-serif text-base text-noir-ivory mt-0.5">
                            {item.product.name}
                          </p>
                          {item.size && (
                            <p className="text-[10px] tracking-widest uppercase text-noir-muted font-sans mt-0.5">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => dispatch({ type: "DECREMENT", id: item.product.id, size: item.size })}
                              className="text-noir-ivory/50 hover:text-noir-gold transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-sans text-noir-ivory">{item.quantity}</span>
                            <button
                              onClick={() => dispatch({ type: "INCREMENT", id: item.product.id, size: item.size })}
                              className="text-noir-ivory/50 hover:text-noir-gold transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-serif text-noir-gold">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => dispatch({ type: "REMOVE", id: item.product.id, size: item.size })}
                              className="text-noir-ivory/30 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
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
              <div className="px-8 py-6 border-t border-noir-gold/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-noir-muted font-sans">Total</span>
                  <span className="font-serif text-2xl text-gradient-gold">{formatPrice(totalPrice)}</span>
                </div>
                <button className="w-full py-4 bg-noir-gold text-noir-black text-[11px] tracking-[0.4em] uppercase font-sans font-semibold hover:bg-noir-gold-light transition-colors duration-300">
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => dispatch({ type: "CLEAR" })}
                  className="w-full py-3 border border-noir-gold/30 text-noir-ivory/50 text-[10px] tracking-[0.3em] uppercase font-sans hover:border-noir-gold/60 hover:text-noir-ivory/70 transition-colors duration-300"
                >
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
