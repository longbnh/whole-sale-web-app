/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: "https://api-wss.haseoleonard.tk",
    PAGE_SIZE: 5,
    MAP_MAPTILES_KEY: "iYv5S1ojmxI69hsm3BnJPKugPNrxsVTARoYrjyyo",
    MAP_API_KEY: "IAWCEI33O6YykIMFbDOGyDvmRB6OVLN1vy23nXx3",
    GOONG_URL: "https://rsapi.goong.io",
    MAX_MILESTONE: 5,
    MIN_MILESTONE: 3,
  },
  images: {
    domains: ["i.imgur.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
