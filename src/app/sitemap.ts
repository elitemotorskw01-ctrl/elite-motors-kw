import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await prisma.vehicle.findMany({
    where: { status: "active" },
    select: { id: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });

  const staticPages = [
    { path: "", priority: 1.0 },
    { path: "/inventory", priority: 0.9 },
    { path: "/categories", priority: 0.8 },
    { path: "/sell", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of ["en", "ar"]) {
    for (const page of staticPages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: page.priority,
      });
    }

    for (const vehicle of vehicles) {
      entries.push({
        url: `${SITE_URL}/${locale}/vehicles/${vehicle.id}`,
        lastModified: vehicle.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
