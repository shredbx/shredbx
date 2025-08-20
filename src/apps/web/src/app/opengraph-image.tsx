import { ImageResponse } from "next/og";
import {
  createOpenGraphImageJSX,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@shredbx/shared/components/web";
import { MetaConfig } from "./public-metadata";

export const alt = MetaConfig.title;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const runtime = "edge";

export default async function Image() {
  return new ImageResponse(createOpenGraphImageJSX(MetaConfig), {
    ...size,
  });
}
