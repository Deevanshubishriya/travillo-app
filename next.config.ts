import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      { // Add Wikimedia for car images
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
       { // Add example.com for hotel images (placeholder)
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;

   