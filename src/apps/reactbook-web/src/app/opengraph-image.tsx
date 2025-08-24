import { ImageResponse } from "next/og";
import { createOpenGraphImageJSX } from "@ui-web";
import { MetaConfig } from "./public-metadata";

export const alt = MetaConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default async function Image() {
  return new ImageResponse(createOpenGraphImageJSX(MetaConfig), size);
}
