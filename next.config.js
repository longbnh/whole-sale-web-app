/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: "https://api-wss.haseoleonard.tk",
    PAGE_SIZE: 5,
  },
  images: {
    domains: ["i.imgur.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
