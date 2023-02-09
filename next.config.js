/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WORKSPACE_URL: "https://rpc-mumbai.maticvigil.com/",
  }
};

module.exports = nextConfig;
