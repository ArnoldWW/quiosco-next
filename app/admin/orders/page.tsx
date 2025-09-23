import OrderCard from "@/components/order/OrderCard";
import { prisma } from "@/lib/prisma";
import React from "react";

// Get orders with status "false"
async function fetchOrders() {
  const orders = await prisma.order.findMany({
    where: { status: false },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  });

  return orders;
}

export default async function AdminOrdersPage() {
  const orders = await fetchOrders();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Ordenes pendientes</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.length === 0 ? (
          <p>No hay ordenes pendientes</p>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </ul>
    </div>
  );
}
