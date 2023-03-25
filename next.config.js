/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    appDir: true,
  },
  serverRuntimeConfig: {},
  env: {},
}

module.exports = nextConfig
