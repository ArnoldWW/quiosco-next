import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductList from "@/components/products/ProductList";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";

//Fetch total products count
async function fetchProductsCount() {
  const count = await prisma.product.count();
  return count;
}

// Fetch products with pagination
async function fetchProducts(pageSize: number, pageNumber: number) {
  const skip = (pageNumber - 1) * pageSize;
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: { category: true }
  });

  return products;
}

// Type for products with category
export type ProductsWithCategory = Awaited<ReturnType<typeof fetchProducts>>;

export default async function AdminProductsPage({
  searchParams
}: {
  searchParams: {
    page: string;
  };
}) {
  // Get current page from query params and set defaults
  const { page } = await searchParams;
  const pageSize = 10;
  const pageNumber = page ? parseInt(page) : 1;

  // Validate page number
  if (pageNumber < 1 || isNaN(pageNumber)) {
    redirect("/admin/products");
  }

  // Fetch products and total count in parallel
  const [products, totalProducts] = await Promise.all([
    fetchProducts(pageSize, pageNumber),
    fetchProductsCount()
  ]);

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / pageSize);

  // Redirect if page number exceeds total pages
  if (pageNumber > totalPages) {
    redirect("/admin/products");
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Listado de productos</h1>

      <div className="mb-5 flex justify-between">
        <Link
          href="/admin/products/new"
          className="border px-3 py-2 hover:bg-amber-200"
        >
          Crear nuevo producto
        </Link>

        <ProductSearchForm />
      </div>

      {products.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <>
          <ProductList products={products} />
          <ProductsPagination page={pageNumber} totalPages={totalPages} />
        </>
      )}
    </>
  );
}
