/**
 * Security Headers Middleware
 * Implement comprehensive security headers to protect against common attacks
 *
 * Headers implemented:
 * - Content Security Policy (CSP)
 * - X-Frame-Options
 * - X-Content-Type-Options
 * - Referrer-Policy
 * - Permissions-Policy
 * - Strict-Transport-Security (HSTS)
 * - X-XSS-Protection (legacy browsers)
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * Generate Content Security Policy
 */
export function generateCSP(options?: {
  isDevelopment?: boolean;
  nonce?: string;
}): string {
  const { isDevelopment = false, nonce } = options || {};

  const directives = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      ...(isDevelopment ? ["'unsafe-eval'"] : []),
      ...(nonce ? [`'nonce-${nonce}'`] : ["'unsafe-inline'"]), // unsafe-inline for non-nonce setup
      "https://cdn.jsdelivr.net", // For CDN scripts
      "https://www.googletagmanager.com", // GA4
      "https://www.google-analytics.com", // GA
      "https://plausible.io", // Plausible
    ],
    "style-src": [
      "'self'",
      "'unsafe-inline'", // Required for styled-components, Tailwind
      "https://fonts.googleapis.com",
    ],
    "img-src": [
      "'self'",
      "data:",
      "https:",
      "blob:", // For dynamically generated images
    ],
    "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
    "connect-src": [
      "'self'",
      "https://api.stripe.com",
      "https://www.google-analytics.com",
      "https://analytics.google.com",
      "https://www.googletagmanager.com",
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
      "https://plausible.io",
      ...(isDevelopment ? ["ws:", "wss:"] : []), // WebSocket for HMR
    ],
    "frame-src": [
      "'self'",
      "https://js.stripe.com", // Stripe Elements
      "https://hooks.stripe.com", // Stripe webhooks
    ],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"], // Prevent clickjacking
    "upgrade-insecure-requests": isDevelopment ? [] : [""],
  };

  return Object.entries(directives)
    .map(([key, values]) => {
      if (values.length === 0) return "";
      if (values.length === 1 && values[0] === "") return key;
      return `${key} ${values.join(" ")}`;
    })
    .filter(Boolean)
    .join("; ");
}

/**
 * Security headers configuration
 */
export const securityHeaders = (isDevelopment: boolean = false) => [
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
    value: "DENY", // Prevent clickjacking
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff", // Prevent MIME sniffing
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block", // Enable XSS filter (legacy browsers)
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()", // Disable FLoC
      "payment=(self)",
    ].join(", "),
  },
  {
    key: "Content-Security-Policy",
    value: generateCSP({ isDevelopment }),
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
];

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(
  response: NextResponse,
  isDevelopment: boolean = false
): NextResponse {
  const headers = securityHeaders(isDevelopment);

  headers.forEach((header) => {
    response.headers.set(header.key, header.value);
  });

  return response;
}

/**
 * Security headers middleware
 */
export function securityHeadersMiddleware(req: NextRequest): NextResponse {
  const response = NextResponse.next();
  const isDevelopment = process.env.NODE_ENV === "development";

  return applySecurityHeaders(response, isDevelopment);
}

/**
 * CORS configuration
 */
export interface CORSOptions {
  origin?: string | string[];
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

/**
 * Apply CORS headers
 */
export function applyCORSHeaders(response: NextResponse, options: CORSOptions = {}): NextResponse {
  const {
    origin = "*",
    methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders = ["Content-Type", "Authorization"],
    exposedHeaders = [],
    credentials = false,
    maxAge = 86400, // 24 hours
  } = options;

  // Set origin
  if (Array.isArray(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin.join(","));
  } else {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  // Set methods
  response.headers.set("Access-Control-Allow-Methods", methods.join(", "));

  // Set allowed headers
  response.headers.set("Access-Control-Allow-Headers", allowedHeaders.join(", "));

  // Set exposed headers
  if (exposedHeaders.length > 0) {
    response.headers.set("Access-Control-Expose-Headers", exposedHeaders.join(", "));
  }

  // Set credentials
  if (credentials) {
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  // Set max age
  response.headers.set("Access-Control-Max-Age", maxAge.toString());

  return response;
}

/**
 * Generate nonce for CSP
 */
export function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

/**
 * Check if request is from allowed origin
 */
export function isAllowedOrigin(origin: string, allowedOrigins: string[]): boolean {
  return allowedOrigins.includes(origin) || allowedOrigins.includes("*");
}
