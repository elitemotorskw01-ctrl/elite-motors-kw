"use client";

import { useTranslations } from "next-intl";
import {
  MessageCircle,
  Camera,
  Car,
  Gauge,
  DollarSign,
  Wrench,
  FileText,
  Users,
  Shield,
  Phone,
  Eye,
  Handshake,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

const PROCESS_STEPS: { number: number; icon: LucideIcon; titleKey: string; descKey: string }[] = [
  { number: 1, icon: MessageCircle, titleKey: "processStep1Title", descKey: "processStep1Desc" },
  { number: 2, icon: FileText, titleKey: "processStep2Title", descKey: "processStep2Desc" },
  { number: 3, icon: Eye, titleKey: "processStep3Title", descKey: "processStep3Desc" },
  { number: 4, icon: Phone, titleKey: "processStep4Title", descKey: "processStep4Desc" },
  { number: 5, icon: Users, titleKey: "processStep5Title", descKey: "processStep5Desc" },
  { number: 6, icon: Handshake, titleKey: "processStep6Title", descKey: "processStep6Desc" },
];

const PHOTO_LIST = [
  "photoFront",
  "photoSide",
  "photoRear",
  "photoInterior",
  "photoSeats",
  "photoDashboard",
  "photoOdometer",
  "photoEngine",
];

const DETAILS_LIST: { textKey: string; icon: LucideIcon }[] = [
  { textKey: "detailMake", icon: Car },
  { textKey: "detailModel", icon: Car },
  { textKey: "detailYear", icon: FileText },
  { textKey: "detailAskingPrice", icon: DollarSign },
  { textKey: "detailMinPrice", icon: DollarSign },
  { textKey: "detailCondition", icon: Gauge },
  { textKey: "detailMods", icon: Wrench },
  { textKey: "detailOther", icon: FileText },
];

export default function AboutClient() {
  const t = useTranslations("about");

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-medium mb-4">
            {t("heroLabel")}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t("heroTitle1")} <span className="text-gold">{t("heroTitle2")}</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mt-8" />
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-20 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("whatWeDoTitle1")} <span className="text-gold">{t("whatWeDoTitle2")}</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>
          <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            <p>{t("whatWeDoPara1")}</p>
            <p>{t("whatWeDoPara2")}</p>
          </div>
        </div>
      </section>

      {/* How It Works — 6 Steps */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("howItWorksTitle1")} <span className="text-gold">{t("howItWorksTitle2")}</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map(({ number, icon: Icon, titleKey, descKey }) => (
              <div
                key={number}
                className="relative p-6 bg-surface-card border border-surface-border rounded-xl hover:border-gold/30 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-gold" />
                    <span className="absolute -top-1 -end-1 w-5 h-5 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                      {number}
                    </span>
                  </div>
                  <h3 className="text-white font-bold">{t(titleKey)}</h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Provide — Details + Photos */}
      <section className="py-16 md:py-20 bg-[#111111]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("provideTitle1")} <span className="text-gold">{t("provideTitle2")}</span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              {t("provideSubtitle")}
            </p>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vehicle Details */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Car size={20} className="text-gold" />
                {t("detailsHeading")}
              </h3>
              <div className="space-y-3">
                {DETAILS_LIST.map(({ textKey, icon: Icon }) => (
                  <div
                    key={textKey}
                    className="flex items-center gap-3 p-3 bg-surface-card border border-surface-border rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-md bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <span className="text-white text-sm">{t(textKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos Required */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Camera size={20} className="text-gold" />
                {t("photosHeading")}
              </h3>
              <div className="space-y-3">
                {PHOTO_LIST.map((key) => (
                  <div
                    key={key}
                    className="flex items-center gap-3 p-3 bg-surface-card border border-surface-border rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-md bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Camera size={16} className="text-gold" />
                    </div>
                    <span className="text-white text-sm">{t(key)}</span>
                    <CheckCircle2 size={16} className="text-gold/40 ms-auto flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gold/5 border border-gold/20 rounded-xl">
            <p className="text-white/70 text-sm leading-relaxed text-center">
              <span className="text-gold font-semibold">{t("accuracyLabel")}</span>{" "}
              {t("accuracyText")}
            </p>
          </div>
        </div>
      </section>

      {/* Stress-Free Selling */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("stressFreeTitle1")} <span className="text-gold">{t("stressFreeTitle2")}</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex gap-4 p-5 bg-surface-card border border-surface-border rounded-xl">
              <Shield size={24} className="text-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-bold mb-2">{t("stressFreeBenefit1Title")}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{t("stressFreeBenefit1Desc")}</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 bg-surface-card border border-surface-border rounded-xl">
              <Phone size={24} className="text-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-bold mb-2">{t("stressFreeBenefit2Title")}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{t("stressFreeBenefit2Desc")}</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 bg-surface-card border border-surface-border rounded-xl">
              <Handshake size={24} className="text-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-bold mb-2">{t("stressFreeBenefit3Title")}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{t("stressFreeBenefit3Desc")}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <blockquote className="text-2xl md:text-3xl font-bold text-white italic">
              &ldquo;{t("tagline")}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 md:py-16 bg-[#111111]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 bg-gold/5 border border-gold/20 rounded-xl">
            <p className="text-white/70 text-sm leading-relaxed text-center">
              <span className="text-gold font-semibold">{t("disclaimerLabel")}</span>{" "}
              {t("disclaimerText")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t("ctaTitle1")} <span className="text-gold">{t("ctaTitle2")}</span>
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            {t("ctaSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/96550335205?text=Hi%2C%20I%27d%20like%20to%20list%20my%20vehicle%20on%20Elite%20Motors%20KW"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle size={20} />
              {t("ctaWhatsApp")}
            </a>
            <a
              href="https://www.instagram.com/elitemotors.kw/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black font-bold rounded-xl hover:bg-gold-light transition-colors"
            >
              <InstagramIcon size={20} />
              {t("ctaInstagram")}
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-text-secondary text-sm">
            <span className="flex items-center gap-1">
              <ChevronRight size={14} className="text-gold" />
              {t("ctaPoint1")}
            </span>
            <span className="flex items-center gap-1">
              <ChevronRight size={14} className="text-gold" />
              {t("ctaPoint2")}
            </span>
            <span className="flex items-center gap-1">
              <ChevronRight size={14} className="text-gold" />
              {t("ctaPoint3")}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
