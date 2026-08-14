import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import InventoryClient from "@/components/inventory/InventoryClient";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "تصفح السيارات — إيليت موتورز الكويت" : "Browse Vehicles — Elite Motors KW";
  const description =
    locale === "ar"
      ? "تصفح مجموعتنا من السيارات الفاخرة في الكويت. فلترة حسب العلامة التجارية، الفئة، السعر، والمزيد."
      : "Browse our collection of premium vehicles in Kuwait. Filter by brand, category, price, and more.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "Elite Motors KW", locale: locale === "ar" ? "ar_KW" : "en_US" },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `${SITE_URL}/${locale}/inventory`, languages: { en: `${SITE_URL}/en/inventory`, ar: `${SITE_URL}/ar/inventory` } },
  };
}

const PER_PAGE = 12;

type SortOption = "newest" | "price_asc" | "price_desc" | "year_desc" | "mileage_asc";

function buildOrderBy(sort: SortOption): Prisma.VehicleOrderByWithRelationInput {
  switch (sort) {
    case "price_asc": return { price: "asc" };
    case "price_desc": return { price: "desc" };
    case "year_desc": return { year: "desc" };
    case "mileage_asc": return { mileage: "asc" };
    default: return { createdAt: "desc" };
  }
}

export default async function InventoryPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = typeof params.search === "string" ? params.search : "";
  const categories = typeof params.category === "string" ? params.category.split(",").filter(Boolean) : [];
  const brands = typeof params.brand === "string" ? params.brand.split(",").filter(Boolean) : [];
  const conditions = typeof params.condition === "string" ? params.condition.split(",").filter(Boolean) : [];
  const fuelTypes = typeof params.fuelType === "string" ? params.fuelType.split(",").filter(Boolean) : [];
  const transmissions = typeof params.transmission === "string" ? params.transmission.split(",").filter(Boolean) : [];
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const minYear = params.minYear ? Number(params.minYear) : undefined;
  const maxYear = params.maxYear ? Number(params.maxYear) : undefined;
  const maxMileage = params.maxMileage ? Number(params.maxMileage) : undefined;
  const sort = (params.sort as SortOption) || "newest";
  const page = Math.max(1, params.page ? Number(params.page) : 1);

  const where: Prisma.VehicleWhereInput = {
    status: "active",
    ...(search && {
      OR: [
        { title: { contains: search } },
        { brand: { contains: search } },
        { model: { contains: search } },
      ],
    }),
    ...(categories.length > 0 && { category: { in: categories } }),
    ...(brands.length > 0 && { brand: { in: brands } }),
    ...(conditions.length > 0 && { condition: { in: conditions } }),
    ...(fuelTypes.length > 0 && { fuelType: { in: fuelTypes } }),
    ...(transmissions.length > 0 && { transmission: { in: transmissions } }),
    ...(minPrice !== undefined || maxPrice !== undefined
      ? { price: { ...(minPrice !== undefined && { gte: minPrice }), ...(maxPrice !== undefined && { lte: maxPrice }) } }
      : {}),
    ...(minYear !== undefined || maxYear !== undefined
      ? { year: { ...(minYear !== undefined && { gte: minYear }), ...(maxYear !== undefined && { lte: maxYear }) } }
      : {}),
    ...(maxMileage !== undefined && { mileage: { lte: maxMileage } }),
  };

  const inventorySelect = {
    id: true, title: true, brand: true, model: true, year: true, price: true,
    mileage: true, condition: true, category: true, fuelType: true,
    transmission: true, images: true,
  };

  const [vehicles, totalCount, allBrands] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      orderBy: buildOrderBy(sort),
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
      select: inventorySelect,
    }),
    prisma.vehicle.count({ where }),
    prisma.vehicle.findMany({
      where: { status: "active" },
      select: { brand: true },
      distinct: ["brand"],
      orderBy: { brand: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <InventoryClient
      vehicles={vehicles as any}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
      brands={allBrands.map((b) => b.brand)}
      filters={{
        search, categories, brands, conditions, fuelTypes, transmissions,
        minPrice, maxPrice, minYear, maxYear, maxMileage, sort,
      }}
    />
  );
}
