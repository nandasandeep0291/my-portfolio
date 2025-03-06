/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/my-portfolio', // Replace with your repository name
  assetPrefix: '/my-portfolio/', // Replace with your repository name
  output: 'export',
};

module.exports = nextConfig;
