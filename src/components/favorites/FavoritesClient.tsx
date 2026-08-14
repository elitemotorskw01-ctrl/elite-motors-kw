"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useFavorites } from "@/lib/favorites";
import type { Vehicle } from "@prisma/client";

function formatPrice(price: number): string {
  return price.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

function FavoriteCard({ vehicle, locale }: { vehicle: Vehicle; locale: string }) {
  const tCommon = useTranslations("common");
  const tV = useTranslations("vehicle");
  const tFav = useTranslations("favorites");
  const { removeFavorite } = useFavorites();
  const images: string[] = JSON.parse(vehicle.images);

  return (
    <div className="group relative bg-surface-card border border-surface-border rounded-xl overflow-hidden hover:border-gold/50 transition-all duration-300">
      <button
        onClick={() => {
          removeFavorite(vehicle.id);
          toast.success(tFav("removedToast"));
        }}
        className="absolute top-3 end-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
        aria-label={tFav("removedToast")}
      >
        <Heart size={16} className="fill-gold text-gold" />
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

export default function FavoritesClient() {
  const locale = useLocale();
  const t = useTranslations("favorites");
  const { ids } = useFavorites();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ids.length === 0) {
      setVehicles([]);
      setLoading(false);
      return;
    }

    async function fetchFavorites() {
      setLoading(true);
      try {
        const results = await Promise.all(
          ids.map(async (id) => {
            const res = await fetch(`/api/vehicles/${id}`);
            if (!res.ok) return null;
            return res.json();
          })
        );
        setVehicles(results.filter(Boolean));
      } catch {
        setVehicles([]);
      }
      setLoading(false);
    }

    fetchFavorites();
  }, [ids]);

  const pageTitle = (
    <div className="flex items-center gap-3 mb-2">
      <Heart size={28} className="text-gold" />
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        {t("title_1")} <span className="text-gold">{t("title_2")}</span>
      </h1>
    </div>
  );

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {pageTitle}
          <div className="w-20 h-1 bg-gold rounded-full mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-surface-card border border-surface-border rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (ids.length === 0) {
    return (
      <section className="min-h-screen bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {pageTitle}
          <div className="w-20 h-1 bg-gold rounded-full mb-8" />
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-surface-card border border-surface-border flex items-center justify-center mb-6">
              <Heart size={40} className="text-text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("emptyTitle")}
            </h3>
            <p className="text-text-secondary mb-8 max-w-md">
              {t("emptyDesc")}
            </p>
            <a
              href={`/${locale}/inventory`}
              className="px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors text-sm"
            >
              {t("browseInventory")}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {pageTitle}
        <div className="w-20 h-1 bg-gold rounded-full mb-3" />
        <p className="text-text-secondary mb-8">
          {vehicles.length} {t("vehiclesLabel")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map((v) => (
            <FavoriteCard key={v.id} vehicle={v} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
