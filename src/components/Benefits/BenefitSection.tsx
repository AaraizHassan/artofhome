"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface Props {
    title: string;
    description: string;
    imageSrc: string;
}

const containerVariants: Variants = {
    offscreen: { opacity: 0, y: 80 },
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
        <section className="my-24">
            <motion.div
                className="flex flex-col-reverse lg:flex-row items-center gap-12"
                variants={containerVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
            >
                {/* TEXT SIDE */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h3 className="text-3xl font-bold mb-4">{title}</h3>

                    <p className="text-foreground-accent leading-relaxed text-lg">
                        {description}
                    </p>
                </div>

                {/* IMAGE SIDE */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={350}
                        height={350}
                        className="rounded-full object-cover shadow-xl"
                    />
                </div>
            </motion.div>
        </section>
    );
}
