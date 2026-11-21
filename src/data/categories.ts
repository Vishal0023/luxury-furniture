export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
};

export const categories: Category[] = [
  {
    id: "sofas",
    name: "Sofas",
    description: "Sculptural lounges in velvet, linen & leather",
    image: "/images/sofa-1.jpg",
    count: 24,
  },
  {
    id: "chairs",
    name: "Chairs",
    description: "Statement seating crafted for quiet comfort",
    image: "/images/chair-1.jpg",
    count: 38,
  },
  {
    id: "tables",
    name: "Tables",
    description: "Dining, console & side tables in warm timber",
    image: "/images/table-1.jpg",
    count: 21,
  },
  {
    id: "beds",
    name: "Beds",
    description: "Restorative sleep systems with refined detail",
    image: "/images/bed-1.jpg",
    count: 16,
  },
  {
    id: "lighting",
    name: "Lighting",
    description: "Pendants, floor lamps & ambient glow",
    image: "/images/light-1.jpg",
    count: 29,
  },
  {
    id: "storage",
    name: "Storage",
    description: "Shelving, cabinets & minimalist organization",
    image: "/images/storage-1.jpg",
    count: 18,
  },
];
