import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ProductsPagination({
  page,
  totalPages
}: ProductsPaginationProps) {
  if (totalPages === 0) return null;

  return (
    <nav className="flex justify-start gap-8 mt-4">
      {page > 1 && (
        <Link
          href={`?page=${page - 1}`}
          className=" flex items-center hover:underline"
        >
          &laquo; Anterior
        </Link>
      )}

      <span className="font-bold">
        Página {page} de {totalPages}
      </span>

      {page < totalPages && (
        <Link
          href={`?page=${page + 1}`}
          className="flex items-center hover:underline"
        >
          Siguiente &raquo;
        </Link>
      )}
    </nav>
  );
}
