"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingBag, X, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function WishlistDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const items = products.filter((p) => wishlist.includes(p.id));

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
            aria-label="Wishlist"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-charcoal" strokeWidth={1.6} />
                <h2 className="font-serif text-xl text-charcoal">
                  Wishlist
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close wishlist"
                className="flex h-9 w-9 items-center justify-center rounded-full text-mocha transition-colors hover:bg-charcoal/5"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sand">
                    <Heart className="h-7 w-7 text-stone" strokeWidth={1.4} />
                  </div>
                  <p className="text-sm text-mocha">
                    Save your favourites here to revisit later.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-outline px-5 py-2.5 text-sm"
                  >
                    Browse the collection
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-sand">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <h3 className="text-sm font-medium leading-snug text-charcoal">
                            {item.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => toggleWishlist(item.id)}
                            aria-label="Remove from wishlist"
                            className="text-stone transition-colors hover:text-charcoal"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs text-mocha">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-auto pt-2">
                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                            className="flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-xs text-cream transition-colors hover:bg-gold"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.7} />
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
