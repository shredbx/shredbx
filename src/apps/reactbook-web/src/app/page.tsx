import Image from "next/image";
import { ThemeSwitcher, ProjectsReferenceCatalog } from "@reactbook/ui-web";
import { typesPlaceholder } from "@reactbook/playground/patternbook";

// import { PlaygroundTest } from "@/components/playground-test";
export default function Home() {
  console.log("Test patternbook import: ", typesPlaceholder);
  return (
    <div className="min-h-screen flex flex-col space-y-4 md:space-y-0 bg-gradient-to-b from-background to-background/50">
      {/* Navbar */}
      <header className="flex w-full border-b px-4 md:px-6">
        <div className="flex h-16 w-full items-center justify-between gap-4">
          {/* Left side - Logo and title */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="ReactBook Logo"
              width={32}
              height={32}
              priority
              className="w-8 h-8 rounded-lg"
            />
            <h1 className="text-lg font-bold">ReactBook</h1>
          </div>

          {/* Right side - Theme switcher */}
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      {/* Main content area */}
      <main className=" flex justify-center items-center px-6 md:px-12 mt-4">
        {/* Main content */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold">ReactBook</h1>
          <p className="text-lg text-muted-foreground font-medium">
            React / Next.js knowledgebase
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-muted/50 rounded-full border border-border/50">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              coming soon...
            </span>
          </div>
          {/* <PlaygroundTest /> */}
        </div>
      </main>
      {/* Footer with projects catalog */}
      <footer className="border-t border-border/50 bg-muted/20 mt-auto flex px-12">
        <ProjectsReferenceCatalog />
      </footer>
    </div>
  );
}
