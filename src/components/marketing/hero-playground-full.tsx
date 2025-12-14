/**
 * Hero Playground - Full shadcn-style interactive demo
 * 4-column vertical stacked layout with REAL component examples
 *
 * Components split into smaller files for maintainability:
 * - playground/browser-frame.tsx - Browser chrome wrapper
 * - playground/left-navigation.tsx - Sidebar navigation
 * - playground/components-grid.tsx - 4-column component showcase
 * - playground/dashboard-preview.tsx - Analytics dashboard demo
 * - playground/table-preview.tsx - User management table demo
 * - playground/profile-preview.tsx - Profile page demo
 * - playground/mock-data.ts - All mock data
 */
'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentsGrid, DashboardPreview, TablePreview, ProfilePreview } from './playground';

export function HeroPlaygroundFull() {
  const [activeTab, setActiveTab] = useState('components');

  const tabs = [
    { id: 'components', label: 'COMPONENTS' },
    { id: 'dashboard', label: 'DASHBOARD' },
    { id: 'table', label: 'TABLE' },
    { id: 'profile', label: 'PROFILE' },
  ];

  return (
    <section className="border-border border-t py-16">
      <div className="container mx-auto max-w-[1800px] px-12 lg:px-24">
        {/* Header with tabs */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-transparent">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'components' && <ComponentsGrid />}
          {activeTab === 'dashboard' && <DashboardPreview />}
          {activeTab === 'table' && <TablePreview />}
          {activeTab === 'profile' && <ProfilePreview />}
        </div>
      </div>
    </section>
  );
}
