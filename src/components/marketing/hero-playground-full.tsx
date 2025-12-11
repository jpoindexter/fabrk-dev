/**
 * Hero Playground - Full shadcn-style interactive demo
 * 4-column vertical stacked layout with REAL component examples
 */
'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
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

// Component Examples Grid - 4 vertical columns with REAL components from /docs/components
function ComponentsGrid() {
  const [sliderValue, setSliderValue] = useState([50]);
  const [progress] = useState(60);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* COLUMN 1 - Buttons & Actions */}
      <div className="space-y-4">
        <div>
          <h3 className={cn('mb-3 text-xs font-semibold', mode.font, mode.color.text.muted)}>
            [BUTTONS]
          </h3>
          <div className="space-y-2">
            <Button className="w-full">&gt; PRIMARY</Button>
            <Button variant="outline" className="w-full">
              &gt; SECONDARY
            </Button>
            <Button variant="ghost" className="w-full">
              &gt; GHOST
            </Button>
            <Button variant="destructive" className="w-full">
              &gt; DELETE
            </Button>
            <Button variant="link" className="w-full">
              &gt; LINK
            </Button>
            <Button className="w-full">
              <Mail className="mr-2 h-4 w-4" /> &gt; WITH ICON
            </Button>
            <Button size="sm" className="w-full">
              &gt; SMALL
            </Button>
            <Button size="lg" className="w-full">
              &gt; LARGE
            </Button>
          </div>
        </div>

        <div>
          <h3 className={cn('mb-3 text-xs font-semibold', mode.font, mode.color.text.muted)}>
            [BADGES]
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge>DEFAULT</Badge>
            <Badge variant="secondary">SECONDARY</Badge>
            <Badge variant="outline">OUTLINE</Badge>
            <Badge variant="destructive">ERROR</Badge>
            <Badge>
              <CheckCircle2 className="mr-1 h-3 w-3" /> SUCCESS
            </Badge>
          </div>
        </div>
      </div>

      {/* COLUMN 2 - Inputs & Forms */}
      <div className="space-y-4">
        <div>
          <h3 className={cn('mb-3 text-xs font-semibold', mode.font, mode.color.text.muted)}>
            [INPUTS]
          </h3>
          <div className="space-y-3">
            <div>
              <Label className="mb-1.5 text-xs">Email</Label>
              <Input type="email" placeholder="email@example.com" />
            </div>
            <div>
              <Label className="mb-1.5 text-xs">Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input placeholder="Search..." className="pl-9" />
            </div>
            <div className="relative">
              <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input placeholder="Username" className="pl-9" />
            </div>
          </div>
        </div>

        <div>
          <h3 className={cn('mb-3 text-xs font-semibold', mode.font, mode.color.text.muted)}>
            [SELECT]
          </h3>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* COLUMN 3 - Toggles & Sliders */}
      <div className="space-y-4">
        <div>
          <h3 className={cn('mb-3 text-xs font-semibold', mode.font, mode.color.text.muted)}>
            [CHECKBOXES]
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="check1" defaultChecked />
              <label htmlFor="check1" className={cn('text-sm', mode.font)}>
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="check2" />
              <label htmlFor="check2" className={cn('text-sm', mode.font)}>
                Subscribe to newsletter
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="check3" disabled />
              <label htmlFor="check3" className={cn('text-sm', mode.font)}>
                Disabled option
              </label>
            </div>
          </div>
        </div>

        <div>
          <h3 className={cn('mb-3 text-xs font-semibold', mode.font, mode.color.text.muted)}>
            [RADIO]
          </h3>
          <RadioGroup defaultValue="option-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-1" id="option-1" />
              <Label htmlFor="option-1" className="text-sm">
                Option 1
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-2" id="option-2" />
              <Label htmlFor="option-2" className="text-sm">
                Option 2
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-3" id="option-3" />
              <Label htmlFor="option-3" className="text-sm">
                Option 3
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className={cn('mb-3 text-xs font-semibold', mode.font, mode.color.text.muted)}>
            [SWITCHES]
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="switch1" className="text-sm">
                Enable notifications
              </Label>
              <Switch id="switch1" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="switch2" className="text-sm">
                Dark mode
              </Label>
              <Switch id="switch2" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="switch3" className="text-sm">
                Disabled
              </Label>
              <Switch id="switch3" disabled />
            </div>
          </div>
        </div>
      </div>

      {/* COLUMN 4 - Sliders & Progress */}
      <div className="space-y-4">
        <div>
          <h3 className={cn('mb-3 text-xs font-semibold', mode.font, mode.color.text.muted)}>
            [SLIDER]
          </h3>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span>Volume</span>
                <span className={mode.color.text.muted}>{sliderValue[0]}%</span>
              </div>
              <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span>Price Range</span>
                <span className={mode.color.text.muted}>$200 - $800</span>
              </div>
              <Slider defaultValue={[500]} max={1000} step={10} />
            </div>
          </div>
        </div>

        <div>
          <h3 className={cn('mb-3 text-xs font-semibold', mode.font, mode.color.text.muted)}>
            [PROGRESS]
          </h3>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span>Uploading...</span>
                <span className={mode.color.text.muted}>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span>Processing</span>
                <span className={mode.color.text.muted}>75%</span>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span>Complete</span>
                <span className={mode.color.text.success}>100%</span>
              </div>
              <Progress value={100} />
            </div>
          </div>
        </div>

        <div>
          <h3 className={cn('mb-3 text-xs font-semibold', mode.font, mode.color.text.muted)}>
            [ALERTS]
          </h3>
          <div className="space-y-3">
            <div className="border-primary/50 bg-primary/10 flex items-start gap-2 rounded-none border p-3">
              <AlertCircle className="text-primary mt-0.5 h-4 w-4" />
              <div className="space-y-1">
                <p className={cn('text-xs font-semibold', mode.font)}>Info</p>
                <p className={cn('text-xs', mode.color.text.muted)}>This is an info message</p>
              </div>
            </div>
            <div className="border-destructive/50 bg-destructive/10 flex items-start gap-2 rounded-none border p-3">
              <AlertCircle className="text-destructive mt-0.5 h-4 w-4" />
              <div className="space-y-1">
                <p className={cn('text-xs font-semibold', mode.font)}>Error</p>
                <p className={cn('text-xs', mode.color.text.muted)}>Something went wrong</p>
              </div>
            </div>
          </div>
        </div>
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
        <div>
          {activeTab === 'components' && <ComponentsGrid />}
          {activeTab === 'dashboard' && <DashboardPreview />}
          {activeTab === 'table' && <TablePreview />}
          {activeTab === 'profile' && <ProfilePreview />}
          {activeTab === 'billing' && <BillingPreview />}
        </div>
      </Container>
    </section>
  );
}
