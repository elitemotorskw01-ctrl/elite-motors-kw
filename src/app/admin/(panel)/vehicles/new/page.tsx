import VehicleForm from "@/components/admin/VehicleForm";

export default function AddVehiclePage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-white mb-6">Add New Vehicle</h1>
      <VehicleForm />
    </div>
  );
}
