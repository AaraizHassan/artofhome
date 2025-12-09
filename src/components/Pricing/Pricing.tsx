"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import PaintingModal from "./PaintingModal";
import { pricingImages } from "@/data/pricing";

export default function Pricing() {
    interface Painting {
        id: string;
        title: string;
        image: string | StaticImageData;
        description: string;
        dimensions: string[];
        prices: number[];
    }
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (painting: Painting) => {
    setSelectedPainting(painting);
    setIsModalOpen(true);
  };

  return (
    <section className="py-1 px-6">
      <h2 className="text-5xl font-bold mb-8 text-center">Gallery</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingImages.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer"
            onClick={() => openModal(item)}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={400}
              className="rounded-xl shadow"
              placeholder="blur"
              // blurDataURL="data:image..."
            />

            {/* BELOW IMAGE */}
            <p className="mt-2 font-bold">{item.title}</p>
            <p className="text-gray-600 text-sm">
              Starting at PKR {item.prices[0]}
            </p>
            <p className="text-gray-600 text-sm">
              Sizes: {item.dimensions.join(", ")}
            </p>
          </div>
        ))}
      </div>

      <PaintingModal
        painting={selectedPainting}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
