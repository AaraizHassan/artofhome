import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { heroDetails } from '@/data/hero';

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative flex items-center justify-center p-0 mt-[76px]"
        >
            <div className="relative w-full h-[70vh] sm:h-[60vh] md:h-[75vh] lg:h-[88vh]">
                <Image
                    src={heroDetails.centerImageSrc}
                    alt="Hero banner"
                    priority
                    width={1920}
                    height={1080}
                    className="object-cover w-full h-full"
                    sizes="100vw"
                />
                {/* Dark Gradient + Subtle Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60"></div>

                {/* Centered Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                    <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-200 font-medium py-1 px-4 rounded-full bg-black/30 backdrop-blur-sm border border-gold-200/30">
                        Made with love
                    </span>

                    <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-normal mt-4 drop-shadow-2xl max-w-3xl leading-tight">
                        From our hands to your home
                    </h1>

                    <Link
                        href="#gallery"
                        className="mt-8 inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-medium text-stone-900 bg-white/95 hover:bg-white px-8 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/20"
                    >
                        Explore Collection
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
