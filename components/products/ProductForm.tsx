import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Product } from "@/app/generated/prisma/index";
import { getImagePath } from "@/utils";
import ImageUpload from "./ImageUpload";

type ProductFormProps = {
  product?: Product;
};

async function fetchCategories() {
  return await prisma.category.findMany();
}

export default async function ProductForm({ product }: ProductFormProps) {
  const categories = await fetchCategories();
  console.log("productform server");

  return (
    <div className="flex flex-col gap-4 mb-5 items-start">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Nombre:</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Nombre Producto"
          defaultValue={product?.name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price">Precio:</label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Precio Producto"
          defaultValue={product?.price || ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="categoryId">Categoría:</label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId || ""}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <ImageUpload currentImage={product?.image} />
    </div>
  );
}
