import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@shredbx/ui-web", "@shredbx/core"],
  turbopack: {
    root: "../../..",
  },
};

export default nextConfig;
