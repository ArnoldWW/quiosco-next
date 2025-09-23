"use client";

import { Category } from "@/app/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type CategoryLinkProps = {
  category: Category;
};

export default function CategoryLink({ category }: CategoryLinkProps) {
  const params = useParams();
  const isActive = params?.category === category.slug;
  console.log(params);

  return (
    <Link
      href={`/order/${category.slug}`}
      key={category.id}
      className={`flex items-center gap-2 p-2 hover:scale-105 transition ${
        isActive ? "bg-amber-200 border" : ""
      }`}
    >
      <div className="relative w-10 h-10">
        <Image
          fill
          src={`/icon_${category.slug}.svg`}
          alt={category.name}
          className="w-10"
        />
      </div>
      {category.name}
    </Link>
  );
}
