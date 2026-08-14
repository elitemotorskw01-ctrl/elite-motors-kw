import SellClient from "@/components/sell/SellClient";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "بيع سيارتك — إيليت موتورز الكويت" : "Sell Your Vehicle — Elite Motors KW";
  const description =
    locale === "ar"
      ? "اعرض سيارتك أو دراجتك في سوق الكويت الفاخر للسيارات. إعلانات مجانية وآلاف المشترين."
      : "List your car or bike on Kuwait's premium vehicle marketplace. Free listings, fast turnaround, thousands of buyers.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "Elite Motors KW", locale: locale === "ar" ? "ar_KW" : "en_US" },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `${SITE_URL}/${locale}/sell`, languages: { en: `${SITE_URL}/en/sell`, ar: `${SITE_URL}/ar/sell` } },
  };
}

export default function SellPage() {
  return <SellClient />;
}
