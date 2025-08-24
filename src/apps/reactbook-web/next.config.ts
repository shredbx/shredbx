import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@reactbook/ui-web"],
  turbopack: {
    root: "../../..",
  },
};

export default nextConfig;
