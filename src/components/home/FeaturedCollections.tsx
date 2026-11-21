"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const collections = [
  {
    title: "The Nordic Edit",
    subtitle: "Light woods, pale linens & calm forms",
    image: "/images/collection-1.jpg",
    href: "/shop",
    span: "lg:col-span-7 lg:row-span-2",
    aspect: "aspect-[4/3] lg:aspect-auto",
  },
  {
    title: "Warm Woods",
    subtitle: "Walnut, oak & rich natural grain",
    image: "/images/collection-2.jpg",
    href: "/shop",
    span: "lg:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Soft Living",
    subtitle: "Velvet, bouclé & relaxed seating",
    image: "/images/sofa-2.jpg",
    href: "/shop",
    span: "lg:col-span-5",
    aspect: "aspect-[4/3]",
  },
];

export default function FeaturedCollections() {
  return (
    <section id="collections" className="bg-charcoal py-24 text-cream">
      <div className="container-lux">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-gold-light">Featured Collections</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
              Curated edits for every room
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:grid-rows-2">
          {collections.map((col, i) => (
            <Reveal
              key={col.title}
              delay={i * 0.1}
              className={col.span}
            >
              <motion.a
                href={col.href}
                className={`group relative block overflow-hidden rounded-[2rem] bg-espresso ${col.aspect} lg:h-full`}
                whileHover="hover"
              >
                <motion.img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 1.2, ease }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/15 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="translate-y-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-cream/15 px-4 py-1.5 text-xs font-medium backdrop-blur w-fit">
                      Explore Collection
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </span>
                  </span>
                  <h3 className="mt-4 font-serif text-3xl sm:text-4xl">
                    {col.title}
                  </h3>
                  <p className="mt-1 text-sm text-cream/65">{col.subtitle}</p>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
