"use client";

import { useEffect } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";

export default function Home() {
  useEffect(() => {
    // Track the visit
    track("page_visit", { page: "home" });

    // Redirect to GitHub profile after a short delay to ensure tracking
    const timer = setTimeout(() => {
      window.location.href = "https://github.com/shredbx";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Image
            src="/logo/shredbx-logo-sm.png"
            alt="ShredBX Logo"
            width={96}
            height={96}
            priority
            className="w-24 h-24 bg-dark rounded-md"
          />
        </div>
        <h1 className="text-4xl font-bold -mt-2">shredbx</h1>
        <p className="text-xl text-muted-foreground">eXperimental lab</p>
        <p className="text-muted-foreground/70">
          Redirecting to GitHub profile...
        </p>
        <div className="mt-2 animate-spin rounded-full h-8 w-8 border-b-2 border-border mx-auto"></div>
      </div>
    </main>
  );
}
