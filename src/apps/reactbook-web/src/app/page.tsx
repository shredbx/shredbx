import Image from "next/image";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { ThemeSwitcher } from "@shredbx/shared/components/web";
import { ProjectsReferenceCatalog } from "@shredbx/shared/components/web";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/50">
      {/* Header with theme switcher */}
      <header className="flex justify-end p-6">
        <ThemeSwitcher />
      </header>

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 pb-16">
        <div className="text-center space-y-16 max-w-4xl mx-auto">
          {/* Logo section with enhanced styling */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <Image
                src="/reacbook-logo-animated-1.gif"
                alt="ReactBook Logo"
                width={48}
                height={48}
                priority
                unoptimized
                className="relative w-48 h-48 bg-dark/20 rounded-xl border border-border/50 shadow-2xl"
              />
            </div>
          </div>

          {/* Title section with improved typography */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                ReactBook
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                React / Next.js knowledgebase powered by ReactBook
              </p>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-muted/50 rounded-full border border-border/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                coming soon...
              </span>
            </div>
          </div>

          {/* Call to action section with improved styling */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              This project is open source. Check out the code on:
            </p>
            <Link
              href="https://github.com/shredbx/shredbx/tree/main/src/apps/reactbook-web"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex"
            >
              <div className="flex items-center space-x-3 px-6 py-3 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/50 hover:border-border transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <IconBrandGithub className="h-5 w-5 text-foreground/70 group-hover:text-foreground transition-colors" />
                <span className="font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                  GitHub
                </span>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Projects catalog at bottom */}
      <div className="border-t border-border/50 bg-muted/20">
        <ProjectsReferenceCatalog currentProject="reactbook" />
      </div>
    </div>
  );
}
