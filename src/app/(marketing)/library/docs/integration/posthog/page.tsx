/**
 * ✅ FABRK COMPONENT
 * PostHog Integration Guide
 */
'use client';

import Link from 'next/link';
import { BarChart3 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

export default function PostHogIntegrationPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      <section className="space-y-4">
        <div className="border-border inline-block border px-4 py-1">
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [INTEGRATION]: POSTHOG_ANALYTICS
          </span>
        </div>
        <div className="flex items-start gap-4">
          <div className={cn('bg-primary/10 p-4', mode.radius)}>
            <BarChart3 className="text-primary h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className={cn(mode.font, 'text-3xl font-semibold tracking-tight')}>
              PostHog Integration
            </h1>
            <p className={cn(mode.font, 'text-muted-foreground text-base')}>
              Add analytics and feature flags to track user behavior in templates.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardHeader code="0x00" title="OVERVIEW" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Fabrk includes PostHog for analytics. Track events, user properties, and feature flags
              in your templates.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x01" title="SETUP" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <CodeBlock
              code={`# .env.local
NEXT_PUBLIC_POSTHOG_KEY="phc_your_key"
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"`}
              language="bash"
              maxHeight="80px"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x02" title="TRACK EVENTS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <CodeBlock
              code={`"use client";

import { usePostHog } from "posthog-js/react";

export default function DashboardButton() {
  const posthog = usePostHog();

  const handleClick = () => {
    posthog.capture("dashboard_button_clicked", {
      button: "export_data",
      location: "analytics_page",
    });
  };

  return <button onClick={handleClick}>Export</button>;
}`}
              language="tsx"
              maxHeight="300px"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x03" title="IDENTIFY USERS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <CodeBlock
              code={`useEffect(() => {
  if (session?.user) {
    posthog.identify(session.user.id, {
      email: session.user.email,
      name: session.user.name,
    });
  }
}, [session]);`}
              language="typescript"
              maxHeight="180px"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x04" title="NEXT STEPS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
              <li>
                <Link href="/library/docs/customization" className="text-primary hover:underline">
                  Customize templates
                </Link>{' '}
                to match your brand
              </li>
              <li>
                <Link href="/library/analytics-dashboard" className="text-primary hover:underline">
                  View Analytics Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
