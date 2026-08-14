import ContactClient from "@/components/contact/ContactClient";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "ar"
      ? "اتصل بنا — إيليت موتورز الكويت"
      : "Contact Us — Elite Motors KW";
  const description =
    locale === "ar"
      ? "تواصل مع إيليت موتورز الكويت عبر واتساب أو انستغرام أو البريد الإلكتروني."
      : "Get in touch with Elite Motors KW via WhatsApp, Instagram, or email.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Elite Motors KW",
      locale: locale === "ar" ? "ar_KW" : "en_US",
    },
    twitter: { card: "summary", title, description },
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        en: `${SITE_URL}/en/contact`,
        ar: `${SITE_URL}/ar/contact`,
      },
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
