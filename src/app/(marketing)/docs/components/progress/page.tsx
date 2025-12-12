'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';

export default function ProgressPage() {
  // For demo purposes
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ComponentShowcaseTemplate
      code="[UI.16]"
      category="Components"
      title="Progress"
      description="Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
      importCode={`import { Progress } from "@/components/ui/progress"`}
      mainPreview={{
        preview: <Progress value={66} />,
        code: `<Progress value={66} />`,
      }}
      variants={[
        {
          title: '0% Complete',
          description: 'Progress bar at 0%, showing the starting state.',
          preview: <Progress value={0} />,
          code: `<Progress value={0} />`,
        },
        {
          title: '25% Complete',
          description: 'Progress bar at 25% completion.',
          preview: <Progress value={25} />,
          code: `<Progress value={25} />`,
        },
        {
          title: '50% Complete',
          description: 'Progress bar at 50% completion, halfway done.',
          preview: <Progress value={50} />,
          code: `<Progress value={50} />`,
        },
        {
          title: '75% Complete',
          description: 'Progress bar at 75% completion, almost finished.',
          preview: <Progress value={75} />,
          code: `<Progress value={75} />`,
        },
        {
          title: '100% Complete',
          description: 'Progress bar at 100%, fully completed.',
          preview: <Progress value={100} />,
          code: `<Progress value={100} />`,
        },
        {
          title: 'Animated Progress',
          description: 'Progress bar with animated state change.',
          preview: <Progress value={progress} />,
          code: `const [progress, setProgress] = useState(13);

useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500);
  return () => clearTimeout(timer);
}, []);

<Progress value={progress} />`,
        },
      ]}
      props={[
        {
          name: 'value',
          type: 'number',
          default: '0',
          description: 'The progress value between 0 and 100.',
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: 'The maximum progress value.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply to the progress bar.',
        },
      ]}
      accessibility={[
        'Built on Radix UI Progress primitive for full accessibility',
        'Properly announces progress percentage to screen readers',
        'Uses aria-valuenow, aria-valuemin, and aria-valuemax attributes',
        'Smooth transition animation for value changes',
        'Visual indicator uses transform for better performance',
      ]}
      previous={{ title: 'Alert', href: '/docs/components/alert' }}
      next={{ title: 'Loading', href: '/docs/components/loading' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-3 text-sm font-semibold">✓ Use Progress when:</p>
              <ul className="space-y-2">
                <li className="text-sm">
                  • Task has known duration or measurable progress (file uploads, downloads)
                </li>
                <li className="text-sm">
                  • Multi-step process where user is on step X of Y (3 of 5 steps)
                </li>
                <li className="text-sm">
                  • Background operations that are visible to user (sync progress, export)
                </li>
                <li className="text-sm">
                  • Long-running tasks where percentage completion is meaningful (0-100%)
                </li>
                <li className="text-sm">
                  • User needs reassurance that process is advancing (installation, processing)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-3 text-sm font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-sm">
                  • Duration is unknown or indeterminate (use Loading component instead)
                </li>
                <li className="text-sm">
                  • Operation completes instantly (just do it, no indicator needed)
                </li>
                <li className="text-sm">
                  • Step-by-step wizard with discrete steps (use multi-step form)
                </li>
                <li className="text-sm">
                  • Percentage doesn&apos;t make sense for the task (use Loading component)
                </li>
                <li className="text-sm">
                  • Task is in background and user doesn&apos;t need to wait (show Toast when done)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-sm font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-sm">
                  • Update value frequently for smooth animation (not just 0%, 50%, 100%)
                </li>
                <li className="text-sm">
                  • Show percentage text alongside bar for clarity (&quot;66% complete&quot;)
                </li>
                <li className="text-sm">
                  • Combine with status text (&quot;Uploading file.pdf...&quot;)
                </li>
                <li className="text-sm">
                  • Always use 0-100 range (don&apos;t change max prop unless necessary)
                </li>
                <li className="text-sm">
                  • Provide cancel option for long operations when possible
                </li>
                <li className="text-sm">• Start at 0%, not 1% (shows clear starting state)</li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
