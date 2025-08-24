import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const config: NextConfig = {
  /* config options here */
  compiler: {
    // Enable React optimizations
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@cms-data": path.resolve(__dirname, "./src/packages/cms-data"),
      "@cms": path.resolve(__dirname, "./src/packages/cms"),
      "@shared-ui": path.resolve(__dirname, "./src/packages/shared-ui"),
      "@": path.resolve(__dirname, "./src"),
    };
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(config);
