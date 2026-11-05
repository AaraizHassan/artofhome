"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface Props {
    title: string;
    description: string;
    imageSrc: string;
}

const containerVariants: Variants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 0.9,
        },
    },
};

export default function AboutSection({ title, description, imageSrc }: Props) {
    return (
        <section className="py-16 md:py-24 border-t border-[#EAE3D9]">
            <motion.div
                className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16 max-w-5xl mx-auto"
                variants={containerVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
            >
                {/* TEXT SIDE */}
                <div className="w-full lg:w-3/5 text-center lg:text-left">
                    <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold block mb-2">
                        Artisan Vision
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-burgundy mb-4 tracking-tight">
                        {title}
                    </h2>
                    <div className="w-16 h-[2px] bg-gold-400 mx-auto lg:mx-0 mb-6"></div>

                    <p className="text-stone-700 leading-relaxed text-base sm:text-lg">
                        {description}
                    </p>
                </div>

                {/* IMAGE SIDE */}
                <div className="w-full lg:w-2/5 flex justify-center">
                    <div className="relative p-2.5 rounded-full bg-gradient-to-tr from-gold-300 via-gold-100 to-warm-cream shadow-2xl border border-gold-300/40">
                        <Image
                            src={imageSrc}
                            alt={title}
                            width={320}
                            height={320}
                            className="rounded-full object-cover shadow-inner w-56 h-56 sm:w-72 sm:h-72"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
