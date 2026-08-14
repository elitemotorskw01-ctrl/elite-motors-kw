import type { Vehicle } from "@prisma/client";

export default function VehicleJsonLd({ vehicle }: { vehicle: Vehicle }) {
  const images: string[] = JSON.parse(vehicle.images);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: vehicle.title,
    brand: { "@type": "Brand", name: vehicle.brand },
    model: vehicle.model,
    modelDate: String(vehicle.year),
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    fuelType: vehicle.fuelType,
    vehicleTransmission: vehicle.transmission,
    color: vehicle.exteriorColor,
    vehicleInteriorColor: vehicle.interiorColor || undefined,
    vehicleEngine: vehicle.engineSize
      ? { "@type": "EngineSpecification", name: vehicle.engineSize }
      : undefined,
    description: vehicle.description,
    image: images,
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "KWD",
      availability: vehicle.isSold
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      itemCondition:
        vehicle.condition === "New"
          ? "https://schema.org/NewCondition"
          : "https://schema.org/UsedCondition",
    },
    category: vehicle.category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
