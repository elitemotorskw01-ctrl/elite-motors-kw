"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites";

export default function Header() {
  const t = useTranslations("nav");
  const tLang = useTranslations("lang");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const favCount = useFavorites((s) => s.ids.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: next });
  };

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/inventory", label: t("inventory") },
    { href: "/categories", label: t("categories") },
    { href: "/sell", label: t("sell") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-gold/30"
          : "bg-[#0A0A0A] border-gold/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Elite Motors KW"
              width={140}
              height={36}
              className="h-8 md:h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white hover:text-gold transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/favorites"
              className="relative p-2 text-text-secondary hover:text-gold transition-colors duration-200"
              aria-label="Favorites"
            >
              <Heart size={20} />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-gold text-black text-[10px] font-bold rounded-full">
                  {favCount}
                </span>
              )}
            </Link>
            <button
              onClick={switchLocale}
              className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-gold transition-colors duration-200"
            >
              {tLang("toggle")}
            </button>
            <Link
              href="/contact"
              className="px-5 py-2 text-sm font-medium text-gold border border-gold rounded-md hover:bg-gold hover:text-black transition-all duration-200"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-out */}
      <nav
        className={`fixed top-16 ${
          locale === "ar" ? "left-0" : "right-0"
        } z-50 w-72 h-[calc(100vh-4rem)] bg-[#0A0A0A] border-s border-gold/10 p-6 flex flex-col gap-2 md:hidden transition-transform duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : locale === "ar"
              ? "-translate-x-full"
              : "translate-x-full"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="text-base font-medium text-white hover:text-gold py-3 border-b border-surface-border transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/favorites"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2 text-base font-medium text-white hover:text-gold py-3 border-b border-surface-border transition-colors"
        >
          <Heart size={18} />
          {t("favorites")}
          {favCount > 0 && (
            <span className="ml-auto min-w-[22px] h-[22px] px-1.5 flex items-center justify-center bg-gold text-black text-xs font-bold rounded-full">
              {favCount}
            </span>
          )}
        </Link>
        <Link
          href="/contact"
          onClick={() => setMobileOpen(false)}
          className="mt-4 px-5 py-2.5 text-sm font-medium text-gold border border-gold rounded-md hover:bg-gold hover:text-black transition-all duration-200 text-center"
        >
          {t("contact")}
        </Link>
        <button
          onClick={() => {
            switchLocale();
            setMobileOpen(false);
          }}
          className="mt-2 px-5 py-2.5 text-sm font-medium text-text-secondary hover:text-gold border border-surface-border rounded-md transition-colors text-center"
        >
          {tLang("label")}
        </button>
      </nav>
    </header>
  );
}
