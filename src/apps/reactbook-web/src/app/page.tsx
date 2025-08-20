import Image from "next/image";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { ThemeSwitcher } from "@shredbx/shared/components/web";
import { ProjectsReferenceCatalog } from "@shredbx/shared/components/web";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-start p-12 bg-background text-foreground">
        <div className="absolute top-4 right-4">
          <ThemeSwitcher />
        </div>
        <div className="text-center space-y-12">
          <div className="flex justify-center">
            <Image
              src="/reacbook-logo-animated-1.gif"
              alt="ShredBX Logo"
              width={48}
              height={48}
              priority
              unoptimized
              className="w-48 h-48 bg-dark rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-4xl font-bold ">ReactBook - ShredBX</h1>
            <p className="text-xl text-muted-foreground">coming soon...</p>
          </div>
          <div className="flex flex-col space-y-2">
            <p>This project is open source. Check out the code on:</p>
            <Link
              href="https://github.com/shredbx/shredbx/tree/main/src/apps/reactbook-web"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="flex flex-row space-x-2 justify-center items-center hover:cursor-pointer transition-transform duration-200 hover:scale-105">
                <IconBrandGithub className="h-4 w-4" />
                <span>GitHub</span>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <ProjectsReferenceCatalog />
    </div>
  );
}
