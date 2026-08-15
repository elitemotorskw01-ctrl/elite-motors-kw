import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import VehicleDetailClient from "@/components/vehicles/VehicleDetailClient";
import VehicleJsonLd from "@/components/seo/VehicleJsonLd";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    select: { title: true, year: true, mileage: true, condition: true, fuelType: true, transmission: true, price: true, description: true, images: true },
  });
  if (!vehicle) return { title: "Vehicle Not Found" };

  const images: string[] = JSON.parse(vehicle.images);
  const title = `${vehicle.title} — Elite Motors KW`;
  const description = `${vehicle.title} — ${vehicle.mileage.toLocaleString()} km, ${vehicle.condition}, ${vehicle.fuelType}, ${vehicle.transmission}. ${vehicle.price.toLocaleString()} KWD.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Elite Motors KW",
      locale: locale === "ar" ? "ar_KW" : "en_US",
      images: images[0] ? [{ url: images[0], width: 1200, height: 630, alt: vehicle.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images[0] ? [images[0]] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/vehicles/${id}`,
      languages: { en: `${SITE_URL}/en/vehicles/${id}`, ar: `${SITE_URL}/ar/vehicles/${id}` },
    },
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { id } = await params;

  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle || vehicle.status !== "active") notFound();

  const similarVehicles = await prisma.vehicle.findMany({
    where: {
      category: vehicle.category,
      status: "active",
      id: { not: vehicle.id },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
    select: {
      id: true, title: true, brand: true, model: true, year: true, price: true,
      mileage: true, condition: true, category: true, fuelType: true,
      transmission: true, images: true,
    },
  });

  return (
    <>
      <VehicleJsonLd vehicle={vehicle} />
      <VehicleDetailClient vehicle={vehicle} similarVehicles={similarVehicles as unknown as Parameters<typeof VehicleDetailClient>[0]["similarVehicles"]} />
    </>
  );
}
