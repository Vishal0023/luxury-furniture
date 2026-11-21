export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
  badge?: "New" | "Bestseller" | "Limited";
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Halden Velvet 3-Seater Sofa",
    category: "sofas",
    price: 124900,
    originalPrice: 149900,
    image: "/images/product-1.jpg",
    rating: 4.9,
    reviews: 214,
    description:
      "A deep, tufted 3-seater wrapped in brushed-slate velvet with a solid oak plinth base and feather-blend cushions.",
    tags: ["Velvet", "3-Seater", "Oak Base"],
    badge: "Bestseller",
  },
  {
    id: "p2",
    name: "Maren Woven Armchair",
    category: "chairs",
    price: 58900,
    image: "/images/product-2.jpg",
    rating: 4.8,
    reviews: 132,
    description:
      "Hand-woven natural cane seat resting on a warm walnut frame — a quiet statement for reading nooks.",
    tags: ["Cane", "Walnut", "Accent"],
  },
  {
    id: "p3",
    name: "Norvik Solid Oak Dining Table",
    category: "tables",
    price: 96500,
    image: "/images/product-3.jpg",
    rating: 4.9,
    reviews: 88,
    description:
      "A generous oak table with a live edge and a low-sheen natural finish, seating eight in calm confidence.",
    tags: ["Oak", "Dining", "8-Seat"],
    badge: "New",
  },
  {
    id: "p4",
    name: "Astrid Upholstered Bed",
    category: "beds",
    price: 142000,
    image: "/images/product-4.jpg",
    rating: 4.9,
    reviews: 167,
    description:
      "A low-profile upholstered bed with a channel-quilted headboard and a solid ash frame for restful nights.",
    tags: ["Upholstered", "Queen", "Ash Frame"],
  },
  {
    id: "p5",
    name: "Lumen Brass Floor Lamp",
    category: "lighting",
    price: 34500,
    originalPrice: 42000,
    image: "/images/product-5.jpg",
    rating: 4.7,
    reviews: 96,
    description:
      "A slim brass stem topped with a hand-stitched linen shade, casting a warm, diffused pool of light.",
    tags: ["Brass", "Floor Lamp", "Linen Shade"],
  },
  {
    id: "p6",
    name: "Eira Rattan Lounge Chair",
    category: "chairs",
    price: 49800,
    image: "/images/product-6.jpg",
    rating: 4.8,
    reviews: 74,
    description:
      "A sculptural lounge chair with hand-finished rattan and a beige bouclé cushion for sunlit corners.",
    tags: ["Rattan", "Bouclé", "Lounge"],
  },
  {
    id: "p7",
    name: "Soren Marble Console Table",
    category: "tables",
    price: 72300,
    image: "/images/product-7.jpg",
    rating: 4.8,
    reviews: 61,
    description:
      "A slim console in honed Carrara marble with a brushed brass under-frame for entryways and hallways.",
    tags: ["Marble", "Console", "Brass"],
    badge: "Limited",
  },
  {
    id: "p8",
    name: "Vesper Storage Cabinet",
    category: "storage",
    price: 65900,
    image: "/images/product-8.jpg",
    rating: 4.7,
    reviews: 53,
    description:
      "A low wooden cabinet with recessed pulls and softly closed doors — storage that disappears into the room.",
    tags: ["Storage", "Wood", "Minimal"],
  },
  {
    id: "p9",
    name: "Celina Linen Loveseat",
    category: "sofas",
    price: 98500,
    image: "/images/sofa-2.jpg",
    rating: 4.9,
    reviews: 121,
    description:
      "A compact loveseat in stone-washed linen with loose, feather-filled back cushions and tapered legs.",
    tags: ["Linen", "2-Seater", "Relaxed"],
  },
  {
    id: "p10",
    name: "Orson Walnut Side Table",
    category: "tables",
    price: 28900,
    image: "/images/table-2.jpg",
    rating: 4.7,
    reviews: 48,
    description:
      "A perfectly proportioned side table in rich walnut with a floating top and a tapered pedestal.",
    tags: ["Walnut", "Side Table"],
  },
  {
    id: "p11",
    name: "Nora Pendant Light",
    category: "lighting",
    price: 26400,
    image: "/images/light-1.jpg",
    rating: 4.8,
    reviews: 82,
    description:
      "A hand-blown opal glass pendant that spreads a soft, even glow over dining tables and kitchen islands.",
    tags: ["Pendant", "Glass", "Warm Glow"],
    badge: "New",
  },
  {
    id: "p12",
    name: "Kelvin Leather Lounge Chair",
    category: "chairs",
    price: 81700,
    originalPrice: 95000,
    image: "/images/chair-2.jpg",
    rating: 4.9,
    reviews: 109,
    description:
      "Full-grain leather draped over a swivel plinth — an aged, lived-in lounge chair with quiet confidence.",
    tags: ["Leather", "Lounge", "Swivel"],
    badge: "Bestseller",
  },
];
