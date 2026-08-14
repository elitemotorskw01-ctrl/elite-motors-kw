"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";

const CATEGORY_KEYS = ["Sedan", "SUV", "Sport", "Luxury", "Pickup", "Bikes"] as const;

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("hero");
  const tCat = useTranslations("categories");

  useEffect(() => setMounted(true), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/inventory?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0A0A] to-[#141414]" />

      {/* Shimmer particles — client-only to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted &&
          Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gold/20 animate-pulse"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
      </div>

      {/* Radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          {t("title_1")}{" "}
          <span className="text-gold">{t("title_highlight")}</span>
          {" "}{t("title_2")}
        </h1>
        <p className="text-text-secondary text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center max-w-xl mx-auto mb-8 border border-gold/30 rounded-lg overflow-hidden bg-surface-card/80 backdrop-blur-sm focus-within:border-gold transition-colors"
        >
          <div className="flex items-center flex-1 px-4">
            <Search size={20} className="text-text-secondary flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-transparent py-3.5 px-3 text-white placeholder:text-text-secondary/60 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 bg-gold text-black font-semibold hover:bg-gold-dark transition-colors flex-shrink-0"
          >
            {t("searchButton")}
          </button>
        </form>

        {/* Category pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORY_KEYS.map((cat) => (
            <a
              key={cat}
              href={`/${locale}/inventory?category=${cat}`}
              className="px-4 py-2 text-sm border border-surface-border rounded-full text-text-secondary hover:border-gold hover:text-gold transition-all duration-200"
            >
              {tCat(cat)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
