import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — Aethel Furniture",
  description:
    "Securely complete your Aethel furniture order. Contact, delivery and payment — a smooth, front-end checkout experience.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
