"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";

type MagneticButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
  strength?: number;
  /** Render as an anchor (uses `href`) instead of a button. */
  as?: "button" | "a";
  href?: string;
};

/** A button/link that gently drifts toward the cursor on hover (magnetic). */
export default function MagneticButton({
  children,
  strength = 0.35,
  as = "button",
  className,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const MotionTag = (as === "a" ? motion.a : motion.button) as typeof motion.button;

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
