import { prisma } from "@/lib/prisma";
import Image from "next/image";
import CategoryLink from "../ui/CategoryLink";
import Logo from "../ui/Logo";

async function fetchCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await fetchCategories();

  return (
    <aside className="bg-gray-100 p-5">
      <Logo />

      <ul className="flex flex-col gap-3">
        {categories.map((category) => (
          <CategoryLink key={category.id} category={category} />
        ))}
      </ul>
    </aside>
  );
}
