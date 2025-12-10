import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { BarChart3, User, Video, ToggleLeft } from 'lucide-react';

export const metadata = {
  title: 'Analytics with PostHog - Fabrk Documentation',
  description:
    'Learn how to integrate PostHog analytics for event tracking, user identification, and feature flags.',
};

export default function AnalyticsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x70]"
      category="Features"
      title="Analytics With PostHog"
      description="Product analytics, session recordings, and feature flags with PostHog integration."
      overview="Fabrk integrates PostHog for comprehensive product analytics. Track user behavior, analyze conversion funnels, record sessions, and manage feature flags all in one platform."
      features={[
        {
          icon: BarChart3,
          title: 'Event Tracking',
          description: 'Custom events with properties for detailed analytics.',
        },
        {
          icon: User,
          title: 'User Identification',
          description: 'Link anonymous and authenticated users across sessions.',
        },
        {
          icon: Video,
          title: 'Session Recording',
          description: 'Watch user sessions to understand behavior (optional).',
        },
        {
          icon: ToggleLeft,
          title: 'Feature Flags',
          description: 'A/B testing and gradual rollouts built-in.',
        },
      ]}
      setup={[
        {
          title: 'Configure PostHog Credentials',
          description: 'Add your PostHog credentials to environment variables',
          code: `# .env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com`,
          language: 'bash',
        },
        {
          title: 'Enable Analytics in Config',
          description: 'Enable analytics in your config',
          code: `// src/config.js
module.exports = {
  features: {
    analytics: true, // Enable PostHog
  },
};`,
          language: 'javascript',
        },
      ]}
      usage={[
        {
          title: 'PostHog Provider Setup',
          description: 'Initialize PostHog in your application',
          code: `// src/components/providers/posthog-provider.tsx
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
}`,
          language: 'tsx',
        },
        {
          title: 'Tracking Events',
          description: 'Track custom events throughout your application',
          code: `"use client";

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
// - member_invited`,
          language: 'tsx',
        },
        {
          title: 'User Identification',
          description: 'Identify users after authentication to link their activity',
          code: `"use client";

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
};`,
          language: 'tsx',
        },
        {
          title: 'Page View Tracking',
          description: 'Track page views with the Next.js router',
          code: `"use client";

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
}`,
          language: 'tsx',
        },
        {
          title: 'Server-Side Tracking',
          description: 'Track events from API routes and server actions',
          code: `// src/lib/analytics/server.ts
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
}`,
          language: 'typescript',
        },
      ]}
      previous={{
        title: 'Background Jobs',
        href: '/docs/features/background-jobs',
      }}
      next={{ title: 'Feature Flags', href: '/docs/features/feature-flags' }}
    >
      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <ul className="space-y-1">
            <li>
              ├─ <strong>Use consistent naming:</strong> Follow a convention like{' '}
              <code className="bg-muted px-1">object_action</code>
            </li>
            <li>
              ├─ <strong>Don&apos;t over-track:</strong> Focus on meaningful events that inform
              decisions
            </li>
            <li>
              ├─ <strong>Include context:</strong> Add properties that help segment and analyze
            </li>
            <li>
              ├─ <strong>Respect privacy:</strong> Don&apos;t track PII unless necessary
            </li>
            <li>
              ├─ <strong>Test events:</strong> Verify events appear in PostHog dashboard
            </li>
            <li>
              └─ <strong>Document events:</strong> Maintain a tracking plan for your team
            </li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
