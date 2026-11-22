"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Lock,
  Truck,
  CreditCard,
  MapPin,
  Mail,
  Phone,
  User,
  Package,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

type Step = "contact" | "delivery" | "payment";

const STEPS: { id: Step; label: string }[] = [
  { id: "contact", label: "Contact" },
  { id: "delivery", label: "Delivery" },
  { id: "payment", label: "Payment" },
];

const DELIVERY_OPTIONS = [
  {
    id: "standard",
    name: "Standard Delivery",
    detail: "5–7 business days · Free",
    price: 0,
  },
  {
    id: "express",
    name: "Express Delivery",
    detail: "2–3 business days · ₹499",
    price: 499,
  },
];

const inputBase =
  "w-full rounded-xl border bg-cream px-4 py-3 text-sm text-charcoal placeholder:text-stone transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60";

function Field({
  label,
  icon,
  error,
  ...props
}: {
  label: string;
  icon?: ReactNode;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-mocha">
        {icon}
        {label}
      </span>
      <input
        {...props}
        className={`${inputBase} ${error ? "border-red-400/60" : "border-charcoal/15"}`}
      />
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

export default function CheckoutClient() {
  const { items, cartTotal, removeFromCart, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("contact");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => setMounted(true), []);

  const setField =
    (key: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  const setPay =
    (key: keyof typeof payment) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setPayment((p) => ({ ...p, [key]: e.target.value }));

  const subtotal = cartTotal;
  const deliveryFee = delivery === "express" ? 499 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + deliveryFee + tax;

  const validateContact = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Enter a valid phone number.";
    if (!form.address.trim()) e.address = "Please enter your delivery address.";
    if (!form.city.trim()) e.city = "Enter your city.";
    if (form.pincode.replace(/\D/g, "").length < 5)
      e.pincode = "Enter a valid pincode.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (!payment.cardName.trim()) e.cardName = "Name on card is required.";
    if (payment.cardNumber.replace(/\s/g, "").length < 12)
      e.cardNumber = "Enter a valid card number.";
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry))
      e.expiry = "Use MM/YY format.";
    if (payment.cvc.replace(/\D/g, "").length < 3)
      e.cvc = "3–4 digit CVC.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (step === "contact" && validateContact()) setStep("delivery");
    if (step === "payment" && validatePayment()) placeOrder();
  };
  const goBack = () => setStep(step === "contact" ? "contact" : STEPS[STEPS.findIndex((s) => s.id === step) - 1].id);

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setOrderId("AT-" + Math.floor(100000 + Math.random() * 900000));
      setPlaced(true);
      setPlacing(false);
      clearCart();
    }, 1300);
  };

  const formatCard = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  // Skeleton until mounted to avoid hydration mismatch with persisted cart.
  if (!mounted) {
    return (
      <div className="container-lux py-32">
        <div className="mx-auto h-8 w-56 animate-pulse rounded bg-sand/70" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="h-96 rounded-3xl bg-sand/50" />
          <div className="h-96 rounded-3xl bg-sand/50" />
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="container-lux flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-cream"
        >
          <Check className="h-9 w-9" strokeWidth={2.4} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="eyebrow mt-7"
        >
          Order Confirmed
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="mt-3 font-serif text-4xl text-charcoal"
        >
          Thank you for your order
        </motion.h1>
        <p className="mt-4 max-w-md text-mocha">
          A confirmation has been sent to your email. Your pieces are being
          prepared with care and will be on their way shortly.
        </p>
        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-5 py-2.5 text-sm">
          <Package className="h-4 w-4 text-gold" strokeWidth={1.6} />
          Order <span className="font-semibold text-charcoal">{orderId}</span>
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/shop" className="btn-primary px-7 py-3.5 text-sm">
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="btn-outline px-7 py-3.5 text-sm"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-lux flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sand">
          <Package className="h-9 w-9 text-stone" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-serif text-3xl text-charcoal">
          Your cart is empty
        </h1>
        <p className="mt-3 text-mocha">
          Add a few pieces to your cart before heading to checkout.
        </p>
        <Link href="/shop" className="btn-primary mt-8 px-7 py-3.5 text-sm">
          Browse the Collection
        </Link>
      </div>
    );
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div className="bg-cream pt-28 pb-24">
      <div className="container-lux">
        <Link
          href="/shop"
          className="link-underline inline-flex items-center gap-1.5 text-sm text-mocha hover:text-charcoal"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.7} />
          Back to shop
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_400px]">
          {/* Form column */}
          <div>
            {/* Stepper */}
            <div className="flex items-center gap-2">
              {STEPS.map((s, i) => {
                const done = i < stepIndex;
                const active = i === stepIndex;
                return (
                  <div key={s.id} className="flex flex-1 items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        i < stepIndex && setStep(s.id)
                      }
                      disabled={i > stepIndex}
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors"
                      style={{
                        borderColor:
                          done || active ? "var(--color-charcoal)" : "var(--color-taupe)",
                        backgroundColor:
                          done || active ? "var(--color-charcoal)" : "transparent",
                        color: done || active ? "var(--color-cream)" : "var(--color-mocha)",
                      }}
                    >
                      {done ? <Check className="h-4 w-4" strokeWidth={2.4} /> : i + 1}
                    </button>
                    <span
                      className={`text-sm ${
                        active ? "font-medium text-charcoal" : "text-stone"
                      }`}
                    >
                      {s.label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span className="mx-1 h-px flex-1 bg-charcoal/10" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step content */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-charcoal/8 bg-cream/60">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="p-7 sm:p-9"
                >
                  {step === "contact" && (
                    <>
                      <SectionTitle
                        eyebrow="Step 1"
                        title="Contact & Shipping"
                        icon={<MapPin className="h-4 w-4" strokeWidth={1.6} />}
                      />
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <Field
                          label="Full name"
                          icon={<User className="h-3.5 w-3.5" strokeWidth={1.7} />}
                          value={form.fullName}
                          onChange={setField("fullName")}
                          placeholder="Ananya Rao"
                          error={errors.fullName}
                        />
                        <Field
                          label="Phone"
                          icon={<Phone className="h-3.5 w-3.5" strokeWidth={1.7} />}
                          value={form.phone}
                          onChange={setField("phone")}
                          placeholder="+91 98765 43210"
                          error={errors.phone}
                        />
                        <Field
                          label="Email"
                          icon={<Mail className="h-3.5 w-3.5" strokeWidth={1.7} />}
                          type="email"
                          value={form.email}
                          onChange={setField("email")}
                          placeholder="you@example.com"
                          error={errors.email}
                        />
                        <div className="sm:col-span-2">
                          <Field
                            label="Delivery address"
                            icon={<MapPin className="h-3.5 w-3.5" strokeWidth={1.7} />}
                            value={form.address}
                            onChange={setField("address")}
                            placeholder="14, Weaver's Lane, Dehradun"
                            error={errors.address}
                          />
                        </div>
                        <Field
                          label="City"
                          value={form.city}
                          onChange={setField("city")}
                          placeholder="Dehradun"
                          error={errors.city}
                        />
                        <Field
                          label="Pincode"
                          value={form.pincode}
                          onChange={setField("pincode")}
                          placeholder="248001"
                          error={errors.pincode}
                        />
                      </div>
                    </>
                  )}

                  {step === "delivery" && (
                    <>
                      <SectionTitle
                        eyebrow="Step 2"
                        title="Delivery Method"
                        icon={<Truck className="h-4 w-4" strokeWidth={1.6} />}
                      />
                      <div className="mt-6 grid gap-4">
                        {DELIVERY_OPTIONS.map((opt) => {
                          const selected = delivery === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setDelivery(opt.id)}
                              className={`flex items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                                selected
                                  ? "border-charcoal bg-sand"
                                  : "border-charcoal/10 bg-cream hover:border-charcoal/30"
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <span
                                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                    selected ? "border-charcoal" : "border-taupe"
                                  }`}
                                >
                                  {selected && (
                                    <span className="h-2.5 w-2.5 rounded-full bg-charcoal" />
                                  )}
                                </span>
                                <span>
                                  <span className="block font-medium text-charcoal">
                                    {opt.name}
                                  </span>
                                  <span className="block text-sm text-mocha">
                                    {opt.detail}
                                  </span>
                                </span>
                              </span>
                              <span className="text-sm font-semibold text-charcoal">
                                {opt.price === 0 ? "Free" : formatPrice(opt.price)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {step === "payment" && (
                    <>
                      <SectionTitle
                        eyebrow="Step 3"
                        title="Payment"
                        icon={<CreditCard className="h-4 w-4" strokeWidth={1.6} />}
                      />
                      <div className="mt-5 flex items-center gap-2 rounded-xl bg-sand/60 px-4 py-3 text-xs text-mocha">
                        <Lock className="h-4 w-4 flex-shrink-0 text-gold" strokeWidth={1.6} />
                        This is a front-end demo — no real payment is processed.
                      </div>
                      <div className="mt-6 grid gap-4">
                        <Field
                          label="Name on card"
                          value={payment.cardName}
                          onChange={setPay("cardName")}
                          placeholder="ANANYA RAO"
                          error={errors.cardName}
                        />
                        <Field
                          label="Card number"
                          icon={<CreditCard className="h-3.5 w-3.5" strokeWidth={1.7} />}
                          value={payment.cardNumber}
                          onChange={(e) =>
                            setPayment((p) => ({
                              ...p,
                              cardNumber: formatCard(e.target.value),
                            }))
                          }
                          placeholder="4111 2222 3333 4444"
                          error={errors.cardNumber}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Field
                            label="Expiry"
                            value={payment.expiry}
                            onChange={setPay("expiry")}
                            placeholder="MM/YY"
                            error={errors.expiry}
                          />
                          <Field
                            label="CVC"
                            value={payment.cvc}
                            onChange={setPay("cvc")}
                            placeholder="123"
                            error={errors.cvc}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Nav buttons */}
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={step === "contact"}
                      className="inline-flex items-center gap-1.5 text-sm text-mocha transition-colors enabled:hover:text-charcoal disabled:opacity-40"
                    >
                      <ArrowLeft className="h-4 w-4" strokeWidth={1.7} />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={placing}
                      className="btn-primary inline-flex px-7 py-3.5 text-sm disabled:opacity-60"
                    >
                      {step === "payment"
                        ? placing
                          ? "Processing…"
                          : `Pay ${formatPrice(total)}`
                        : "Continue"}
                      <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-stone">
              <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.6} />
              Secure checkout · 30-day easy returns
            </p>
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-charcoal/8 bg-cream/60 p-7">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-charcoal">
                  Order Summary
                </h2>
                <span className="eyebrow">{items.length} items</span>
              </div>

              <ul className="mt-5 flex flex-col gap-5">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-sand">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                      <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-charcoal px-1.5 text-[11px] font-semibold text-cream">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <div className="flex justify-between gap-2">
                        <p className="text-sm font-medium leading-snug text-charcoal">
                          {item.product.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-xs text-stone underline-offset-2 transition-colors hover:text-charcoal hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-mocha">
                        {formatPrice(item.product.price)} each
                      </p>
                    </div>
                    <span className="self-center text-sm font-semibold text-charcoal">
                      {formatPrice(item.product.price * item.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2 border-t border-charcoal/10 pt-5 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row
                  label="Delivery"
                  value={
                    deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)
                  }
                />
                <Row label="Tax (8%)" value={formatPrice(tax)} />
                <div className="flex items-center justify-between border-t border-charcoal/10 pt-4">
                  <span className="font-medium text-charcoal">Total</span>
                  <span className="font-serif text-xl font-semibold text-charcoal">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-sand/60 px-4 py-3 text-xs text-mocha">
                <Sparkles className="h-4 w-4 flex-shrink-0 text-gold" strokeWidth={1.6} />
                Free white-glove delivery & installation on every order.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  icon,
}: {
  eyebrow: string;
  title: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-cream">
        {icon}
      </span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="font-serif text-2xl text-charcoal">{title}</h2>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-mocha">{label}</span>
      <span className="text-charcoal">{value}</span>
    </div>
  );
}
