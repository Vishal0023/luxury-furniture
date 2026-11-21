"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductGrid from "@/components/products/ProductGrid";
import Reveal from "@/components/ui/Reveal";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

export default function ShopClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");

  // Apply deep-linked filters (?category=…, ?q=…) from the URL on mount.
  // The full collection is server-rendered first for SEO, then filtered
  // client-side — keeping the page fully static.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("category");
    const q = params.get("q");
    if (c) setCategory(c);
    if (q) setQuery(q);
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory =
        category === "all" || p.category === category;
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        p.description.toLowerCase().includes(query.trim().toLowerCase()) ||
        p.tags.some((t) =>
          t.toLowerCase().includes(query.trim().toLowerCase()),
        );
      return matchesCategory && matchesQuery;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [query, category, sort]);

  const hasFilters = query.trim() !== "" || category !== "all";

  return (
    <div className="bg-cream pt-32 pb-24">
      <div className="container-lux">
        {/* Header */}
        <Reveal>
          <p className="eyebrow">The Shop</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Furniture for every room
          </h1>
          <p className="mt-3 max-w-xl text-mocha">
            Browse the full collection — filter by category, search by name or
            material, and sort to find your perfect piece.
          </p>
        </Reveal>

        {/* Toolbar */}
        <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone" strokeWidth={1.6} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, materials, tags…"
              aria-label="Search products"
              className="w-full rounded-full border border-charcoal/12 bg-cream py-3.5 pl-12 pr-10 text-sm text-charcoal placeholder:text-stone focus:border-charcoal/40 focus:outline-none focus:ring-2 focus:ring-charcoal/10"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-stone hover:bg-charcoal/5"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="flex items-center gap-2 text-sm text-mocha">
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.6} />
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-charcoal/12 bg-cream px-5 py-3 text-sm text-charcoal focus:border-charcoal/40 focus:outline-none focus:ring-2 focus:ring-charcoal/10"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[{ id: "all", name: "All" }, ...categories].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              aria-pressed={category === cat.id}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                category === cat.id
                  ? "border-charcoal bg-charcoal text-cream"
                  : "border-charcoal/15 text-mocha hover:border-charcoal/40 hover:text-charcoal"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-mocha">
            Showing{" "}
            <span className="font-medium text-charcoal">{filtered.length}</span>{" "}
            piece{filtered.length === 1 ? "" : "s"}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="link-underline text-sm text-mocha hover:text-charcoal"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="mt-8">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}
