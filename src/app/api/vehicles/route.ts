import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const status = params.get("status") || "active";
  const featured = params.get("featured");
  const page = Math.max(1, Number(params.get("page")) || 1);
  const limit = Math.min(50, Math.max(1, Number(params.get("limit")) || 20));
  const sort = params.get("sort") || "newest";

  const where: Record<string, unknown> = {};
  if (status !== "all") where.status = status;
  if (category) where.category = category;
  if (featured === "true") where.isFeatured = true;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { brand: { contains: search } },
      { model: { contains: search } },
    ];
  }

  const orderBy: Record<string, string> =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
        ? { price: "desc" }
        : sort === "year_desc"
          ? { year: "desc" }
          : { createdAt: "desc" };

  const [vehicles, total] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.vehicle.count({ where }),
  ]);

  return NextResponse.json({
    vehicles,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
