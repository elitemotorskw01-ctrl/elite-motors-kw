import FavoritesClient from "@/components/favorites/FavoritesClient";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "المفضلة — إيليت موتورز الكويت" : "My Favorites — Elite Motors KW";
  const description =
    locale === "ar" ? "سياراتك المحفوظة في إيليت موتورز الكويت." : "Your saved vehicles on Elite Motors KW.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "Elite Motors KW", locale: locale === "ar" ? "ar_KW" : "en_US" },
    twitter: { card: "summary", title, description },
    robots: { index: false, follow: true },
  };
}

export default function FavoritesPage() {
  return <FavoritesClient />;
}
