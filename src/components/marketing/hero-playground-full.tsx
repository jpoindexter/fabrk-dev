/**
 * Hero Playground - Full shadcn-style interactive demo
 * Shows ACTUAL full pages via iframes from /library/*
 */
'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function HeroPlaygroundFull() {
  const [activeTab, setActiveTab] = useState('components');

  const tabs = [
    { id: 'components', label: 'COMPONENTS', url: '/library/chart-library' },
    { id: 'dashboard', label: 'DASHBOARD', url: '/library/analytics-dashboard' },
    { id: 'table', label: 'TABLE', url: '/library/user-management' },
    { id: 'profile', label: 'PROFILE', url: '/library/profile' },
    { id: 'billing', label: 'BILLING', url: '/library/billing-dashboard' },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <section className="border-border bg-muted/20 border-t py-16">
      <Container size="2xl">
        {/* Header with tabs and theme indicator */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-2 text-xs transition-colors',
                  mode.radius,
                  mode.font,
                  activeTab === tab.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={cn('flex items-center gap-2 text-xs', mode.font, mode.color.text.muted)}>
            <span>THEME:</span>
            <span className={mode.color.text.accent}>TERMINAL</span>
            <span className={mode.color.text.muted}>
              (18 variants at{' '}
              <a href="/library" className="hover:underline">
                /library
              </a>
              )
            </span>
          </div>
        </div>

        {/* Full Page Iframe - Shows actual library pages */}
        {currentTab && (
          <div className="border-border bg-background relative w-full overflow-hidden rounded-none border">
            <iframe src={currentTab.url} className="h-[800px] w-full" title={currentTab.label} />
          </div>
        )}
      </Container>
    </section>
  );
}
