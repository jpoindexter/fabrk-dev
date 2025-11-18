import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

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
      "default-src 'self'; " +
      // Scripts: Nonce-based CSP for production (middleware injects unique nonce per request)
      // Development: Keep 'unsafe-inline' and 'unsafe-eval' for HMR
      // Production: Remove unsafe directives, rely on nonce from middleware
      (process.env.NODE_ENV === "production"
        ? "script-src 'self' 'nonce-NONCE_PLACEHOLDER' https://js.stripe.com https://va.vercel-scripts.com; "
        : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://va.vercel-scripts.com; ") +
      // Styles: Allow self and inline styles for Tailwind/styled components
      // Note: 'unsafe-inline' required for Tailwind CSS and CSS-in-JS
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "img-src 'self' data: https: blob:; " +
      "font-src 'self' data: https://fonts.gstatic.com; " +
      "connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com " +
      "https://api.posthog.com https://us.i.posthog.com https://api.openai.com https://api.anthropic.com; " +
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com; " +
      "frame-ancestors 'self'; " +
      "base-uri 'self'; " +
      "form-action 'self'; " +
      "object-src 'none'; " +
      "upgrade-insecure-requests;",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

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
};

// Export config with next-intl plugin
export default withNextIntl(nextConfig);
