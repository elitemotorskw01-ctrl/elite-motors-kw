"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  Search,
  Star,
  Pencil,
  Trash2,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Vehicle = {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  year: number;
  condition: string;
  status: string;
  isFeatured: boolean;
  isSold: boolean;
  images: string;
};

type Tab = "all" | "active" | "sold" | "featured";

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "sold", label: "Sold" },
  { key: "featured", label: "Featured" },
];

export default function ManageVehiclesPageWrapper() {
  return (
    <Suspense>
      <ManageVehiclesPage />
    </Suspense>
  );
}

function ManageVehiclesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [tab, setTab] = useState<Tab>(
    (searchParams.get("tab") as Tab) || "all"
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (tab === "active") params.set("status", "active");
    else if (tab === "sold") params.set("status", "sold");
    else params.set("status", "all");
    if (tab === "featured") params.set("featured", "true");
    params.set("page", String(page));
    params.set("limit", "20");

    const res = await fetch(`/api/vehicles?${params}`);
    const data = await res.json();
    setVehicles(data.vehicles);
    setTotal(data.total);
    setTotalPages(data.totalPages);
    setLoading(false);
  }, [search, tab, page]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchVehicles();
  }

  async function toggleFeatured(id: string) {
    const res = await fetch(`/api/admin/vehicles/${id}/toggle-featured`, {
      method: "PATCH",
    });
    if (res.ok) {
      toast.success("Featured status updated");
      fetchVehicles();
    } else {
      toast.error("Failed to update");
    }
  }

  async function toggleSold(id: string) {
    const res = await fetch(`/api/admin/vehicles/${id}/toggle-sold`, {
      method: "PATCH",
    });
    if (res.ok) {
      toast.success("Sold status updated");
      fetchVehicles();
    } else {
      toast.error("Failed to update");
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    const res = await fetch(`/api/admin/vehicles/${deleteId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Vehicle deleted");
      setDeleteId(null);
      fetchVehicles();
    } else {
      toast.error("Failed to delete");
    }
  }

  function getFirstImage(imagesJson: string): string {
    try {
      const arr = JSON.parse(imagesJson);
      return arr[0] || "";
    } catch {
      return "";
    }
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Vehicles</h1>
          <p className="text-text-secondary text-sm mt-1">
            {total} vehicles total
          </p>
        </div>
        <a
          href="/admin/vehicles/new"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors text-sm"
        >
          Add New Vehicle
        </a>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-1 bg-surface-card border border-surface-border rounded-lg p-1">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setTab(key);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === key
                  ? "bg-gold text-black"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or brand..."
              className="w-full pl-9 pr-4 py-2.5 bg-surface-card border border-surface-border rounded-lg text-white text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-surface-card border border-surface-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="text-left text-text-secondary font-medium px-4 py-3">
                  Vehicle
                </th>
                <th className="text-left text-text-secondary font-medium px-4 py-3 hidden md:table-cell">
                  Category
                </th>
                <th className="text-left text-text-secondary font-medium px-4 py-3">
                  Price
                </th>
                <th className="text-left text-text-secondary font-medium px-4 py-3 hidden lg:table-cell">
                  Year
                </th>
                <th className="text-left text-text-secondary font-medium px-4 py-3 hidden lg:table-cell">
                  Condition
                </th>
                <th className="text-left text-text-secondary font-medium px-4 py-3">
                  Status
                </th>
                <th className="text-left text-text-secondary font-medium px-4 py-3 hidden sm:table-cell">
                  Featured
                </th>
                <th className="text-right text-text-secondary font-medium px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center text-text-secondary py-12"
                  >
                    Loading...
                  </td>
                </tr>
              ) : vehicles.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center text-text-secondary py-12"
                  >
                    No vehicles found
                  </td>
                </tr>
              ) : (
                vehicles.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b border-surface-border last:border-b-0 hover:bg-surface-dark/50 transition-colors"
                  >
                    {/* Vehicle */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-9 rounded-md overflow-hidden bg-surface-dark flex-shrink-0">
                          <img
                            src={getFirstImage(v.images)}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate max-w-[200px]">
                            {v.title}
                          </p>
                          <p className="text-text-secondary text-xs">
                            {v.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-text-secondary">{v.category}</span>
                    </td>
                    {/* Price */}
                    <td className="px-4 py-3">
                      <span className="text-gold font-medium">
                        {v.price.toLocaleString()} KWD
                      </span>
                    </td>
                    {/* Year */}
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-text-secondary">{v.year}</span>
                    </td>
                    {/* Condition */}
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-text-secondary">
                        {v.condition}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          v.status === "active"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    {/* Featured */}
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {v.isFeatured && (
                        <Star
                          size={16}
                          className="text-gold fill-gold"
                        />
                      )}
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() =>
                            router.push(`/admin/vehicles/${v.id}/edit`)
                          }
                          title="Edit"
                          className="p-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => toggleFeatured(v.id)}
                          title="Toggle Featured"
                          className={`p-2 rounded-lg transition-colors ${
                            v.isFeatured
                              ? "text-gold hover:bg-gold/10"
                              : "text-text-secondary hover:text-gold hover:bg-surface-dark"
                          }`}
                        >
                          <Star size={15} />
                        </button>
                        <button
                          onClick={() => toggleSold(v.id)}
                          title="Toggle Sold"
                          className={`p-2 rounded-lg transition-colors ${
                            v.isSold
                              ? "text-red-400 hover:bg-red-500/10"
                              : "text-text-secondary hover:text-green-400 hover:bg-surface-dark"
                          }`}
                        >
                          <ShoppingCart size={15} />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(v.id);
                            setDeleteTitle(v.title);
                          }}
                          title="Delete"
                          className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-surface-border">
            <span className="text-text-secondary text-sm">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 text-text-secondary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 text-text-secondary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setDeleteId(null)}
          />
          <div className="relative bg-surface-card border border-surface-border rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-white mb-2">
              Delete Vehicle
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Are you sure you want to delete &quot;{deleteTitle}&quot;? This
              action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm text-text-secondary hover:text-white border border-surface-border rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
