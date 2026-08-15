"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/vehicles", label: "Manage Vehicles", icon: Car },
  { href: "/admin/vehicles/new", label: "Add Vehicle", icon: PlusCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const sidebar = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-base">E</span>
          </div>
          <div>
            <span className="text-white text-sm font-bold tracking-wide">
              Elite Motors
            </span>
            <p className="text-text-secondary text-[11px]">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-text-secondary hover:text-white hover:bg-surface-card"
              }`}
            >
              <Icon size={18} />
              {label}
            </a>
          );
        })}

        <a
          href="/en"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-surface-card transition-colors"
        >
          <ExternalLink size={18} />
          View Website
        </a>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-surface-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-[#111111] border-r border-surface-border z-30">
        {sidebar}
      </aside>

      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#111111] border-b border-surface-border z-40 flex items-center px-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white p-1"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-3 text-white text-sm font-bold">
          Elite Motors Admin
        </span>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#111111] border-r border-surface-border">
            {sidebar}
          </aside>
        </div>
      )}
    </>
  );
}
