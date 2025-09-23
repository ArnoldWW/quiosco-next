import { ProductsWithCategory } from "@/app/admin/products/page";
import { formatCurrency } from "@/utils";
import Image from "next/image";

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
              src={`/products/${product.image}.jpg`}
              alt={product.name}
              width={40}
              height={40}
              style={{ width: "auto", height: "auto", objectFit: "cover" }}
            />
            {product.name} ({product.category.name}) -{" "}
            {formatCurrency(product.price)}
          </div>
          <button className="text-blue-500 hover:underline">Editar</button>
        </li>
      ))}
    </ul>
  );
}
