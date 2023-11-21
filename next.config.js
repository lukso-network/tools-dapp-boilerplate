/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /** Whitelisted domains for optimized image loading
     *  @next/image
     */
    domains: ['api.universalprofile.cloud'],
  },
}

module.exports = nextConfig
