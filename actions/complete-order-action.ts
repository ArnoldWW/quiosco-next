"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { OrderIdSchema } from "@/lib/schema";

export async function completeOrder(formData: FormData) {
  const result = OrderIdSchema.safeParse({ orderId: formData.get("order_id") });

  if (!result.success) {
    console.log(result.error);
    return;
  }

  try {
    await prisma.order.update({
      where: { id: result.data.orderId },
      data: { status: true, orderReadyAt: new Date(Date.now()) }
    });

    // Revalidate the path to refresh the data
    revalidatePath("/admin/orders");
  } catch (error) {
    console.log(error);
  }
}
