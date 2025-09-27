"use client";

import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/types";
import useSWR from "swr";

export default function OrdersPage() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);

  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000
  });

  if (data)
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <Logo />

        <h1 className="text-2xl font-bold mt-5">Ordenes listas</h1>

        {isLoading && <p className="mt-3">Cargando...</p>}

        {data && data.length === 0 && (
          <p className="mt-3">No hay ordenes listas para entregar</p>
        )}

        {data && data.length > 0 && (
          <ul className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.map((order) => (
              <li key={order.id} className="border p-5 mb-2">
                <p className="font-bold">Orden ID: {order.id}</p>
                <p>Fecha: {new Date(order.date).toLocaleDateString()}</p>
                <p>Cliente: {order.name}</p>
                <p>Total: ${order.total}</p>
                <div className="mt-2">
                  <h4 className="font-bold">Productos:</h4>
                  <ul className="list-disc list-inside">
                    {order.orderProducts.map((product) => (
                      <li key={product.id}>
                        {product.product.name} x {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}
