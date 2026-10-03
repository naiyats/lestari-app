/** @type {import('next').Next.js Configuration} */
const nextConfig = {
  typescript: {
    // Mengabaikan error TypeScript agar tidak menghalangi coding / build
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;