import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const {
      title,
      brand,
      model,
      year,
      price,
      category,
      condition,
      images,
    } = body;

    if (
      !title ||
      !brand ||
      !model ||
      !year ||
      !price ||
      !category ||
      !condition ||
      !images ||
      images.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        title,
        brand,
        model,
        year: Number(year),
        price: Number(price),
        mileage: Number(body.mileage) || 0,
        condition,
        category,
        fuelType: body.fuelType || "Petrol",
        transmission: body.transmission || "Automatic",
        engineSize: body.engineSize || null,
        horsepower: body.horsepower ? Number(body.horsepower) : null,
        exteriorColor: body.exteriorColor || "",
        interiorColor: body.interiorColor || null,
        description: body.description || "",
        features: (body.features || []).join(","),
        images: JSON.stringify(images),
        isFeatured: body.isFeatured || false,
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
