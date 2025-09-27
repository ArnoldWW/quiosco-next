import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-2xl font-bold mb-5">Producto no encontrado</h1>
      <Link href="/admin/products" className="hover:underline">
        &larr; Ir a la lista de productos
      </Link>
    </div>
  );
}
