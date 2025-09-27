"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      className="border px-3 py-2 hover:bg-amber-200"
      onClick={() => router.back()}
    >
      Volver
    </button>
  );
}
