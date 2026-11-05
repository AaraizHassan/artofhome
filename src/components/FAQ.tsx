"use client";

import Image from "next/image";
import { awards } from "@/data/faq";

const Awards: React.FC = () => {
    return (
        <section id="awards" className="py-16 lg:py-24 border-t border-[#EAE3D9]">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                
                {/* LEFT SECTION */}
                <div className="lg:w-1/3 lg:sticky lg:top-28">
                    <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold block mb-2">
                        Recognition & Honors
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-burgundy tracking-tight leading-tight">
                        Certifications & Achievements
                    </h2>
                    <div className="w-12 h-[2px] bg-gold-400 my-5"></div>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                        A celebration of artistic excellence, craftsmanship recognition, and trade mission honors received across Pakistan and internationally.
                    </p>
                </div>

                {/* RIGHT SECTION — AWARDS GRID */}
                <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {awards.map((award, index) => {
                        const displayTitle = award.title?.trim() || "National Recognition in Artisan Craft";
                        return (
                            <div 
                                key={index} 
                                className="group bg-white border border-[#E8E1D5] hover:border-gold-400/80 p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="w-full h-56 relative mb-4 bg-[#FAF7F2] rounded-xl overflow-hidden border border-[#F0EBE3] p-2 flex items-center justify-center">
                                    <Image
                                        src={award.image}
                                        alt={displayTitle}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-serif text-base sm:text-lg font-medium text-stone-900 group-hover:text-burgundy transition-colors leading-snug">
                                        {displayTitle}
                                    </h3>
                                    {award.description && (
                                        <p className="text-stone-500 mt-2 text-xs leading-relaxed">
                                            {award.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Awards;
