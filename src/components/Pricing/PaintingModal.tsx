"use client";

import Image, { StaticImageData } from "next/image";
import { X, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

interface Painting {
  id: string;
  title: string;
  image: string | StaticImageData;
  description: string;
  dimensions: string[];
  prices: number[];
}

interface PaintingModalProps {
  painting: Painting | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaintingModal({ painting, isOpen, onClose }: PaintingModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSelectedIndex(0);
    setSuccess(false);
  }, [painting]);

  if (!isOpen || !painting) return null;

  const originalPrice = painting.prices[selectedIndex] || 0;
  const price = originalPrice;
  const advance = price / 2;

  const submitForm = async () => {
    if (!name || !phone) {
      alert("Name and phone are required.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/send-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          paintingId: painting.id,
          dimension: painting.dimensions[selectedIndex],
          totalAmount: price,
          advanceAmount: advance,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
      } else {
        alert("Failed to submit order. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col md:flex-row overflow-hidden border border-[#EAE3D9]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-stone-100 text-stone-700 rounded-full p-2 border border-[#E5DEC9] shadow-sm transition-colors"
        >
          <X size={20} />
        </button>

        {/* IMAGE SIDE */}
        <div className="w-full md:w-1/2 bg-[#FAF7F2] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#EAE3D9] overflow-hidden">
          <div className="relative w-full max-h-[350px] md:max-h-[550px] aspect-square flex items-center justify-center">
            <Image
              src={painting.image}
              alt={painting.title}
              width={700}
              height={700}
              className="max-h-full w-auto object-contain rounded-xl shadow-md border border-[#E5DEC9]"
              priority
            />
          </div>
        </div>

        {/* DETAILS & ORDER FORM SIDE */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-6">
          
          {/* Header */}
          <div>
            <span className="text-[11px] font-mono tracking-widest text-gold-600 uppercase font-semibold">
              Artwork Details
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-burgundy mt-1">
              {painting.title}
            </h2>
          </div>

          {/* Description Bullets */}
          <div className="text-sm text-stone-700 leading-relaxed border-t border-[#F0EBE3] pt-4">
            <ul className="list-disc ml-5 space-y-1.5 marker:text-gold-500">
              {painting.description.split("\n").map((line, index) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                return <li key={index}>{trimmed}</li>;
              })}
            </ul>
          </div>

          {/* Dimensions & Customization */}
          <div className="bg-[#FAF7F2] border border-[#EBE4DA] rounded-xl p-4">
            <p className="font-semibold text-sm text-stone-900 mb-1">Dimensions and Frame can be customized</p>
            <p className="text-xs text-stone-600 mb-3">Prices will vary based on the customization</p>
            
            <p className="font-semibold text-xs tracking-wider uppercase text-burgundy mb-2">Order Now:</p>
            <div className="flex gap-2 flex-wrap">
              {painting.dimensions.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    selectedIndex === i
                      ? "bg-burgundy text-white border-burgundy shadow-sm"
                      : "bg-white text-stone-700 border-[#E2DBD0] hover:bg-stone-50"
                  }`}
                >
                  {d || "Standard Size"}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Advance */}
          <div className="bg-[#FAF7F2] border border-[#EBE4DA] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">Price</p>
              <p className="font-serif text-2xl font-bold text-burgundy">
                PKR {originalPrice.toLocaleString()}
              </p>
            </div>
            <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E8E1D5]">
              <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">50% Advance</p>
              <p className="text-base font-semibold text-stone-800">
                PKR {advance.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="bg-[#FAF7F2] border border-[#EBE4DA] rounded-xl p-4">
            <p className="font-semibold text-xs uppercase tracking-wider text-stone-800 mb-2.5">Contact Now:</p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/923378639893?text=${encodeURIComponent(
                  `Hi, I am interested in "${painting.title}" (${painting.dimensions[selectedIndex] || "Standard Size"})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                <FaWhatsapp size={16} />
                Chat on WhatsApp
              </a>
              <a
                href="tel:+923378639893"
                className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 border border-[#D5CDBD] text-stone-800 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Phone size={14} />
                +92 337 8639893
              </a>
            </div>
          </div>

          {/* Bank Transfer Details (Kept exactly as requested) */}
          <div className="bg-[#FAF7F2] border border-[#EBE4DA] rounded-xl p-4 text-xs text-stone-700 space-y-1">
            <p className="font-semibold text-stone-900 text-sm mb-1">Bank Transfer Details:</p>
            <p><strong>Bank:</strong> Meezan Bank</p>
            <p><strong>Account Title:</strong> Art of Home</p>
            <p><strong>Account Number:</strong> 0123456789</p>
          </div>

          {/* Order Form (Kept exactly as requested) */}
          <div className="pt-2">
            <h3 className="font-serif text-lg font-semibold text-stone-900 mb-3">Order Form</h3>
            <div className="space-y-3">
              <input
                className="w-full border border-[#D8D0C3] p-3 rounded-lg text-sm bg-white focus:outline-none focus:border-burgundy text-stone-800 placeholder:text-stone-400"
                placeholder="Full Name (required)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full border border-[#D8D0C3] p-3 rounded-lg text-sm bg-white focus:outline-none focus:border-burgundy text-stone-800 placeholder:text-stone-400"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full border border-[#D8D0C3] p-3 rounded-lg text-sm bg-white focus:outline-none focus:border-burgundy text-stone-800 placeholder:text-stone-400"
                placeholder="Phone Number (required)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                onClick={submitForm}
                disabled={sending}
                className="w-full bg-burgundy hover:bg-[#521E27] text-white py-3.5 rounded-lg text-xs uppercase tracking-widest font-semibold transition-colors shadow-md disabled:opacity-50"
              >
                {sending ? "Sending..." : "Submit Order"}
              </button>
              {success && (
                <p className="mt-3 text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-sm font-medium text-center">
                  Order submitted successfully!
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
