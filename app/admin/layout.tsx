import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
