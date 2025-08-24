import Link from "next/link";
import { componentDisplayName, componentPath, components } from "./components";

export default function PlaygroundPage() {
  return (
    <div className="flex items-center justify-center p-8">
      <References />
    </div>
  );
}

function References() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Components</h1>
      <ul className="flex flex-col gap-4 list-disc ">
        {components.map((component) => (
          <li key={component.name}>
            <div className="flex flex-col gap-2">
              <Link
                href={componentPath(component.name)}
                className="flex flex-col gap-2"
              >
                <h2 className="text-xl font-bold text-foreground">
                  {componentDisplayName(component.name)}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {component.desciption}
                </p>
              </Link>
              <Link
                className="text-sm font-light italic hover:underline text-muted-foreground"
                href={component.source}
              >
                {component.source}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
