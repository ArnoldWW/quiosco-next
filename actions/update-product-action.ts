"use server";

import { prisma } from "@/lib/prisma";
import { ProductSchema } from "@/lib/schema";

export async function updateProduct(data: unknown, id: number) {
  const result = ProductSchema.safeParse(data);

  if (!result.success) {
    console.log("validation errors:", result.error.issues);

    return {
      errors: result.error.issues
    };
  }

  await prisma.product.update({
    where: { id },
    data: result.data
  });
}
