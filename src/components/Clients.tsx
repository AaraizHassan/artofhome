"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { clients } from "@/data/clients";

const Clients: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => ((prev! + 1) % clients.length));
  }, [activePhotoIndex]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => ((prev! - 1 + clients.length) % clients.length));
  }, [activePhotoIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") setActivePhotoIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, handleNext, handlePrev]);

  return (
    <section id="clients" className="py-16 lg:py-24 border-t border-[#EAE3D9]">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold block mb-2">
          In Real Spaces
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-burgundy tracking-tight">
          Client Homes & Wall Installations
        </h2>
        <div className="w-16 h-[2px] bg-gold-400 mx-auto my-4"></div>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          A glimpse into the homes, living rooms, and private collections where Art of Home artworks bring warmth, grace, and timeless presence.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-6">
        {clients.map((client, index) => (
          <div
            key={client.id}
            onClick={() => setActivePhotoIndex(index)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-stone-100 border border-[#E8E1D5] hover:border-gold-400 shadow-sm hover:shadow-xl transition-all duration-500 aspect-[4/5]"
          >
            <Image
              src={client.image}
              alt={client.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              placeholder="blur"
              blurDataURL={client.image.blurDataURL}
            />

            {/* Hover Backdrop & Prompt */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-white bg-burgundy/90 px-4 py-2 rounded-full backdrop-blur-sm shadow-md">
                View Full Size
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-sm transition-colors z-50"
          >
            <X size={24} />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous Image"
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-colors z-50"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next Image"
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-colors z-50"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[75vh]">
              <Image
                src={clients[activePhotoIndex].image}
                alt={clients[activePhotoIndex].alt}
                fill
                className="object-contain rounded-xl"
                priority
              />
            </div>
            <p className="mt-4 text-xs font-sans uppercase tracking-widest text-gold-200">
              Client Wall Installation {activePhotoIndex + 1} of {clients.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Clients;
