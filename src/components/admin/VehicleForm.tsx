"use client";

import { useState, useRef, FormEvent, KeyboardEvent, DragEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { X, Plus, Upload, GripVertical, ImageIcon } from "lucide-react";

const CATEGORIES = [
  "Sedan", "Pickup", "SUV", "Hatchback", "Sport", "Muscle",
  "Roadster", "Coupe", "Micro", "Luxury", "MPV", "Bikes",
];

const CONDITIONS = ["New", "Used", "Certified Pre-Owned"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];
const TRANSMISSIONS = ["Automatic", "Manual"];

const BRANDS = [
  "Audi", "BMW", "Chevrolet", "Dodge", "Ferrari", "Ford", "Honda",
  "Hyundai", "Jaguar", "Jeep", "Kawasaki", "Kia", "Lamborghini",
  "Land Rover", "Lexus", "Mazda", "Mercedes-Benz", "Nissan", "Porsche",
  "Range Rover", "Rolls-Royce", "Smart", "Suzuki", "Tesla", "Toyota",
  "Volkswagen", "Yamaha",
];

const YEARS = Array.from({ length: 26 }, (_, i) => 2025 - i);

type VehicleData = {
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: string;
  category: string;
  fuelType: string;
  transmission: string;
  engineSize: string;
  horsepower: string;
  exteriorColor: string;
  interiorColor: string;
  description: string;
  features: string[];
  images: string[];
  isNegotiable: boolean;
  isFeatured: boolean;
};

const DEFAULT_DATA: VehicleData = {
  title: "",
  brand: "",
  model: "",
  year: 2024,
  price: 0,
  mileage: 0,
  condition: "New",
  category: "Sedan",
  fuelType: "Petrol",
  transmission: "Automatic",
  engineSize: "",
  horsepower: "",
  exteriorColor: "",
  interiorColor: "",
  description: "",
  features: [],
  images: [],
  isNegotiable: false,
  isFeatured: false,
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-text-secondary mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function VehicleForm({
  initialData,
  vehicleId,
}: {
  initialData?: Partial<VehicleData>;
  vehicleId?: string;
}) {
  const router = useRouter();
  const isEdit = !!vehicleId;
  const [data, setData] = useState<VehicleData>({ ...DEFAULT_DATA, ...initialData });
  const [featureInput, setFeatureInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customBrand, setCustomBrand] = useState(
    initialData?.brand && !BRANDS.includes(initialData.brand)
  );

  function updateField<K extends keyof VehicleData>(key: K, value: VehicleData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function addFeature(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const val = featureInput.trim();
    if (val && !data.features.includes(val)) {
      updateField("features", [...data.features, val]);
    }
    setFeatureInput("");
  }

  function removeFeature(f: string) {
    updateField("features", data.features.filter((x) => x !== f));
  }

  async function uploadFiles(files: FileList | File[]) {
    const fileArr = Array.from(files);
    if (fileArr.length === 0) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    for (const f of fileArr) {
      if (!allowed.includes(f.type)) {
        toast.error(`Invalid file type: ${f.name}. Use JPG, PNG, or WebP.`);
        return;
      }
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`${f.name} exceeds 5MB limit.`);
        return;
      }
    }

    if (data.images.length + fileArr.length > 15) {
      toast.error("Maximum 15 images allowed.");
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    const formData = new FormData();
    fileArr.forEach((f) => formData.append("images", f));

    try {
      setUploadProgress(30);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      setUploadProgress(80);

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Upload failed");
        return;
      }

      const result = await res.json();
      const newUrls = result.images.map((img: { url: string }) => img.url);
      updateField("images", [...data.images, ...newUrls]);
      setUploadProgress(100);
      toast.success(`${newUrls.length} image(s) uploaded`);
    } catch {
      toast.error("Upload failed");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
  }

  function removeImage(index: number) {
    updateField("images", data.images.filter((_, i) => i !== index));
  }

  function handleReorderDragStart(index: number) {
    setDragIndex(index);
  }

  function handleReorderDragOver(e: DragEvent, index: number) {
    e.preventDefault();
    setDragOverIndex(index);
  }

  function handleReorderDrop(e: DragEvent, dropIndex: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const newImages = [...data.images];
    const [moved] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, moved);
    updateField("images", newImages);
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function handleReorderDragEnd() {
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!data.title.trim()) errs.title = "Title is required";
    if (!data.brand.trim()) errs.brand = "Brand is required";
    if (!data.model.trim()) errs.model = "Model is required";
    if (!data.year) errs.year = "Year is required";
    if (!data.price) errs.price = "Price is required";
    if (!data.category) errs.category = "Category is required";
    if (!data.condition) errs.condition = "Condition is required";
    if (data.images.length === 0) errs.images = "At least one image is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const fields = Object.keys(errs);
      toast.error(`Missing: ${fields.join(", ")}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    const payload = {
      ...data,
      horsepower: data.horsepower ? Number(data.horsepower) : null,
    };

    const url = isEdit
      ? `/api/admin/vehicles/${vehicleId}`
      : "/api/admin/vehicles";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(isEdit ? "Vehicle updated!" : "Vehicle created!");
        router.push("/admin/vehicles");
      } else {
        const err = await res.json();
        toast.error(err.error || "Something went wrong");
        setSaving(false);
      }
    } catch {
      toast.error("Network error — please try again");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!vehicleId || !confirm("Are you sure you want to delete this vehicle?"))
      return;
    const res = await fetch(`/api/admin/vehicles/${vehicleId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Vehicle deleted");
      router.push("/admin/vehicles");
    } else {
      toast.error("Failed to delete");
    }
  }

  const inputClass =
    "w-full px-3 py-2.5 bg-surface-dark border border-surface-border rounded-lg text-white text-sm focus:outline-none focus:border-gold transition-colors";
  const selectClass = inputClass + " appearance-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Field label="Title *" error={errors.title}>
              <input
                type="text"
                value={data.title}
                onChange={(e) => updateField("title", e.target.value)}
                className={inputClass}
                placeholder="e.g. 2024 Mercedes-Benz S 500"
              />
            </Field>
          </div>

          <Field label="Brand *" error={errors.brand}>
            {customBrand ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={data.brand}
                  onChange={(e) => updateField("brand", e.target.value)}
                  className={inputClass}
                  placeholder="Enter brand name"
                />
                <button
                  type="button"
                  onClick={() => { setCustomBrand(false); updateField("brand", BRANDS[0]); }}
                  className="px-3 text-xs text-gold hover:text-gold-light whitespace-nowrap"
                >
                  Use list
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <select
                  value={data.brand}
                  onChange={(e) => updateField("brand", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select brand</option>
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => { setCustomBrand(true); updateField("brand", ""); }}
                  className="px-3 text-xs text-gold hover:text-gold-light whitespace-nowrap"
                >
                  Custom
                </button>
              </div>
            )}
          </Field>

          <Field label="Model *" error={errors.model}>
            <input
              type="text"
              value={data.model}
              onChange={(e) => updateField("model", e.target.value)}
              className={inputClass}
              placeholder="e.g. S 500"
            />
          </Field>

          <Field label="Year *" error={errors.year}>
            <select
              value={data.year}
              onChange={(e) => updateField("year", Number(e.target.value))}
              className={selectClass}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </Field>

          <Field label="Price (KWD) *" error={errors.price}>
            <input
              type="number"
              value={data.price || ""}
              onChange={(e) => updateField("price", Number(e.target.value))}
              className={inputClass}
              placeholder="0"
              min="0"
            />
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.isNegotiable}
                onChange={(e) => updateField("isNegotiable", e.target.checked)}
                className="w-4 h-4 rounded border-surface-border bg-surface-dark text-gold accent-gold cursor-pointer"
              />
              <span className="text-sm text-text-secondary">Price is negotiable</span>
            </label>
          </Field>

          <Field label="Mileage (km)">
            <input
              type="number"
              value={data.mileage || ""}
              onChange={(e) => updateField("mileage", Number(e.target.value))}
              className={inputClass}
              placeholder="0"
              min="0"
            />
          </Field>

          <Field label="Category *" error={errors.category}>
            <select
              value={data.category}
              onChange={(e) => updateField("category", e.target.value)}
              className={selectClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Condition *" error={errors.condition}>
            <select
              value={data.condition}
              onChange={(e) => updateField("condition", e.target.value)}
              className={selectClass}
            >
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      {/* Technical Specs */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Technical Specs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Fuel Type">
            <select
              value={data.fuelType}
              onChange={(e) => updateField("fuelType", e.target.value)}
              className={selectClass}
            >
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </Field>

          <Field label="Transmission">
            <select
              value={data.transmission}
              onChange={(e) => updateField("transmission", e.target.value)}
              className={selectClass}
            >
              {TRANSMISSIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Engine Size">
            <input
              type="text"
              value={data.engineSize}
              onChange={(e) => updateField("engineSize", e.target.value)}
              className={inputClass}
              placeholder="e.g. 3.0L V6 Turbo"
            />
          </Field>

          <Field label="Horsepower">
            <input
              type="number"
              value={data.horsepower}
              onChange={(e) => updateField("horsepower", e.target.value)}
              className={inputClass}
              placeholder="e.g. 450"
              min="0"
            />
          </Field>

          <Field label="Exterior Color">
            <input
              type="text"
              value={data.exteriorColor}
              onChange={(e) => updateField("exteriorColor", e.target.value)}
              className={inputClass}
              placeholder="e.g. Obsidian Black"
            />
          </Field>

          <Field label="Interior Color">
            <input
              type="text"
              value={data.interiorColor}
              onChange={(e) => updateField("interiorColor", e.target.value)}
              className={inputClass}
              placeholder="e.g. Macchiato Beige"
            />
          </Field>
        </div>
      </section>

      {/* Description */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Description</h2>
        <textarea
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
          className={inputClass + " min-h-[120px] resize-y"}
          placeholder="Describe the vehicle..."
        />
      </section>

      {/* Features */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Features</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {data.features.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/30 text-gold text-sm rounded-full"
            >
              {f}
              <button
                type="button"
                onClick={() => removeFeature(f)}
                className="hover:text-red-400 transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={featureInput}
          onChange={(e) => setFeatureInput(e.target.value)}
          onKeyDown={addFeature}
          className={inputClass}
          placeholder="Type a feature and press Enter..."
        />
      </section>

      {/* Images */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">
          Images * <span className="text-text-secondary text-sm font-normal">({data.images.length}/15)</span>
        </h2>
        {errors.images && (
          <p className="text-red-400 text-xs mb-3">{errors.images}</p>
        )}

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragOver
              ? "border-gold bg-gold/5"
              : "border-gold/30 hover:border-gold/60 hover:bg-gold/5"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={(e) => {
              if (e.target.files) uploadFiles(e.target.files);
              e.target.value = "";
            }}
            className="hidden"
          />
          <Upload size={32} className="text-gold/60 mx-auto mb-3" />
          <p className="text-white text-sm font-medium mb-1">
            Drag & drop images here or click to upload
          </p>
          <p className="text-text-secondary text-xs">
            JPG, PNG, WebP — Max 5MB per image — Max 15 images
          </p>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-3">
            <div className="h-1.5 bg-surface-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-text-secondary text-xs mt-1">Uploading...</p>
          </div>
        )}

        {/* Image Preview Grid */}
        {data.images.length > 0 && (
          <div className="mt-4">
            <p className="text-text-secondary text-xs mb-2">
              Drag to reorder — first image is the primary photo
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {data.images.map((url, i) => (
                <div
                  key={url + i}
                  draggable
                  onDragStart={() => handleReorderDragStart(i)}
                  onDragOver={(e) => handleReorderDragOver(e, i)}
                  onDrop={(e) => handleReorderDrop(e, i)}
                  onDragEnd={handleReorderDragEnd}
                  className={`group relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing ${
                    dragOverIndex === i && dragIndex !== i
                      ? "border-gold scale-105"
                      : dragIndex === i
                        ? "border-gold/50 opacity-50"
                        : i === 0
                          ? "border-gold"
                          : "border-surface-border"
                  }`}
                >
                  <img
                    src={url}
                    alt={`Image ${i + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />

                  {/* Primary badge */}
                  {i === 0 && (
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-gold text-black text-[10px] font-bold rounded">
                      PRIMARY
                    </span>
                  )}

                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <div className="text-white/70">
                      <GripVertical size={20} />
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(i);
                    }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              {/* Add more button */}
              {data.images.length < 15 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-[4/3] rounded-lg border-2 border-dashed border-surface-border hover:border-gold/50 flex flex-col items-center justify-center gap-2 transition-colors"
                >
                  <Plus size={20} className="text-text-secondary" />
                  <span className="text-text-secondary text-xs">Add more</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Fallback: Add URL manually */}
        {data.images.length === 0 && !uploading && (
          <div className="mt-3 flex items-center gap-2">
            <ImageIcon size={14} className="text-text-secondary" />
            <AddUrlInput
              onAdd={(url) => updateField("images", [...data.images, url])}
            />
          </div>
        )}
      </section>

      {/* Featured toggle */}
      <section>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            className={`w-11 h-6 rounded-full relative transition-colors ${
              data.isFeatured ? "bg-gold" : "bg-surface-border"
            }`}
            onClick={() => updateField("isFeatured", !data.isFeatured)}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                data.isFeatured ? "translate-x-[22px]" : "translate-x-0.5"
              }`}
            />
          </div>
          <span className="text-white text-sm font-medium">
            Featured Vehicle
          </span>
        </label>
      </section>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
        <button
          type="submit"
          disabled={saving || uploading}
          className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 text-sm"
        >
          {saving
            ? "Saving..."
            : isEdit
              ? "Update Vehicle"
              : "Save Vehicle"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/vehicles")}
          className="px-6 py-3 text-text-secondary hover:text-white border border-surface-border rounded-lg transition-colors text-sm"
        >
          Cancel
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="ml-auto px-6 py-3 text-red-400 hover:bg-red-500/10 border border-red-500/30 rounded-lg transition-colors text-sm"
          >
            Delete Vehicle
          </button>
        )}
      </div>
    </form>
  );
}

function AddUrlInput({ onAdd }: { onAdd: (url: string) => void }) {
  const [url, setUrl] = useState("");

  return (
    <div className="flex gap-2 flex-1">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Or paste an image URL..."
        className="flex-1 px-3 py-2 bg-surface-dark border border-surface-border rounded-lg text-white text-xs focus:outline-none focus:border-gold transition-colors"
      />
      <button
        type="button"
        onClick={() => {
          if (url.trim()) {
            onAdd(url.trim());
            setUrl("");
          }
        }}
        className="px-3 py-2 text-xs text-gold hover:text-gold-light border border-gold/30 rounded-lg transition-colors"
      >
        Add URL
      </button>
    </div>
  );
}
