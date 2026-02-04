/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  
  // Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },
  
  // Base path and trailing slash for GitHub Pages (if needed)
  // basePath: '', // Set if deploying to subdirectory
  // trailingSlash: true, // Uncomment if needed for GitHub Pages routing
};

export default nextConfig;
