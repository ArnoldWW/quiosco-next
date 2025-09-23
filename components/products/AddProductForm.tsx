"use client";

import { createProduct } from "@/actions/create-product-action";
import { ProductSchema } from "@/lib/schema";
import { redirect } from "next/navigation";

export default function AddProductForm({
  children
}: {
  children?: React.ReactNode;
}) {
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name")?.toString(),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image")
    };

    // Validate data on the client side
    const result = ProductSchema.safeParse(data);

    //  If validation fails, show errors
    if (!result.success) {
      return result.error.issues.forEach((issue) => {
        alert(issue.message);
      });
    }

    // If validation passes, call the server action to create the product
    const res = await createProduct(data);

    if (res?.errors) {
      return res.errors.forEach((issue) => {
        alert(issue.message);
      });
    }

    alert("Producto creado correctamente");
    redirect("/admin/products");
  };

  return (
    <form action={handleSubmit}>
      {children}

      <button type="submit" className="btn">
        Crear Producto
      </button>
    </form>
  );
}
