import SocialsClient from "@/components/socials/SocialsClient";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "ar"
      ? "حساباتنا — إيليت موتورز الكويت"
      : "Our Socials — Elite Motors KW";
  const description =
    locale === "ar"
      ? "تابع إيليت موتورز الكويت على تيك توك وانستغرام لمشاهدة أحدث السيارات."
      : "Follow Elite Motors KW on TikTok and Instagram for our latest vehicles.";
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
      canonical: `${SITE_URL}/${locale}/socials`,
      languages: {
        en: `${SITE_URL}/en/socials`,
        ar: `${SITE_URL}/ar/socials`,
      },
    },
  };
}

export default function SocialsPage() {
  return <SocialsClient />;
}
