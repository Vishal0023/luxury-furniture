"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/#collections" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

/* Inline brand glyphs (lucide no longer ships social brand icons) */
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14 9h3l.5-3H14V4.5c0-.8.2-1.5 1.6-1.5H17V.2C16.6.1 15.4 0 14.2 0 11.7 0 10 1.6 10 4.2V6H7v3h3v9h4V9z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.5 3h3l-7.1 8.1L21.7 21h-5.9l-4.4-5.6L6.3 21H3.2l7.6-8.7L2.5 3h6l4 5.3L17.5 3zm-1 16h1.6L7.6 4.7H5.9L16.5 19z" />
  </svg>
);

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "Twitter", href: "https://twitter.com", Icon: XIcon },
];

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-lux grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 font-serif text-lg font-semibold">
              A
            </span>
            <span className="font-serif text-2xl font-semibold tracking-[0.25em]">
              AETHEL
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Considered furniture for the modern home — crafted from natural
            materials and made to be lived in for generations.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="eyebrow text-gold-light">Explore</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="eyebrow text-gold-light">Contact</h3>
          <ul className="mt-5 flex flex-col gap-4 text-sm text-cream/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-light" strokeWidth={1.6} />
              <span>14 Weaver&apos;s Lane, Dehradun, Uttarakhand 248001</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 flex-shrink-0 text-gold-light" strokeWidth={1.6} />
              <a href="tel:+919876543210" className="transition-colors hover:text-cream">
                +91 98765 43210
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 flex-shrink-0 text-gold-light" strokeWidth={1.6} />
              <a href="mailto:care@aethel.example" className="transition-colors hover:text-cream">
                care@aethel.example
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="eyebrow text-gold-light">Stay in touch</h3>
          <p className="mt-5 text-sm text-cream/70">
            Be the first to discover new collections and craft stories.
          </p>
          <form
            className="mt-4 flex overflow-hidden rounded-full border border-cream/20"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Your email"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gold px-5 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-gold-light"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-6 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold hover:text-gold-light"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-lux flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} Aethel Furniture. All rights reserved.</p>
          <p>Designed &amp; crafted with care · Frontend concept</p>
        </div>
      </div>
    </footer>
  );
}
