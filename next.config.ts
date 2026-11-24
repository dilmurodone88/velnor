import type { NextConfig } from "next";

// STATIC_EXPORT=1 — GitHub Pages uchun statik eksport (server, API va middleware yo'q).
// Oddiy rejim — Docker/Kubernetes uchun standalone server.
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isStatic
    ? { output: "export" as const, basePath, assetPrefix: basePath || undefined, trailingSlash: true }
    : { output: "standalone" as const }),
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["iconsax-reactjs", "motion"] },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  ...(isStatic
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
