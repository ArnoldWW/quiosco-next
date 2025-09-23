"use client";

import { SearchSchema } from "@/lib/schema";
import { redirect } from "next/navigation";

export default function ProductSearchForm() {
  const handleSearchForm = (data: FormData) => {
    const search = data.get("search")?.toString() || "";

    const result = SearchSchema.safeParse({ search });

    console.log(result);

    if (!result.success) {
      return result.error.issues.forEach((issue) => {
        alert(issue.message);
      });
    }

    // Redirect to search results page
    redirect(`/admin/products/search?query=${search}`);
  };

  return (
    <form action={handleSearchForm}>
      <input
        type="text"
        name="search"
        placeholder="Buscar producto..."
        className="border px-3 py-2 "
      />
      <button type="submit" className="border px-3 py-2 hover:bg-amber-200">
        Buscar
      </button>
    </form>
  );
}
