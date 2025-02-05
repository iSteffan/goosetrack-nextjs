import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  images: {
    deviceSizes: [360, 480, 768, 1024, 1280, 1366, 1440, 1920, 2048],
    formats: ['image/avif', 'image/webp'],
  },

  i18n: {
    locales: ['en', 'uk'],
    defaultLocale: 'en',
    localeDetection: false,
  },
};

export default nextConfig;
