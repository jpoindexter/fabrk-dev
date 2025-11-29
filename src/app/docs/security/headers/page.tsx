import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Security Headers - Fabrk Docs",
  description: "Configure HSTS, CSP, X-Frame-Options, and other security headers. Production-ready defaults included.",
};

export default function SecurityHeadersPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x80] SECURITY ] HEADERS</span>
        </div>
        <h1 className="font-mono text-3xl font-bold tracking-tight">SECURITY_HEADERS</h1>
        <p className="font-mono text-sm text-muted-foreground">
          &gt; Configure HTTP security headers including HSTS, CSP, X-Frame-Options, and more.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-4">
          <h3 className="mb-2 font-semibold">What's Included</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Strict-Transport-Security (HSTS)</li>
            <li>Content-Security-Policy (CSP)</li>
            <li>X-Frame-Options</li>
            <li>X-Content-Type-Options</li>
            <li>Referrer-Policy</li>
            <li>Permissions-Policy</li>
          </ul>
        </CardContent>
      </Card>

      {/* Next.js Configuration */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">NEXTJS_CONFIGURATION</h2>
          <p className="font-mono text-sm text-muted-foreground">
            Add security headers in <code className="font-mono bg-muted px-1 py-0.5">next.config.js</code>:
          </p>
        </div>
        <CodeBlock language="javascript" code={`// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
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
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`} />
      </div>

      {/* Content Security Policy */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">CONTENT_SECURITY_POLICY</h2>
          <p className="font-mono text-sm text-muted-foreground">
            Configure a strict CSP to prevent XSS attacks:
          </p>
        </div>
        <CodeBlock language="javascript" code={`// next.config.js

const ContentSecurityPolicy = \`
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https: blob:;
  connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com;
  frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
\`;

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\\s{2,}/g, " ").trim(),
          },
          // ... other headers
        ],
      },
    ];
  },
};`} />
      </div>

      {/* Nonce-based CSP */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">NONCE_BASED_CSP</h2>
          <p className="font-mono text-sm text-muted-foreground">
            Use nonces for stricter CSP without unsafe-inline:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/middleware.ts

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Generate nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Create CSP with nonce
  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-\${nonce}';
    img-src 'self' data: https:;
    font-src 'self';
    connect-src 'self';
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
  \`;

  // Set headers
  const response = NextResponse.next();
  response.headers.set(
    "Content-Security-Policy",
    cspHeader.replace(/\\s{2,}/g, " ").trim()
  );
  response.headers.set("x-nonce", nonce);

  return response;
}

// Access nonce in pages
// src/app/layout.tsx

import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") || "";

  return (
    <html lang="en">
      <body>
        <script nonce={nonce}>
          {/* Inline scripts with nonce */}
        </script>
        {children}
      </body>
    </html>
  );
}`} />
      </div>

      {/* HSTS Configuration */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">HSTS_CONFIGURATION</h2>
          <p className="font-mono text-sm text-muted-foreground">
            Enforce HTTPS with Strict-Transport-Security:
          </p>
        </div>
        <CodeBlock language="bash" code={`// HSTS Header Options

// Standard (2 years)
"max-age=63072000; includeSubDomains"

// With preload (submit to hstspreload.org)
"max-age=63072000; includeSubDomains; preload"

// During testing (5 minutes)
"max-age=300"

// Parameters:
// - max-age: Time in seconds browser remembers HTTPS
// - includeSubDomains: Apply to all subdomains
// - preload: Allow browser vendors to hardcode`} />
        <p className="font-mono text-sm text-muted-foreground">
          <strong>Warning:</strong> Only use preload once you're certain all subdomains support HTTPS.
          It's difficult to remove from the preload list.
        </p>
      </div>

      {/* Permissions Policy */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">PERMISSIONS_POLICY</h2>
          <p className="font-mono text-sm text-muted-foreground">
            Control browser feature access:
          </p>
        </div>
        <CodeBlock language="javascript" code={`// Common Permissions Policy configurations

// Minimal (most secure)
{
  key: "Permissions-Policy",
  value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"
}

// Allow specific features for same origin
{
  key: "Permissions-Policy",
  value: "camera=(self), microphone=(self), geolocation=(self)"
}

// Allow for specific domains
{
  key: "Permissions-Policy",
  value: "camera=(self 'https://trusted.example.com')"
}

// Full list of directives:
// accelerometer, autoplay, camera, cross-origin-isolated,
// display-capture, encrypted-media, fullscreen, geolocation,
// gyroscope, keyboard-map, magnetometer, microphone, midi,
// payment, picture-in-picture, publickey-credentials-get,
// screen-wake-lock, sync-xhr, usb, web-share, xr-spatial-tracking`} />
      </div>

      {/* Vercel Configuration */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">VERCEL_CONFIGURATION</h2>
          <p className="font-mono text-sm text-muted-foreground">
            Alternative: Configure headers in vercel.json:
          </p>
        </div>
        <CodeBlock language="json" code={`// vercel.json

{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        }
      ]
    }
  ]
}`} />
      </div>

      {/* Testing Headers */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">TESTING_HEADERS</h2>
          <p className="font-mono text-sm text-muted-foreground">
            Verify your security headers are working:
          </p>
        </div>
        <CodeBlock language="bash" code={`# Test with curl
curl -I https://yoursite.com

# Online tools
# - https://securityheaders.com
# - https://observatory.mozilla.org
# - https://csp-evaluator.withgoogle.com

# Browser DevTools
# Network tab → Select request → Headers tab`} />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/security/validation">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Schema Validation</h3>
                <p className="font-mono text-sm text-muted-foreground">
                  Validate all inputs with Zod schemas
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/deployment/vercel">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Deploy to Vercel</h3>
                <p className="font-mono text-sm text-muted-foreground">
                  Deploy with production security settings
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
