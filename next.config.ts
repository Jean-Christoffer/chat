import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        "node:fs/promises": false,
        module: false,
        perf_hooks: false,
      };
    }
    return config;
  },
};

export default nextConfig;
