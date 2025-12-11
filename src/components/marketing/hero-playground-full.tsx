/**
 * Hero Playground - Full shadcn-style interactive demo
 * Shows complete pages with theme switcher
 */
'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  Search,
  Bell,
  Settings,
  ChevronDown,
} from 'lucide-react';

// Tab 1: Components Grid (like shadcn Examples)
function ComponentsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Button Examples */}
      <Card>
        <CardHeader code="0x01" title="BUTTONS" />
        <CardContent className="space-y-3">
          <Button className={cn('w-full text-xs', mode.radius, mode.font)}>
            &gt; PRIMARY_BUTTON
          </Button>
          <Button variant="outline" className={cn('w-full text-xs', mode.radius, mode.font)}>
            &gt; SECONDARY_BUTTON
          </Button>
          <Button variant="ghost" className={cn('w-full text-xs', mode.radius, mode.font)}>
            &gt; GHOST_BUTTON
          </Button>
        </CardContent>
      </Card>

      {/* Input Examples */}
      <Card>
        <CardHeader code="0x02" title="INPUTS" />
        <CardContent className="space-y-3">
          <Input placeholder="Email address" className={cn(mode.radius, mode.font, 'text-xs')} />
          <Input
            type="password"
            placeholder="Password"
            className={cn(mode.radius, mode.font, 'text-xs')}
          />
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search..."
              className={cn('pl-9', mode.radius, mode.font, 'text-xs')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Badge Examples */}
      <Card>
        <CardHeader code="0x03" title="BADGES" />
        <CardContent className="flex flex-wrap gap-2">
          <Badge className={cn(mode.radius, mode.font, 'text-xs')}>DEFAULT</Badge>
          <Badge variant="secondary" className={cn(mode.radius, mode.font, 'text-xs')}>
            SECONDARY
          </Badge>
          <Badge variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
            OUTLINE
          </Badge>
          <Badge variant="destructive" className={cn(mode.radius, mode.font, 'text-xs')}>
            ERROR
          </Badge>
        </CardContent>
      </Card>

      {/* Metric Card Example */}
      <Card>
        <CardHeader code="0x04" title="METRIC_CARD" />
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={cn('text-xs', mode.color.text.muted, mode.font)}>REVENUE</span>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </div>
          <div className={cn('text-2xl font-bold', mode.font)}>$45,231</div>
          <div className={cn('text-xs', mode.color.text.success, mode.font)}>
            +20.1% from last month
          </div>
        </CardContent>
      </Card>

      {/* Alert Example */}
      <Card>
        <CardHeader code="0x05" title="ALERTS" />
        <CardContent className="space-y-3">
          <div className={cn('border-accent border-l-2 py-2 pl-3 text-xs', mode.font)}>
            <div className={cn('font-semibold', mode.color.text.accent)}>INFO</div>
            <div className={mode.color.text.muted}>This is an info message</div>
          </div>
          <div className={cn('border-success border-l-2 py-2 pl-3 text-xs', mode.font)}>
            <div className={cn('font-semibold', mode.color.text.success)}>SUCCESS</div>
            <div className={mode.color.text.muted}>Operation completed</div>
          </div>
        </CardContent>
      </Card>

      {/* Form Example */}
      <Card>
        <CardHeader code="0x06" title="FORM_CONTROLS" />
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label className={cn(mode.font, 'text-xs')}>USERNAME</Label>
            <Input placeholder="Enter username" className={cn(mode.radius, mode.font, 'text-xs')} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="check1" className="h-4 w-4" />
            <label htmlFor="check1" className={cn('text-xs', mode.font)}>
              Remember me
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Tab 2: Full Dashboard (mini version)
function DashboardPreview() {
  const metrics = [
    { label: 'REVENUE', value: '$45,231', change: '+20.1%', icon: DollarSign },
    { label: 'USERS', value: '2,350', change: '+15.3%', icon: Users },
    { label: 'ACTIVE', value: '1,234', change: '+8.7%', icon: Activity },
    { label: 'GROWTH', value: '12.5%', change: '+4.2%', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={cn('text-2xl font-semibold', mode.font)}>Analytics Dashboard</h2>
          <p className={cn('text-xs', mode.color.text.muted, mode.font)}>
            Track revenue, users, and growth metrics
          </p>
        </div>
        <Button className={cn(mode.radius, mode.font, 'text-xs')}>&gt; EXPORT_DATA</Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className={cn('text-xs', mode.color.text.muted, mode.font)}>
                  {metric.label}
                </span>
                <metric.icon className="text-muted-foreground h-4 w-4" />
              </div>
              <div className={cn('text-2xl font-bold', mode.font)}>{metric.value}</div>
              <div className={cn('mt-1 text-xs', mode.color.text.success, mode.font)}>
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader code="0x10" title="REVENUE_CHART" />
        <CardContent>
          <div
            className={cn(
              'flex h-64 items-center justify-center',
              mode.color.text.muted,
              mode.font
            )}
          >
            [CHART_VISUALIZATION_HERE]
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Tab 3: Table View
function TablePreview() {
  const users = [
    { id: 'USR-001', name: 'John Doe', email: 'john@example.com', status: 'ACTIVE' },
    { id: 'USR-002', name: 'Jane Smith', email: 'jane@example.com', status: 'ACTIVE' },
    { id: 'USR-003', name: 'Bob Johnson', email: 'bob@example.com', status: 'PENDING' },
    { id: 'USR-004', name: 'Alice Williams', email: 'alice@example.com', status: 'ACTIVE' },
  ];

  return (
    <Card>
      <CardHeader code="0x20" title="USER_MANAGEMENT" />
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-border border-b">
              <tr>
                <th className={cn('p-3 text-left text-xs font-semibold', mode.font)}>ID</th>
                <th className={cn('p-3 text-left text-xs font-semibold', mode.font)}>NAME</th>
                <th className={cn('p-3 text-left text-xs font-semibold', mode.font)}>EMAIL</th>
                <th className={cn('p-3 text-left text-xs font-semibold', mode.font)}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-border border-b last:border-0">
                  <td className={cn('p-3 text-xs', mode.font, mode.color.text.muted)}>{user.id}</td>
                  <td className={cn('p-3 text-xs', mode.font)}>{user.name}</td>
                  <td className={cn('p-3 text-xs', mode.font, mode.color.text.muted)}>
                    {user.email}
                  </td>
                  <td className="p-3">
                    <Badge
                      variant={user.status === 'ACTIVE' ? 'default' : 'secondary'}
                      className={cn(mode.radius, mode.font, 'text-xs')}
                    >
                      {user.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// Tab 4: Profile Page
function ProfilePreview() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader code="0x30" title="PROFILE_SETTINGS" />
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={cn(mode.font, 'text-xs')}>FIRST_NAME</Label>
              <Input defaultValue="John" className={cn(mode.radius, mode.font, 'text-xs')} />
            </div>
            <div className="space-y-2">
              <Label className={cn(mode.font, 'text-xs')}>LAST_NAME</Label>
              <Input defaultValue="Doe" className={cn(mode.radius, mode.font, 'text-xs')} />
            </div>
          </div>
          <div className="space-y-2">
            <Label className={cn(mode.font, 'text-xs')}>EMAIL</Label>
            <Input
              defaultValue="john.doe@example.com"
              type="email"
              className={cn(mode.radius, mode.font, 'text-xs')}
            />
          </div>
          <div className="space-y-2">
            <Label className={cn(mode.font, 'text-xs')}>BIO</Label>
            <textarea
              className={cn(
                'border-border bg-background w-full border p-3 text-xs',
                mode.radius,
                mode.font
              )}
              rows={4}
              placeholder="Tell us about yourself"
            />
          </div>
          <div className="flex gap-3">
            <Button className={cn(mode.radius, mode.font, 'text-xs')}>&gt; SAVE_CHANGES</Button>
            <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
              &gt; CANCEL
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Tab 5: Billing Dashboard
function BillingPreview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className={cn('mb-2 text-xs', mode.color.text.muted, mode.font)}>CURRENT_PLAN</div>
            <div className={cn('text-2xl font-bold', mode.font)}>Pro</div>
            <div className={cn('mt-1 text-xs', mode.color.text.muted, mode.font)}>$49/month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className={cn('mb-2 text-xs', mode.color.text.muted, mode.font)}>NEXT_BILLING</div>
            <div className={cn('text-2xl font-bold', mode.font)}>Jan 15</div>
            <div className={cn('mt-1 text-xs', mode.color.text.muted, mode.font)}>2026</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className={cn('mb-2 text-xs', mode.color.text.muted, mode.font)}>STATUS</div>
            <div className={cn('text-2xl font-bold', mode.color.text.success, mode.font)}>
              ACTIVE
            </div>
            <div className={cn('mt-1 text-xs', mode.color.text.muted, mode.font)}>
              All systems go
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader code="0x40" title="RECENT_INVOICES" />
        <CardContent className="space-y-3 p-4">
          {['Invoice #1234 - $49.00', 'Invoice #1233 - $49.00', 'Invoice #1232 - $49.00'].map(
            (invoice, i) => (
              <div
                key={i}
                className="border-accent flex items-center justify-between border-l-2 py-2 pl-3"
              >
                <span className={cn('text-xs', mode.font)}>{invoice}</span>
                <Button variant="ghost" size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>
                  &gt; DOWNLOAD
                </Button>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function HeroPlaygroundFull() {
  const [activeTab, setActiveTab] = useState('examples');

  const tabs = [
    { id: 'examples', label: 'COMPONENTS' },
    { id: 'dashboard', label: 'DASHBOARD' },
    { id: 'table', label: 'TABLES' },
    { id: 'profile', label: 'PROFILE' },
    { id: 'billing', label: 'BILLING' },
  ];

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

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'examples' && <ComponentsGrid />}
          {activeTab === 'dashboard' && <DashboardPreview />}
          {activeTab === 'table' && <TablePreview />}
          {activeTab === 'profile' && <ProfilePreview />}
          {activeTab === 'billing' && <BillingPreview />}
        </div>
      </Container>
    </section>
  );
}
