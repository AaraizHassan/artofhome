import React from 'react';
import Image from 'next/image';

// import AppStoreButton from './AppStoreButton';
// import PlayStoreButton from './PlayStoreButton';

import { heroDetails } from '@/data/hero';

import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});



const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            // className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-"
            className="relative flex items-center justify-center p-0 mt-[95px] md:mt-[95px]"
        >

            <div className="relative w-full h-[70vh] sm:h-[50vh] md:h-[70vh] lg:h-[90vh]">
                <Image
                    src={heroDetails.centerImageSrc}
                    alt="Hero banner"
                    priority
                    width={1920}
                    height={1080}
                    className="object-cover w-full h-full"
                    sizes="100vw"
                />
                {/* Dark Gradient + Blur Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/20 backdrop-blur-[2px]"></div>

                {/* Text Overlay */}
                {/* Centered Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                    <h1 className={`${manrope.className} text-sm sm:text-base md:text-lg tracking-wide`}>
                        Made with love
                    </h1>

                    <h1 className={`${manrope.className} text-xl sm:text-2xl md:text-4xl font-semibold mt-2 drop-shadow-xl`}>
                        From our hands to your home
                    </h1>
                </div>


            </div>
        </section>
    );
};

export default Hero;
