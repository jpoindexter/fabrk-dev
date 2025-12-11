/**
 * Hero Playground - Full shadcn-style interactive demo
 * 4-column vertical stacked layout with REAL component examples
 */
'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  UserPlus,
  Calendar,
  DollarSign,
  Settings,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  MoreHorizontal,
  ChevronDown,
  Edit,
  Trash2,
  Copy,
  Upload,
  FileText,
  Clock,
  TrendingUp,
  Activity,
  Home,
  ChevronRight,
  Users,
  Filter,
  X,
  RotateCw,
  Lock,
} from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Analytics Dashboard components
import { MetricCards } from '@/app/(marketing)/library/analytics-dashboard/components/metric-cards';
import { RevenueChart } from '@/app/(marketing)/library/analytics-dashboard/components/revenue-chart';
import { ActivityFeed } from '@/app/(marketing)/library/analytics-dashboard/components/activity-feed';
import { AnalyticsTabs } from '@/app/(marketing)/library/analytics-dashboard/components/analytics-tabs';
import {
  metrics,
  revenueData,
  activityData,
  pageData,
  trafficSources,
  deviceBreakdown,
} from '@/app/(marketing)/library/analytics-dashboard/components/mock-data';

// User Management components
import { columns } from '@/app/(marketing)/library/user-management/components/user-table-columns';
import { mockUsers } from '@/app/(marketing)/library/user-management/components/types';
import { DataTable as UserDataTable } from '@/app/(marketing)/library/user-management/components/data-table';
import { PaginationControls } from '@/app/(marketing)/library/user-management/components/pagination-controls';
import { StatsCards } from '@/app/(marketing)/library/user-management/components/stats-cards';
import { TableToolbar } from '@/app/(marketing)/library/user-management/components/table-toolbar';

// Browser Frame Component
function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-border bg-card overflow-hidden border">
      {/* Browser Chrome */}
      <div className="border-border bg-muted/50 flex items-center gap-3 border-b px-4 py-3">
        {/* Window Controls */}
        <div className="flex gap-2">
          <div className="bg-destructive/60 h-3 w-3 rounded-full" />
          <div className="bg-warning/60 h-3 w-3 rounded-full" />
          <div className="bg-success/60 h-3 w-3 rounded-full" />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button className="hover:bg-muted rounded-none p-1" aria-label="Go back">
            <ChevronRight className="text-muted-foreground h-4 w-4 rotate-180" />
          </button>
          <button className="hover:bg-muted rounded-none p-1" aria-label="Go forward">
            <ChevronRight className="text-muted-foreground h-4 w-4" />
          </button>
          <button className="hover:bg-muted rounded-none p-1" aria-label="Refresh">
            <RotateCw className="text-muted-foreground h-4 w-4" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="border-border bg-background flex flex-1 items-center gap-2 border px-4 py-2">
          <Lock className="text-success h-4 w-4" />
          <span className="text-foreground flex-1 text-sm">https://app.fabrk.dev/dashboard</span>
        </div>

        {/* Menu Button */}
        <button className="hover:bg-muted rounded-none p-1" aria-label="Menu">
          <MoreHorizontal className="text-muted-foreground h-4 w-4" />
        </button>
      </div>
      {/* Browser Content */}
      <div className="flex min-h-[600px]">{children}</div>
    </div>
  );
}

// Left Navigation Component
function LeftNavigation({ activeSection }: { activeSection: string }) {
  const navSections = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Activity },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'users', label: 'Users', icon: Users },
      ],
    },
    {
      title: 'Components',
      items: [
        { id: 'forms', label: 'Forms', icon: FileText },
        { id: 'tables', label: 'Tables', icon: Activity },
        { id: 'cards', label: 'Cards', icon: Activity },
      ],
    },
  ];

  return (
    <div className="border-border bg-muted/20 w-64 border-r p-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Activity className="h-4 w-4" />
          FABRK APP
        </div>
      </div>

      {navSections.map((section) => (
        <div key={section.title} className="mb-6">
          <div className="text-muted-foreground mb-2 text-xs font-semibold">
            [{section.title.toUpperCase()}]
          </div>
          <div className="space-y-1">
            {section.items.map((item) => (
              <button
                key={item.id}
                className={cn(
                  'flex w-full items-center gap-2 rounded-none px-3 py-2 text-xs transition-colors',
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Component Examples Grid - 25+ diverse component types across 4 columns
function ComponentsGrid() {
  const [priceRange, setPriceRange] = useState([400]);
  const [switchEnabled, setSwitchEnabled] = useState(true);

  return (
    <div className="grid items-start gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {/* COLUMN 1 - Alerts, Tabs, Accordion, File Upload, Search */}
      <div className="space-y-4">
        {/* Alerts - NO CARD, direct background */}
        <Alert className="border-l-primary border-l-4">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-xs font-semibold">[INFO]</AlertTitle>
          <AlertDescription className="text-xs">New features available in v2.0</AlertDescription>
        </Alert>

        <Alert variant="destructive" className="border-l-destructive border-l-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="text-xs font-semibold">[ERROR]</AlertTitle>
          <AlertDescription className="text-xs">Failed to connect to server</AlertDescription>
        </Alert>

        {/* Tabs */}
        <Card>
          <div className="p-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="text-xs">
                  OVERVIEW
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs">
                  ANALYTICS
                </TabsTrigger>
                <TabsTrigger value="reports" className="text-xs">
                  REPORTS
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-3 text-xs">
                <p>Performance metrics and key insights.</p>
              </TabsContent>
              <TabsContent value="analytics" className="mt-3 text-xs">
                <p>Detailed analytics data and trends.</p>
              </TabsContent>
              <TabsContent value="reports" className="mt-3 text-xs">
                <p>Generated reports and exports.</p>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        {/* File Upload - NO CARD, just border */}
        <div className="border-border bg-muted/20 flex flex-col items-center justify-center border-2 border-dashed p-8">
          <Upload className="text-muted-foreground mb-3 h-12 w-12" />
          <p className="mb-1 text-xs font-semibold">[DROP FILES HERE]</p>
          <p className="text-muted-foreground text-xs">or click to browse</p>
        </div>

        {/* Accordion */}
        <Card>
          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xs">Getting Started</AccordionTrigger>
                <AccordionContent className="text-xs">
                  Quick start guide for new users.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xs">API Reference</AccordionTrigger>
                <AccordionContent className="text-xs">Complete API documentation.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>

        {/* Search with Results */}
        <Card>
          <div className="p-4">
            <div className="relative mb-3">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input placeholder="Search..." className="pl-9 text-xs" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <FileText className="text-muted-foreground h-4 w-4" />
                <span>Documentation.pdf</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <FileText className="text-muted-foreground h-4 w-4" />
                <span>API-Guide.md</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* COLUMN 2 - Dropdown, Skeletons, Progress, Breadcrumbs, Badges, Empty State, Activity */}
      <div className="space-y-4">
        {/* Dropdown Menu */}
        <Card>
          <div className="p-4">
            <h3 className="mb-3 text-xs font-semibold">[DROPDOWN MENU]</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full text-xs">
                  <MoreHorizontal className="mr-2 h-4 w-4" />
                  &gt; ACTIONS
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs">
                  <Edit className="mr-2 h-3 w-3" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs">
                  <Copy className="mr-2 h-3 w-3" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive text-xs">
                  <Trash2 className="mr-2 h-3 w-3" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>

        {/* Loading Skeletons - Tighter spacing */}
        <div className="border-border space-y-3 border p-4">
          <h3 className="text-xs font-semibold">[LOADING...]</h3>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Progress Bars */}
        <Card>
          <div className="p-4">
            <h3 className="mb-3 text-xs font-semibold">[PROGRESS]</h3>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Upload Progress</span>
                  <span className="text-muted-foreground">75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Storage Used</span>
                  <span className="text-muted-foreground">45%</span>
                </div>
                <Progress value={45} />
              </div>
            </div>
          </div>
        </Card>

        {/* Breadcrumbs - Inline, no card */}
        <div className="border-l-primary bg-muted/20 flex items-center gap-1 border-l-2 p-3 text-xs">
          <Home className="h-3 w-3" />
          <ChevronRight className="text-muted-foreground h-3 w-3" />
          <span className="text-muted-foreground">Projects</span>
          <ChevronRight className="text-muted-foreground h-3 w-3" />
          <span className="font-medium">Dashboard</span>
        </div>

        {/* Badge Variations - Compact, no card */}
        <div className="border-border bg-muted/30 space-y-2 border p-3">
          <h3 className="text-xs font-semibold">[BADGES]</h3>
          <div className="flex flex-wrap gap-2">
            <Badge>DEFAULT</Badge>
            <Badge variant="secondary">SECONDARY</Badge>
            <Badge variant="outline">OUTLINE</Badge>
            <Badge variant="destructive">ERROR</Badge>
          </div>
        </div>

        {/* Empty State - Minimal, no card */}
        <div className="border-border border border-dashed p-8 text-center">
          <FileText className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
          <h3 className="mb-1 text-xs font-semibold">[NO DATA]</h3>
          <p className="text-muted-foreground text-xs">No items found</p>
        </div>
      </div>

      {/* COLUMN 3 - Radio Groups, Switches, Mini Table, Filter Chips, Date/Time */}
      <div className="space-y-4">
        {/* Radio Group - Border only, no card */}
        <div className="border-primary/30 bg-primary/5 border-2 p-4">
          <h3 className="text-primary mb-3 text-xs font-semibold">[RADIO GROUP]</h3>
          <RadioGroup defaultValue="option-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-1" id="option-1" />
              <Label htmlFor="option-1" className="text-xs">
                Option 1
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-2" id="option-2" />
              <Label htmlFor="option-2" className="text-xs">
                Option 2
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Switches - Gradient background */}
        <div className="from-secondary/20 to-secondary/5 bg-gradient-to-br p-4">
          <h3 className="mb-3 text-xs font-semibold">[SWITCHES]</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Enable notifications</Label>
              <Switch checked={switchEnabled} onCheckedChange={setSwitchEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Dark mode</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Mini Data Table - Dense with separators */}
        <div className="divide-border border-border bg-card divide-y border">
          <div className="bg-muted/50 p-3">
            <h3 className="text-xs font-semibold">[DATA TABLE]</h3>
          </div>
          <div className="space-y-0">
            {[
              { metric: 'Users', value: '1,234', change: '+12%' },
              { metric: 'Revenue', value: '$45.2K', change: '+8%' },
            ].map((row, i) => (
              <div
                key={i}
                className="border-border flex items-center justify-between border-b p-3 text-xs last:border-b-0"
              >
                <span>{row.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{row.value}</span>
                  <span className="text-success">{row.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Chips - Minimal with bottom border */}
        <div className="border-b-muted bg-background border-b-4 p-3">
          <h3 className="mb-3 text-xs font-semibold">[ACTIVE FILTERS]</h3>
          <div className="flex flex-wrap gap-2">
            {['Status: Active', 'Role: Admin'].map((filter, i) => (
              <Badge key={i} variant="secondary" className="gap-1">
                {filter}
                <X className="h-3 w-3 cursor-pointer" />
              </Badge>
            ))}
          </div>
        </div>

        {/* Date & Time - Outline style */}
        <div className="border-muted-foreground/30 border-2 border-dashed p-4">
          <h3 className="text-muted-foreground mb-3 text-xs font-semibold">[TIMESTAMPS]</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="text-muted-foreground h-4 w-4" />
              <span>Last updated: 2 min ago</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span>Created: Dec 11, 2025</span>
            </div>
          </div>
        </div>

        {/* Statistics - Accent background with border */}
        <div className="border-success/50 bg-success/10 space-y-3 border-2 p-4">
          <h3 className="text-success text-xs font-semibold">[REVENUE UP]</h3>
          <div className="flex justify-between text-xs">
            <span>Total</span>
            <span className="text-lg font-bold">$12,450</span>
          </div>
          <Separator />
          <div className="flex justify-between text-xs">
            <span>Change</span>
            <span className="text-success text-lg font-bold">+15.3%</span>
          </div>
        </div>
      </div>

      {/* COLUMN 4 - Slider, Checkboxes, Select, Input Variants, Button Groups */}
      <div className="space-y-4">
        {/* Slider */}
        <Card>
          <div className="p-4">
            <h3 className="mb-3 text-xs font-semibold">[SLIDER]</h3>
            <p className={cn('mb-3 text-xs', mode.color.text.muted)}>Value: ${priceRange[0]}</p>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={800}
              min={200}
              step={10}
            />
          </div>
        </Card>

        {/* Checkboxes */}
        <Card>
          <div className="p-4">
            <h3 className="mb-3 text-xs font-semibold">[CHECKBOXES]</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="check-1" defaultChecked />
                <label htmlFor="check-1" className="text-xs">
                  Marketing emails
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check-2" />
                <label htmlFor="check-2" className="text-xs">
                  Product updates
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Select Menu */}
        <Card>
          <div className="p-4">
            <h3 className="mb-3 text-xs font-semibold">[SELECT MENU]</h3>
            <Select defaultValue="option-1">
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option-1">Option 1</SelectItem>
                <SelectItem value="option-2">Option 2</SelectItem>
                <SelectItem value="option-3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Input Variants */}
        <Card>
          <div className="p-4">
            <h3 className="mb-3 text-xs font-semibold">[INPUT TYPES]</h3>
            <div className="space-y-2">
              <Input type="email" placeholder="Email" className="text-xs" />
              <Input type="password" placeholder="Password" className="text-xs" />
              <Input type="number" placeholder="Amount" className="text-xs" />
            </div>
          </div>
        </Card>

        {/* Button Groups */}
        <Card>
          <div className="p-4">
            <h3 className="mb-3 text-xs font-semibold">[BUTTON GROUP]</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                &gt; LEFT
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                &gt; CENTER
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                &gt; RIGHT
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons - Full width, no card */}
        <div className="space-y-2">
          <Button className="w-full text-xs">
            <Download className="mr-2 h-4 w-4" />
            &gt; DOWNLOAD
          </Button>
          <Button variant="outline" className="w-full text-xs">
            <Settings className="mr-2 h-4 w-4" />
            &gt; SETTINGS
          </Button>
          <Button variant="destructive" className="w-full text-xs">
            <Trash2 className="mr-2 h-4 w-4" />
            &gt; DELETE
          </Button>
        </div>
      </div>
    </div>
  );
}

// Dashboard preview - using actual analytics dashboard
function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <BrowserFrame>
      <LeftNavigation activeSection="analytics" />
      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className={cn(mode.font, 'text-2xl font-semibold')}>Analytics Dashboard</h1>
              <p className="text-muted-foreground text-sm">
                Track revenue, users, conversions, and growth metrics
              </p>
            </div>
            <Button className={cn(mode.radius, mode.font, 'text-xs')}>
              <Download className="mr-2 h-4 w-4" />
              &gt; EXPORT DATA
            </Button>
          </div>

          {/* Metric Cards */}
          <MetricCards metrics={metrics} />

          {/* Charts Section */}
          <div className="grid gap-4 lg:grid-cols-7">
            <RevenueChart data={revenueData} />
            <ActivityFeed activities={activityData} />
          </div>

          {/* Tabs Section */}
          <AnalyticsTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            pageData={pageData}
            trafficSources={trafficSources}
            deviceBreakdown={deviceBreakdown}
          />
        </div>
      </div>
    </BrowserFrame>
  );
}

// Table preview - full user management with TanStack Table
function TablePreview() {
  const [sorting, setSorting] = useState<SortingState>(() => []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => []);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => ({}));
  const [rowSelection, setRowSelection] = useState(() => ({}));

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table API design is incompatible with React Compiler but works correctly
  const table = useReactTable({
    data: mockUsers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportToCSV = useCallback(() => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Plan'];
    const csvData = mockUsers.map((user) => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.plan,
    ]);

    const csv = [headers.join(','), ...csvData.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }, []);

  // Memoize filtered row count to prevent state updates during render
  const filteredRowCount = useMemo(() => table.getFilteredRowModel().rows.length, [table]);

  return (
    <BrowserFrame>
      <LeftNavigation activeSection="users" />
      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className={cn(mode.font, 'text-2xl font-semibold')}>User Management</h1>
            <Button className={cn(mode.radius, mode.font, 'text-xs')}>
              <UserPlus className="mr-2 h-4 w-4" />
              &gt; ADD USER
            </Button>
          </div>

          {/* Stats Cards */}
          <StatsCards users={mockUsers} />

          {/* Main Table Card */}
          <Card>
            <CardHeader code="0x00" title="USERS DATABASE" />

            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className={cn(mode.font, 'text-xs', mode.color.text.muted)}>
                  [ALL USERS]: COUNT={mockUsers.length} | FILTERED={filteredRowCount}
                </div>
                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  size="sm"
                  className={cn(mode.radius, mode.font, 'h-7 text-xs')}
                >
                  <Download className="mr-2 h-3 w-3" />
                  &gt; EXPORT CSV
                </Button>
              </div>

              {/* Toolbar */}
              <TableToolbar table={table} />

              {/* Terminal Table */}
              <UserDataTable table={table} />

              {/* Pagination */}
              <PaginationControls table={table} />
            </div>
          </Card>
        </div>
      </div>
    </BrowserFrame>
  );
}

// Profile preview - simplified version
function ProfilePreview() {
  return (
    <BrowserFrame>
      <LeftNavigation activeSection="dashboard" />
      <div className="flex-1 overflow-auto p-8">
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
      </div>
    </BrowserFrame>
  );
}

// Billing preview - simplified version
function BillingPreview() {
  return (
    <BrowserFrame>
      <LeftNavigation activeSection="dashboard" />
      <div className="flex-1 overflow-auto p-8">
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
      </div>
    </BrowserFrame>
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
