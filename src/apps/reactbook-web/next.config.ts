import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ui-web"],
  turbopack: {
    root: "../../..",
  },
};

export default nextConfig;
