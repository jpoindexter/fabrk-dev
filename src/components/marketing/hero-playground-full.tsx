/**
 * Hero Playground - Full shadcn-style interactive demo
 * 4-column vertical stacked layout with REAL component examples
 */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Mail,
  Search,
  Download,
  ArrowRight,
  User,
  Calendar,
  DollarSign,
  Settings,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Component Examples Grid - 4 vertical columns with USEFUL interactive components
function ComponentsGrid() {
  const [priceRange, setPriceRange] = useState([400]);
  const [gpuCount, setGpuCount] = useState(8);
  const [tintingEnabled, setTintingEnabled] = useState(true);
  const [selectedSource, setSelectedSource] = useState('social-media');

  return (
    <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* COLUMN 1 - Payment & Forms */}
      <div className="space-y-4">
        <Card>
          <div className="p-4">
            <h3 className="mb-1 text-sm font-semibold">Payment Method</h3>
            <p className={cn('mb-4 text-xs', mode.color.text.muted)}>
              All transactions are secure and encrypted
            </p>

            <div className="space-y-3">
              <div>
                <Label className="mb-1.5 text-xs">Name on Card</Label>
                <Input placeholder="John Doe" className="text-xs" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="mb-1.5 text-xs">Card Number</Label>
                  <Input placeholder="1234 5678 9012" className="text-xs" />
                </div>
                <div>
                  <Label className="mb-1.5 text-xs">CVV</Label>
                  <Input placeholder="123" className="text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="mb-1.5 text-xs">Month</Label>
                  <Select>
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">01</SelectItem>
                      <SelectItem value="02">02</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1.5 text-xs">Year</Label>
                  <Select>
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="same-address" defaultChecked />
                <label htmlFor="same-address" className={cn('text-xs', mode.font)}>
                  Same as shipping address
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 text-xs">&gt; SUBMIT</Button>
                <Button variant="outline" className="flex-1 text-xs">
                  &gt; CANCEL
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* COLUMN 2 - Team & Status */}
      <div className="space-y-4">
        <Card>
          <div className="p-4 text-center">
            <div className="mb-3 flex justify-center">
              <div className="flex -space-x-2">
                {[User, User, User].map((Icon, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border-2',
                      mode.color.border.default,
                      mode.color.bg.muted
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>
            <h3 className="mb-1 text-sm font-semibold">No Team Members</h3>
            <p className={cn('mb-3 text-xs', mode.color.text.muted)}>
              Invite your team to collaborate on this project.
            </p>
            <Button className="w-full text-xs">
              <User className="mr-2 h-4 w-4" />
              &gt; INVITE MEMBERS
            </Button>
          </div>
        </Card>

        <div className="flex gap-2">
          <Badge className="flex-1 justify-center">
            <Download className="mr-1 h-3 w-3" />
            SYNCING
          </Badge>
          <Badge variant="outline" className="flex-1 justify-center">
            UPDATING
          </Badge>
        </div>

        <Card>
          <div className="p-4">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input placeholder="Search..." className="pl-9 text-xs" />
              <span
                className={cn(
                  'absolute top-1/2 right-3 -translate-y-1/2 text-xs',
                  mode.color.text.muted
                )}
              >
                12 results
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="mb-3 text-xs font-semibold">Two-factor authentication</h3>
            <div className="mb-3 flex items-center justify-between">
              <p className={cn('text-xs', mode.color.text.muted)}>
                Verify via email or phone number.
              </p>
              <Button size="sm" className="text-xs">
                &gt; ENABLE
              </Button>
            </div>
            <div className="border-t pt-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-success h-4 w-4" />
                <span className="text-xs">Your profile has been verified.</span>
                <ArrowRight className="ml-auto h-3 w-3" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* COLUMN 3 - Settings & Controls */}
      <div className="space-y-4">
        <Card>
          <div className="p-4">
            <h3 className="mb-1 text-sm font-semibold">Compute Environment</h3>
            <p className={cn('mb-3 text-xs', mode.color.text.muted)}>
              Select the compute environment for your cluster.
            </p>

            <RadioGroup defaultValue="kubernetes">
              <div className="mb-3 space-y-1 rounded-none border p-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="kubernetes" className="text-xs font-semibold">
                    Kubernetes
                  </Label>
                  <RadioGroupItem value="kubernetes" id="kubernetes" />
                </div>
                <p className={cn('text-xs', mode.color.text.muted)}>
                  Run GPU workloads on a K8s configured cluster. This is the default.
                </p>
              </div>

              <div className="space-y-1 rounded-none border p-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="vm" className="text-xs font-semibold">
                    Virtual Machine
                  </Label>
                  <RadioGroupItem value="vm" id="vm" />
                </div>
                <p className={cn('text-xs', mode.color.text.muted)}>
                  Access a VM configured cluster to run workloads. (Coming soon)
                </p>
              </div>
            </RadioGroup>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold">Number of GPUs</h3>
                <p className={cn('text-xs', mode.color.text.muted)}>You can add more later.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setGpuCount(Math.max(1, gpuCount - 1))}
                  className="h-8 w-8 p-0"
                >
                  -
                </Button>
                <span className="w-8 text-center text-sm font-semibold">{gpuCount}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setGpuCount(gpuCount + 1)}
                  className="h-8 w-8 p-0"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold">Wallpaper Tinting</h3>
                <p className={cn('text-xs', mode.color.text.muted)}>
                  Allow the wallpaper to be tinted.
                </p>
              </div>
              <Switch checked={tintingEnabled} onCheckedChange={setTintingEnabled} />
            </div>
          </div>
        </Card>
      </div>

      {/* COLUMN 4 - Actions & Surveys */}
      <div className="space-y-4">
        <Card>
          <div className="p-4">
            <h3 className="mb-3 text-xs font-semibold">Price Range</h3>
            <p className={cn('mb-3 text-xs', mode.color.text.muted)}>
              Set your budget range (${priceRange[0]} - $800).
            </p>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={800}
              min={200}
              step={10}
            />
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="mb-3 flex gap-1">
              <Button size="sm" variant="outline" className="text-xs">
                <Download className="mr-1 h-3 w-3" />
                ARCHIVE
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                REPORT
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                SNOOZE
              </Button>
            </div>
            <div className="rounded-none border p-3">
              <Checkbox id="terms" defaultChecked />
              <label htmlFor="terms" className={cn('ml-2 text-xs', mode.font)}>
                I agree to the terms and conditions
              </label>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="mb-2 text-xs font-semibold">How did you hear about us?</h3>
            <p className={cn('mb-3 text-xs', mode.color.text.muted)}>
              Select the option that best describes how you found us.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedSource === 'social-media' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedSource('social-media')}
              >
                {selectedSource === 'social-media' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                SOCIAL MEDIA
              </Badge>
              <Badge
                variant={selectedSource === 'search' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedSource('search')}
              >
                SEARCH ENGINE
              </Badge>
              <Badge
                variant={selectedSource === 'referral' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedSource('referral')}
              >
                REFERRAL
              </Badge>
              <Badge
                variant={selectedSource === 'other' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedSource('other')}
              >
                OTHER
              </Badge>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4 text-center">
            <div className="mb-3 flex justify-center">
              <Download className="h-8 w-8 animate-spin" />
            </div>
            <h3 className="mb-1 text-sm font-semibold">Processing your request</h3>
            <p className={cn('mb-3 text-xs', mode.color.text.muted)}>
              Please wait while we process your request. Do not refresh the page.
            </p>
            <Button variant="outline" size="sm" className="text-xs">
              &gt; CANCEL
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Dashboard preview - simplified version without all subcomponents
function DashboardPreview() {
  return (
    <div className="space-y-4">
      {/* Metric Cards Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'REVENUE', value: '$45,231', change: '+20.1%' },
          { label: 'USERS', value: '2,350', change: '+12.5%' },
          { label: 'CONVERSIONS', value: '45.2%', change: '+5.3%' },
          { label: 'GROWTH', value: '+12%', change: '+2.1%' },
        ].map((metric, i) => (
          <Card key={i}>
            <div className="p-4">
              <div className={cn('mb-2 text-xs', mode.color.text.muted)}>[{metric.label}]</div>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={cn('text-xs', mode.color.text.success)}>{metric.change}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader code="0x01" title="REVENUE OVERVIEW" />
          <div className="flex h-[200px] items-center justify-center p-4">
            <div className={cn('text-xs', mode.color.text.muted)}>[CHART DATA]</div>
          </div>
        </Card>
        <Card>
          <CardHeader code="0x02" title="RECENT ACTIVITY" />
          <div className="space-y-2 p-4">
            {['New user signup', 'Payment received', 'Project created'].map((activity, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span>{activity}</span>
                <span className={mode.color.text.muted}>{i + 1}h ago</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// Table preview - simplified version
function TablePreview() {
  const users = [
    { name: 'Alex Chen', email: 'alex@example.com', role: 'Admin', status: 'Active' },
    { name: 'Jordan Lee', email: 'jordan@example.com', role: 'User', status: 'Active' },
    { name: 'Sam Wilson', email: 'sam@example.com', role: 'User', status: 'Inactive' },
  ];

  return (
    <Card>
      <CardHeader code="0x00" title="USERS DATABASE" />
      <div className="p-4">
        <div className="mb-4">
          <Input placeholder="Search users..." className={cn(mode.radius, mode.font, 'text-xs')} />
        </div>
        <div className="space-y-1">
          {users.map((user, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center justify-between border-b p-2 text-xs',
                mode.color.border.default
              )}
            >
              <div className="flex-1">
                <div className="font-semibold">{user.name}</div>
                <div className={mode.color.text.muted}>{user.email}</div>
              </div>
              <div className="flex items-center gap-4">
                <span>{user.role}</span>
                <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// Profile preview - simplified version
function ProfilePreview() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader code="0x00" title="PROFILE INFO" />
        <div className="p-4">
          <div className="mb-4 flex items-center gap-4">
            <div
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-full',
                mode.color.bg.accent
              )}
            >
              <User className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Alex Chen</h3>
              <p className={cn('text-xs', mode.color.text.muted)}>@alexchen</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { label: 'PROJECTS', value: '12' },
              { label: 'CONTRIBUTIONS', value: '847' },
              { label: 'FOLLOWERS', value: '234' },
              { label: 'FOLLOWING', value: '89' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-bold">{stat.value}</div>
                <div className={cn('text-xs', mode.color.text.muted)}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader code="0x01" title="RECENT ACTIVITY" />
        <div className="space-y-2 p-4 text-xs">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Pushed 3 commits to fabrk/dashboard</span>
            <span className={mode.color.text.muted}>2h ago</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Commented on issue #142</span>
            <span className={mode.color.text.muted}>5h ago</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Updated profile settings</span>
            <span className={mode.color.text.muted}>1d ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Billing preview - simplified version
function BillingPreview() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader code="0x00" title="CURRENT PLAN" />
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">PROFESSIONAL</h3>
              <p className={cn('text-xs', mode.color.text.muted)}>$29/month</p>
            </div>
            <Badge>ACTIVE</Badge>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Unlimited projects</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>10 team members</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Priority support</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader code="0x01" title="USAGE METRICS" />
          <div className="space-y-3 p-4">
            {[
              { label: 'Users', value: 7, max: 10 },
              { label: 'Storage', value: 45, max: 100 },
              { label: 'API Calls', value: 12500, max: 50000 },
            ].map((metric, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{metric.label}</span>
                  <span className={mode.color.text.muted}>
                    {metric.value}/{metric.max}
                  </span>
                </div>
                <Progress value={(metric.value / metric.max) * 100} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader code="0x02" title="RECENT INVOICES" />
          <div className="space-y-2 p-4 text-xs">
            {['Nov 2024', 'Oct 2024', 'Sep 2024'].map((month, i) => (
              <div key={i} className="flex items-center justify-between">
                <span>{month}</span>
                <span>$29.00</span>
                <Badge variant="outline">PAID</Badge>
              </div>
            ))}
          </div>
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
      <div className="container mx-auto max-w-[1800px] px-6">
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
        <div>
          {activeTab === 'components' && <ComponentsGrid />}
          {activeTab === 'dashboard' && <DashboardPreview />}
          {activeTab === 'table' && <TablePreview />}
          {activeTab === 'profile' && <ProfilePreview />}
          {activeTab === 'billing' && <BillingPreview />}
        </div>
      </div>
    </section>
  );
}
