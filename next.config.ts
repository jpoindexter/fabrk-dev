import type { NextConfig } from "next";

// Security headers for production
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value:
      // Default: Only allow same-origin resources
      "default-src 'self'; " +
      // Scripts: Nonce-based CSP for production with strict-dynamic
      // Development: Keep 'unsafe-inline' and 'unsafe-eval' for HMR
      // Production: Nonce from middleware + strict-dynamic for trusted script chains
      (process.env.NODE_ENV === "production"
        ? "script-src 'self' 'strict-dynamic' 'nonce-NONCE_PLACEHOLDER' https://js.stripe.com https://va.vercel-scripts.com https://us-assets.i.posthog.com https://www.googletagmanager.com https://www.google-analytics.com; "
        : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://va.vercel-scripts.com https://us-assets.i.posthog.com https://www.googletagmanager.com https://www.google-analytics.com; ") +
      // Styles: 'unsafe-inline' required for Tailwind CSS-in-JS
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      // Images: Data URIs, HTTPS sources, and blobs for dynamic images
      "img-src 'self' data: https: blob:; " +
      // Fonts: Google Fonts and data URIs
      "font-src 'self' data: https://fonts.gstatic.com; " +
      // API connections: Strict allowlist of trusted endpoints
      "connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com " +
      "https://api.posthog.com https://us.i.posthog.com https://us-assets.i.posthog.com " +
      "https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com; " +
      // Frames: Stripe payment elements only
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com; " +
      // Clickjacking protection
      "frame-ancestors 'self'; " +
      // Base URI restriction
      "base-uri 'self'; " +
      // Form submission restriction
      "form-action 'self'; " +
      // Block all plugins
      "object-src 'none'; " +
      // Web Workers
      "worker-src 'self' blob:; " +
      // PWA manifest
      "manifest-src 'self'; " +
      // Media files
      "media-src 'self'; " +
      // Child frames (deprecated fallback)
      "child-src 'self' blob:; " +
      // Block mixed content (production only)
      (process.env.NODE_ENV === "production" ? "upgrade-insecure-requests; block-all-mixed-content;" : ""),
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  // Instrumentation is automatically enabled in Next.js 15

  // Webpack configuration to exclude @react-email from server-side bundling
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude @react-email packages from server-side bundling to prevent CSS loading issues
      config.externals = config.externals || [];
      config.externals.push('@react-email/components', '@react-email/render');
    }
    return config;
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  // Output configuration
  output: "standalone",

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },

  async redirects() {
    return [
      // Docs category index redirects
      {
        source: "/docs/tutorials",
        destination: "/docs/tutorials/quick-start",
        permanent: true,
      },
      {
        source: "/docs/features",
        destination: "/docs/features/payments",
        permanent: true,
      },
      {
        source: "/docs/deployment",
        destination: "/docs/deployment/environment",
        permanent: true,
      },
      {
        source: "/docs/security",
        destination: "/docs/security/rate-limiting",
        permanent: true,
      },
      {
        source: "/docs/extras",
        destination: "/docs/extras/theming",
        permanent: true,
      },
      {
        source: "/docs/launch",
        destination: "/docs/launch/checklist",
        permanent: true,
      },
      // Dashboard redirects
      {
        source: "/developer",
        destination: "/developer/api-keys",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

