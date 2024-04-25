/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /** Allow images from all domains
     *  @next/image
     */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Wildcard for all hostnames
        pathname: '**', // Wildcard for all paths
      },
    ],
  },
  // Environment Variables
  env: {
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  },
  // Wallet Connect Configuration
  // https://docs.walletconnect.com/web3modal/nextjs/about
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

module.exports = nextConfig;
