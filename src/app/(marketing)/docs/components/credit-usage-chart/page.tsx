'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { UsageChart } from '@/components/credits';

// Static mock data for previews (avoids hydration mismatch from Math.random)
const normalData = [
  { date: '2024-11-09', credits: 15 },
  { date: '2024-11-10', credits: 22 },
  { date: '2024-11-11', credits: 8 },
  { date: '2024-11-12', credits: 31 },
  { date: '2024-11-13', credits: 12 },
  { date: '2024-11-14', credits: 25 },
  { date: '2024-11-15', credits: 18 },
  { date: '2024-11-16', credits: 5 },
  { date: '2024-11-17', credits: 28 },
  { date: '2024-11-18', credits: 14 },
  { date: '2024-11-19', credits: 20 },
  { date: '2024-11-20', credits: 9 },
  { date: '2024-11-21', credits: 33 },
  { date: '2024-11-22', credits: 16 },
  { date: '2024-11-23', credits: 11 },
  { date: '2024-11-24', credits: 24 },
  { date: '2024-11-25', credits: 7 },
  { date: '2024-11-26', credits: 19 },
  { date: '2024-11-27', credits: 27 },
  { date: '2024-11-28', credits: 13 },
  { date: '2024-11-29', credits: 21 },
  { date: '2024-11-30', credits: 6 },
  { date: '2024-12-01', credits: 29 },
  { date: '2024-12-02', credits: 17 },
  { date: '2024-12-03', credits: 10 },
  { date: '2024-12-04', credits: 23 },
  { date: '2024-12-05', credits: 8 },
  { date: '2024-12-06', credits: 26 },
  { date: '2024-12-07', credits: 15 },
  { date: '2024-12-08', credits: 20 },
];

const spikeData = [
  { date: '2024-11-09', credits: 10 },
  { date: '2024-11-10', credits: 8 },
  { date: '2024-11-11', credits: 12 },
  { date: '2024-11-12', credits: 6 },
  { date: '2024-11-13', credits: 15 },
  { date: '2024-11-14', credits: 9 },
  { date: '2024-11-15', credits: 11 },
  { date: '2024-11-16', credits: 7 },
  { date: '2024-11-17', credits: 13 },
  { date: '2024-11-18', credits: 10 },
  { date: '2024-11-19', credits: 80 },
  { date: '2024-11-20', credits: 8 },
  { date: '2024-11-21', credits: 14 },
  { date: '2024-11-22', credits: 6 },
  { date: '2024-11-23', credits: 11 },
  { date: '2024-11-24', credits: 80 },
  { date: '2024-11-25', credits: 9 },
  { date: '2024-11-26', credits: 12 },
  { date: '2024-11-27', credits: 7 },
  { date: '2024-11-28', credits: 15 },
  { date: '2024-11-29', credits: 10 },
  { date: '2024-11-30', credits: 8 },
  { date: '2024-12-01', credits: 13 },
  { date: '2024-12-02', credits: 6 },
  { date: '2024-12-03', credits: 11 },
  { date: '2024-12-04', credits: 9 },
  { date: '2024-12-05', credits: 14 },
  { date: '2024-12-06', credits: 7 },
  { date: '2024-12-07', credits: 12 },
  { date: '2024-12-08', credits: 10 },
];

const lowData = [
  { date: '2024-11-09', credits: 2 },
  { date: '2024-11-10', credits: 1 },
  { date: '2024-11-11', credits: 3 },
  { date: '2024-11-12', credits: 0 },
  { date: '2024-11-13', credits: 4 },
  { date: '2024-11-14', credits: 1 },
  { date: '2024-11-15', credits: 2 },
  { date: '2024-11-16', credits: 0 },
  { date: '2024-11-17', credits: 3 },
  { date: '2024-11-18', credits: 1 },
  { date: '2024-11-19', credits: 2 },
  { date: '2024-11-20', credits: 4 },
  { date: '2024-11-21', credits: 0 },
  { date: '2024-11-22', credits: 1 },
  { date: '2024-11-23', credits: 3 },
  { date: '2024-11-24', credits: 2 },
  { date: '2024-11-25', credits: 0 },
  { date: '2024-11-26', credits: 4 },
  { date: '2024-11-27', credits: 1 },
  { date: '2024-11-28', credits: 2 },
  { date: '2024-11-29', credits: 3 },
  { date: '2024-11-30', credits: 0 },
  { date: '2024-12-01', credits: 1 },
  { date: '2024-12-02', credits: 4 },
  { date: '2024-12-03', credits: 2 },
  { date: '2024-12-04', credits: 0 },
  { date: '2024-12-05', credits: 3 },
  { date: '2024-12-06', credits: 1 },
  { date: '2024-12-07', credits: 2 },
  { date: '2024-12-08', credits: 1 },
];

const emptyData = [
  { date: '2024-11-09', credits: 0 },
  { date: '2024-11-10', credits: 0 },
  { date: '2024-11-11', credits: 0 },
  { date: '2024-11-12', credits: 0 },
  { date: '2024-11-13', credits: 0 },
  { date: '2024-11-14', credits: 0 },
  { date: '2024-11-15', credits: 0 },
  { date: '2024-11-16', credits: 0 },
  { date: '2024-11-17', credits: 0 },
  { date: '2024-11-18', credits: 0 },
  { date: '2024-11-19', credits: 0 },
  { date: '2024-11-20', credits: 0 },
  { date: '2024-11-21', credits: 0 },
  { date: '2024-11-22', credits: 0 },
  { date: '2024-11-23', credits: 0 },
  { date: '2024-11-24', credits: 0 },
  { date: '2024-11-25', credits: 0 },
  { date: '2024-11-26', credits: 0 },
  { date: '2024-11-27', credits: 0 },
  { date: '2024-11-28', credits: 0 },
  { date: '2024-12-01', credits: 0 },
  { date: '2024-12-02', credits: 0 },
  { date: '2024-12-03', credits: 0 },
  { date: '2024-12-04', credits: 0 },
  { date: '2024-12-05', credits: 0 },
  { date: '2024-12-06', credits: 0 },
  { date: '2024-12-07', credits: 0 },
  { date: '2024-12-08', credits: 0 },
];

export default function CreditUsageChartPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.121]"
      category="Credits"
      title="Credit Usage Chart"
      description="Bar chart visualization of daily AI credit consumption over the past 14 days. Includes hover tooltips showing exact values."
      importCode={`import { UsageChart } from "@/components/credits"`}
      mainPreview={{
        preview: (
          <div className="mx-auto max-w-lg p-4">
            <UsageChart data={normalData} />
          </div>
        ),
        code: `<UsageChart data={usageStats} />`,
      }}
      variants={[
        {
          title: 'High Usage Spikes',
          description: 'Chart handles outlier days with high consumption.',
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <UsageChart data={spikeData} />
            </div>
          ),
          code: `// Bars scale relative to max value`,
        },
        {
          title: 'Low Usage',
          description: 'Minimal usage still shows visible bars.',
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <UsageChart data={lowData} />
            </div>
          ),
          code: `// Minimum bar height ensures visibility`,
        },
        {
          title: 'No Usage',
          description: 'Days with zero usage show muted bars.',
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <UsageChart data={emptyData} />
            </div>
          ),
          code: `// Zero-usage days shown as muted bars`,
        },
      ]}
      props={[
        {
          name: 'data',
          type: '{ date: string; credits: number }[]',
          required: true,
          description: 'Array of daily usage data with ISO date strings and credit counts.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ]}
      accessibility={[
        'Hover tooltips show exact credit values',
        'Color-coded bars (primary for usage, muted for zero)',
        'Date labels on x-axis for orientation',
        'Relative bar heights for visual comparison',
      ]}
      previous={{
        title: 'Balance Display',
        href: '/docs/components/balance-display',
      }}
      next={{
        title: 'Credit Transaction Table',
        href: '/docs/components/credit-transaction-table',
      }}
    />
  );
}
