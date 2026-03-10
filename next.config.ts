import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to Express backend
      },
    ];
  },
};

module.exports = nextConfig;
