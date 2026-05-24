/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Required for dynamic blog routes with static export
  trailingSlash: true,
};

module.exports = nextConfig;
