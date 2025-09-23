"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

export default function AdminRoute({ link }: AdminRouteProps) {
  const pathname = usePathname();
  const isActive = pathname === link.url;

  return (
    <Link
      href={link.url}
      className={`hover:underline ${isActive ? "font-bold" : ""}`}
      target={link.blank ? "_blank" : ""}
    >
      {link.text}
    </Link>
  );
}
