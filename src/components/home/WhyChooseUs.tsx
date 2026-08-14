"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Star, Zap, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const FEATURES: { icon: LucideIcon; titleKey: string; descKey: string }[] = [
  { icon: ShieldCheck, titleKey: "verifiedTitle", descKey: "verifiedDesc" },
  { icon: Star, titleKey: "premiumTitle", descKey: "premiumDesc" },
  { icon: Zap, titleKey: "easyTitle", descKey: "easyDesc" },
  { icon: Users, titleKey: "trustedTitle", descKey: "trustedDesc" },
];

export default function WhyChooseUs() {
  const t = useTranslations("whyChoose");

  return (
    <section className="py-16 md:py-24 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="p-6 bg-surface-card border border-surface-border rounded-xl text-center"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Icon size={28} className="text-gold" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">
                {t(titleKey)}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
