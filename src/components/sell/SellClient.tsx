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
import Image from "next/image";

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
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    condition: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Brand: ${formData.brand}`,
      `Model: ${formData.model}`,
      `Year: ${formData.year}`,
      `Mileage: ${formData.mileage} km`,
      `Price: ${formData.price} KWD`,
      `Condition: ${formData.condition}`,
      `Phone: +965${formData.phone}`,
      formData.notes ? `Notes: ${formData.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/96550335205?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero with Camaro */}
      <section className="bg-[#0A0A0A]">
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-video max-h-[80vh]">
          <Image
            src="/sell-cta-car.jpg"
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

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center -mt-6 pb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t("title_1")} <span className="text-gold">{t("title_2")}</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
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

      {/* Vehicle Submission Form */}
      <section className="py-16 md:py-20 bg-[#111111]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("formTitle_1")} <span className="text-gold">{t("formTitle_2")}</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="brand"
                required
                placeholder={t("formBrand")}
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-surface-border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <input
                type="text"
                name="model"
                required
                placeholder={t("formModel")}
                value={formData.model}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-surface-border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <input
                type="number"
                name="year"
                required
                placeholder={t("formYear")}
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-surface-border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <input
                type="number"
                name="mileage"
                required
                placeholder={t("formMileage")}
                value={formData.mileage}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-surface-border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <input
                type="number"
                name="price"
                required
                placeholder={t("formPrice")}
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-surface-border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <select
                name="condition"
                required
                value={formData.condition}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/5 border border-surface-border rounded-lg focus:outline-none focus:border-gold/50 transition-colors appearance-none ${formData.condition ? "text-white" : "text-white/40"}`}
              >
                <option value="" disabled className="bg-[#111111] text-white/40">
                  {t("formCondition")}
                </option>
                <option value="New" className="bg-[#111111] text-white">
                  {t("formConditionNew")}
                </option>
                <option value="Used" className="bg-[#111111] text-white">
                  {t("formConditionUsed")}
                </option>
              </select>
            </div>
            <div className="relative">
              <span className="absolute start-4 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none">
                +965
              </span>
              <input
                type="text"
                name="phone"
                required
                placeholder={t("formPhone")}
                value={formData.phone}
                onChange={handleChange}
                className="w-full ps-14 pe-4 py-3 bg-white/5 border border-surface-border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <textarea
              name="notes"
              rows={3}
              placeholder={t("formNotes")}
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-surface-border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={submitted}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold text-lg rounded-xl hover:bg-[#20BD5A] transition-colors disabled:opacity-70"
            >
              {submitted ? (
                <span>{t("formSuccess")}</span>
              ) : (
                <>
                  <MessageCircle size={22} />
                  {t("formSubmit")}
                </>
              )}
            </button>
          </form>

          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-text-secondary">
              <span className="w-8 h-[1px] bg-surface-border" />
              <span className="text-sm">{t("ctaOr")}</span>
              <span className="w-8 h-[1px] bg-surface-border" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/elitemotors.kw/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors text-sm"
              >
                <InstagramIcon size={18} />
                {t("ctaInstagram")}
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
