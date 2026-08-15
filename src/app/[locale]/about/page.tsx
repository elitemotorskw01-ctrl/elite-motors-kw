import AboutClient from "@/components/about/AboutClient";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "من نحن — إيليت موتورز الكويت" : "About Us — Elite Motors KW";
  const description =
    locale === "ar"
      ? "تعرف على إيليت موتورز الكويت — خدمة بيع السيارات التي تجعل بيع سيارتك سهلاً وخالياً من التوتر."
      : "Learn about Elite Motors KW — a vehicle marketplace and sales service that makes selling your vehicle easy and stress-free.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "Elite Motors KW", locale: locale === "ar" ? "ar_KW" : "en_US" },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `${SITE_URL}/${locale}/about`, languages: { en: `${SITE_URL}/en/about`, ar: `${SITE_URL}/ar/about` } },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
