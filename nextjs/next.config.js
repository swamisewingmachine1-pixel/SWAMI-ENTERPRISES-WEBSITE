/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Real product/showroom photography is committed under public/uploads as plain
    // files (not a CMS/remote host), so Next's built-in optimizer just needs local access.
    unoptimized: false,
  },
};

module.exports = nextConfig;
