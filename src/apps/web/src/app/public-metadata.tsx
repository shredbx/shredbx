import { Metadata } from "next";
import { MetadataConfig } from "@shredbx/shared";

export const MetaConfig: MetadataConfig = {
  title: "ShredBX – Experimental Lab",
  description:
    "Build. Break. Rebuild. Exploring web, mobile, and AI patterns – open source projects and experiments on GitHub.",
  baseUrl: "https://shredbx.com",
  siteName: "ShredBX",
};

// Local generateMetadata function (server-side only)
function generateMetadata(config: MetadataConfig): Metadata {
  return {
    title: config.title,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.baseUrl,
      siteName: config.siteName,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: ["/opengraph-image"],
    },
  };
}

export const DefaultMetadata: Metadata = generateMetadata(MetaConfig);

export const MetaBaseUrl = MetaConfig.baseUrl;
