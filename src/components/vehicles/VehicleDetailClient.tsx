"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import {
  Heart,
  Share2,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  MessageCircle,
  Mail,
} from "lucide-react";
import { useFavorites } from "@/lib/favorites";
import type { Vehicle } from "@prisma/client";

function formatPrice(price: number): string {
  return price.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function ConditionBadge({ condition }: { condition: string }) {
  const colors: Record<string, string> = {
    New: "bg-green-600/90 text-white",
    Used: "bg-blue-600/90 text-white",
    "Certified Pre-Owned": "bg-purple-600/90 text-white",
  };
  return (
    <span
      className={`px-3 py-1.5 text-sm font-medium rounded-lg ${colors[condition] || "bg-surface-border text-white"}`}
    >
      {condition}
    </span>
  );
}

function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex justify-between py-3 border-b border-surface-border last:border-b-0">
      <span className="text-text-secondary text-sm">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  );
}

function SimilarVehicleCard({
  vehicle,
  locale,
}: {
  vehicle: Vehicle;
  locale: string;
}) {
  const tCommon = useTranslations("common");
  const tFav = useTranslations("favorites");
  const toggleFavorite = useFavorites((s) => s.toggleFavorite);
  const fav = useFavorites((s) => s.ids.includes(vehicle.id));
  const images: string[] = JSON.parse(vehicle.images);
  return (
    <div className="group relative bg-surface-card border border-surface-border rounded-xl overflow-hidden hover:border-gold/50 transition-all duration-300">
      <button
        onClick={() => {
          toggleFavorite(vehicle.id);
          toast.success(fav ? tFav("removedToast") : tFav("addedToast"));
        }}
        className="absolute top-3 end-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
        aria-label={fav ? tFav("removedToast") : tFav("addedToast")}
      >
        <Heart
          size={14}
          className={fav ? "fill-gold text-gold" : "text-white"}
        />
      </button>
      <a
        href={`/${locale}/vehicles/${vehicle.id}`}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-dark">
          <Image
            src={images[0] || "https://placehold.co/800x600/1A1A1A/D4AF37?text=No+Image"}
            alt={vehicle.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 start-3 flex gap-2">
            <span className="px-2.5 py-1 text-xs font-medium bg-gold/90 text-black rounded-md">
              {vehicle.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-gold transition-colors line-clamp-1">
            {vehicle.title}
          </h3>
          <div className="flex items-center gap-2 text-text-secondary text-xs mb-2">
            <span>{vehicle.year}</span>
            <span className="w-1 h-1 rounded-full bg-surface-border" />
            <span>{vehicle.mileage.toLocaleString()} {tCommon("km")}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gold font-bold">{formatPrice(vehicle.price)} {tCommon("currency")}</p>
            {vehicle.isNegotiable && (
              <span className="text-[10px] font-medium bg-gold/15 text-gold px-1.5 py-0.5 rounded">{tCommon("negotiable")}</span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}

export default function VehicleDetailClient({
  vehicle,
  similarVehicles,
}: {
  vehicle: Vehicle;
  similarVehicles: Vehicle[];
}) {
  const locale = useLocale();
  const t = useTranslations("vehicle");
  const tCommon = useTranslations("common");
  const tFav = useTranslations("favorites");
  const images: string[] = JSON.parse(vehicle.images);
  const features: string[] = vehicle.features
    ? vehicle.features.split(",").map((f) => f.trim())
    : [];

  const [selectedImage, setSelectedImage] = useState(0);
  const toggleFav = useFavorites((s) => s.toggleFavorite);
  const isFav = useFavorites((s) => s.ids.includes(vehicle.id));

  const toggleFavorite = useCallback(() => {
    toggleFav(vehicle.id);
    toast.success(isFav ? tFav("removedToast") : tFav("addedToast"));
  }, [vehicle.id, isFav, toggleFav, tFav]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t("linkCopied"));
    } catch {
      toast.error(t("linkCopyFailed"));
    }
  }, [t]);

  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in ${vehicle.title} listed on Elite Motors KW (link: elitemotorskw.com/vehicles/${vehicle.id})`
  );
  const emailSubject = encodeURIComponent(`Inquiry about ${vehicle.title}`);
  const emailBody = encodeURIComponent(
    `Hi, I'm interested in ${vehicle.title} listed on your website.`
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
          <a
            href={`/${locale}`}
            className="hover:text-gold transition-colors"
          >
            {t("breadcrumbHome")}
          </a>
          <span>/</span>
          <a
            href={`/${locale}/inventory`}
            className="hover:text-gold transition-colors"
          >
            {t("breadcrumbInventory")}
          </a>
          <span>/</span>
          <span className="text-white line-clamp-1">{vehicle.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface-dark mb-3">
                <Image
                  key={selectedImage}
                  src={images[selectedImage] || "https://placehold.co/800x600/1A1A1A/D4AF37?text=No+Image"}
                  alt={`${vehicle.title} - Image ${selectedImage + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                  className="object-cover animate-fadeIn"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        i === selectedImage
                          ? "border-gold"
                          : "border-surface-border hover:border-gold/50"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        width={80}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <ConditionBadge condition={vehicle.condition} />
                <span className="px-3 py-1.5 text-sm font-medium border border-gold text-gold rounded-lg">
                  {vehicle.category}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {vehicle.title}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <p className="text-gold text-2xl md:text-3xl font-bold">
                  {formatPrice(vehicle.price)} {tCommon("currency")}
                </p>
                {vehicle.isNegotiable && (
                  <span className="text-xs font-medium bg-gold/15 text-gold px-2 py-1 rounded-lg">
                    {tCommon("negotiable")}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-surface-card border border-surface-border rounded-lg">
                  <Calendar size={18} className="text-gold flex-shrink-0" />
                  <div>
                    <p className="text-xs text-text-secondary">{t("specYear")}</p>
                    <p className="text-sm text-white font-medium">{vehicle.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-card border border-surface-border rounded-lg">
                  <Gauge size={18} className="text-gold flex-shrink-0" />
                  <div>
                    <p className="text-xs text-text-secondary">{t("specMileage")}</p>
                    <p className="text-sm text-white font-medium">{vehicle.mileage.toLocaleString()} {tCommon("km")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-card border border-surface-border rounded-lg">
                  <Fuel size={18} className="text-gold flex-shrink-0" />
                  <div>
                    <p className="text-xs text-text-secondary">{t("specFuelType")}</p>
                    <p className="text-sm text-white font-medium">{vehicle.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-card border border-surface-border rounded-lg">
                  <Cog size={18} className="text-gold flex-shrink-0" />
                  <div>
                    <p className="text-xs text-text-secondary">{t("specTransmission")}</p>
                    <p className="text-sm text-white font-medium">{vehicle.transmission}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">{t("descriptionTitle")}</h2>
              <div className="w-16 h-1 bg-gold rounded-full mb-4" />
              <p className="text-text-secondary leading-relaxed">{vehicle.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">{t("specificationsTitle")}</h2>
              <div className="w-16 h-1 bg-gold rounded-full mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 bg-surface-card border border-surface-border rounded-xl p-5">
                <div>
                  <SpecRow label={t("specBrand")} value={vehicle.brand} />
                  <SpecRow label={t("specModel")} value={vehicle.model} />
                  <SpecRow label={t("specYear")} value={vehicle.year} />
                  <SpecRow label={t("specMileage")} value={`${vehicle.mileage.toLocaleString()} ${tCommon("km")}`} />
                  <SpecRow label={t("specCondition")} value={vehicle.condition} />
                  <SpecRow label={t("specCategory")} value={vehicle.category} />
                </div>
                <div>
                  <SpecRow label={t("specFuelType")} value={vehicle.fuelType} />
                  <SpecRow label={t("specTransmission")} value={vehicle.transmission} />
                  <SpecRow label={t("specEngineSize")} value={vehicle.engineSize} />
                  <SpecRow label={t("specHorsepower")} value={vehicle.horsepower ? `${vehicle.horsepower} ${t("hp")}` : null} />
                  <SpecRow label={t("specExteriorColor")} value={vehicle.exteriorColor} />
                  <SpecRow label={t("specInteriorColor")} value={vehicle.interiorColor} />
                </div>
              </div>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">{t("featuresTitle")}</h2>
                <div className="w-16 h-1 bg-gold rounded-full mb-4" />
                <div className="flex flex-wrap gap-2">
                  {features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 text-sm border border-gold/40 text-gold/90 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-surface-card border border-gold/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-5">
                  {t("interestedTitle")}
                </h3>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/96550335205?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors text-sm"
                  >
                    <MessageCircle size={18} />
                    {t("whatsapp")}
                  </a>

                  <a
                    href="https://www.instagram.com/elitemotors.kw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    <InstagramIcon size={18} />
                    {t("instagram")}
                  </a>

                  <a
                    href={`mailto:elitemotorskw01@gmail.com?subject=${emailSubject}&body=${emailBody}`}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-colors text-sm"
                  >
                    <Mail size={18} />
                    {t("email")}
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={toggleFavorite}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    isFav
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-surface-border text-text-secondary hover:border-gold/50 hover:text-white"
                  }`}
                >
                  <Heart size={18} className={isFav ? "fill-gold" : ""} />
                  {isFav ? t("saved") : t("save")}
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-surface-border text-text-secondary text-sm font-medium hover:border-gold/50 hover:text-white transition-colors"
                >
                  <Share2 size={18} />
                  {t("share")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{t("similarTitle")}</h2>
                <div className="w-16 h-1 bg-gold rounded-full" />
              </div>
              <a
                href={`/${locale}/inventory?category=${vehicle.category}`}
                className="text-sm text-gold hover:text-gold-light transition-colors"
              >
                {t("viewMore")}
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similarVehicles.map((v) => (
                <SimilarVehicleCard key={v.id} vehicle={v} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
