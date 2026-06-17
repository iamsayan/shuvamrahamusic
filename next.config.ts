import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.224'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.shuvamrahamusic.com',
      },
    ],
  },
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
