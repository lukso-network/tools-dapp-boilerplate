/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /** Whitelisted domains for optimized image loading
     *  @next/image
     */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.universalprofile.cloud',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
