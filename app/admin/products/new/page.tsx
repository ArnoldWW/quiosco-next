import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";

export default function NewProductPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Crear nuevo producto</h1>

      <div className="mb-5 flex justify-between">
        <GoBackButton />
      </div>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
