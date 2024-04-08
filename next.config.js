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
  // Wallet Connect Configuration
  // https://docs.walletconnect.com/web3modal/nextjs/about
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

module.exports = nextConfig;
