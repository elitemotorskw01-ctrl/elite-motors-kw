"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  Search,
  SlidersHorizontal,
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { useFavorites } from "@/lib/favorites";
import type { Vehicle } from "@prisma/client";

const CATEGORIES = [
  "Sedan", "Pickup", "SUV", "Hatchback", "Sport", "Muscle",
  "Roadster", "Coupe", "Micro", "Luxury", "MPV", "Bikes",
];
const CONDITIONS = ["New", "Used", "Certified Pre-Owned"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];
const TRANSMISSIONS = ["Automatic", "Manual"];
const YEAR_OPTIONS = Array.from({ length: 15 }, (_, i) => 2025 - i);

interface Filters {
  search: string;
  categories: string[];
  brands: string[];
  conditions: string[];
  fuelTypes: string[];
  transmissions: string[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  sort: string;
}

interface Props {
  vehicles: Vehicle[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  brands: string[];
  filters: Filters;
}

function formatPrice(price: number): string {
  return price.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

function CheckboxGroup({
  title,
  options,
  selected,
  onChange,
  labels,
}: {
  title: string;
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  labels?: Record<string, string>;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border-b border-surface-border pb-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-sm font-semibold text-white mb-3"
      >
        {title}
        <ChevronDown
          size={16}
          className={`text-text-secondary transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => {
                  onChange(
                    selected.includes(opt)
                      ? selected.filter((s) => s !== opt)
                      : [...selected, opt]
                  );
                }}
                className="w-4 h-4 rounded border-surface-border bg-surface-dark text-gold accent-gold focus:ring-gold/50"
              />
              <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
                {labels?.[opt] || opt}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function VehicleCard({ vehicle, locale }: { vehicle: Vehicle; locale: string }) {
  const tV = useTranslations("vehicle");
  const tCommon = useTranslations("common");
  const tFav = useTranslations("favorites");
  const toggleFavorite = useFavorites((s) => s.toggleFavorite);
  const fav = useFavorites((s) => s.ids.includes(vehicle.id));
  const images: string[] = JSON.parse(vehicle.images);

  return (
    <div className="group relative bg-surface-card border border-surface-border rounded-xl overflow-hidden hover:border-gold/50 transition-all duration-300">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(vehicle.id);
          toast.success(fav ? tFav("removedToast") : tFav("addedToast"));
        }}
        className="absolute top-3 end-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
        aria-label={fav ? tFav("removedToast") : tFav("addedToast")}
      >
        <Heart size={16} className={fav ? "fill-gold text-gold" : "text-white"} />
      </button>

      <a href={`/${locale}/vehicles/${vehicle.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-dark">
          <Image
            src={images[0] || "https://placehold.co/800x600/1A1A1A/D4AF37?text=No+Image"}
            alt={vehicle.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 start-3 flex gap-2">
            <span className="px-2.5 py-1 text-xs font-medium bg-gold/90 text-black rounded-md">
              {vehicle.category}
            </span>
            {vehicle.condition !== "Used" && (
              <span className="px-2.5 py-1 text-xs font-medium bg-green-600/90 text-white rounded-md">
                {vehicle.condition}
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-white font-semibold text-base mb-2 group-hover:text-gold transition-colors line-clamp-1">
            {vehicle.title}
          </h3>
          <div className="flex items-center gap-3 text-text-secondary text-xs mb-3 flex-wrap">
            <span>{vehicle.year}</span>
            <span className="w-1 h-1 rounded-full bg-surface-border" />
            <span>{vehicle.mileage.toLocaleString()} {tCommon("km")}</span>
            <span className="w-1 h-1 rounded-full bg-surface-border" />
            <span>{vehicle.transmission}</span>
            <span className="w-1 h-1 rounded-full bg-surface-border" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gold font-bold text-lg">
              {formatPrice(vehicle.price)} {tCommon("currency")}
            </p>
            <span className="text-xs text-text-secondary group-hover:text-gold transition-colors">
              {tV("viewDetails")}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 rounded-lg border border-surface-border text-text-secondary hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-text-secondary">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-gold text-black"
                : "border border-surface-border text-text-secondary hover:border-gold hover:text-gold"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-lg border border-surface-border text-text-secondary hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default function InventoryClient({
  vehicles,
  totalCount,
  totalPages,
  currentPage,
  brands,
  filters,
}: Props) {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const t = useTranslations("inventory");
  const tCommon = useTranslations("common");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);
  const [selectedCategories, setSelectedCategories] = useState(filters.categories);
  const [selectedBrands, setSelectedBrands] = useState(filters.brands);
  const [selectedConditions, setSelectedConditions] = useState(filters.conditions);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState(filters.fuelTypes);
  const [selectedTransmissions, setSelectedTransmissions] = useState(filters.transmissions);
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() ?? "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() ?? "");
  const [minYear, setMinYear] = useState(filters.minYear?.toString() ?? "");
  const [maxYear, setMaxYear] = useState(filters.maxYear?.toString() ?? "");
  const [maxMileage, setMaxMileage] = useState(filters.maxMileage?.toString() ?? "");
  const [sort, setSort] = useState(filters.sort);

  const sortOptions = [
    { value: "newest", label: t("newest") },
    { value: "price_asc", label: t("priceAsc") },
    { value: "price_desc", label: t("priceDesc") },
    { value: "year_desc", label: t("yearDesc") },
    { value: "mileage_asc", label: t("mileageAsc") },
  ];

  const conditionLabels: Record<string, string> = {
    "New": tCommon("New"),
    "Used": tCommon("Used"),
    "Certified Pre-Owned": tCommon("CertifiedPreOwned"),
  };
  const fuelLabels: Record<string, string> = {
    "Petrol": tCommon("Petrol"),
    "Diesel": tCommon("Diesel"),
    "Electric": tCommon("Electric"),
    "Hybrid": tCommon("Hybrid"),
  };
  const transLabels: Record<string, string> = {
    "Automatic": tCommon("Automatic"),
    "Manual": tCommon("Manual"),
  };

  const buildUrl = useCallback(
    (overrides: Record<string, string | undefined> = {}) => {
      const p = new URLSearchParams();
      const vals: Record<string, string | undefined> = {
        search: searchInput || undefined,
        category: selectedCategories.length ? selectedCategories.join(",") : undefined,
        brand: selectedBrands.length ? selectedBrands.join(",") : undefined,
        condition: selectedConditions.length ? selectedConditions.join(",") : undefined,
        fuelType: selectedFuelTypes.length ? selectedFuelTypes.join(",") : undefined,
        transmission: selectedTransmissions.length ? selectedTransmissions.join(",") : undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        minYear: minYear || undefined,
        maxYear: maxYear || undefined,
        maxMileage: maxMileage || undefined,
        sort: sort !== "newest" ? sort : undefined,
        ...overrides,
      };
      for (const [k, v] of Object.entries(vals)) {
        if (v) p.set(k, v);
      }
      const qs = p.toString();
      return `/${locale}/inventory${qs ? `?${qs}` : ""}`;
    },
    [locale, searchInput, selectedCategories, selectedBrands, selectedConditions, selectedFuelTypes, selectedTransmissions, minPrice, maxPrice, minYear, maxYear, maxMileage, sort]
  );

  const applyFilters = useCallback(() => {
    router.push(buildUrl({ page: undefined }));
    setMobileFiltersOpen(false);
  }, [router, buildUrl]);

  const clearFilters = useCallback(() => {
    setSearchInput(""); setSelectedCategories([]); setSelectedBrands([]);
    setSelectedConditions([]); setSelectedFuelTypes([]); setSelectedTransmissions([]);
    setMinPrice(""); setMaxPrice(""); setMinYear(""); setMaxYear(""); setMaxMileage("");
    setSort("newest");
    router.push(`/${locale}/inventory`);
    setMobileFiltersOpen(false);
  }, [router, locale]);

  const handleSort = useCallback(
    (newSort: string) => {
      setSort(newSort);
      const p = new URLSearchParams(searchParams.toString());
      if (newSort === "newest") p.delete("sort"); else p.set("sort", newSort);
      p.delete("page");
      const qs = p.toString();
      router.push(`/${locale}/inventory${qs ? `?${qs}` : ""}`);
    },
    [router, locale, searchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const p = new URLSearchParams(searchParams.toString());
      if (page <= 1) p.delete("page"); else p.set("page", String(page));
      const qs = p.toString();
      router.push(`/${locale}/inventory${qs ? `?${qs}` : ""}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router, locale, searchParams]
  );

  const hasActiveFilters =
    searchInput || selectedCategories.length > 0 || selectedBrands.length > 0 ||
    selectedConditions.length > 0 || selectedFuelTypes.length > 0 ||
    selectedTransmissions.length > 0 || minPrice || maxPrice || minYear || maxYear || maxMileage;

  const filterSidebar = (
    <div className="space-y-4">
      <div className="pb-4 border-b border-surface-border">
        <label className="text-sm font-semibold text-white block mb-2">{t("search")}</label>
        <div className="relative">
          <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-surface-dark border border-surface-border rounded-lg py-2.5 ps-9 pe-3 text-sm text-white placeholder:text-text-secondary/60 focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
      </div>

      <CheckboxGroup title={t("category")} options={CATEGORIES} selected={selectedCategories} onChange={setSelectedCategories} />
      <CheckboxGroup title={t("brand")} options={brands} selected={selectedBrands} onChange={setSelectedBrands} />

      <div className="border-b border-surface-border pb-4">
        <span className="text-sm font-semibold text-white block mb-3">{t("priceLabel")}</span>
        <div className="flex items-center gap-2">
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder={t("min")}
            className="w-full bg-surface-dark border border-surface-border rounded-lg py-2 px-3 text-sm text-white placeholder:text-text-secondary/60 focus:outline-none focus:border-gold/50" />
          <span className="text-text-secondary text-sm">-</span>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder={t("max")}
            className="w-full bg-surface-dark border border-surface-border rounded-lg py-2 px-3 text-sm text-white placeholder:text-text-secondary/60 focus:outline-none focus:border-gold/50" />
        </div>
      </div>

      <div className="border-b border-surface-border pb-4">
        <span className="text-sm font-semibold text-white block mb-3">{t("year")}</span>
        <div className="flex items-center gap-2">
          <select value={minYear} onChange={(e) => setMinYear(e.target.value)}
            className="w-full bg-surface-dark border border-surface-border rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-gold/50 appearance-none">
            <option value="">{t("min")}</option>
            {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <span className="text-text-secondary text-sm">-</span>
          <select value={maxYear} onChange={(e) => setMaxYear(e.target.value)}
            className="w-full bg-surface-dark border border-surface-border rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-gold/50 appearance-none">
            <option value="">{t("max")}</option>
            {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <div className="border-b border-surface-border pb-4">
        <span className="text-sm font-semibold text-white block mb-3">{t("maxMileageLabel")}</span>
        <input type="number" value={maxMileage} onChange={(e) => setMaxMileage(e.target.value)} placeholder="e.g. 50000"
          className="w-full bg-surface-dark border border-surface-border rounded-lg py-2 px-3 text-sm text-white placeholder:text-text-secondary/60 focus:outline-none focus:border-gold/50" />
      </div>

      <CheckboxGroup title={t("condition")} options={CONDITIONS} selected={selectedConditions} onChange={setSelectedConditions} labels={conditionLabels} />
      <CheckboxGroup title={t("fuelType")} options={FUEL_TYPES} selected={selectedFuelTypes} onChange={setSelectedFuelTypes} labels={fuelLabels} />
      <CheckboxGroup title={t("transmission")} options={TRANSMISSIONS} selected={selectedTransmissions} onChange={setSelectedTransmissions} labels={transLabels} />

      <div className="flex flex-col gap-2 pt-2">
        <button onClick={applyFilters} className="w-full py-2.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-dark transition-colors text-sm">
          {t("applyFilters")}
        </button>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="w-full py-2.5 border border-surface-border text-text-secondary rounded-lg hover:border-gold/50 hover:text-white transition-colors text-sm">
            {t("clearFilters")}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {t("title_1")} <span className="text-gold">{t("title_2")}</span>
          </h1>
          <div className="w-20 h-1 bg-gold rounded-full mb-3" />
          <p className="text-text-secondary">
            {totalCount} {t("vehicleLabel")}
          </p>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-surface-card border border-surface-border rounded-xl p-5 max-h-[calc(100vh-7rem)] overflow-y-auto">
              {filterSidebar}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-surface-border rounded-lg text-sm text-text-secondary hover:border-gold/50 hover:text-white transition-colors"
              >
                <SlidersHorizontal size={16} />
                {t("filters")}
                {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-gold" />}
              </button>

              <div className="flex items-center gap-2 ms-auto">
                <span className="text-sm text-text-secondary hidden sm:block">{t("sortBy")}</span>
                <select
                  value={sort}
                  onChange={(e) => handleSort(e.target.value)}
                  className="bg-surface-card border border-surface-border rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-gold/50 appearance-none pe-8"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A0A0A0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 10px center",
                  }}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {vehicles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {vehicles.map((v) => (
                    <VehicleCard key={v.id} vehicle={v} locale={locale} />
                  ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-surface-card border border-surface-border flex items-center justify-center mb-6">
                  <Search size={32} className="text-text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t("noResults")}</h3>
                <p className="text-text-secondary mb-6 max-w-md">{t("noResultsDesc")}</p>
                <button onClick={clearFilters} className="px-6 py-2.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-dark transition-colors text-sm">
                  {t("clearFiltersBtn")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileFiltersOpen(false)} />
          <div className="fixed inset-y-0 start-0 w-[85%] max-w-sm bg-surface-card border-e border-surface-border z-50 lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-surface-border">
              <h2 className="text-lg font-semibold text-white">{t("filters")}</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 text-text-secondary hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">{filterSidebar}</div>
          </div>
        </>
      )}
    </section>
  );
}
