import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  env: {
    SC_DISABLE_SPEEDY: 'false',
  },
  compress: true, // 🚀 OPTIMIZATION: Enable gzip/brotli compression
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'], // 🚀 OPTIMIZATION: Prefer AVIF (smaller than WebP)
  },
}

export default nextConfig
