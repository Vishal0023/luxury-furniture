# Aethel — Premium Furniture Website

A visually stunning, luxury furniture brand website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** and **Lenis** smooth scrolling. Frontend-only — all data is static and shopping interactions use React state (no database, backend or APIs).

## ✨ Features

- **Premium luxury aesthetic** — warm neutral palette, elegant serif typography, generous whitespace.
- **Homepage** — animated Hero with parallax, Featured Categories, Trending Products, Brand Story, Featured Collections (asymmetric grid), Why Choose Us, Testimonials slider and Newsletter.
- **Shop page** — live product search, category filtering, sorting, deep-linked filters (`?category=…`, `?q=…`), fully server-rendered for SEO.
- **Shopping interactions** — wishlist toggle, add-to-cart, cart counter, slide-in cart & wishlist drawers (React state only).
- **Animations** — scroll-triggered reveals, staggered product cards, text reveals, parallax, magnetic buttons, animated counters, custom cursor and smooth scrolling via Lenis.
- **Accessibility & performance** — `prefers-reduced-motion` support, responsive design, lazy-loaded images, semantic HTML, SEO metadata.

## 🧱 Tech Stack

| Layer        | Choice                                   |
| ------------ | ---------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack)       |
| Language     | TypeScript                               |
| Styling      | Tailwind CSS v4                          |
| Animation    | Framer Motion                            |
| Smooth scroll | Lenis                                    |
| Icons        | Lucide React                             |

## 🚀 Getting Started

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

Requires **Node.js 20+**.

## 📁 Project Structure

```
src/
├── app/                     # Pages & layouts (/, /shop)
├── components/
│   ├── layout/              # Navbar, Footer, cart/wishlist drawers
│   ├── home/                # Homepage sections
│   ├── products/            # Product card & grid
│   ├── shop/                # Shop page logic (search/filter/sort)
│   ├── providers/           # App providers (cart, smooth scroll, cursor)
│   └── ui/                  # Reveal, MagneticButton, AnimatedCounter, Cursor
├── data/                    # Static products & categories
├── hooks/                   # use-cart (state), use-lenis (smooth scroll)
└── lib/                     # Utilities
public/images/               # Furniture photography
.github/workflows/           # CI (lint + build) & CD (Vercel deploy)
```

## 🔄 CI / CD

- **`.github/workflows/ci.yml`** — runs lint + production build on every push and pull request to `main`.
- **`.github/workflows/deploy.yml`** — deploys to Vercel on pushes to `main`. Add these repository secrets to enable it: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. Alternatively, connect the repo to Vercel's native Git integration for automatic deployments.

## 📝 Notes

- All product data, prices and reviews are **dummy/static** content for demonstration.
- Images are sourced royalty-free photography stored locally in `public/images/`.
- No authentication, database or server-side business logic — purely a frontend concept.
