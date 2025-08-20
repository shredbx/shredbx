import { Metadata } from "next";

export const MetaDefaultTitle = "ReactBook – ShredBX";
export const MetaDefaultDescription =
  "ReactBook is a collection of reusable React components and patterns for building web applications.";

export const MetaBaseUrl = "https://reactbook.shredbx.com";

export const DefaultMetadata: Metadata = {
  title: MetaDefaultTitle,
  description: MetaDefaultDescription,
  openGraph: {
    title: MetaDefaultTitle,
    description: MetaDefaultDescription,
    url: MetaBaseUrl,
    siteName: "ReactBook",
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
