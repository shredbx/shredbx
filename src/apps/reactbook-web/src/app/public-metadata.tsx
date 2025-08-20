import { Metadata } from "next";
import { MetadataConfig } from "@shredbx/shared";

export const MetaConfig: MetadataConfig = {
  title: "ReactBook – ShredBX",
  description:
    "ReactBook is a collection of reusable React components and patterns for building web applications.",
  baseUrl: "https://reactbook.shredbx.com",
  siteName: "ReactBook",
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
