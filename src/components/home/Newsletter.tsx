"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, Mail, AlertCircle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const validate = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <section id="contact" className="bg-charcoal py-24 text-cream">
      <div className="container-lux">
        <Reveal>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-espresso to-charcoal px-8 py-16 text-center shadow-2xl sm:px-16">
            {/* decorative glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl"
            />
            <p className="eyebrow text-gold-light">The Aethel Letter</p>
            <h2 className="relative mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Join our world of considered design
            </h2>
            <p className="relative mx-auto mt-5 max-w-md text-cream/70">
              Early access to new collections, craft stories and members-only
              previews — delivered to your inbox, once a month.
            </p>

            <div className="relative mx-auto mt-9 max-w-md">
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <div className="relative flex-1">
                      <Mail className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-cream/40" strokeWidth={1.6} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="Your email address"
                        aria-label="Email address"
                        aria-invalid={!!error}
                        className={`w-full rounded-full border bg-cream/5 py-3.5 pl-12 pr-4 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors ${
                          error ? "border-red-400/60" : "border-cream/20"
                        }`}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.96 }}
                      className="btn-primary px-8 py-3.5 text-sm"
                    >
                      Subscribe
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease }}
                    className="flex flex-col items-center gap-3 py-2"
                  >
                    <CheckCircle2 className="h-12 w-12 text-gold-light" strokeWidth={1.5} />
                    <p className="font-serif text-2xl">You&apos;re subscribed</p>
                    <p className="text-sm text-cream/70">
                      Thank you — we&apos;ll be in touch soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 flex items-center justify-center gap-1.5 text-sm text-red-300"
                  >
                    <AlertCircle className="h-4 w-4" strokeWidth={1.6} />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="mt-4 text-xs text-cream/40">
                By subscribing you agree to receive emails. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
