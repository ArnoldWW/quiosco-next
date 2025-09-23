import ProductCard from "@/components/products/ProductCard";
import { prisma } from "@/lib/prisma";

type OrderPageProps = { params: { category: string } };

async function fetchProducts(category: string) {
  return await prisma.product.findMany({
    where: { category: { slug: category } }
  });
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { category } = await params;
  const products = await fetchProducts(category);
  console.log(products);

  return (
    <>
      <h1 className="text-center text-2xl uppercase">Productos de categoria</h1>
      <ul className="grid grid-cols-2 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}
