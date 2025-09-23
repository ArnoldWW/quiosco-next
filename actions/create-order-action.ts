"use server";

import { prisma } from "@/lib/prisma";
import { OrderSchema } from "@/lib/schema";

export async function createOrder(data: unknown) {
  const res = OrderSchema.safeParse(data);

  if (!res.success) {
    return { errors: res.error.issues };
  }

  try {
    await prisma.order.create({
      data: {
        name: res.data.name,
        total: res.data.total,
        orderProducts: {
          create: res.data.order.map((item) => ({
            productId: item.id,
            quantity: item.quantity
          }))
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
