"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

const REVIEWS = [
  { nameKey: "review1Name", textKey: "review1Text", stars: 5 },
  { nameKey: "review2Name", textKey: "review2Text", stars: 5 },
  { nameKey: "review3Name", textKey: "review3Text", stars: 4 },
];

export default function Reviews() {
  const t = useTranslations("reviews");

  return (
    <section className="py-16 md:py-20 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t("title1")} <span className="text-gold">{t("title2")}</span>
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map(({ nameKey, textKey, stars }) => (
            <div
              key={nameKey}
              className="p-6 bg-surface-card border border-surface-border rounded-xl"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-gold fill-gold"
                  />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                &ldquo;{t(textKey)}&rdquo;
              </p>
              <p className="text-white font-semibold text-sm">
                {t(nameKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
