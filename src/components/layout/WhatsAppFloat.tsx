"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/96550335205?text=Hi%2C%20I%27m%20visiting%20Elite%20Motors%20KW%20website%20and%20I%27d%20like%20to%20inquire%20about%20your%20vehicles.";

export default function WhatsAppFloat() {
  const t = useTranslations("common");
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-20 end-6 z-40 group"
    >
      <span
        className={`absolute bottom-full end-0 mb-2 px-3 py-1.5 bg-surface-card border border-surface-border rounded-lg text-xs text-white whitespace-nowrap transition-all duration-200 pointer-events-none ${
          hovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-1"
        }`}
      >
        {t("chatWithUs")}
      </span>

      <div className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-300">
        <MessageCircle size={26} className="text-white" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </div>
    </a>
  );
}
