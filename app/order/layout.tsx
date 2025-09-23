import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";

export default function OrderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-10 h-screen overflow-hidden">
      <OrderSidebar />

      <main className="flex-1 overflow-auto p-5">{children}</main>

      <OrderSummary />
    </div>
  );
}
