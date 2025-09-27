"use client";

import OrderCard from "@/components/order/OrderCard";
import useSWR, { mutate } from "swr";
import { OrderWithProducts } from "@/types";

export default function AdminOrdersPage() {
  const url = "/admin/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);

  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000
  });

  if (isLoading) return <p>Cargando...</p>;

  if (data)
    return (
      <div>
        <h1 className="text-2xl font-bold mb-5">Ordenes pendientes</h1>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.length === 0 ? (
            <p>No hay ordenes pendientes</p>
          ) : (
            data?.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                mutateOrders={() => mutate(url)}
              />
            ))
          )}
        </ul>
      </div>
    );
}
