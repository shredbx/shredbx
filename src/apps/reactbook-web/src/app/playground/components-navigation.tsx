"use client";

import { componentDisplayName, componentPath, components } from "./components";
import Link from "next/link";
import { cn } from "@reactbook/ui-web";
import { usePathname } from "next/navigation";

export function ComponentsNavigation() {
  const pathname = usePathname();
  return (
    <div className="space-x-4 text-sm">
      {components.map((component) => (
        <Link
          key={component.name}
          href={componentPath(component.name)}
          className={cn(
            pathname === componentPath(component.name) && "text-primary",
            "hover:text-primary"
          )}
        >
          {componentDisplayName(component.name)}
        </Link>
      ))}
    </div>
  );
}
