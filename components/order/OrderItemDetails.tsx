import Image from "next/image";
import { OrderItem } from "@/types";
import { useStore } from "@/zustand/store";
import { formatCurrency } from "@/utils";

type OrderItemProps = {
  item: OrderItem;
};

export default function OrderItemDetails({ item }: OrderItemProps) {
  const increaseItemQuantity =
    useStore((state) => state.increaseItemQuantity) ?? (() => {});
  const decreaseItemQuantity =
    useStore((state) => state.decreaseItemQuantity) ?? (() => {});
  const removeItemFromOrder =
    useStore((state) => state.removeItemFromOrder) ?? (() => {});

  return (
    <li key={item.id} className="border-b p-5 flex gap-20 items-center">
      <Image
        src={`/products/${item.image}.jpg`}
        width={80}
        height={80}
        alt={item.name}
        style={{ height: "auto", width: "auto" }}
      />
      <div className="flex flex-col gap-2">
        <p>{item.name}</p>

        <button
          type="button"
          className="border px-5"
          onClick={() => removeItemFromOrder(item.id)}
        >
          Eliminar
        </button>

        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="border px-5"
            onClick={() => decreaseItemQuantity(item.id)}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            className="border px-5"
            onClick={() => increaseItemQuantity(item)}
          >
            +
          </button>
        </div>
      </div>

      <div>
        <p>
          {item.quantity} x {item.price}
        </p>
        <p className="font-bold">{formatCurrency(item.subtotal)}</p>
      </div>
    </li>
  );
}
