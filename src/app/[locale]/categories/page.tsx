import { prisma } from "@/lib/prisma";
import CategoriesClient from "@/components/categories/CategoriesClient";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "تصفح حسب الفئة — إيليت موتورز الكويت" : "Browse by Category — Elite Motors KW";
  const description =
    locale === "ar"
      ? "تصفح السيارات الفاخرة حسب الفئة في الكويت — سيدان، دفع رباعي، رياضية، والمزيد."
      : "Browse premium vehicles by category in Kuwait. Sedans, SUVs, pickups, sports cars, and more.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "Elite Motors KW", locale: locale === "ar" ? "ar_KW" : "en_US" },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `${SITE_URL}/${locale}/categories`, languages: { en: `${SITE_URL}/en/categories`, ar: `${SITE_URL}/ar/categories` } },
  };
}

export default async function CategoriesPage() {
  const categoryCounts = await prisma.vehicle.groupBy({
    by: ["category"],
    where: { status: "active" },
    _count: { id: true },
  });

  const counts: Record<string, number> = {};
  for (const row of categoryCounts) {
    counts[row.category] = row._count.id;
  }

  return <CategoriesClient counts={counts} />;
}
