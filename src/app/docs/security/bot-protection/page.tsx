import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Bot Protection - Fabrk Docs",
  description: "Block malicious bots and scrapers. Honeypot fields, CAPTCHA integration, and user-agent filtering.",
};

export default function BotProtectionPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-4">
        <div className="inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x80] SECURITY ] BOT_PROTECTION</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">BOT_PROTECTION</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Detect and block automated bot traffic with multiple protection strategies.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h3 className="font-mono text-base font-semibold text-foreground">What's Included</h3>
          <ul className="font-mono text-sm text-muted-foreground space-y-1">
            <li>Honeypot fields for form protection</li>
            <li>Time-based form submission validation</li>
            <li>User-Agent analysis</li>
            <li>Vercel Edge protection integration</li>
            <li>Custom bot detection middleware</li>
            <li>CAPTCHA integration (optional)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Honeypot Fields */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">HONEYPOT_FIELDS</h2>
          <p className="font-mono text-muted-foreground">
            &gt; Add invisible fields that bots will fill but humans won't:
          </p>
        </div>
        <CodeBlock language="tsx" code={`// Client-side form component
"use client";

export function ContactForm() {
  return (
    <form action="/api/contact" method="POST">
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />

      {/* Honeypot - hidden from users, bots will fill it */}
      <input
        type="text"
        name="website"
        style={{
          position: "absolute",
          left: "-9999px",
          tabIndex: -1,
          autocomplete: "off",
        }}
        aria-hidden="true"
      />

      {/* Alternative CSS hiding */}
      <div className="hidden">
        <input type="text" name="phone_number" tabIndex={-1} />
      </div>

      <button type="submit">Send</button>
    </form>
  );
}

// Server-side validation
// src/app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.formData();

  // Check honeypot fields
  const honeypot1 = body.get("website");
  const honeypot2 = body.get("phone_number");

  if (honeypot1 || honeypot2) {
    // Log potential bot attempt
    console.log("Bot detected: honeypot filled");

    // Return success to not alert the bot
    return NextResponse.json({ success: true });
  }

  // Process legitimate submission
  const name = body.get("name");
  const email = body.get("email");

  // ...
}`} />
      </div>

      {/* Time-based Validation */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">TIME_BASED_VALIDATION</h2>
          <p className="font-mono text-muted-foreground">
            &gt; Reject submissions that are too fast (bots) or too slow (stale tokens):
          </p>
        </div>
        <CodeBlock language="tsx" code={`// Client-side: Add timestamp to form
"use client";

import { useEffect, useState } from "react";

export function ProtectedForm() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(Date.now().toString());
  }, []);

  return (
    <form action="/api/submit" method="POST">
      <input type="hidden" name="timestamp" value={timestamp} />
      <input type="text" name="data" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Server-side validation
// src/app/api/submit/route.ts

import { NextRequest, NextResponse } from "next/server";

const MIN_SUBMIT_TIME = 2000;  // 2 seconds minimum
const MAX_SUBMIT_TIME = 3600000; // 1 hour maximum

export async function POST(request: NextRequest) {
  const body = await request.json();

  const timestamp = parseInt(body.timestamp);
  const now = Date.now();
  const elapsed = now - timestamp;

  // Too fast = bot
  if (elapsed < MIN_SUBMIT_TIME) {
    console.log(\`Bot detected: submitted in \${elapsed}ms\`);
    return NextResponse.json(
      { error: "Please take your time filling the form" },
      { status: 400 }
    );
  }

  // Too slow = stale token
  if (elapsed > MAX_SUBMIT_TIME) {
    return NextResponse.json(
      { error: "Form expired. Please refresh and try again" },
      { status: 400 }
    );
  }

  // Process legitimate submission
}`} />
      </div>

      {/* User-Agent Analysis */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">USER_AGENT_ANALYSIS</h2>
          <p className="font-mono text-muted-foreground">
            &gt; Detect suspicious user agents:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/lib/bot-detection.ts

const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /axios/i,
  /node-fetch/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
  /puppeteer/i,
];

// Known good bots (search engines)
const GOOD_BOTS = [
  /googlebot/i,
  /bingbot/i,
  /yandexbot/i,
  /duckduckbot/i,
  /slurp/i, // Yahoo
];

export function analyzeUserAgent(userAgent: string | null): {
  isBot: boolean;
  isGoodBot: boolean;
  confidence: number;
} {
  if (!userAgent) {
    return { isBot: true, isGoodBot: false, confidence: 0.9 };
  }

  // Check for good bots first
  for (const pattern of GOOD_BOTS) {
    if (pattern.test(userAgent)) {
      return { isBot: true, isGoodBot: true, confidence: 0.95 };
    }
  }

  // Check for bad bot patterns
  for (const pattern of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return { isBot: true, isGoodBot: false, confidence: 0.8 };
    }
  }

  // Suspicious: no version numbers
  if (!/\\d/.test(userAgent)) {
    return { isBot: true, isGoodBot: false, confidence: 0.6 };
  }

  return { isBot: false, isGoodBot: false, confidence: 0.1 };
}

// Usage in API route
export async function POST(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");
  const { isBot, isGoodBot, confidence } = analyzeUserAgent(userAgent);

  if (isBot && !isGoodBot && confidence > 0.7) {
    return NextResponse.json(
      { error: "Access denied" },
      { status: 403 }
    );
  }

  // Continue processing
}`} />
      </div>

      {/* Middleware Protection */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">MIDDLEWARE_PROTECTION</h2>
          <p className="font-mono text-muted-foreground">
            &gt; Add bot detection at the edge:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/middleware.ts

import { NextRequest, NextResponse } from "next/server";

// Protected paths
const PROTECTED_PATHS = [
  "/api/contact",
  "/api/signup",
  "/api/login",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only check protected paths
  if (!PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for missing headers that browsers always send
  const userAgent = request.headers.get("user-agent");
  const acceptLanguage = request.headers.get("accept-language");
  const acceptEncoding = request.headers.get("accept-encoding");

  if (!userAgent || !acceptLanguage || !acceptEncoding) {
    return NextResponse.json(
      { error: "Access denied" },
      { status: 403 }
    );
  }

  // Check for suspicious patterns
  const suspiciousHeaders = [
    request.headers.get("x-forwarded-for")?.split(",").length > 5,
    /python|curl|wget/i.test(userAgent),
  ];

  if (suspiciousHeaders.some(Boolean)) {
    console.log("Suspicious request blocked:", {
      ip: request.ip,
      userAgent,
      path: pathname,
    });

    return NextResponse.json(
      { error: "Access denied" },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};`} />
      </div>

      {/* Cloudflare Turnstile */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">CLOUDFLARE_TURNSTILE_CAPTCHA</h2>
          <p className="font-mono text-muted-foreground">
            &gt; Add Cloudflare Turnstile for strong bot protection:
          </p>
        </div>
        <CodeBlock language="tsx" code={`// npm install @marsidev/react-turnstile

"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

export function ProtectedForm() {
  const [token, setToken] = useState<string>("");

  return (
    <form action="/api/submit" method="POST">
      <input type="text" name="data" />

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setToken(token)}
      />

      <input type="hidden" name="turnstileToken" value={token} />

      <button type="submit" disabled={!token}>
        Submit
      </button>
    </form>
  );
}

// Server-side verification
// src/app/api/submit/route.ts

async function verifyTurnstile(token: string): Promise<boolean> {
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    }
  );

  const data = await response.json();
  return data.success;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const isValid = await verifyTurnstile(body.turnstileToken);

  if (!isValid) {
    return NextResponse.json(
      { error: "CAPTCHA verification failed" },
      { status: 400 }
    );
  }

  // Process submission
}`} />
      </div>

      {/* Environment Variables */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">ENVIRONMENT_VARIABLES</h2>
        </div>
        <CodeBlock language="bash" code={`# .env.local

# Cloudflare Turnstile (optional)
NEXT_PUBLIC_TURNSTILE_SITE_KEY="your-site-key"
TURNSTILE_SECRET_KEY="your-secret-key"`} />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/security/rate-limiting">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-base font-semibold text-foreground">Rate Limiting</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Limit requests per IP or user
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/security/audit-logging">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-base font-semibold text-foreground">Audit Logging</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Log bot detection events
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
