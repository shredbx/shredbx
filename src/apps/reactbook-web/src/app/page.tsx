import Image from "next/image";
import { ThemeSwitcher } from "@shredbx/shared/components/web";
import { ProjectsReferenceCatalog } from "@shredbx/shared/components/web";

export default function Home() {
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
              unoptimized
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
      <main className="flex-1 flex justify-center items-center px-6 md:px-12">
        <div className="relative flex items-center gap-12">
          {/* Animated logo container */}
          <div className="lg:flex">
            <div className="relative bg-muted/20 rounded-2xl p-4 border border-border/50 md:-ml-44">
              <Image
                src="/reacbook-logo-animated-1.gif"
                alt="ReactBook Animated Logo"
                width={96}
                height={96}
                priority
                unoptimized
                className="w-32 h-32 rounded-xl object-contain flex-shrink-0"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground font-medium">
              React / Next.js knowledgebase
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-muted/50 rounded-full border border-border/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                coming soon...
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with projects catalog */}
      <footer className="border-t border-border/50 bg-muted/20 mt-auto">
        <ProjectsReferenceCatalog />
      </footer>
    </div>
  );
}
