import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import VehicleForm from "@/components/admin/VehicleForm";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });

  if (!vehicle) notFound();

  let images: string[] = [];
  try {
    images = JSON.parse(vehicle.images);
  } catch {
    images = [vehicle.images];
  }

  const features = vehicle.features
    ? vehicle.features.split(",").map((f) => f.trim())
    : [];

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-white mb-6">
        Edit: {vehicle.title}
      </h1>
      <VehicleForm
        vehicleId={vehicle.id}
        initialData={{
          title: vehicle.title,
          brand: vehicle.brand,
          model: vehicle.model,
          year: vehicle.year,
          price: vehicle.price,
          mileage: vehicle.mileage,
          condition: vehicle.condition,
          category: vehicle.category,
          fuelType: vehicle.fuelType,
          transmission: vehicle.transmission,
          engineSize: vehicle.engineSize || "",
          horsepower: vehicle.horsepower ? String(vehicle.horsepower) : "",
          exteriorColor: vehicle.exteriorColor,
          interiorColor: vehicle.interiorColor || "",
          description: vehicle.description,
          features,
          images,
          isFeatured: vehicle.isFeatured,
        }}
      />
    </div>
  );
}
