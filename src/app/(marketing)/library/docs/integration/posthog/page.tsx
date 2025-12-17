/**
 * ✅ FABRK COMPONENT
 * PostHog Integration Guide
 * Uses LibraryGuideTemplate for consistent structure
 */
import { BarChart3 } from 'lucide-react';
import { LibraryGuideTemplate, LibraryCodeBlock } from '@/components/library';

export default function PostHogIntegrationPage() {
  return (
    <LibraryGuideTemplate
      breadcrumbs={[{ label: 'Docs', href: '/library/docs' }, { label: 'PostHog Integration' }]}
      icon={BarChart3}
      badgePrefix="INTEGRATION"
      badge="POSTHOG_ANALYTICS"
      title="PostHog Integration"
      description="Add analytics and feature flags to track user behavior in templates."
      meta={{ time: '~10 minutes', level: 'Beginner' }}
      overview={{
        text: 'Fabrk includes PostHog for analytics. Track events, user properties, and feature flags in your templates.',
        highlights: [
          'Event tracking for user actions',
          'User identification and properties',
          'Feature flags for A/B testing',
          'Session recordings (optional)',
        ],
      }}
      steps={[
        {
          code: '0x01',
          title: 'SETUP',
          content: (
            <LibraryCodeBlock
              code={`# .env.local
NEXT_PUBLIC_POSTHOG_KEY="phc_your_key"
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"`}
              language="bash"
              maxHeight="80px"
            />
          ),
        },
        {
          code: '0x02',
          title: 'TRACK EVENTS',
          content: (
            <LibraryCodeBlock
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
          ),
        },
        {
          code: '0x03',
          title: 'IDENTIFY USERS',
          content: (
            <LibraryCodeBlock
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
          ),
        },
        {
          code: '0x04',
          title: 'FEATURE FLAGS',
          content: (
            <LibraryCodeBlock
              code={`import { useFeatureFlagEnabled } from "posthog-js/react";

export function NewFeature() {
  const isEnabled = useFeatureFlagEnabled("new-dashboard");

  if (!isEnabled) return null;

  return <NewDashboardComponent />;
}`}
              language="tsx"
              maxHeight="200px"
            />
          ),
        },
      ]}
      relatedLinks={[
        {
          label: 'Customize templates',
          href: '/library/docs/customization',
          description: 'to match your brand',
        },
        {
          label: 'View Analytics Dashboard',
          href: '/library/analytics-dashboard',
          description: 'template',
        },
      ]}
    />
  );
}
