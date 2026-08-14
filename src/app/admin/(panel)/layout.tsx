import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />
      <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">{children}</main>
    </div>
  );
}
