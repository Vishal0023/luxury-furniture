"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/hooks/use-cart";
import { useLenis } from "@/hooks/use-lenis";
import CustomCursor from "@/components/ui/CustomCursor";

function SmoothScroll({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <SmoothScroll>{children}</SmoothScroll>
      <CustomCursor />
    </CartProvider>
  );
}
