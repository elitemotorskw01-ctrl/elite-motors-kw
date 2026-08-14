"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Car,
  CarFront,
  Truck,
  Bike,
  Crown,
  Gauge,
  Zap,
  Gem,
  Wind,
  CircleDot,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const CATEGORIES: { name: string; icon: LucideIcon }[] = [
  { name: "Sedan", icon: Car },
  { name: "Pickup", icon: Truck },
  { name: "SUV", icon: CarFront },
  { name: "Hatchback", icon: CircleDot },
  { name: "Sport", icon: Gauge },
  { name: "Muscle", icon: Zap },
  { name: "Roadster", icon: Wind },
  { name: "Coupe", icon: Sparkles },
  { name: "Micro", icon: Car },
  { name: "Luxury", icon: Crown },
  { name: "MPV", icon: Users },
  { name: "Bikes", icon: Bike },
];

export default function CategoriesClient({
  counts,
}: {
  counts: Record<string, number>;
}) {
  const locale = useLocale();
  const t = useTranslations("categories");

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("pageTitle_1")} <span className="text-gold">{t("pageTitle_2")}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {t("pageSubtitle")}
          </p>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map(({ name, icon: Icon }) => {
            const count = counts[name] || 0;
            return (
              <a
                key={name}
                href={`/${locale}/inventory?category=${name}`}
                className="group relative bg-surface-card border border-surface-border rounded-2xl p-8 hover:border-gold/60 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,175,55,0.12)] transition-all duration-300"
              >
                <div className="absolute top-0 start-8 end-8 h-[2px] bg-gold/0 group-hover:bg-gold/60 transition-all duration-300 rounded-b" />

                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                    <Icon size={30} className="text-gold" />
                  </div>

                  <h2 className="text-xl font-bold text-gold">{t(name)}</h2>

                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t(`desc_${name}`)}
                  </p>

                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-surface-dark border border-surface-border rounded-full text-sm text-white font-medium">
                    {count} {t("vehiclesLabel")}
                  </span>

                  <span className="text-gold/0 group-hover:text-gold text-sm font-medium transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    {t("browse", { name: t(name) })}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
