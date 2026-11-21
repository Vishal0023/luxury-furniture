"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart, Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import CartDrawer from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/#collections" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [panel, setPanel] = useState<"cart" | "wishlist" | null>(null);
  const { cartCount, wishlist } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while a panel is open
  useEffect(() => {
    document.body.style.overflow = panel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [panel]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || mobileOpen
            ? "bg-cream/85 backdrop-blur-xl shadow-[0_1px_0_0_rgba(28,26,23,0.06)]"
            : "bg-transparent",
        )}
      >
        <nav className="container-lux flex h-20 items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2"
            aria-label="Aethel home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 font-serif text-lg font-semibold text-charcoal transition-colors group-hover:bg-charcoal group-hover:text-cream">
              A
            </span>
            <span className="font-serif text-2xl font-semibold tracking-[0.25em] text-charcoal">
              AETHEL
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 md:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href.split("#")[0] && link.href.includes("#")
                    ? false
                    : pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "link-underline text-sm font-medium tracking-wide transition-colors",
                      active ? "text-charcoal" : "text-mocha hover:text-charcoal",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/shop"
              aria-label="Search products"
              className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </Link>
            <button
              type="button"
              onClick={() => setPanel("wishlist")}
              aria-label="Open wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-cream">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setPanel("cart")}
              aria-label="Open cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-charcoal px-1 text-[10px] font-semibold text-cream">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5 md:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" strokeWidth={1.6} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 z-40 bg-charcoal/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.ul
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="container-lux flex flex-col gap-1 bg-cream px-6 py-6"
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-charcoal/8 py-4 font-serif text-2xl text-charcoal"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer open={panel === "cart"} onClose={() => setPanel(null)} />
      <WishlistDrawer open={panel === "wishlist"} onClose={() => setPanel(null)} />
    </>
  );
}
