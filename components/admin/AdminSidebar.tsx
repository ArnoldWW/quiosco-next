import Logo from "../ui/Logo";
import AdminRoute from "./AdminRoute";

const adminNavigation = [
  { url: "/admin/orders", text: "Ordenes", blank: false },
  { url: "/admin/products", text: "Productos", blank: false },
  { url: "/order/cafe", text: "Ver Quiosco", blank: true }
];

export default function AdminSidebar() {
  return (
    <aside className="p-5 bg-gray-100 min-w-64 h-screen">
      <Logo />

      <nav className="flex flex-col gap-4">
        {adminNavigation.map((link) => (
          <AdminRoute key={link.url} link={link} />
        ))}
      </nav>
    </aside>
  );
}
