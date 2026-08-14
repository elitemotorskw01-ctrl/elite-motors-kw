"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const CATEGORY_KEYS = ["Sedan", "SUV", "Sport", "Luxury", "Pickup", "Bikes"] as const;

const HERO_SLIDES = [
  { src: "/hero-car.jpg", alt: "Land Cruiser GR Sport" },
  { src: "/sell-cta-car.jpg", alt: "Chevrolet Camaro ZL1" },
];

const SLIDE_INTERVAL = 5000;

export default function HeroImageBg() {
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("hero");
  const tCat = useTranslations("categories");

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    let raf: number;
    let start = Date.now();

    function tick() {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / SLIDE_INTERVAL, 1);
      setProgress(pct);
      if (elapsed >= SLIDE_INTERVAL) {
        setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
        start = Date.now();
        setProgress(0);
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/inventory?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="bg-[#0A0A0A]">
      <div className="relative w-full aspect-video max-h-[80vh]">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: current === i ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-contain"
              priority={i === 0}
              quality={90}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0A0A0A] to-transparent" />

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === i
                  ? "w-8 bg-gold"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 z-10">
          <div
            className="h-full bg-gold/60"
            style={{ width: `${progress * 100}%`, transition: "width 100ms linear" }}
          />
        </div>
      </div>

      <div className="relative mx-auto w-[600px] h-[150px] -mt-8 bg-gold/10 rounded-full blur-[80px]" />

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
