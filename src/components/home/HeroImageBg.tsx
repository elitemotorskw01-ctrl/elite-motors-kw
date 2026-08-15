"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const CATEGORY_KEYS = ["Sedan", "SUV", "Sport", "Luxury", "Pickup", "Bikes"] as const;

const BRAND_OPTIONS = [
  "Toyota", "Nissan", "Chevrolet", "Ford", "BMW", "Mercedes-Benz",
  "Porsche", "Lexus", "Land Rover", "Dodge", "Audi", "Bentley",
] as const;

const PRICE_RANGES = [
  { value: "0-5000", label: "Under 5,000" },
  { value: "5000-15000", label: "5,000 - 15,000" },
  { value: "15000-30000", label: "15,000 - 30,000" },
  { value: "30000-60000", label: "30,000 - 60,000" },
  { value: "60000-", label: "60,000+" },
] as const;

export default function HeroImageBg() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("hero");
  const tCat = useTranslations("categories");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("search", query.trim());
    if (brand) params.set("brand", brand);
    if (category) params.set("category", category);
    if (priceRange) {
      const [min, max] = priceRange.split("-");
      if (min) params.set("minPrice", min);
      if (max) params.set("maxPrice", max);
    }
    router.push(`/${locale}/inventory${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <section className="bg-[#0A0A0A]">
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-video max-h-[80vh]">
        <Image
          src="/hero-car.jpg"
          alt=""
          fill
          className="object-contain"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
      </div>

      <div className="relative mx-auto w-[300px] sm:w-[600px] h-[100px] sm:h-[150px] -mt-8 bg-gold/10 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center -mt-6 pb-16">
        <p className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">
          {locale === "ar" ? "الكويت" : "Premium Vehicles · Kuwait"}
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[1.1] text-white">
          {t("title_1")}{" "}
          <span className="text-gold">{t("title_highlight")}</span>
          {" "}{t("title_2")}
        </h1>

        <p className="text-white/70 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <form
          onSubmit={handleSearch}
          className="flex items-center max-w-xl mx-auto mb-6 rounded-xl overflow-hidden bg-white/5 border border-white/10 focus-within:border-gold/50 transition-colors shadow-2xl"
        >
          <div className="flex items-center flex-1 px-4">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 flex-shrink-0">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-transparent py-4 px-3 text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-gold text-black font-semibold hover:bg-gold-dark transition-colors flex-shrink-0"
          >
            {t("searchButton")}
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-xl mx-auto mb-8">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="flex-1 min-w-[100px] px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold/50 appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#1a1a1a]">{t("brandFilter")}</option>
            {BRAND_OPTIONS.map((b) => (
              <option key={b} value={b} className="bg-[#1a1a1a]">{b}</option>
            ))}
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 min-w-[100px] px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold/50 appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#1a1a1a]">{t("categoryFilter")}</option>
            {CATEGORY_KEYS.map((cat) => (
              <option key={cat} value={cat} className="bg-[#1a1a1a]">{tCat(cat)}</option>
            ))}
          </select>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="flex-1 min-w-[100px] px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold/50 appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#1a1a1a]">{t("priceFilter")}</option>
            {PRICE_RANGES.map((p) => (
              <option key={p.value} value={p.value} className="bg-[#1a1a1a]">{p.label} KWD</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORY_KEYS.map((cat) => (
            <a
              key={cat}
              href={`/${locale}/inventory?category=${cat}`}
              className="px-5 py-2 text-sm border border-white/15 rounded-full text-white/60 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300"
            >
              {tCat(cat)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
