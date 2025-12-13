'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { UsageMeter } from '@/components/ui/billing-summary-card';
import { AlertTriangle } from 'lucide-react';

export default function UsageMeterPage() {
  return (
    <>
      <div className="border-warning/50 bg-warning/10 mb-6 rounded-none border p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-warning h-5 w-5" />
          <div className="space-y-2">
            <p className="font-mono text-sm font-semibold">COMPONENT COMING SOON</p>
            <p className="text-muted-foreground text-sm">
              This component is planned for a future release. Documentation is provided as a
              preview. The implementation shown below demonstrates the intended functionality.
            </p>
          </div>
        </div>
      </div>
      <ComponentShowcaseTemplate
        code="[UI.110]"
        category="Specialized"
        title="Usage Meter"
        description="A progress bar component for displaying resource usage. Shows current vs limit with color-coded warnings when approaching limits."
        importCode={`import { UsageMeter } from "@/components/ui/billing-summary-card"`}
        mainPreview={{
          preview: (
            <div className="mx-auto max-w-md space-y-4 p-4">
              <UsageMeter label="API Calls" used={6500} limit={10000} />
              <UsageMeter label="Storage" used={4.2} limit={5} unit="GB" />
              <UsageMeter label="Team Members" used={8} limit={10} />
            </div>
          ),
          code: `<UsageMeter label="API Calls" used={6500} limit={10000} />
<UsageMeter label="Storage" used={4.2} limit={5} unit="GB" />
<UsageMeter label="Team Members" used={8} limit={10} />`,
        }}
        variants={[
          {
            title: 'Warning State (75%+)',
            description: 'Meter shows warning color when usage is high.',
            preview: (
              <div className="mx-auto max-w-md space-y-4 p-4">
                <UsageMeter label="Storage" used={3.8} limit={5} unit="GB" />
              </div>
            ),
            code: `<UsageMeter label="Storage" used={3.8} limit={5} unit="GB" />`,
          },
          {
            title: 'Critical State (90%+)',
            description: 'Meter shows destructive color when near limit.',
            preview: (
              <div className="mx-auto max-w-md space-y-4 p-4">
                <UsageMeter label="API Calls" used={9500} limit={10000} />
              </div>
            ),
            code: `<UsageMeter label="API Calls" used={9500} limit={10000} />`,
          },
          {
            title: 'Size Variants',
            description: 'Different sizes for various contexts.',
            preview: (
              <div className="mx-auto max-w-md space-y-4 p-4">
                <UsageMeter label="Small" used={50} limit={100} size="sm" />
                <UsageMeter label="Medium" used={50} limit={100} size="md" />
                <UsageMeter label="Large" used={50} limit={100} size="lg" />
              </div>
            ),
            code: `<UsageMeter label="Small" used={50} limit={100} size="sm" />
<UsageMeter label="Medium" used={50} limit={100} size="md" />
<UsageMeter label="Large" used={50} limit={100} size="lg" />`,
          },
          {
            title: 'Without Percentage',
            description: 'Hide percentage display.',
            preview: (
              <div className="mx-auto max-w-md space-y-4 p-4">
                <UsageMeter
                  label="Bandwidth"
                  used={450}
                  limit={1000}
                  unit="MB"
                  showPercentage={false}
                />
              </div>
            ),
            code: `<UsageMeter
  label="Bandwidth"
  used={450}
  limit={1000}
  unit="MB"
  showPercentage={false}
/>`,
          },
        ]}
        props={[
          {
            name: 'label',
            type: 'string',
            required: true,
            description: 'Meter label text.',
          },
          {
            name: 'used',
            type: 'number',
            required: true,
            description: 'Current usage value.',
          },
          {
            name: 'limit',
            type: 'number',
            required: true,
            description: 'Maximum limit value.',
          },
          {
            name: 'unit',
            type: 'string',
            description: "Unit label (e.g., 'GB', 'MB').",
          },
          {
            name: 'showPercentage',
            type: 'boolean',
            default: 'true',
            description: 'Show percentage in display.',
          },
          {
            name: 'size',
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            description: 'Progress bar size.',
          },
        ]}
        accessibility={[
          'Progress value communicated via text',
          'Color-coded states with text fallback',
          'Semantic progress structure',
          'Unit labels for clarity',
        ]}
        previous={{ title: 'Simple Icon', href: '/docs/components/simple-icon' }}
        next={{ title: 'Overview', href: '/docs/components/overview' }}
      />
    </>
  );
}
