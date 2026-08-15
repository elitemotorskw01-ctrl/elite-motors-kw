import { prisma } from "@/lib/prisma";
import { Car, CheckCircle, Star, ShoppingCart, Eye, Users, TrendingUp, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(todayStart);
  monthStart.setDate(monthStart.getDate() - 30);

  const [total, active, sold, featured, viewsToday, viewsWeek, viewsMonth, viewsAll] =
    await Promise.all([
      prisma.vehicle.count(),
      prisma.vehicle.count({ where: { status: "active" } }),
      prisma.vehicle.count({ where: { isSold: true } }),
      prisma.vehicle.count({ where: { isFeatured: true } }),
      prisma.pageView.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.pageView.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.pageView.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.pageView.count(),
    ]);

  const vehicleStats = [
    { label: "Total Vehicles", value: total, icon: Car },
    { label: "Active Listings", value: active, icon: CheckCircle },
    { label: "Sold Vehicles", value: sold, icon: ShoppingCart },
    { label: "Featured Vehicles", value: featured, icon: Star },
  ];

  const visitorStats = [
    { label: "Today", value: viewsToday, icon: Clock },
    { label: "Last 7 Days", value: viewsWeek, icon: TrendingUp },
    { label: "Last 30 Days", value: viewsMonth, icon: Users },
    { label: "All Time", value: viewsAll, icon: Eye },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Welcome, Admin</h1>
        <p className="text-text-secondary text-sm mt-1">
          Here&apos;s an overview of your vehicle marketplace
        </p>
      </div>

      {/* Vehicle Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {vehicleStats.map(({ label, value, icon: Icon }) => (
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

      {/* Visitor Stats */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4">Website Visitors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visitorStats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-surface-card border border-surface-border rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-text-secondary text-sm">{label}</span>
                <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <Icon size={18} className="text-emerald-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-emerald-400">{value}</p>
            </div>
          ))}
        </div>
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
