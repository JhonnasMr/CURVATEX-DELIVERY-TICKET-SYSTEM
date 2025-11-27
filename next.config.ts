import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aksnnfddetwbludwgkzw.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
}

module.exports = nextConfig

