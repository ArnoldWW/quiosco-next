"use client";

import { useStore } from "@/zustand/store";
import OrderItemDetails from "./OrderItemDetails";
import { formatCurrency } from "@/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/lib/schema";

export default function OrderSummary() {
  // zustand store
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);

  // calculate total
  const total = order.reduce((acc, item) => acc + item.subtotal, 0);

  // Function to handle form submission
  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
      total,
      order
    };

    // validate data with zod
    const result = OrderSchema.safeParse(data);
    console.log(result);

    if (!result.success) {
      return result.error.issues.forEach((err) => {
        alert(err.message);
      });
    }

    // Validate data from the server action
    const response = await createOrder(data);
    if (response?.errors) {
      return response.errors.forEach((err) => {
        alert(err.message);
      });
    }

    alert("Pedido creado correctamente");
    clearOrder?.();
  };

  return (
    <div className="flex-1 p-5 overflow-y-auto">
      <h2 className="text-lg font-bold uppercase">Pedido</h2>

      {order.length === 0 ? (
        <p>No hay productos en el pedido</p>
      ) : (
        <ul>
          {order.map((item) => (
            <OrderItemDetails key={item.id} item={item} />
          ))}
        </ul>
      )}

      {total > 0 && (
        <div className="mt-5">
          <p className="text-xl font-bold">
            Total a pagar: {formatCurrency(total)}
          </p>
        </div>
      )}

      {total > 0 ? (
        <form action={handleCreateOrder} className="mt-5 flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="border w-full p-2"
          />
          <button type="submit" className="border w-full px-3 py-1">
            Confirmar pedido
          </button>
        </form>
      ) : null}
    </div>
  );
}
