import { Metadata } from "next";
import { MetadataConfig } from "@shredbx/shared";

export const MetaConfig: MetadataConfig = {
  title: "ShredBX – Experimental Lab",
  description:
    "Build. Break. Rebuild. Exploring web, mobile, and AI patterns – open source projects and experiments on GitHub.",
  baseUrl: "https://shredbx.com",
  siteName: "ShredBX",
};

export const DefaultMetadata: Metadata = {
  title: MetaConfig.title,
  description: MetaConfig.description,
  openGraph: {
    title: MetaConfig.title,
    description: MetaConfig.description,
    url: MetaConfig.baseUrl,
    siteName: MetaConfig.siteName,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: MetaConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: MetaConfig.title,
    description: MetaConfig.description,
    images: ["/opengraph-image"],
  },
};

export const MetaBaseUrl = MetaConfig.baseUrl;
