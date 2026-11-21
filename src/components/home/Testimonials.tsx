"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    quote:
      "The Halden sofa is the centrepiece of our living room. It looks even better in person — the velvet is sumptuous and the proportions are perfect.",
    name: "Ananya Rao",
    role: "Homeowner · Bangalore",
    initials: "AR",
  },
  {
    quote:
      "Every detail feels considered. From the solid oak base to the stitching, it's clear Aethel cares about craft. Worth every rupee.",
    name: "Rohan Mehta",
    role: "Interior Designer · Mumbai",
    initials: "RM",
  },
  {
    quote:
      "Delivery was smooth and the team helped assemble everything. The Norvik dining table seats our whole family comfortably with room to spare.",
    name: "Priya & Vikram",
    role: "Customers · Pune",
    initials: "PV",
  },
  {
    quote:
      "I've furnished two rooms with Aethel now. The pieces age beautifully and always feel cohesive — quiet luxury done exactly right.",
    name: "Sneha Iyer",
    role: "Architect · Chennai",
    initials: "SI",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [paused, count]);

  return (
    <section className="bg-sand/40 py-24">
      <div className="container-lux">
        <Reveal className="flex flex-col items-center text-center">
          <p className="eyebrow">Loved by Homes</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Stories from the people who live with our pieces
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-14">
          <div
            className="relative mx-auto max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Quote
              className="absolute -left-2 -top-8 h-16 w-16 text-beige/70"
              strokeWidth={1}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease }}
                className="flex flex-col items-center gap-6 rounded-[2rem] bg-cream px-8 py-12 shadow-[0_20px_60px_-30px_rgba(28,26,23,0.4)] sm:px-12"
              >
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <blockquote className="text-center font-serif text-xl leading-relaxed text-charcoal sm:text-2xl">
                  &ldquo;{testimonials[index].quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-charcoal font-serif text-sm text-cream">
                    {testimonials[index].initials}
                  </span>
                  <div className="text-left">
                    <p className="font-medium text-charcoal">
                      {testimonials[index].name}
                    </p>
                    <p className="text-sm text-mocha">
                      {testimonials[index].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:bg-charcoal hover:text-cream"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.6} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-charcoal" : "w-2 bg-charcoal/20"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:bg-charcoal hover:text-cream"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
