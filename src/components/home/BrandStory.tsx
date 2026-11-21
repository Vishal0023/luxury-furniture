"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Reveal from "@/components/ui/Reveal";

export default function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-90, 90]);

  return (
    <section id="about" className="bg-cream py-28">
      <div ref={ref} className="container-lux grid items-center gap-16 lg:grid-cols-2">
        {/* Image with parallax */}
        <div className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2rem] bg-sand">
            <motion.div style={{ y }} className="h-[115%] w-full">
              <Image
                src="/images/story-1.jpg"
                alt="Aethel atelier and crafted furniture"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-charcoal px-7 py-6 text-cream shadow-xl md:block">
            <p className="font-serif text-4xl">
              <AnimatedCounter to={12} suffix="+" />
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-cream/60">
              Years of craft
            </p>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">Our Story</p>
          </Reveal>
          <Reveal direction="up" delay={0.05}>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              Furniture made with intention, not excess
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-mocha">
              <p>
                Aethel began in a small workshop with a simple belief: the best
                furniture disappears into the way you live. We work with solid
                woods, natural fibres and honest finishes, shaping each piece so
                it feels considered in every detail — and effortless in use.
              </p>
              <p>
                Every collection is designed in-house and produced in limited
                batches, so nothing is rushed and nothing is wasted. What you
                bring home is built to age gracefully, to be rearranged,
                inherited, and loved for years.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-charcoal/10 pt-8">
              {[
                { to: 30, suffix: "+", label: "Natural materials" },
                { to: 48, suffix: "", label: "In-house designs" },
                { to: 5200, suffix: "+", label: "Homes furnished" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl text-charcoal">
                    <AnimatedCounter to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs leading-snug text-mocha">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
