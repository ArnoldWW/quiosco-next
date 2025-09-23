import { Product } from "@/app/generated/prisma";
import Image from "next/image";
import { formatCurrency } from "@/utils";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col p-5">
      <div className="relative w-full h-60">
        <Image
          fill
          sizes="100%"
          className="object-cover"
          src={`/products/${product?.image}.jpg`}
          alt={product?.name}
        />
      </div>
      <h3>{product?.name}</h3>
      <span className="font-bold">{formatCurrency(product?.price)}</span>
      <AddProductButton product={product} />
    </div>
  );
}
