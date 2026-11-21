import type { Metadata } from "next";
import ShopClient from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop — Aethel Furniture",
  description:
    "Browse the full Aethel furniture collection. Sofas, chairs, tables, beds, lighting and storage — crafted in natural materials.",
};

export default function ShopPage() {
  return <ShopClient />;
}
