"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ThemeSwitcher = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const getAriaLabel = () => {
    return theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  };

  const getTooltipContent = () => {
    return theme === "light" ? "Dark mode" : "Light mode";
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              variant="outline"
              className="group data-[state=on]:hover:bg-muted size-9 hover:cursor-pointer data-[state=on]:bg-transparent"
              pressed={theme === "dark"}
              onPressedChange={toggleTheme}
              aria-label={getAriaLabel()}
            >
              {/* Light theme icon */}
              <SunIcon
                size={16}
                className={`shrink-0 transition-all ${
                  theme === "light"
                    ? "scale-100 opacity-100"
                    : "absolute scale-0 opacity-0"
                }`}
                aria-hidden="true"
              />
              {/* Dark theme icon */}
              <MoonIcon
                size={16}
                className={`shrink-0 transition-all ${
                  theme === "dark"
                    ? "scale-100 opacity-100"
                    : "absolute scale-0 opacity-0"
                }`}
                aria-hidden="true"
              />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getTooltipContent()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export { ThemeSwitcher };
