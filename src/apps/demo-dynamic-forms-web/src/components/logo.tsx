import Image from "next/image";
import { MetaTitle, MetaDescription } from "@/app/meta";

export const Logo = () => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/logo-animated-1.gif"
        alt="Logo"
        width={48}
        height={48}
        className="rounded-sm object-contain"
        priority
      />
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">{MetaTitle}</h3>
        <p className="text-sm">{MetaDescription}</p>
      </div>
    </div>
  );
};
