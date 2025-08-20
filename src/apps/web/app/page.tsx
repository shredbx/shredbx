"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";

// Single source of truth for timeout (in milliseconds)
const REDIRECT_TIMEOUT = 3000;

export default function Home() {
  const [countdown, setCountdown] = useState(
    Math.ceil(REDIRECT_TIMEOUT / 1000)
  );

  useEffect(() => {
    // Track the visit
    track("page_visit", { page: "home" });

    // Countdown timer that updates every second
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        const newCount = prev - 1;
        return newCount > 0 ? newCount : 0;
      });
    }, 1000);

    // Redirect to GitHub profile after the configured timeout
    const redirectTimer = setTimeout(() => {
      window.location.href = "https://github.com/shredbx";
    }, REDIRECT_TIMEOUT);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimer);
    };
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
          Redirecting to GitHub profile in {countdown}s...
        </p>
        <div className="mt-2 animate-spin rounded-full h-8 w-8 border-b-2 border-border mx-auto"></div>
      </div>
    </main>
  );
}
