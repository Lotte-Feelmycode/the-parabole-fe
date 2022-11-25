/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `http://localhost:8000/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
