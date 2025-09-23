import { Order, OrderProducts, Product } from "@/app/generated/prisma";

export type OrderItem = Pick<Product, "id" | "name" | "price" | "image"> & {
  quantity: number;
  subtotal: number;
};

export type OrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product;
  })[];
};
