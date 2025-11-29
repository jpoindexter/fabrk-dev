import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Analytics with PostHog - Fabrk Documentation",
  description: "Learn how to integrate PostHog analytics for event tracking, user identification, and feature flags.",
};

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl space-y-6">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline font-mono text-xs mb-4 inline-block">
          &larr; Back to Documentation
        </Link>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ FEATURES ] ANALYTICS</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl mb-4">ANALYTICS_WITH_POSTHOG</h1>
        <p className="font-mono text-sm text-muted-foreground">
          &gt; Product analytics, session recordings, and feature flags with PostHog integration.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold text-primary mb-4">OVERVIEW</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Fabrk integrates PostHog for comprehensive product analytics. Track user behavior,
            analyze conversion funnels, record sessions, and manage feature flags all in one platform.
          </p>
          <div className="font-mono text-sm text-muted-foreground space-y-1">
            <div>├─ Event Tracking: Custom events with properties</div>
            <div>├─ User Identification: Link anonymous and authenticated users</div>
            <div>├─ Session Recording: Watch user sessions (optional)</div>
            <div>└─ Feature Flags: A/B testing and gradual rollouts</div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">CONFIGURATION</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Add your PostHog credentials to environment variables:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="bash" code={`# .env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com`} />
        </div>
        <div>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Enable analytics in your config:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="typescript" code={`// src/config.js
module.exports = {
  features: {
    analytics: true, // Enable PostHog
  },
};`} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">POSTHOG_PROVIDER_SETUP</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Initialize PostHog in your application:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="tsx" code={`// src/components/providers/posthog-provider.tsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false, // We'll capture manually
      capture_pageleave: true,
      persistence: "localStorage",
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

// Add to your root layout
// src/app/layout.tsx
import { PHProvider } from "@/components/providers/posthog-provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PHProvider>
          {children}
        </PHProvider>
      </body>
    </html>
  );
}`} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">TRACKING_EVENTS</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Track custom events throughout your application:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="tsx" code={`"use client";

import { usePostHog } from "posthog-js/react";

export function CheckoutButton({ plan, price }: Props) {
  const posthog = usePostHog();

  const handleCheckout = async () => {
    // Track checkout started
    posthog.capture("checkout_started", {
      plan_name: plan,
      plan_price: price,
      currency: "USD",
    });

    // Proceed with checkout...
  };

  return (
    <button onClick={handleCheckout}>
      Subscribe to {plan}
    </button>
  );
}

// Common events to track:
// - signup_started
// - signup_completed
// - checkout_started
// - payment_completed
// - feature_used
// - settings_changed
// - organization_created
// - member_invited`} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">USER_IDENTIFICATION</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Identify users after authentication to link their activity:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="tsx" code={`"use client";

import { usePostHog } from "posthog-js/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function UserIdentifier() {
  const posthog = usePostHog();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      // Identify the user
      posthog.identify(session.user.id, {
        email: session.user.email,
        name: session.user.name,
        plan: session.user.plan,
        created_at: session.user.createdAt,
      });

      // Set user properties
      posthog.people.set({
        last_login: new Date().toISOString(),
      });
    }
  }, [session, posthog]);

  return null;
}

// Reset on logout
const handleLogout = () => {
  posthog.reset(); // Clear user identity
  signOut();
};`} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">PAGE_VIEW_TRACKING</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Track page views with the Next.js router:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="tsx" code={`"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}`} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">SERVER_SIDE_TRACKING</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Track events from API routes and server actions:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="typescript" code={`// src/lib/analytics/server.ts
import { PostHog } from "posthog-node";

const posthogServer = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY!,
  { host: process.env.NEXT_PUBLIC_POSTHOG_HOST }
);

export async function trackServerEvent(
  userId: string,
  event: string,
  properties?: Record<string, any>
) {
  posthogServer.capture({
    distinctId: userId,
    event,
    properties,
  });

  // Flush in serverless environments
  await posthogServer.shutdown();
}

// Usage in API routes
export async function POST(req: Request) {
  const session = await auth();

  // Process payment...

  await trackServerEvent(session.user.id, "payment_completed", {
    amount: 99,
    plan: "pro",
    payment_method: "card",
  });

  return Response.json({ success: true });
}`} />
        </div>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold text-primary mb-4">BEST_PRACTICES</h2>
          <div className="font-mono text-sm text-muted-foreground space-y-1">
            <div>├─ Use consistent naming: Follow a convention like <code className="bg-muted px-1 font-mono text-xs">object_action</code></div>
            <div>├─ Don&apos;t over-track: Focus on meaningful events that inform decisions</div>
            <div>├─ Include context: Add properties that help segment and analyze</div>
            <div>├─ Respect privacy: Don&apos;t track PII unless necessary</div>
            <div>├─ Test events: Verify events appear in PostHog dashboard</div>
            <div>└─ Document events: Maintain a tracking plan for your team</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
