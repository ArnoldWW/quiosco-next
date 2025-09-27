import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });

  if (!product) {
    notFound();
  }

  return product;
}

export default async function EditProductPage({
  params
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  console.log(product);

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">
        Editar producto: {product.name}
      </h1>

      <div className="mb-5 flex justify-between">
        <GoBackButton />
      </div>

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
