"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import Reveal from "@/components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FeaturedCategories() {
  return (
    <section id="categories" className="bg-cream py-24">
      <div className="container-lux">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">The Collection</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              Explore by category
            </h2>
          </div>
          <Link
            href="/shop"
            className="link-underline text-sm font-medium text-charcoal"
          >
            View all pieces
          </Link>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal
              key={cat.id}
              delay={i * 0.08}
              duration={0.7}
              className="h-full"
            >
              <motion.a
                href={`/shop?category=${cat.id}`}
                className="group relative block overflow-hidden rounded-3xl bg-sand"
                whileHover="hover"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1.1, ease }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <div className="translate-y-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex items-center gap-2 text-cream/80">
                      <span className="rounded-full bg-cream/15 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur">
                        {cat.count} pieces
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/20 backdrop-blur transition-transform group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4 text-cream" strokeWidth={1.6} />
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-cream">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-sm text-cream/70">{cat.description}</p>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
