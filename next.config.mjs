/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/flex", destination: "/", permanent: false },
      { source: "/flex/:path*", destination: "/:path*", permanent: false },
      { source: "/noir", destination: "/", permanent: false },
      { source: "/noir/:path*", destination: "/:path*", permanent: false },
      { source: "/archive", destination: "/", permanent: false },
      { source: "/archive/:path*", destination: "/:path*", permanent: false },
      { source: "/prism", destination: "/", permanent: false },
      { source: "/prism/:path*", destination: "/:path*", permanent: false },
      { source: "/velvet", destination: "/", permanent: false },
      { source: "/velvet/:path*", destination: "/:path*", permanent: false },
      { source: "/steel", destination: "/", permanent: false },
      { source: "/steel/:path*", destination: "/:path*", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
