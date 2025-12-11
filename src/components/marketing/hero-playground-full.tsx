/**
 * Hero Playground - Full shadcn-style interactive demo
 * 4-column vertical stacked layout
 */
'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Users, Search, Download } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Component Examples Grid - 4 vertical columns with stacked components (shadcn style)
function ComponentsGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* COLUMN 1 - Payment Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader code="0x01" title="PAYMENT_METHOD" />
          <CardContent className="space-y-4">
            <p className={cn('text-xs', mode.color.text.muted)}>
              All transactions are secure and encrypted
            </p>

            <div className="space-y-2">
              <Label className={cn(mode.font, 'text-xs')}>NAME_ON_CARD</Label>
              <Input placeholder="John Doe" className={cn(mode.radius, mode.font, 'text-xs')} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label className={cn(mode.font, 'text-xs')}>CARD_NUMBER</Label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  className={cn(mode.radius, mode.font, 'text-xs')}
                />
              </div>
              <div className="space-y-2">
                <Label className={cn(mode.font, 'text-xs')}>MONTH</Label>
                <Input placeholder="MM" className={cn(mode.radius, mode.font, 'text-xs')} />
              </div>
              <div className="space-y-2">
                <Label className={cn(mode.font, 'text-xs')}>YEAR</Label>
                <Input placeholder="YYYY" className={cn(mode.radius, mode.font, 'text-xs')} />
              </div>
            </div>

            <div className="space-y-2">
              <Label className={cn(mode.font, 'text-xs')}>CVV</Label>
              <Input placeholder="123" className={cn(mode.radius, mode.font, 'text-xs')} />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="billing" className="h-4 w-4" />
              <label htmlFor="billing" className={cn('text-xs', mode.font)}>
                Same as shipping address
              </label>
            </div>

            <div className="flex gap-2">
              <Button className={cn('flex-1 text-xs', mode.radius, mode.font)}>&gt; SUBMIT</Button>
              <Button variant="outline" className={cn('flex-1 text-xs', mode.radius, mode.font)}>
                &gt; CANCEL
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* COLUMN 2 - Mixed Components */}
      <div className="space-y-6">
        <Card>
          <CardHeader code="0x02" title="TEAM_MEMBERS" />
          <CardContent className="space-y-4 text-center">
            <div className="flex justify-center gap-2">
              <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div>
              <div className={cn('font-semibold', mode.font)}>No Team Members</div>
              <p className={cn('text-xs', mode.color.text.muted)}>
                Invite your team to collaborate on this project.
              </p>
            </div>
            <Button className={cn('w-full text-xs', mode.radius, mode.font)}>
              &gt; INVITE_MEMBERS
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x03" title="STATUS_BADGES" />
          <CardContent className="flex flex-wrap gap-2">
            <Badge className={cn(mode.radius, mode.font, 'text-xs')}>SYNCING</Badge>
            <Badge variant="secondary" className={cn(mode.radius, mode.font, 'text-xs')}>
              UPDATING
            </Badge>
            <Badge variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
              LOADING
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x04" title="PRICE_RANGE" />
          <CardContent className="space-y-3">
            <p className={cn('text-xs', mode.color.text.muted)}>
              Set your budget range ($200 - 800).
            </p>
            <input type="range" className="w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x05" title="SEARCH" />
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search..."
                className={cn('pl-9 text-xs', mode.radius, mode.font)}
              />
            </div>
            <span className={cn('text-xs', mode.color.text.muted)}>12 results</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x06" title="URL_INPUT" />
          <CardContent>
            <Input
              placeholder="https:// example.com"
              className={cn(mode.radius, mode.font, 'text-xs')}
            />
          </CardContent>
        </Card>
      </div>

      {/* COLUMN 3 - Auth & Settings */}
      <div className="space-y-6">
        <Card>
          <CardHeader code="0x07" title="TWO_FACTOR_AUTH" />
          <CardContent className="space-y-3">
            <p className={cn('text-xs', mode.color.text.muted)}>
              Verify via email or phone number.
            </p>
            <Button className={cn('w-full text-xs', mode.radius, mode.font)}>&gt; ENABLE</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x08" title="PROFILE_STATUS" />
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={cn('text-xs', mode.font)}>Your profile has been verified.</span>
              <span className={cn('text-xs', mode.color.text.success)}>&gt;</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x09" title="COMPUTE_ENV" />
          <CardContent className="space-y-3">
            <p className={cn('text-xs', mode.color.text.muted)}>
              Select the compute environment for your cluster.
            </p>
            <div className="space-y-2">
              <div className="border-border rounded-none border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={cn('text-xs font-semibold', mode.font)}>Kubernetes</div>
                    <div className={cn('text-xs', mode.color.text.muted)}>
                      Run GPU workloads on a K8s configured cluster.
                    </div>
                  </div>
                  <div className="bg-primary h-2 w-2 rounded-full" />
                </div>
              </div>
              <div className="border-border rounded-none border p-3">
                <div className={cn('text-xs font-semibold', mode.font)}>Virtual Machine</div>
                <div className={cn('text-xs', mode.color.text.muted)}>
                  Access a VM configured cluster. (Coming soon)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x0A" title="GPU_COUNT" />
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={cn('text-xs', mode.font)}>Number of GPUs</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(mode.radius, mode.font, 'h-6 w-6 p-0')}
                >
                  -
                </Button>
                <span className={cn('text-xs', mode.font)}>8</span>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(mode.radius, mode.font, 'h-6 w-6 p-0')}
                >
                  +
                </Button>
              </div>
            </div>
            <p className={cn('text-xs', mode.color.text.muted)}>You can add more later.</p>
          </CardContent>
        </Card>
      </div>

      {/* COLUMN 4 - Actions & Feedback */}
      <div className="space-y-6">
        <Card>
          <CardHeader code="0x0B" title="CONTEXT_MENU" />
          <CardContent className="space-y-2">
            <Button
              size="sm"
              variant="ghost"
              className={cn('w-full justify-start text-xs', mode.radius, mode.font)}
            >
              <Download className="mr-2 h-3 w-3" />
              Add context
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x0C" title="NAVIGATION" />
          <CardContent className="flex gap-2">
            <Button size="sm" variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
              Archive
            </Button>
            <Button size="sm" variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
              Report
            </Button>
            <Button size="sm" variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
              Snooze
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x0D" title="AGREEMENT" />
          <CardContent>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="h-4 w-4" />
              <label htmlFor="terms" className={cn('text-xs', mode.font)}>
                I agree to the terms and conditions
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x0E" title="PAGINATION" />
          <CardContent className="flex items-center justify-between">
            <Button
              size="sm"
              variant="outline"
              className={cn(mode.radius, mode.font, 'h-8 w-8 p-0')}
            >
              &lt;
            </Button>
            <div className="flex gap-1">
              <Button size="sm" className={cn(mode.radius, mode.font, 'h-8 w-8 p-0')}>
                1
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={cn(mode.radius, mode.font, 'h-8 w-8 p-0')}
              >
                2
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={cn(mode.radius, mode.font, 'h-8 w-8 p-0')}
              >
                3
              </Button>
            </div>
            <Button
              size="sm"
              variant="outline"
              className={cn(mode.radius, mode.font, 'h-8 w-8 p-0')}
            >
              &gt;
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x0F" title="SURVEY" />
          <CardContent className="space-y-3">
            <p className={cn('text-xs', mode.font)}>How did you hear about us?</p>
            <div className="space-y-2">
              <Button
                size="sm"
                variant="outline"
                className={cn('w-full justify-start text-xs', mode.radius, mode.font)}
              >
                Social Media
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={cn('w-full justify-start text-xs', mode.radius, mode.font)}
              >
                Search Engine
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={cn('w-full justify-start text-xs', mode.radius, mode.font)}
              >
                Referral
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x10" title="LOADING" />
          <CardContent className="py-8 text-center">
            <div className={cn('text-xs', mode.color.text.muted, mode.font)}>
              Processing your request...
            </div>
          </CardContent>
        </Card>
      </div>
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
        <div className="min-h-[600px]">
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
