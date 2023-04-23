/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack: (config) => {
    // config.resolve.modules.push(path.resolve("./"));
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = {
      fs: false,
      module: false,
      child_process: false,
    };
    return config;
  },
  env: {
    REACT_APP_SITE_URL:
      process.env.REACT_APP_SITE_URL || "http://localhost:3002",
  },
};
