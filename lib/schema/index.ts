import { z } from "zod";
import { Order, Product } from "../../app/generated/prisma/index";

export const OrderSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  total: z.number().min(1, "El total debe ser mayor a 0"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
      subtotal: z.number()
    })
  )
});

export const OrderIdSchema = z.object({
  orderId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, {
      message: "El ID de la orden debe ser un número positivo"
    })
});

export const SearchSchema = z.object({
  search: z
    .string()
    .trim()
    .min(1, { message: "El término de búsqueda no puede estar vacío" })
});

export const ProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "El Nombre del Producto no puede ir vacio" }),
  price: z
    .string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: "El Precio debe ser mayor a 0" }),
  categoryId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "La Categoría es Obligatoria" }),
  image: z.string().min(1, { message: "La Imagen es Obligatoria" })
});
