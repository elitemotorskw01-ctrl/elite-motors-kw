import { prisma } from "@/lib/prisma";
import { Car, CheckCircle, Star, ShoppingCart } from "lucide-react";

export default async function AdminDashboardPage() {
  const [total, active, sold, featured] = await Promise.all([
    prisma.vehicle.count(),
    prisma.vehicle.count({ where: { status: "active" } }),
    prisma.vehicle.count({ where: { isSold: true } }),
    prisma.vehicle.count({ where: { isFeatured: true } }),
  ]);

  const stats = [
    { label: "Total Vehicles", value: total, icon: Car },
    { label: "Active Listings", value: active, icon: CheckCircle },
    { label: "Sold Vehicles", value: sold, icon: ShoppingCart },
    { label: "Featured Vehicles", value: featured, icon: Star },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Welcome, Admin</h1>
        <p className="text-text-secondary text-sm mt-1">
          Here&apos;s an overview of your vehicle marketplace
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-surface-card border border-surface-border rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary text-sm">{label}</span>
              <div className="w-9 h-9 bg-gold/10 rounded-lg flex items-center justify-center">
                <Icon size={18} className="text-gold" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gold">{value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <a
          href="/admin/vehicles/new"
          className="px-5 py-2.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors text-sm"
        >
          Add New Vehicle
        </a>
        <a
          href="/en"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 border border-surface-border text-text-secondary rounded-lg hover:text-white hover:border-gold/50 transition-colors text-sm"
        >
          View Website
        </a>
      </div>
    </div>
  );
}
