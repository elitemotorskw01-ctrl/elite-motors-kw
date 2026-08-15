"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useFavorites } from "@/lib/favorites";
import type { Vehicle } from "@prisma/client";

function formatPrice(price: number): string {
  return price.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const locale = useLocale();
  const t = useTranslations("vehicle");
  const tCommon = useTranslations("common");
  const tFav = useTranslations("favorites");
  const images: string[] = JSON.parse(vehicle.images);
  const toggleFavorite = useFavorites((s) => s.toggleFavorite);
  const fav = useFavorites((s) => s.ids.includes(vehicle.id));

  return (
    <div className="group relative bg-surface-card border border-surface-border rounded-xl overflow-hidden hover:border-gold/50 transition-all duration-300 hover:scale-[1.02]">
      <button
        onClick={() => {
          toggleFavorite(vehicle.id);
          toast.success(fav ? tFav("removedToast") : tFav("addedToast"));
        }}
        className="absolute top-3 end-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
        aria-label={fav ? tFav("removedToast") : tFav("addedToast")}
      >
        <Heart
          size={16}
          className={fav ? "fill-gold text-gold" : "text-white"}
        />
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
          <div className="flex items-center gap-3 text-text-secondary text-sm mb-3">
            <span>{vehicle.year}</span>
            <span className="w-1 h-1 rounded-full bg-surface-border" />
            <span>{vehicle.mileage.toLocaleString()} {tCommon("km")}</span>
            <span className="w-1 h-1 rounded-full bg-surface-border" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-gold font-bold text-lg">
                {formatPrice(vehicle.price)} {tCommon("currency")}
              </p>
              {vehicle.isNegotiable && (
                <span className="text-[10px] font-medium bg-gold/15 text-gold px-1.5 py-0.5 rounded">
                  {tCommon("negotiable")}
                </span>
              )}
            </div>
            <span className="text-xs text-text-secondary group-hover:text-gold transition-colors">
              {t("viewDetails")}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function FeaturedVehicles({ vehicles }: { vehicles: Vehicle[] }) {
  const locale = useLocale();
  const t = useTranslations("featured");

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={`/${locale}/inventory`}
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold text-gold font-medium rounded-lg hover:bg-gold hover:text-black transition-all duration-200"
          >
            {t("viewAll")}
          </a>
        </div>
      </div>
    </section>
  );
}
