import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import HeroImageBg from "@/components/home/HeroImageBg";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import BrowseByCategory from "@/components/home/BrowseByCategory";
import SellCTA from "@/components/home/SellCTA";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = "Elite Motors KW — Premium Vehicle Marketplace in Kuwait";
  const description =
    locale === "ar"
      ? "سوق السيارات الفاخرة في الكويت — تصفح أفضل السيارات والدراجات من بائعين موثوقين"
      : "Kuwait's premier luxury and premium vehicle marketplace. Browse cars and bikes from trusted sellers.";

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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: { en: `${SITE_URL}/en`, ar: `${SITE_URL}/ar` },
    },
  };
}

export default async function Home() {
  const [featuredVehicles, categoryCounts] = await Promise.all([
    prisma.vehicle.findMany({
      where: { isFeatured: true, status: "active" },
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        title: true,
        brand: true,
        model: true,
        year: true,
        price: true,
        mileage: true,
        condition: true,
        category: true,
        fuelType: true,
        transmission: true,
        images: true,
      },
    }),
    prisma.vehicle.groupBy({
      by: ["category"],
      where: { status: "active" },
      _count: { category: true },
    }),
  ]);

  const categoryMap: Record<string, number> = {};
  for (const c of categoryCounts) {
    categoryMap[c.category] = c._count.category;
  }

  return (
    <>
      <HeroImageBg />
      <FeaturedVehicles vehicles={featuredVehicles as any} />
      <BrowseByCategory counts={categoryMap} />
      <SellCTA />
      <WhyChooseUs />
    </>
  );
}
