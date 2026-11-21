"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10 bg-charcoal"
      >
        <img
          src="/images/hero.jpg"
          alt="Luxury living room with a plush velvet sofa"
          className="h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/10 to-charcoal/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-transparent" />
      </motion.div>

      <div className="container-lux w-full pb-20 pt-40">
        <motion.div style={{ opacity }} className="max-w-3xl">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={item}
              className="eyebrow text-gold-light"
            >
              Aethel · Interiors for the considered home
            </motion.p>
            <motion.h1
              variants={item}
              style={{ y: textY }}
              className="mt-6 font-serif text-5xl font-medium leading-[1.05] text-cream sm:text-6xl lg:text-7xl"
            >
              Furniture that
              <br />
              holds a <span className="italic text-gold-light">quiet</span> luxury
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75"
            >
              Handcrafted sofas, chairs and tables in natural materials —
              designed with restraint, built to last, and made for rooms that
              feel genuinely yours.
            </motion.p>
            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                as="a"
                href="/shop"
                className="btn-primary px-7 py-4 text-sm"
              >
                Shop the Collection
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/#collections"
                className="btn-outline border-cream/30 px-7 py-4 text-sm text-cream hover:bg-cream hover:text-charcoal"
              >
                Explore More
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/60 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-cream/40 p-1">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-cream/70"
          />
        </span>
      </motion.div>
    </section>
  );
}
