"use client";

import { useTranslations } from "next-intl";
import { Tag, Zap, ShieldCheck, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const BADGES: { icon: LucideIcon; titleKey: string; subKey: string }[] = [
  { icon: Tag, titleKey: "freeTitle", subKey: "freeSub" },
  { icon: Zap, titleKey: "fastTitle", subKey: "fastSub" },
  { icon: ShieldCheck, titleKey: "handleTitle", subKey: "handleSub" },
  { icon: MapPin, titleKey: "localTitle", subKey: "localSub" },
];

export default function TrustBadges() {
  const t = useTranslations("trustBadges");

  return (
    <section className="border-y border-surface-border bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-surface-border">
          {BADGES.map(({ icon: Icon, titleKey, subKey }) => (
            <div
              key={titleKey}
              className="flex items-center gap-3 lg:justify-center lg:px-4"
            >
              <Icon size={20} className="text-gold shrink-0" />
              <div>
                <p className="text-white text-sm font-medium leading-tight">
                  {t(titleKey)}
                </p>
                <p className="text-text-secondary text-xs leading-tight">
                  {t(subKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
