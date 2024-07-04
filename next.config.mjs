/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      }
    ]
  }
};

export default nextConfig;
