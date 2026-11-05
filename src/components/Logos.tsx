import React from "react";

const Logos: React.FC = () => {
  return (
    <section id="logos" className="py-8 px-6 bg-warm-cream border-b border-[#EAE3D9]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3 text-center">
        <div className="flex items-center gap-1 text-gold-500 text-sm">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        <p className="font-serif text-lg md:text-xl text-stone-800 tracking-wide">
          Trusted by <span className="text-burgundy font-semibold">2,000+</span> customers worldwide
        </p>
      </div>
    </section>
  );
};

export default Logos;
