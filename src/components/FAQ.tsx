"use client";

import SectionTitle from "./SectionTitle";
import Image from "next/image";
import { awards } from "@/data/faq";

const Awards: React.FC = () => {
    return (
        <section id="awards" className="py-10 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-10">
                
                {/* LEFT SECTION */}
                <div>
                    <p className="hidden lg:block text-foreground-accent">AWARDS</p>
                    <SectionTitle>
                        <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">
                            Certifications & Achievements
                        </h2>
                    </SectionTitle>
                    <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
                        A glimpse of our excellence.
                    </p>
                </div>

                {/* RIGHT SECTION — AWARDS GRID */}
                <div className="w-full lg:max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {awards.map((award, index) => (
                        <div key={index} className="border p-4 rounded-xl shadow-sm hover:shadow-md transition">
                            <div className="w-full h-52 relative mb-4">
                                <Image
                                    src={award.image}
                                    alt={award.title}
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                            <h3 className="text-xl font-semibold">{award.title}</h3>
                            <p className="text-foreground-accent mt-2 text-sm">
                                {award.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
