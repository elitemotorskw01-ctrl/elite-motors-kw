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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const CATEGORIES: { key: string; icon: LucideIcon }[] = [
  { key: "Sedan", icon: Car },
  { key: "Pickup", icon: Truck },
  { key: "SUV", icon: CarFront },
  { key: "Hatchback", icon: Car },
  { key: "Sport", icon: Gauge },
  { key: "Muscle", icon: Zap },
  { key: "Roadster", icon: Car },
  { key: "Coupe", icon: CarFront },
  { key: "Micro", icon: Car },
  { key: "Luxury", icon: Crown },
  { key: "MPV", icon: Gem },
  { key: "Bikes", icon: Bike },
];

export default function BrowseByCategory({ counts }: { counts: Record<string, number> }) {
  const locale = useLocale();
  const t = useTranslations("categories");

  return (
    <section className="py-16 md:py-24 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t("sectionTitle")}
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map(({ key, icon: Icon }) => (
            <a
              key={key}
              href={`/${locale}/inventory?category=${key}`}
              className="group flex flex-col items-center gap-3 p-6 bg-surface-card border border-surface-border rounded-xl hover:border-gold/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Icon size={24} className="text-gold" />
              </div>
              <span className="text-white font-medium text-sm group-hover:text-gold transition-colors">
                {t(key)}
              </span>
              <span className="text-text-secondary text-xs">
                {t("vehicleCount", { count: counts[key] || 0 })}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
