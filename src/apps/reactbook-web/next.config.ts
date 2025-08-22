import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@shredbx/shared", "@shredbx/mcp-server"],
  turbopack: {
    root: "../../..",
  },
};

export default nextConfig;
