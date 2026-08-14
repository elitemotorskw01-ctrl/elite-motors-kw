"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MessageCircle, Mail } from "lucide-react";

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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const quickLinks = [
    { href: "/", label: t("home") },
    { href: "/inventory", label: t("inventory") },
    { href: "/sell", label: t("sell") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Image
              src="/logo.svg"
              alt="Elite Motors KW"
              width={120}
              height={45}
              className="h-10 w-auto"
            />
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              {tFooter("description")}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/elitemotors.kw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="https://wa.me/96550335205"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-gold transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="mailto:elitemotorskw01@gmail.com"
                className="text-text-secondary hover:text-gold transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              {tFooter("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              {tFooter("contactInfo")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/96550335205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-secondary hover:text-gold text-sm transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>+965 5033 5205</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:elitemotorskw01@gmail.com"
                  className="flex items-center gap-2 text-text-secondary hover:text-gold text-sm transition-colors"
                >
                  <Mail size={16} />
                  <span>elitemotorskw01@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/elitemotors.kw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-secondary hover:text-gold text-sm transition-colors"
                >
                  <InstagramIcon size={16} />
                  <span>@elitemotors.kw</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-text-secondary text-xs text-center">
            {tFooter("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
