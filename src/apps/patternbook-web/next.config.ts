import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@shredbx/ui-web",
    "@shredbx/core",
    "@patternbook/ui-web",
    "@patternbook/core",
    "@shredbx/mcp-server",
  ],
  turbopack: {
    root: "../../..",
  },
};

export default nextConfig;
