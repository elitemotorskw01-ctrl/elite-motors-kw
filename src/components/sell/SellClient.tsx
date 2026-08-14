"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  MessageCircle,
  Mail,
  Camera,
  Car,
  Gauge,
  DollarSign,
  Wrench,
  User,
  FileText,
  ChevronDown,
  Send,
  ClipboardCheck,
  Rocket,
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

const STEPS: { number: number; titleKey: string; descKey: string; icon: LucideIcon }[] = [
  { number: 1, titleKey: "step1Title", descKey: "step1Desc", icon: Send },
  { number: 2, titleKey: "step2Title", descKey: "step2Desc", icon: ClipboardCheck },
  { number: 3, titleKey: "step3Title", descKey: "step3Desc", icon: Rocket },
];

const CHECKLIST: { textKey: string; icon: LucideIcon }[] = [
  { textKey: "check1", icon: Camera },
  { textKey: "check2", icon: Car },
  { textKey: "check3", icon: Gauge },
  { textKey: "check4", icon: DollarSign },
  { textKey: "check5", icon: Wrench },
  { textKey: "check6", icon: User },
  { textKey: "check7", icon: FileText },
];

const FAQ_KEYS = ["faq1", "faq2", "faq3", "faq4"];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-surface-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-5 text-start hover:bg-surface-card/50 transition-colors"
      >
        <span className="text-white font-medium pe-4">{question}</span>
        <ChevronDown
          size={20}
          className={`text-gold flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-text-secondary leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function SellClient() {
  const t = useTranslations("sell");

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("title_1")} <span className="text-gold">{t("title_2")}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mt-6" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-[#111111]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("howItWorks")} <span className="text-gold">{t("howItWorksHighlight")}</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-gold/30 via-gold to-gold/30" />

            {STEPS.map(({ number, titleKey, descKey, icon: Icon }) => (
              <div key={number} className="flex flex-col items-center text-center relative">
                <div className="relative z-10 w-24 h-24 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mb-6">
                  <Icon size={32} className="text-gold" />
                  <span className="absolute -top-1 -end-1 w-7 h-7 bg-gold text-black text-sm font-bold rounded-full flex items-center justify-center">
                    {number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t(titleKey)}</h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-xs">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Need to Provide */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("checklistTitle_1")} <span className="text-gold">{t("checklistTitle_2")}</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {CHECKLIST.map(({ textKey, icon: Icon }) => (
              <div
                key={textKey}
                className="flex items-center gap-4 p-4 bg-surface-card border border-surface-border rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-gold" />
                </div>
                <span className="text-white text-sm md:text-base">{t(textKey)}</span>
                <CheckCircle2 size={20} className="text-gold/40 ms-auto flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#111111]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t("ctaTitle_1")} <span className="text-gold">{t("ctaTitle_2")}</span>
          </h2>
          <p className="text-text-secondary mb-8">{t("ctaSubtitle")}</p>

          <a
            href="https://www.instagram.com/elitemotors.kw/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-black font-bold text-lg rounded-xl hover:bg-gold-light transition-colors"
          >
            <InstagramIcon size={24} />
            {t("ctaButton")}
          </a>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center gap-2 text-text-secondary">
              <span className="w-8 h-[1px] bg-surface-border" />
              <span className="text-sm">{t("ctaOr")}</span>
              <span className="w-8 h-[1px] bg-surface-border" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/96550335205"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors text-sm"
              >
                <MessageCircle size={18} />
                WhatsApp: +965 5033 5205
              </a>

              <a
                href="mailto:elitemotorskw01@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 border border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-colors text-sm"
              >
                <Mail size={18} />
                elitemotorskw01@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("faqTitle_1")} <span className="text-gold">{t("faqTitle_2")}</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="space-y-3">
            {FAQ_KEYS.map((key) => (
              <FAQItem key={key} question={t(`${key}Q`)} answer={t(`${key}A`)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
