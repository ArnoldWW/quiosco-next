"use server";

import { ProductSchema } from "@/lib/schema";
import { prisma } from "@/lib/prisma";

export async function createProduct(data: unknown) {
  const result = ProductSchema.safeParse(data);

  if (!result.success) {
    console.log("validation errors:", result.error.issues);

    return {
      errors: result.error.issues
    };
  }

  await prisma.product.create({
    data: result.data
  });
}
