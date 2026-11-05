"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
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

const getOrientation = (dimensions: string[]): "square" | "portrait" | "landscape" | "unknown" => {
  if (!dimensions || dimensions.length === 0) return "unknown";
  for (const d of dimensions) {
    if (!d) continue;
    const match = d.match(/(\d+)\s*[x×by]\s*(\d+)/i);
    if (match) {
      const w = parseInt(match[1], 10);
      const h = parseInt(match[2], 10);
      if (w === h) return "square";
      if (w < h) return "portrait";
      if (w > h) return "landscape";
    }
  }
  return "unknown";
};

const getArtworkSlug = (painting: Painting): string => {
  const match = painting.id.match(/AHF\d+/);
  if (match) return match[0];
  return painting.id.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

export default function Pricing() {
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeOrientation, setActiveOrientation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Open modal and set URL hash
  const openModal = useCallback((painting: Painting) => {
    setSelectedPainting(painting);
    setIsModalOpen(true);
    if (typeof window !== "undefined") {
      const slug = getArtworkSlug(painting);
      window.history.pushState(null, "", `#${slug}`);
    }
  }, []);

  // Close modal and remove URL hash
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  // Deep-linking: check URL hash on initial load
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rawHash = window.location.hash.replace("#", "").trim();
    if (rawHash) {
      const matched = pricingImages.find((p) => {
        const slug = getArtworkSlug(p).toLowerCase();
        return slug === rawHash.toLowerCase() || p.id.toLowerCase().includes(rawHash.toLowerCase());
      });
      if (matched) {
        setSelectedPainting(matched);
        setIsModalOpen(true);
      }
    }
  }, []);

  // Reset pagination when any filter changes
  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, activeOrientation, sortBy, searchQuery]);

  // Filter and sort artworks
  const filteredPaintings = useMemo(() => {
    const list = pricingImages.filter((item) => {
      // Category filter
      const inCategory = matchesCategory(item, activeCategory);
      if (!inCategory) return false;

      // Orientation filter
      if (activeOrientation !== "all") {
        const orient = getOrientation(item.dimensions);
        if (orient !== activeOrientation) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });

    // Sorting
    return list.sort((a, b) => {
      const priceA = a.prices.find((p) => p > 0) || 0;
      const priceB = b.prices.find((p) => p > 0) || 0;

      if (sortBy === "price-low") {
        return priceA - priceB;
      }
      if (sortBy === "price-high") {
        return priceB - priceA;
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0; // "featured" maintains default catalog order
    });
  }, [activeCategory, activeOrientation, sortBy, searchQuery]);

  // Artworks currently visible based on progressive loading
  const displayedPaintings = useMemo(() => {
    return filteredPaintings.slice(0, visibleCount);
  }, [filteredPaintings, visibleCount]);

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

      {/* Primary Category Filter Tabs */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const count = pricingImages.filter((p) => matchesCategory(p, cat.id)).length;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs uppercase tracking-wider font-medium px-4 py-2.5 rounded-full transition-all duration-300 ${
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

      {/* Secondary Controls Bar: Search, Orientation, and Price Sorting */}
      <div className="max-w-6xl mx-auto mb-8 bg-white/90 border border-[#E8E1D5] rounded-2xl p-3.5 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
        
        {/* Search */}
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-sans px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] focus:outline-none focus:border-burgundy text-stone-800 placeholder:text-stone-400"
          />
        </div>

        {/* Filters Group */}
        <div className="w-full md:w-auto flex flex-wrap items-center justify-between md:justify-end gap-3 text-xs">
          
          {/* Orientation Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-stone-500 font-medium hidden sm:inline">Format:</span>
            <select
              value={activeOrientation}
              onChange={(e) => setActiveOrientation(e.target.value)}
              className="bg-[#FAF7F2] border border-[#E5DEC9] rounded-xl px-3 py-2 text-stone-800 font-medium focus:outline-none focus:border-burgundy cursor-pointer"
            >
              <option value="all">All Formats</option>
              <option value="square">Square</option>
              <option value="portrait">Portrait (Vertical)</option>
              <option value="landscape">Landscape (Horizontal)</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-stone-500 font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF7F2] border border-[#E5DEC9] rounded-xl px-3 py-2 text-stone-800 font-medium focus:outline-none focus:border-burgundy cursor-pointer"
            >
              <option value="featured">Featured Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Name: A to Z</option>
            </select>
          </div>

        </div>
      </div>

      {/* Results Header Count */}
      <div className="max-w-6xl mx-auto mb-6 text-xs text-stone-500 font-medium px-2 flex items-center justify-between">
        <span>
          Showing {Math.min(visibleCount, filteredPaintings.length)} of {filteredPaintings.length}{" "}
          {filteredPaintings.length === 1 ? "artwork" : "artworks"}
        </span>
        {(activeCategory !== "all" || activeOrientation !== "all" || sortBy !== "featured" || searchQuery) && (
          <button
            onClick={() => {
              setActiveCategory("all");
              setActiveOrientation("all");
              setSortBy("featured");
              setSearchQuery("");
            }}
            className="text-burgundy hover:text-gold-600 font-medium underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPaintings.map((item) => {
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

                {/* Subtle Hover Overlay */}
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

      {/* No Artworks Match */}
      {filteredPaintings.length === 0 && (
        <div className="text-center py-16 text-stone-500">
          <p className="font-serif text-xl">No artworks found matching your current filters.</p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setActiveOrientation("all");
              setSortBy("featured");
              setSearchQuery("");
            }}
            className="mt-4 text-xs uppercase tracking-wider font-semibold text-burgundy underline hover:text-gold-600"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Progressive Load More Button (C3) */}
      {visibleCount < filteredPaintings.length && (
        <div className="mt-14 text-center max-w-md mx-auto">
          {/* Progress Bar */}
          <div className="w-full bg-[#E8E1D5] h-1.5 rounded-full overflow-hidden mb-4">
            <div
              className="bg-burgundy h-full transition-all duration-500"
              style={{
                width: `${(displayedPaintings.length / filteredPaintings.length) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-stone-500 mb-4 font-medium">
            Viewing {displayedPaintings.length} of {filteredPaintings.length} artworks
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredPaintings.length))}
              className="px-6 py-3 bg-burgundy hover:bg-[#521E27] text-white text-xs uppercase tracking-widest font-semibold rounded-full shadow-sm hover:shadow transition-all"
            >
              Load More Artworks (+12)
            </button>
            <button
              onClick={() => setVisibleCount(filteredPaintings.length)}
              className="px-5 py-3 bg-white hover:bg-stone-50 border border-[#E8E1D5] text-stone-800 text-xs uppercase tracking-widest font-semibold rounded-full shadow-sm transition-all"
            >
              Show All ({filteredPaintings.length})
            </button>
          </div>
        </div>
      )}

      {/* Modal with deep-linking & share capability */}
      <PaintingModal
        painting={selectedPainting}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
