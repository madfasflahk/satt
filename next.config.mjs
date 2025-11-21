/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better error handling
  reactStrictMode: true,
  
  // Handle API response size limits
  experimental: {
    largePageDataBytes: 128 * 100000, // 128KB
  },
  
  // Add logging for debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;