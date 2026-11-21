"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A subtle custom cursor that follows the pointer and expands over
 * interactive elements. Disabled on touch devices and when the user
 * prefers reduced motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const cursorX = useSpring(x, { stiffness: 500, damping: 35, mass: 0.5 });
  const cursorY = useSpring(y, { stiffness: 500, damping: 35, mass: 0.5 });

  useEffect(() => {
    const canHover =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHovering(
        !!el.closest("a, button, [data-cursor='hover'], input, textarea"),
      );
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[9999] hidden md:flex h-3 w-3 items-center justify-center rounded-full border border-charcoal/40 transition-[width,height,background-color] duration-300"
      style={{
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={
        hovering
          ? { width: 44, height: 44, backgroundColor: "rgba(28,26,23,0.08)" }
          : { width: 3, height: 3, backgroundColor: "rgba(28,26,23,0)" }
      }
    />
  );
}
