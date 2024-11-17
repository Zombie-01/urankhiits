import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "aceternity.com",
      "assets.aceternity.com",
      "images.unsplash.com",
      "drive.google.com",
      "pbs.twimg.com",
    ],
  },
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
