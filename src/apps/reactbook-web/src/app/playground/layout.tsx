import { ComponentsNavigation } from "./components-navigation";

export default async function PlaygroundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col space-y-4 h-full">
      <div className="flex p-4 w-full items-center justify-center">
        <ComponentsNavigation />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
