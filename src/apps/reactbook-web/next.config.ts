import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@reactbook/ui-web",
    "@reactbook/playground",
    "@reactbook/shared-deps",
    "@reactbook/shared-ui-deps",
  ],
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
      "@radix-ui/react-toggle",
      "@radix-ui/react-tooltip",
      "lucide-react",
    ],
  },
  webpack: (config) => {
    // Fix for WASM hash issue in React 19 + Next.js 15.5.0
    config.experiments = {
      ...config.experiments,
      futureDefaults: false,
    };
    return config;
  },
};

export default nextConfig;
