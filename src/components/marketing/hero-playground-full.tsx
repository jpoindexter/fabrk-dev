/**
 * Hero Playground - Full shadcn-style interactive demo
 * Shows actual component demos in grid layout
 */
'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  Search,
  Download,
  Mail,
  Settings,
  Bell,
  Calendar,
} from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Component Examples Grid
function ComponentsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Button Examples */}
      <Card>
        <CardHeader code="0x01" title="BUTTONS" />
        <CardContent className="space-y-3">
          <Button className={cn('w-full text-xs', mode.radius, mode.font)}>&gt; PRIMARY</Button>
          <Button variant="outline" className={cn('w-full text-xs', mode.radius, mode.font)}>
            &gt; SECONDARY
          </Button>
          <Button variant="ghost" className={cn('w-full text-xs', mode.radius, mode.font)}>
            &gt; GHOST
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
            <Input placeholder="Search..." className={cn('pl-9 text-xs', mode.radius, mode.font)} />
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

      {/* Icon Grid */}
      <Card>
        <CardHeader code="0x05" title="ICONS" />
        <CardContent className="grid grid-cols-4 gap-3">
          <div className="flex flex-col items-center gap-1">
            <DollarSign className="h-5 w-5" />
            <span className={cn('text-xs', mode.font, mode.color.text.muted)}>$</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Users className="h-5 w-5" />
            <span className={cn('text-xs', mode.font, mode.color.text.muted)}>USR</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Activity className="h-5 w-5" />
            <span className={cn('text-xs', mode.font, mode.color.text.muted)}>ACT</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <TrendingUp className="h-5 w-5" />
            <span className={cn('text-xs', mode.font, mode.color.text.muted)}>UP</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Mail className="h-5 w-5" />
            <span className={cn('text-xs', mode.font, mode.color.text.muted)}>MAIL</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Settings className="h-5 w-5" />
            <span className={cn('text-xs', mode.font, mode.color.text.muted)}>SET</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Bell className="h-5 w-5" />
            <span className={cn('text-xs', mode.font, mode.color.text.muted)}>NOT</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Calendar className="h-5 w-5" />
            <span className={cn('text-xs', mode.font, mode.color.text.muted)}>CAL</span>
          </div>
        </CardContent>
      </Card>

      {/* Form Example */}
      <Card>
        <CardHeader code="0x06" title="FORMS" />
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

      {/* Alert Example */}
      <Card>
        <CardHeader code="0x07" title="ALERTS" />
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

      {/* Status Card */}
      <Card>
        <CardHeader code="0x08" title="STATUS" />
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={cn('text-xs', mode.font)}>System Status</span>
            <Badge className={cn(mode.radius, mode.font, 'text-xs')}>ONLINE</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className={cn('text-xs', mode.font)}>API Status</span>
            <Badge variant="secondary" className={cn(mode.radius, mode.font, 'text-xs')}>
              DEGRADED
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className={cn('text-xs', mode.font)}>Database</span>
            <Badge variant="destructive" className={cn(mode.radius, mode.font, 'text-xs')}>
              OFFLINE
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Action Card */}
      <Card>
        <CardHeader code="0x09" title="ACTIONS" />
        <CardContent className="space-y-2">
          <Button
            size="sm"
            variant="ghost"
            className={cn('w-full justify-start text-xs', mode.radius, mode.font)}
          >
            <Download className="mr-2 h-3 w-3" />
            &gt; EXPORT_DATA
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={cn('w-full justify-start text-xs', mode.radius, mode.font)}
          >
            <Mail className="mr-2 h-3 w-3" />
            &gt; SEND_EMAIL
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={cn('w-full justify-start text-xs', mode.radius, mode.font)}
          >
            <Settings className="mr-2 h-3 w-3" />
            &gt; SETTINGS
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function HeroPlaygroundFull() {
  const [activeTab, setActiveTab] = useState('components');

  const tabs = [
    { id: 'components', label: 'COMPONENTS' },
    { id: 'dashboard', label: 'DASHBOARD' },
    { id: 'table', label: 'TABLE' },
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
        <div className="border-border bg-background min-h-[600px] rounded-none border p-6">
          {activeTab === 'components' && <ComponentsGrid />}
          {activeTab === 'dashboard' && (
            <div
              className={cn(
                'flex h-[600px] items-center justify-center',
                mode.font,
                mode.color.text.muted
              )}
            >
              [LOADING DASHBOARD...]
            </div>
          )}
          {activeTab === 'table' && (
            <div
              className={cn(
                'flex h-[600px] items-center justify-center',
                mode.font,
                mode.color.text.muted
              )}
            >
              [LOADING TABLE...]
            </div>
          )}
          {activeTab === 'profile' && (
            <div
              className={cn(
                'flex h-[600px] items-center justify-center',
                mode.font,
                mode.color.text.muted
              )}
            >
              [LOADING PROFILE...]
            </div>
          )}
          {activeTab === 'billing' && (
            <div
              className={cn(
                'flex h-[600px] items-center justify-center',
                mode.font,
                mode.color.text.muted
              )}
            >
              [LOADING BILLING...]
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
