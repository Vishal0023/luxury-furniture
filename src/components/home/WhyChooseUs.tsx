"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Truck, RotateCcw } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    Icon: ShieldCheck,
    title: "Premium Quality",
    text: "Solid hardwoods, full-grain leathers and hand-finished details built to endure daily life.",
  },
  {
    Icon: Leaf,
    title: "Sustainable Materials",
    text: "Responsibly sourced timber, natural fibres and low-impact finishes — kind to your home and the planet.",
  },
  {
    Icon: Truck,
    title: "Free Delivery",
    text: "Complimentary white-glove delivery and installation on every order, wherever you are in India.",
  },
  {
    Icon: RotateCcw,
    title: "Easy Returns",
    text: "30-day hassle-free returns, so you can find the perfect piece with complete confidence.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-cream py-24">
      <div className="container-lux">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why Aethel</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Crafted to be chosen, kept &amp; lived with
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 0.1}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease }}
                className="group h-full rounded-3xl border border-charcoal/8 bg-sand/50 p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal text-cream transition-colors duration-500 group-hover:bg-gold">
                  <f.Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-serif text-xl text-charcoal">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mocha">
                  {f.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
