"use client";

import { useState, useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import PaintingModal from "./PaintingModal";
import { pricingImages } from "@/data/pricing";

interface Painting {
  id: string;
  title: string;
  image: string | StaticImageData;
  description: string;
  dimensions: string[];
  prices: number[];
}

const categories = [
  { id: "all", label: "All Works" },
  { id: "calligraphy", label: "Islamic Calligraphy" },
  { id: "equine", label: "Equestrian & Wildlife" },
  { id: "heritage", label: "Mughal & Heritage" },
  { id: "vintage", label: "Vintage & Renaissance" },
  { id: "mirrors", label: "Mirrors & Decor" },
];

const matchesCategory = (item: Painting, catId: string): boolean => {
  if (catId === "all") return true;
  const text = `${item.title} ${item.description}`.toLowerCase();

  switch (catId) {
    case "calligraphy":
      return /calligraphy|islamic|surah|dua|qul|fatiha|kausar|kusar|kursi|dervish|sufi|devotion|sacred|supplication|barakah/.test(text);
    case "equine":
      return /horse|horses|stallion|stallions|steed|gallop|cheetah|crane|cranes|cranescape|wildlife|wings|dove|rider/.test(text);
    case "heritage":
      return /mughal|jashn|taj|shah jahan|mumtaz|desi|village|chai|loom|dewaani|rekha|potter|heritage|carpet|kilim/.test(text);
    case "vintage":
      return /vintage|tapestry|atelier|tailor|tudor|medieval|victorian|still life|vermeer|pearl earring|baroque|cartographer|globe|chronometer|antique|renaissance/.test(text);
    case "mirrors":
      return /mirror|3d|shadow art|relief|sculpture/.test(text);
    default:
      return true;
  }
};

export default function Pricing() {
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const openModal = (painting: Painting) => {
    setSelectedPainting(painting);
    setIsModalOpen(true);
  };

  const filteredPaintings = useMemo(() => {
    return pricingImages.filter((item) => {
      const inCategory = matchesCategory(item, activeCategory);
      if (!inCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  // Parse title into Artwork Name and SKU code if present
  const parseTitle = (rawTitle: string) => {
    if (rawTitle.includes(" - AHF")) {
      const [name, code] = rawTitle.split(" - ");
      return { name: name.trim(), code: code?.trim() };
    }
    return { name: rawTitle, code: null };
  };

  // Format price
  const formatPrice = (prices: number[], dimensions: string[]) => {
    const validPrices = prices.filter((p) => p > 0);
    if (validPrices.length === 0) return "Price on Request";
    const minPrice = Math.min(...validPrices);
    if (dimensions.length > 1 && validPrices.length > 1) {
      return `Starting from PKR ${minPrice.toLocaleString()}`;
    }
    return `PKR ${minPrice.toLocaleString()}`;
  };

  return (
    <section id="gallery" className="py-16 md:py-24 px-4 sm:px-6 bg-warm-cream">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold">
          Curated Atelier Collection
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-burgundy mt-2 mb-4 tracking-tight">
          The Art Gallery
        </h2>
        <div className="w-16 h-[2px] bg-gold-400 mx-auto mb-4"></div>
        <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Explore our handcrafted tapestry and textured artworks, framed in Italian mouldings and made to elevate your living spaces.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const count = pricingImages.filter((p) => matchesCategory(p, cat.id)).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs uppercase tracking-wider font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-burgundy text-white shadow-sm"
                    : "bg-white/80 text-stone-700 hover:bg-white hover:text-burgundy border border-[#E5DEC9]"
                }`}
              >
                {cat.label} <span className="opacity-70 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-sans px-4 py-2.5 rounded-full bg-white border border-[#E5DEC9] focus:outline-none focus:border-burgundy text-stone-800 placeholder:text-stone-400 shadow-sm"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-6xl mx-auto mb-6 text-xs text-stone-500 font-medium px-2">
        Showing {filteredPaintings.length} {filteredPaintings.length === 1 ? "artwork" : "artworks"}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPaintings.map((item) => {
          const { name, code } = parseTitle(item.title);
          const priceLabel = formatPrice(item.prices, item.dimensions);
          const validDims = item.dimensions.filter((d) => d && d.trim().length > 0);

          return (
            <div
              key={item.id}
              className="group cursor-pointer bg-white rounded-2xl p-3 border border-[#E8E1D5] hover:border-gold-400/60 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              onClick={() => openModal(item)}
            >
              {/* Image Frame Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-100 border border-[#F0EBE3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  placeholder="blur"
                />

                {/* Subtle Hover Overlay with Quick View hint */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-xs uppercase tracking-widest font-semibold text-white bg-burgundy/90 px-4 py-2 rounded-full backdrop-blur-sm shadow-md">
                    View Details
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="pt-4 pb-2 px-1 flex flex-col flex-grow justify-between">
                <div>
                  {code && (
                    <span className="text-[11px] font-mono tracking-wider text-gold-600 font-medium uppercase block mb-1">
                      {code}
                    </span>
                  )}
                  <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-burgundy transition-colors line-clamp-1">
                    {name}
                  </h3>
                </div>

                <div className="mt-3 pt-3 border-t border-[#F0EBE3] flex items-center justify-between gap-2">
                  <span className="font-sans text-sm font-semibold text-burgundy">
                    {priceLabel}
                  </span>

                  {validDims.length > 0 && (
                    <span className="text-[11px] font-sans text-stone-600 bg-warm-cream border border-[#E8E1D5] px-2 py-0.5 rounded-md">
                      {validDims[0]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPaintings.length === 0 && (
        <div className="text-center py-16 text-stone-500">
          <p className="font-serif text-xl">No artworks found matching your search.</p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 text-xs uppercase tracking-wider font-semibold text-burgundy underline hover:text-gold-600"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Modal - keeping exact form and banking details intact */}
      <PaintingModal
        painting={selectedPainting}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
