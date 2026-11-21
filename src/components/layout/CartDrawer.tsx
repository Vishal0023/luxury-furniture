"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, updateQty, removeFromCart, cartTotal, clearCart } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-charcoal" strokeWidth={1.6} />
                <h2 className="font-serif text-xl text-charcoal">
                  Your Cart
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full text-mocha transition-colors hover:bg-charcoal/5"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sand">
                    <ShoppingBag className="h-7 w-7 text-stone" strokeWidth={1.4} />
                  </div>
                  <p className="text-sm text-mocha">
                    Your cart is currently empty.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-outline px-5 py-2.5 text-sm"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                        className="flex gap-4"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          loading="lazy"
                          className="h-24 w-24 flex-shrink-0 rounded-lg bg-sand object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <h3 className="text-sm font-medium leading-snug text-charcoal">
                              {item.product.name}
                            </h3>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id)}
                              aria-label="Remove item"
                              className="text-stone transition-colors hover:text-charcoal"
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-mocha">
                            {formatPrice(item.product.price)}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1 rounded-full border border-charcoal/15">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQty(item.product.id, item.qty - 1)
                                }
                                aria-label="Decrease quantity"
                                className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
                              >
                                <Minus className="h-3.5 w-3.5" strokeWidth={1.8} />
                              </button>
                              <span className="w-6 text-center text-sm">
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQty(item.product.id, item.qty + 1)
                                }
                                aria-label="Increase quantity"
                                className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
                              >
                                <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                              </button>
                            </div>
                            <span className="text-sm font-medium text-charcoal">
                              {formatPrice(item.product.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-charcoal/10 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-mocha">Subtotal</span>
                  <span className="font-medium text-charcoal">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-stone">
                  Shipping & taxes calculated at checkout.
                </p>
                <button type="button" className="btn-primary mt-4 w-full py-3.5">
                  Proceed to Checkout
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-2 w-full text-center text-xs text-stone underline-offset-4 transition-colors hover:text-mocha hover:underline"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
