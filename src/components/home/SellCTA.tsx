"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function SellCTA() {
  const t = useTranslations("sellCta");

  const content = (
    <>
      <p className="text-gold uppercase tracking-[0.2em] text-xs font-medium mb-3">
        {t("label")}
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
        {t("title")}
      </h2>
      <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
        {t("subtitle")}
      </p>
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <a
          href="https://wa.me/96550335205?text=Hi%2C%20I%27d%20like%20to%20list%20my%20vehicle%20on%20Elite%20Motors%20KW"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-3.5 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors text-sm sm:text-base"
        >
          <MessageCircle size={18} />
          {t("whatsappButton")}
        </a>
        <a
          href="https://www.instagram.com/elitemotors.kw/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors text-sm sm:text-base"
        >
          <InstagramIcon size={18} />
          {t("instagramButton")}
        </a>
      </div>
      <p className="text-white/40 text-sm mt-6">
        {t("note")}
      </p>
    </>
  );

  return (
    <>
      {/* Mobile: car on top, text below */}
      <section className="bg-[#0a0a0a] md:hidden">
        <div className="relative h-[280px] sm:h-[340px] overflow-hidden">
          <Image
            src="/sell-cta-car.jpg"
            alt=""
            fill
            className="object-contain object-center"
            loading="eager"
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center pb-14 -mt-4">
          {content}
        </div>
      </section>

      {/* Desktop: overlay layout */}
      <section className="relative h-screen hidden md:flex items-end">
        <Image
          src="/sell-cta-car.jpg"
          alt=""
          fill
          className="object-cover object-[center_30%]"
          loading="eager"
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black from-10% via-black/40 via-50% to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center w-full pb-12 pt-48">
          {content}
        </div>
      </section>
    </>
  );
}
