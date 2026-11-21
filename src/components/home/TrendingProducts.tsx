import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import ProductGrid from "@/components/products/ProductGrid";
import Reveal from "@/components/ui/Reveal";

export default function TrendingProducts() {
  const trending = products.slice(0, 8);

  return (
    <section id="trending" className="bg-sand/40 py-24">
      <div className="container-lux">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Most Loved</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              Trending pieces right now
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-sm font-medium text-charcoal"
          >
            Shop all products
            <span className="transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
            </span>
          </Link>
        </Reveal>

        <div className="mt-12">
          <ProductGrid products={trending} />
        </div>
      </div>
    </section>
  );
}
