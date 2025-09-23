import Image from "next/image";

export default function Logo() {
  return (
    <div className="w-28 h-28 relative mx-auto mb-5">
      <Image fill src="/logo.svg" alt="logo" priority />
    </div>
  );
}
