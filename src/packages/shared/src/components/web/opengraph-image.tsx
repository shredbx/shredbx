import React from "react";

interface OpenGraphImageProps {
  title: string;
  baseUrl: string;
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png" as const;
export const OG_IMAGE_RUNTIME = "edge" as const;

// Factory function that returns the JSX element for OpenGraph image
// Apps need to import ImageResponse from "next/og" themselves
export function createOpenGraphImageJSX({
  title,
  baseUrl,
}: OpenGraphImageProps) {
  const logoSrc = `${baseUrl}/logo.png`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <img src={logoSrc} height="360" alt={title} />
    </div>
  );
}
