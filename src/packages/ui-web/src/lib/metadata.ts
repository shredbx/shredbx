// Note: Apps need to import Metadata type from "next" themselves

export interface MetadataConfig {
  title: string;
  description: string;
  baseUrl: string;
  siteName: string;
}

export function generateMetadata(config: MetadataConfig) {
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

// Shared OpenGraph image configuration
export const OG_IMAGE_CONFIG = {
  alt: "Logo",
  size: { width: 1200, height: 630 },
  contentType: "image/png" as const,
  runtime: "edge" as const,
};

export function generateOpenGraphImage(config: MetadataConfig) {
  return {
    alt: config.title,
    size: OG_IMAGE_CONFIG.size,
    contentType: OG_IMAGE_CONFIG.contentType,
    runtime: OG_IMAGE_CONFIG.runtime,
  };
}
