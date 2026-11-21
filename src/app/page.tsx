import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TrendingProducts from "@/components/home/TrendingProducts";
import BrandStory from "@/components/home/BrandStory";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

const marquee = [
  "Free white-glove delivery",
  "30-day easy returns",
  "Solid hardwood frames",
  "Handcrafted in limited batches",
  "Natural & sustainable materials",
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Brand promise marquee */}
      <div className="border-y border-charcoal/10 bg-cream py-4">
        <div className="relative flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-12 pr-12">
            {[...marquee, ...marquee].map((line, i) => (
              <span
                key={i}
                className="flex items-center gap-12 whitespace-nowrap font-serif text-lg text-mocha"
              >
                {line}
                <span className="text-gold">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <FeaturedCategories />
      <TrendingProducts />
      <BrandStory />
      <FeaturedCollections />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
