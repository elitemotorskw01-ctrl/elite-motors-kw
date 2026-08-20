"use client";

import { useTranslations } from "next-intl";

function InstagramIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
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
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .52.04.76.12V9.68a5.71 5.71 0 0 0-.76-.05 5.69 5.69 0 1 0 5.69 5.69V9.01a7.35 7.35 0 0 0 4.29 1.37V7.3a4.29 4.29 0 0 1-3.24-1.48z" />
    </svg>
  );
}

const INSTAGRAM_URL = "https://www.instagram.com/elitemotors.kw";
const TIKTOK_URL = "https://www.tiktok.com/@elitemotors.kw";
const HANDLE = "@elitemotors.kw";

export default function SocialsClient() {
  const t = useTranslations("socials");

  const platforms = [
    {
      icon: <TikTokIcon size={32} className="text-white" />,
      name: t("tiktokTitle"),
      handle: HANDLE,
      desc: t("tiktokDesc"),
      href: TIKTOK_URL,
      btnLabel: t("tiktokBtn"),
      hoverBorder: "hover:border-white/40",
      iconBg: "bg-black",
    },
    {
      icon: <InstagramIcon size={32} className="text-pink-400" />,
      name: t("instagramTitle"),
      handle: HANDLE,
      desc: t("instagramDesc"),
      href: INSTAGRAM_URL,
      btnLabel: t("instagramBtn"),
      hoverBorder: "hover:border-pink-500/50",
      iconBg: "bg-surface-dark",
    },
  ];

  return (
    <section className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t("title_1")} <span className="text-gold">{t("title_2")}</span>
          </h1>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mb-4" />
          <p className="text-text-secondary max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {platforms.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-surface-card border border-surface-border rounded-xl p-8 text-center transition-all duration-300 hover:scale-[1.02] ${p.hoverBorder}`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-5 rounded-full ${p.iconBg} border border-surface-border flex items-center justify-center`}
              >
                {p.icon}
              </div>
              <h2 className="text-white font-semibold text-xl mb-1">
                {p.name}
              </h2>
              <p className="text-gold text-sm font-medium mb-3" dir="ltr">
                {p.handle}
              </p>
              <p className="text-text-secondary text-sm mb-6">{p.desc}</p>
              <span className="inline-block px-6 py-2.5 bg-gold text-black text-sm font-semibold rounded-lg group-hover:bg-gold-light transition-colors duration-200">
                {p.btnLabel}
              </span>
            </a>
          ))}
        </div>

        <div className="bg-surface-card border border-surface-border rounded-xl p-6 md:p-8 text-center max-w-lg mx-auto">
          <h3 className="text-white font-semibold text-lg mb-2">
            {t("followTitle")}
          </h3>
          <p className="text-text-secondary text-sm">{t("followDesc")}</p>
        </div>
      </div>
    </section>
  );
}
