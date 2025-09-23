import { prisma } from "@/lib/prisma";
import ImageUpload from "./ImageUpload";

async function fetchCategories() {
  return await prisma.category.findMany();
}

export default async function ProductForm() {
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
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price">Precio:</label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Precio Producto"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="categoryId">Categoría:</label>
        <select id="categoryId" name="categoryId">
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <ImageUpload />
    </div>
  );
}
