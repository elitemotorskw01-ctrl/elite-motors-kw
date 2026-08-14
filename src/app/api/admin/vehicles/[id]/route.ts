import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        title: body.title,
        brand: body.brand,
        model: body.model,
        year: Number(body.year),
        price: Number(body.price),
        mileage: Number(body.mileage) || 0,
        condition: body.condition,
        category: body.category,
        fuelType: body.fuelType || "Petrol",
        transmission: body.transmission || "Automatic",
        engineSize: body.engineSize || null,
        horsepower: body.horsepower ? Number(body.horsepower) : null,
        exteriorColor: body.exteriorColor || "",
        interiorColor: body.interiorColor || null,
        description: body.description || "",
        features: (body.features || []).join(","),
        images: JSON.stringify(body.images || []),
        isFeatured: body.isFeatured || false,
      },
    });

    return NextResponse.json(vehicle);
  } catch {
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.vehicle.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
