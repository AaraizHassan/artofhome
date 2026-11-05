"use client";

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "923378639893";
  const message = "Hi, I am interested in your paintings.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-[#25D366] hover:bg-[#20bd5a]
        shadow-xl hover:shadow-2xl
        transition-all duration-300 hover:scale-110
        border-2 border-white
      "
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white text-3xl" />
    </a>
  );
};

export default WhatsAppButton;
