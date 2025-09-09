import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
      remotePatterns: [
        
           {
        protocol: 'https',
        hostname: '**', // allow any host
      },
        
      ],
    },
  /* config options here */
};

export default nextConfig;
