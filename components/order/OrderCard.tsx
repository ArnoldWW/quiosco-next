import { completeOrder } from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/types";
import { formatCurrency } from "@/utils";

type OrderCardProps = {
  order: OrderWithProducts;
  mutateOrders?: () => void;
};

export default function OrderCard({ order, mutateOrders }: OrderCardProps) {
  const handleComplete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await completeOrder(formData);
    if (mutateOrders) mutateOrders();
  };
  return (
    <li key={order.id} className="border p-5 flex flex-col justify-center">
      <p className="font-bold">ORDEN ID: {order.id}</p>
      <p>FECHA DE CREACION: {new Date(order.date).toLocaleDateString()}</p>
      <p>CLIENTE: {order.name}</p>
      <p>ESTADO: {order.status ? "Completada" : "Pendiente"}</p>
      <p className="mt-5 font-bold">PRODUCTOS:</p>
      <ul>
        {order.orderProducts.map(({ product, quantity }) => (
          <li key={product.id}>
            {quantity} X {product.name}.
          </li>
        ))}
      </ul>

      <hr className="my-3" />

      <dl>
        <div className="flex justify-between">
          <dt>Total:</dt>
          <dd>{formatCurrency(order.total)}</dd>
        </div>
      </dl>

      <form onSubmit={handleComplete}>
        <input type="hidden" name="order_id" value={order.id} />
        <button
          type="submit"
          className="border p-3 mt-3 w-full bg-amber-200 hover:scale-105 transition-all"
        >
          Marcar como completada
        </button>
      </form>
    </li>
  );
}
