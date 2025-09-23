import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Crear nuevo producto</h1>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
