import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@shredbx/shared"],
  turbopack: {
    root: "../../..",
  },
};

export default nextConfig;
