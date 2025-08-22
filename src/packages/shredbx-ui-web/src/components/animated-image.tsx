"use client";

import * as React from "react";
import { cn } from "../lib/utils";

interface AnimatedImageProps {
  src: string;
  gifSrc?: string | undefined;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function AnimatedImage({
  src,
  gifSrc,
  alt,
  className,
  width,
  height,
}: AnimatedImageProps) {
  const [isGifLoaded, setIsGifLoaded] = React.useState(false);
  const [isGifLoading, setIsGifLoading] = React.useState(false);

  React.useEffect(() => {
    if (!gifSrc) return;

    setIsGifLoading(true);
    const img = new Image();

    img.onload = () => {
      setIsGifLoaded(true);
      setIsGifLoading(false);
    };

    img.onerror = () => {
      setIsGifLoading(false);
    };

    img.src = gifSrc;
  }, [gifSrc]);

  return (
    <div className={cn("relative", className)}>
      {/* PNG placeholder - always visible */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          isGifLoaded ? "opacity-0" : "opacity-100"
        )}
      />

      {/* GIF overlay - visible when loaded */}
      {isGifLoaded && (
        <img
          src={gifSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            isGifLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {/* Loading indicator */}
      {isGifLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-current rounded-full animate-pulse opacity-50" />
        </div>
      )}
    </div>
  );
}
