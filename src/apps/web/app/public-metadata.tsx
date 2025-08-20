import { Metadata } from "next";

export const MetaDefaultTitle = "ShredBX – Experimental Lab";
export const MetaDefaultDescription =
  "Build. Break. Rebuild. Exploring web, mobile, and AI patterns – open source projects and experiments on GitHub.";

export const MetaBaseUrl = "https://shredbx.com";

export const DefaultMetadata: Metadata = {
  title: MetaDefaultTitle,
  description: MetaDefaultDescription,
  openGraph: {
    title: MetaDefaultTitle,
    description: MetaDefaultDescription,
    url: MetaBaseUrl,
    siteName: "ShredBX",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: MetaDefaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: MetaDefaultTitle,
    description: MetaDefaultDescription,
    images: ["/opengraph-image"],
  },
};
