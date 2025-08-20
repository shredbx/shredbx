import { ImageResponse } from "next/og";
import { MetaDefaultTitle, MetaBaseUrl } from "./public-metadata";

export const alt = MetaDefaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default async function Image() {
  // Absolute URL works in Edge runtime and when crawlers render the image
  const logoSrc = `${MetaBaseUrl}/logo.png`;

  return new ImageResponse(
    (
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
        <img src={logoSrc} height="360" alt={alt} />
      </div>
    ),
    {
      ...size,
    }
  );
}
