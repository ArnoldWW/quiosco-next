"use client";

import { Product } from "@/app/generated/prisma";
import { useStore } from "@/zustand/store";

type AddProductButtonProps = {
  product: Product;
};

export default function AddProductButton({ product }: AddProductButtonProps) {
  const addToOrder = useStore((state) => state.addToOrder);

  return (
    <button
      type="button"
      className="btn"
      onClick={() =>
        addToOrder({ ...product, quantity: 1, subtotal: product.price })
      }
    >
      Añadir al pedido
    </button>
  );
}
