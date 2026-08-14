"use client";

import { useTranslations } from "next-intl";

function Icon({ size = 26, className = "", children }: { size?: number; className?: string; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {children}
    </svg>
  );
}

function MessageCircleIcon({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <Icon size={size} className={className}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </Icon>
  );
}

function InstagramIcon({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <Icon size={size} className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </Icon>
  );
}

function MailIcon({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <Icon size={size} className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Icon>
  );
}

function ClockIcon({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <Icon size={size} className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </Icon>
  );
}

const WHATSAPP_URL = "https://wa.me/96550335205";
const INSTAGRAM_URL = "https://instagram.com/elitemotors.kw";
const EMAIL = "elitemotorskw01@gmail.com";

export default function ContactClient() {
  const t = useTranslations("contact");

  const cards = [
    {
      icon: <MessageCircleIcon size={26} className="text-green-400" />,
      title: t("whatsappTitle"),
      detail: "+965 5033 5205",
      desc: t("whatsappDesc"),
      href: WHATSAPP_URL,
      btnLabel: t("whatsappBtn"),
      hoverBorder: "hover:border-green-500/50",
    },
    {
      icon: <InstagramIcon size={26} className="text-pink-400" />,
      title: t("instagramTitle"),
      detail: "@elitemotors.kw",
      desc: t("instagramDesc"),
      href: INSTAGRAM_URL,
      btnLabel: t("instagramBtn"),
      hoverBorder: "hover:border-pink-500/50",
    },
    {
      icon: <MailIcon size={26} className="text-blue-400" />,
      title: t("emailTitle"),
      detail: EMAIL,
      desc: t("emailDesc"),
      href: `mailto:${EMAIL}`,
      btnLabel: t("emailBtn"),
      hoverBorder: "hover:border-blue-500/50",
    },
  ];

  return (
    <section className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t("title_1")}{" "}
            <span className="text-gold">{t("title_2")}</span>
          </h1>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mb-4" />
          <p className="text-text-secondary max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cards.map((card) => (
            <div
              key={card.href}
              className={`bg-surface-card border border-surface-border rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] ${card.hoverBorder}`}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-surface-dark border border-surface-border flex items-center justify-center">
                {card.icon}
              </div>
              <h2 className="text-white font-semibold text-lg mb-1">
                {card.title}
              </h2>
              <p className="text-gold text-sm font-medium mb-2" dir="ltr">
                {card.detail}
              </p>
              <p className="text-text-secondary text-sm mb-5">{card.desc}</p>
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 bg-gold text-black text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors duration-200"
              >
                {card.btnLabel}
              </a>
            </div>
          ))}
        </div>

        <div className="bg-surface-card border border-surface-border rounded-xl p-6 md:p-8 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-surface-dark border border-surface-border flex items-center justify-center">
            <ClockIcon size={22} className="text-gold" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">
            {t("responseTitle")}
          </h3>
          <p className="text-text-secondary text-sm">{t("responseDesc")}</p>
        </div>
      </div>
    </section>
  );
}
