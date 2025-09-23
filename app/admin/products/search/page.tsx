import ProductList from "@/components/admin/ProductList";
import ProductSearchForm from "@/components/admin/ProductSearchForm";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function searchProducts(query: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive"
      }
    },
    include: { category: true }
  });

  return products;
}

export default async function SearchProductPage({
  searchParams
}: {
  searchParams: { query?: string };
}) {
  const { query } = await searchParams;

  if (!query || query.trim().length === 0) {
    redirect("/admin/products");
  }

  const products = await searchProducts(query);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">
        Resultados de búsqueda para: {query}
      </h1>

      <div className="mb-5">
        <ProductSearchForm />
      </div>

      {products.length === 0 ? (
        <p>No se encontraron productos para "{query}"</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {products.map((product) => (
            <ProductList key={product.id} products={[product]} />
          ))}
        </ul>
      )}
    </div>
  );
}
