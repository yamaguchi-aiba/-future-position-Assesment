import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/diagnosis",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
