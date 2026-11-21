"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Heart, Star, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: (i % 4) * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const liked = isWishlisted(product.id);

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden rounded-2xl bg-sand">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, (max-width:1536px) 33vw, 25vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
        </div>

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-charcoal backdrop-blur">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className={cn(
            "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition-all duration-300",
            liked
              ? "bg-charcoal text-cream"
              : "bg-cream/80 text-charcoal hover:bg-cream",
          )}
        >
          <Heart
            className="h-[18px] w-[18px]"
            strokeWidth={1.6}
            fill={liked ? "currentColor" : "none"}
          />
        </button>

        {/* Quick add */}
        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-charcoal py-3 text-sm font-medium text-cream transition-colors hover:bg-gold"
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Add to cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-center gap-2 text-xs text-stone">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1.5} />
            {product.rating.toFixed(1)}
          </span>
          <span className="text-cream/30">·</span>
          <span>{product.reviews} reviews</span>
        </div>
        <h3 className="mt-2 font-serif text-lg leading-snug text-charcoal">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-mocha">
          {product.description}
        </p>
        <div className="mt-3 flex items-center gap-3 pt-1">
          <span className="text-base font-semibold text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-stone line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
