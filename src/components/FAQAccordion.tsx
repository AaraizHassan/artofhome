"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What materials and techniques are used in the artworks?",
    answer: "Our artworks are printed on premium self-textured tapestry and heavy fine-art fabrics. We use high-definition, fade-resistant archival pigment inks that recreate authentic hand-woven textures with vibrant clarity, painterly depth, and rich tactile warmth."
  },
  {
    question: "Can I customize the frame moulding, color, and dimensions?",
    answer: "Yes, absolutely. We offer tailored framing solutions for every piece in our collection. You can select custom dimensions to perfectly fit your wall space, paired with our signature 2.5-inch Italian-style profile mouldings available in antique gold, champagne, distressed silver, matte black, or dark walnut."
  },
  {
    question: "How are fragile framed artworks packaged for nationwide delivery?",
    answer: "We take immense pride in our safe transit record. Every framed artwork is enveloped in shock-absorbent bubble cushioning, reinforced with rigid high-density corner protectors, and securely encased in wooden or heavy-duty crating. In the rare event of transit damage, we provide an immediate replacement guarantee."
  },
  {
    question: "What is the ordering and payment process?",
    answer: "You can submit an order directly through the website or connect with our team on WhatsApp. To begin custom framing and craftsmanship, we require a 50% advance deposit via Meezan Bank transfer, with the remaining balance settled upon delivery confirmation."
  },
  {
    question: "How long does delivery take across Pakistan?",
    answer: "Because each frame is bespoke and hand-assembled, production and quality inspection typically take 4–7 business days. Once dispatched, insured express courier delivery takes 2–3 business days to Karachi, Lahore, Islamabad, Rawalpindi, and cities nationwide."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 border-t border-[#EAE3D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold block mb-2">
            Customer Care & Assistance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-burgundy tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto my-4"></div>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our tapestry artworks, bespoke framing, nationwide delivery, and custom commissions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden transition-all duration-300 shadow-sm hover:shadow"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-stone-900 pr-2">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E5DEC9] flex items-center justify-center text-burgundy transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-burgundy text-white border-burgundy" : ""
                    }`}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-stone-600 leading-relaxed border-t border-[#F0EBE3]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-[#E8E1D5] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="font-serif text-xl text-stone-900 font-medium">
              Have another question or custom size requirement?
            </h3>
            <p className="text-stone-600 text-sm mt-1">
              Speak directly with our studio team on WhatsApp for immediate guidance.
            </p>
          </div>
          <a
            href="https://wa.me/923378639893?text=Hi%2C%20I%20have%20a%20question%20about%20Art%20of%20Home%20paintings."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow hover:shadow-md flex-shrink-0"
          >
            <FaWhatsapp size={16} />
            Ask on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
