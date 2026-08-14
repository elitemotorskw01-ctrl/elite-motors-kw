"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function SellCTA() {
  const t = useTranslations("sellCta");

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#111111] border border-white/5">
          <div className="grid md:grid-cols-2 items-center">
            {/* Car image */}
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
              <Image
                src="/sell-cta-car.jpg"
                alt=""
                fill
                className="object-cover object-center"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Edge fades */}
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#111111] to-transparent hidden md:block" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111111] to-transparent md:hidden" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center md:text-left">
              <p className="text-gold uppercase tracking-[0.2em] text-xs font-medium mb-3">
                {t("title") === "Ready to Sell Your Vehicle?" ? "Sell With Us" : "بيع معنا"}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {t("title")}
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-md">
                {t("subtitle")}
              </p>
              <a
                href="https://www.instagram.com/elitemotors.kw/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                {t("button")}
              </a>
              <p className="text-white/30 text-sm mt-6">
                {t("note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
