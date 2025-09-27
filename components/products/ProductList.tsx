import Link from "next/link";
import Image from "next/image";
import { ProductsWithCategory } from "@/app/admin/products/page";
import { formatCurrency, getImagePath } from "@/utils";

type ProductTableProps = {
  products: ProductsWithCategory;
};

export default function ProductsList({ products }: ProductTableProps) {
  return (
    <ul className="w-full xl:w-1/2 flex flex-col gap-3">
      {products.map((product) => (
        <li
          key={product.id}
          className="flex justify-between items-center gap-10"
        >
          <div className="flex items-center gap-3">
            <Image
              src={getImagePath(product.image)}
              alt={product.name}
              width={40}
              height={40}
              style={{ width: "auto", height: "auto", objectFit: "cover" }}
            />
            {product.name} ({product.category.name}) -{" "}
            {formatCurrency(product.price)}
          </div>
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="text-blue-500 hover:underline"
          >
            Editar
          </Link>
        </li>
      ))}
    </ul>
  );
}
