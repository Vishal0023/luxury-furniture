"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type LenisWindow = Window & { __lenis?: Lenis };

/**
 * Initialises Lenis smooth scrolling for the whole document and
 * keeps it in sync with Framer Motion's scroll handling. Respects
 * the user's reduced-motion preference.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Expose for anchor links / programmatic scrolling
    (window as LenisWindow).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as LenisWindow).__lenis;
    };
  }, []);
}

/** Smoothly scroll to an element or offset, using Lenis when available. */
export function scrollTo(target: string | number | HTMLElement) {
  const lenis = (window as LenisWindow).__lenis;
  if (lenis) {
    lenis.scrollTo(target as never, { offset: -80 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }
  if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}
