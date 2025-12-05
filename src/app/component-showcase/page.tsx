"use client";

/**
 * COMPREHENSIVE COMPONENT SHOWCASE
 * All 99 UI components in one scrollable page
 */

import * as React from "react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Core Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ActivityTimeline, TimelineEvent } from "@/components/ui/activity-timeline";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Badge } from "@/components/ui/badge";
import { Banner } from "@/components/ui/banner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CodeBlock } from "@/components/ui/code-block";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ColorPicker } from "@/components/ui/color-picker";
import { Combobox } from "@/components/ui/combobox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Container } from "@/components/ui/container";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CopyButton } from "@/components/ui/copy-button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DonutChart } from "@/components/ui/donut-chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { Field } from "@/components/ui/field";
import { FormError } from "@/components/ui/form-error";
import { FunnelChart } from "@/components/ui/funnel-chart";
import { Gauge } from "@/components/ui/gauge";
import { Grid } from "@/components/ui/grid";
import { Heatmap } from "@/components/ui/heatmap";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { InputNumber } from "@/components/ui/input-number";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { InputPassword } from "@/components/ui/input-password";
import { InputSearch } from "@/components/ui/input-search";
import { KpiCard } from "@/components/ui/kpi-card";
import { Label } from "@/components/ui/label";
import { Spinner, LoadingButton } from "@/components/ui/loading";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NotificationBadge } from "@/components/ui/notification-badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { PasswordStrength } from "@/components/ui/password-strength";
import { PieChart } from "@/components/ui/pie-chart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Rating } from "@/components/ui/rating";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Sparkline } from "@/components/ui/sparkline";
import { StatCard } from "@/components/ui/stat-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "@/components/ui/time-picker";
import { Toaster } from "@/components/ui/toaster";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { H1, H2, H3, H4, Body, Small } from "@/components/ui/typography";
import { WindowControls, WindowHeader } from "@/components/ui/window-controls";

// Icons
import {
  AlertCircle,
  Bell,
  ChevronRight,
  File,
  Info,
  Mail,
  Search,
  Settings,
  User,
} from "lucide-react";

// Section Header Component
function SectionHeader({ code, title }: { code: string; title: string }) {
  return (
    <div className="border-border bg-card border-b px-6 py-4">
      <span className={cn("text-muted-foreground text-sm", mode.font)}>
        [ [{code}] {title} ]
      </span>
    </div>
  );
}

export default function ComponentShowcasePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [sliderValue, setSliderValue] = React.useState([50]);
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [rating, setRating] = React.useState(3);
  // eslint-disable-next-line design-system/no-hardcoded-colors -- ColorPicker requires hex value
  const [color, setColor] = React.useState("#3b82f6");
  const [progress] = React.useState(65);

  // Mock data
  const pieData = [
    { label: "React", value: 35, color: "hsl(var(--primary))" },
    { label: "Vue", value: 25, color: "hsl(var(--chart-2))" },
    { label: "Angular", value: 20, color: "hsl(var(--chart-3))" },
    { label: "Svelte", value: 20, color: "hsl(var(--chart-4))" },
  ];

  const sparklineData = [65, 59, 80, 81, 56, 55, 40, 68, 72, 95, 88, 76];

  const timelineEvents: TimelineEvent[] = [
    {
      id: "1",
      title: "Project started",
      description: "Initial commit",
      timestamp: "2 hours ago",
      type: "created",
      user: { name: "John Doe" },
    },
    {
      id: "2",
      title: "First release",
      description: "v1.0.0 deployed",
      timestamp: "1 hour ago",
      type: "updated",
      user: { name: "Jane Smith" },
    },
  ];

  // Static heatmap data to avoid hydration mismatch (no Math.random())
  const heatmapData = [
    { x: 0, y: 0, value: 2 },
    { x: 1, y: 0, value: 3 },
    { x: 2, y: 0, value: 1 },
    { x: 3, y: 0, value: 4 },
    { x: 4, y: 0, value: 0 },
    { x: 0, y: 1, value: 1 },
    { x: 1, y: 1, value: 4 },
    { x: 2, y: 1, value: 2 },
    { x: 3, y: 1, value: 3 },
    { x: 4, y: 1, value: 1 },
    { x: 0, y: 2, value: 3 },
    { x: 1, y: 2, value: 2 },
    { x: 2, y: 2, value: 4 },
    { x: 3, y: 2, value: 1 },
    { x: 4, y: 2, value: 2 },
    { x: 0, y: 3, value: 0 },
    { x: 1, y: 3, value: 1 },
    { x: 2, y: 3, value: 3 },
    { x: 3, y: 3, value: 4 },
    { x: 4, y: 3, value: 2 },
    { x: 0, y: 4, value: 4 },
    { x: 1, y: 4, value: 3 },
    { x: 2, y: 4, value: 0 },
    { x: 3, y: 4, value: 2 },
    { x: 4, y: 4, value: 3 },
  ];

  const funnelData = [
    { label: "Visitors", value: 1000, color: "hsl(var(--primary))" },
    { label: "Signups", value: 500, color: "hsl(var(--chart-2))" },
    { label: "Trials", value: 200, color: "hsl(var(--chart-3))" },
    { label: "Paid", value: 50, color: "hsl(var(--chart-4))" },
  ];

  const sections = [
    { id: "buttons", title: "BUTTONS_&_ACTIONS" },
    { id: "inputs", title: "INPUTS_&_FORMS" },
    { id: "display", title: "DATA_DISPLAY" },
    { id: "charts", title: "CHARTS_&_VISUALIZATION" },
    { id: "feedback", title: "FEEDBACK_&_STATUS" },
    { id: "overlays", title: "OVERLAYS_&_DIALOGS" },
    { id: "navigation", title: "NAVIGATION" },
    { id: "layout", title: "LAYOUT_&_CONTAINERS" },
  ];

  return (
    <TooltipProvider>
      <div className="bg-background min-h-screen">
        {/* Header */}
        <header className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
          <div className="flex items-center gap-4 px-6 py-4">
            <WindowControls size="sm" />
            <span className={cn("text-muted-foreground text-sm", mode.font)}>
              component-showcase.tsx — 99 COMPONENTS
            </span>
          </div>
          {/* Table of Contents */}
          <ScrollArea className="border-border border-t">
            <div className="flex gap-2 px-6 py-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "border-border bg-card hover:bg-muted border px-4 py-1 text-xs whitespace-nowrap",
                    mode.font,
                    mode.radius
                  )}
                >
                  {section.title}
                </a>
              ))}
            </div>
          </ScrollArea>
        </header>

        <main className="container mx-auto max-w-7xl space-y-12 px-6 py-12">
          {/* ============================================ */}
          {/* SECTION 1: BUTTONS & ACTIONS */}
          {/* ============================================ */}
          <section id="buttons" className={cn("border-border border", mode.radius)}>
            <SectionHeader code="0x01" title="BUTTONS_&_ACTIONS" />
            <div className="space-y-8 p-6">
              {/* Button Variants */}
              <div>
                <Label className="mb-4 block">[BUTTON_VARIANTS]:</Label>
                <div className="flex flex-wrap gap-4">
                  <Button>&gt; DEFAULT</Button>
                  <Button variant="secondary">&gt; SECONDARY</Button>
                  <Button variant="destructive">&gt; DESTRUCTIVE</Button>
                  <Button variant="outline">&gt; OUTLINE</Button>
                  <Button variant="ghost">&gt; GHOST</Button>
                  <Button variant="link">&gt; LINK</Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <Label className="mb-4 block">[BUTTON_SIZES]:</Label>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">&gt; SMALL</Button>
                  <Button size="default">&gt; DEFAULT</Button>
                  <Button size="lg">&gt; LARGE</Button>
                  <Button size="icon" aria-label="Settings">
                    <Settings className="size-4" />
                  </Button>
                </div>
              </div>

              {/* LoadingButton */}
              <div>
                <Label className="mb-4 block">[LOADING_BUTTON]:</Label>
                <LoadingButton loading>&gt; LOADING...</LoadingButton>
              </div>

              {/* CopyButton */}
              <div>
                <Label className="mb-4 block">[COPY_BUTTON]:</Label>
                <div className="flex items-center gap-2">
                  <code
                    className={cn(
                      "border-border bg-muted border px-4 py-1 text-sm",
                      mode.font,
                      mode.radius
                    )}
                  >
                    npm install fabrk
                  </code>
                  <CopyButton value="npm install fabrk" />
                </div>
              </div>

              {/* Checkbox */}
              <div>
                <Label className="mb-4 block">[CHECKBOX]:</Label>
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    Accept terms and conditions
                  </Label>
                </div>
              </div>

              {/* Switch */}
              <div>
                <Label className="mb-4 block">[SWITCH]:</Label>
                <div className="flex items-center gap-2">
                  <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
                  <Label className="text-sm">{switchChecked ? "ON" : "OFF"}</Label>
                </div>
              </div>

              {/* Rating */}
              <div>
                <Label className="mb-4 block">[RATING]:</Label>
                <Rating rating={rating} onRatingChange={setRating} showValue />
              </div>

              {/* Radio Group */}
              <div>
                <Label className="mb-4 block">[RADIO_GROUP]:</Label>
                <RadioGroup defaultValue="option-1">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-1" id="r1" />
                    <Label htmlFor="r1">Option 1</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-2" id="r2" />
                    <Label htmlFor="r2">Option 2</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* SECTION 2: INPUTS & FORMS */}
          {/* ============================================ */}
          <section id="inputs" className={cn("border-border border", mode.radius)}>
            <SectionHeader code="0x02" title="INPUTS_&_FORMS" />
            <div className="space-y-8 p-6">
              {/* Input */}
              <div>
                <Label className="mb-4 block">[INPUT]:</Label>
                <Input placeholder="Enter text..." className="max-w-sm" />
              </div>

              {/* InputPassword */}
              <div>
                <Label className="mb-4 block">[INPUT_PASSWORD]:</Label>
                <InputPassword placeholder="Enter password..." className="max-w-sm" />
              </div>

              {/* InputSearch */}
              <div>
                <Label className="mb-4 block">[INPUT_SEARCH]:</Label>
                <InputSearch placeholder="Search..." className="max-w-sm" />
              </div>

              {/* InputNumber */}
              <div>
                <Label className="mb-4 block">[INPUT_NUMBER]:</Label>
                <InputNumber defaultValue={42} className="max-w-sm" />
              </div>

              {/* InputOTP */}
              <div>
                <Label className="mb-4 block">[INPUT_OTP]:</Label>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* InputGroup */}
              <div>
                <Label className="mb-4 block">[INPUT_GROUP]:</Label>
                <InputGroup className="max-w-sm">
                  <Mail className="text-muted-foreground size-4" />
                  <Input placeholder="email@example.com" />
                </InputGroup>
              </div>

              {/* Textarea */}
              <div>
                <Label className="mb-4 block">[TEXTAREA]:</Label>
                <Textarea placeholder="Enter description..." className="max-w-sm" />
              </div>

              {/* Select */}
              <div>
                <Label className="mb-4 block">[SELECT]:</Label>
                <Select>
                  <SelectTrigger className="max-w-sm">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Option 1</SelectItem>
                    <SelectItem value="2">Option 2</SelectItem>
                    <SelectItem value="3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* MultiSelect */}
              <div>
                <Label className="mb-4 block">[MULTI_SELECT]:</Label>
                <MultiSelect
                  options={[
                    { value: "react", label: "React" },
                    { value: "vue", label: "Vue" },
                    { value: "angular", label: "Angular" },
                  ]}
                  selected={[]}
                  onChange={() => {}}
                  placeholder="Select frameworks"
                  className="max-w-sm"
                />
              </div>

              {/* Combobox */}
              <div>
                <Label className="mb-4 block">[COMBOBOX]:</Label>
                <Combobox
                  options={[
                    { value: "next", label: "Next.js" },
                    { value: "remix", label: "Remix" },
                    { value: "astro", label: "Astro" },
                  ]}
                  placeholder="Select framework"
                  className="max-w-sm"
                />
              </div>

              {/* Autocomplete */}
              <div>
                <Label className="mb-4 block">[AUTOCOMPLETE]:</Label>
                <Autocomplete
                  options={["React", "Vue", "Angular", "Svelte"]}
                  placeholder="Search frameworks..."
                  className="max-w-sm"
                />
              </div>

              {/* DatePicker */}
              <div>
                <Label className="mb-4 block">[DATE_PICKER]:</Label>
                <DatePicker />
              </div>

              {/* TimePicker */}
              <div>
                <Label className="mb-4 block">[TIME_PICKER]:</Label>
                <TimePicker />
              </div>

              {/* ColorPicker */}
              <div>
                <Label className="mb-4 block">[COLOR_PICKER]:</Label>
                <ColorPicker color={color} onChange={setColor} />
              </div>

              {/* Slider */}
              <div>
                <Label className="mb-4 block">[SLIDER]: {sliderValue[0]}%</Label>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  className="max-w-sm"
                />
              </div>

              {/* PasswordStrength */}
              <div>
                <Label className="mb-4 block">[PASSWORD_STRENGTH]:</Label>
                <PasswordStrength value="MySecureP@ss123" className="max-w-sm" />
              </div>

              {/* Field */}
              <div>
                <Label className="mb-4 block">[FIELD]:</Label>
                <Field className="max-w-sm">
                  <Label>Email</Label>
                  <Input placeholder="email@example.com" />
                </Field>
              </div>

              {/* FormError */}
              <div>
                <Label className="mb-4 block">[FORM_ERROR]:</Label>
                <FormError
                  what="Unable to save changes"
                  why="The server is temporarily unavailable."
                  how="Please wait a moment and try again."
                  className="max-w-md"
                />
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* SECTION 3: DATA DISPLAY */}
          {/* ============================================ */}
          <section id="display" className={cn("border-border border", mode.radius)}>
            <SectionHeader code="0x03" title="DATA_DISPLAY" />
            <div className="space-y-8 p-6">
              {/* Badge */}
              <div>
                <Label className="mb-4 block">[BADGE]:</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              {/* NotificationBadge */}
              <div>
                <Label className="mb-4 block">[NOTIFICATION_BADGE]:</Label>
                <div className="flex gap-4">
                  <NotificationBadge count={5}>
                    <Bell className="size-5" />
                  </NotificationBadge>
                  <NotificationBadge count={99}>
                    <Mail className="size-5" />
                  </NotificationBadge>
                </div>
              </div>

              {/* StatusIndicator */}
              <div>
                <Label className="mb-4 block">[STATUS_INDICATOR]:</Label>
                <div className="flex gap-4">
                  <StatusIndicator status="online" label="Online" />
                  <StatusIndicator status="offline" label="Offline" />
                  <StatusIndicator status="busy" label="Busy" />
                  <StatusIndicator status="away" label="Away" />
                </div>
              </div>

              {/* Avatar */}
              <div>
                <Label className="mb-4 block">[AVATAR]:</Label>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* AvatarGroup */}
              <div>
                <Label className="mb-4 block">[AVATAR_GROUP]:</Label>
                <AvatarGroup
                  avatars={[
                    { fallback: "JD", src: "https://github.com/shadcn.png" },
                    { fallback: "JD" },
                    { fallback: "BS" },
                    { fallback: "+5" },
                  ]}
                  max={3}
                />
              </div>

              {/* Card */}
              <div>
                <Label className="mb-4 block">[CARD]:</Label>
                <Card className="max-w-sm">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description goes here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Card content with some example text.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">&gt; ACTION</Button>
                  </CardFooter>
                </Card>
              </div>

              {/* StatCard */}
              <div>
                <Label className="mb-4 block">[STAT_CARD]:</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  <StatCard title="Total Users" value="12,345" change={12} trend="up" />
                  <StatCard title="Revenue" value="$45,231" change={-3} trend="down" />
                  <StatCard title="Active" value="1,234" change={5} trend="up" />
                </div>
              </div>

              {/* KpiCard */}
              <div>
                <Label className="mb-4 block">[KPI_CARD]:</Label>
                <KpiCard
                  title="Conversion Rate"
                  value="3.24%"
                  subtitle="vs last month"
                  trend="up"
                  change={0.5}
                />
              </div>

              {/* Table */}
              <div>
                <Label className="mb-4 block">[TABLE]:</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                      <TableCell>Admin</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Pending</Badge>
                      </TableCell>
                      <TableCell>User</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* CodeBlock */}
              <div>
                <Label className="mb-4 block">[CODE_BLOCK]:</Label>
                <CodeBlock
                  code={`const greeting = "Hello, World!";
return greeting;`}
                  language="typescript"
                />
              </div>

              {/* Typography */}
              <div>
                <Label className="mb-4 block">[TYPOGRAPHY]:</Label>
                <div className="space-y-2">
                  <H1>Heading 1</H1>
                  <H2>Heading 2</H2>
                  <H3>Heading 3</H3>
                  <H4>Heading 4</H4>
                  <Body>Body text paragraph</Body>
                  <Small>Small text</Small>
                </div>
              </div>

              {/* Calendar */}
              <div>
                <Label className="mb-4 block">[CALENDAR]:</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border-border border"
                />
              </div>

              {/* ActivityTimeline */}
              <div>
                <Label className="mb-4 block">[ACTIVITY_TIMELINE]:</Label>
                <ActivityTimeline events={timelineEvents} />
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* SECTION 4: CHARTS & VISUALIZATION */}
          {/* ============================================ */}
          <section id="charts" className={cn("border-border border", mode.radius)}>
            <SectionHeader code="0x04" title="CHARTS_&_VISUALIZATION" />
            <div className="space-y-8 p-6">
              {/* PieChart */}
              <div>
                <Label className="mb-4 block">[PIE_CHART]:</Label>
                <div className="h-64 w-64">
                  <PieChart data={pieData} />
                </div>
              </div>

              {/* DonutChart */}
              <div>
                <Label className="mb-4 block">[DONUT_CHART]:</Label>
                <div className="h-64 w-64">
                  <DonutChart data={pieData} />
                </div>
              </div>

              {/* Gauge */}
              <div>
                <Label className="mb-4 block">[GAUGE]:</Label>
                <Gauge value={75} max={100} label="Performance" />
              </div>

              {/* Sparkline */}
              <div>
                <Label className="mb-4 block">[SPARKLINE]:</Label>
                <Sparkline data={sparklineData} className="h-12 w-48" />
              </div>

              {/* FunnelChart */}
              <div>
                <Label className="mb-4 block">[FUNNEL_CHART]:</Label>
                <div className="h-64">
                  <FunnelChart data={funnelData} />
                </div>
              </div>

              {/* Heatmap */}
              <div>
                <Label className="mb-4 block">[HEATMAP]:</Label>
                <Heatmap data={heatmapData} />
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* SECTION 5: FEEDBACK & STATUS */}
          {/* ============================================ */}
          <section id="feedback" className={cn("border-border border", mode.radius)}>
            <SectionHeader code="0x05" title="FEEDBACK_&_STATUS" />
            <div className="space-y-8 p-6">
              {/* Alert */}
              <div>
                <Label className="mb-4 block">[ALERT]:</Label>
                <div className="max-w-md space-y-4">
                  <Alert>
                    <Info className="size-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>This is an informational alert message.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertCircle className="size-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>This is an error alert message.</AlertDescription>
                  </Alert>
                </div>
              </div>

              {/* Banner */}
              <div>
                <Label className="mb-4 block">[BANNER]:</Label>
                <Banner>New feature available! Check out our latest update.</Banner>
              </div>

              {/* Progress */}
              <div>
                <Label className="mb-4 block">[PROGRESS]: {progress}%</Label>
                <Progress value={progress} className="max-w-sm" />
              </div>

              {/* Spinner */}
              <div>
                <Label className="mb-4 block">[SPINNER]:</Label>
                <Spinner />
              </div>

              {/* Skeleton */}
              <div>
                <Label className="mb-4 block">[SKELETON]:</Label>
                <div className="max-w-sm space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>

              {/* Toast */}
              <div>
                <Label className="mb-4 block">[TOAST]:</Label>
                <Button onClick={() => toast.success("Operation successful!")}>
                  &gt; SHOW_TOAST
                </Button>
              </div>

              {/* EmptyState */}
              <div>
                <Label className="mb-4 block">[EMPTY_STATE]:</Label>
                <EmptyState
                  title="No results found"
                  description="Try adjusting your search or filters."
                  icon={Search}
                  action={{ label: "> CLEAR_FILTERS", onClick: () => {} }}
                />
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* SECTION 6: OVERLAYS & DIALOGS */}
          {/* ============================================ */}
          <section id="overlays" className={cn("border-border border", mode.radius)}>
            <SectionHeader code="0x06" title="OVERLAYS_&_DIALOGS" />
            <div className="space-y-8 p-6">
              {/* Dialog */}
              <div>
                <Label className="mb-4 block">[DIALOG]:</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">&gt; OPEN_DIALOG</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      <DialogDescription>Dialog description goes here.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">Dialog content</div>
                    <DialogFooter>
                      <Button>&gt; CONFIRM</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* AlertDialog */}
              <div>
                <Label className="mb-4 block">[ALERT_DIALOG]:</Label>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">&gt; DELETE_ITEM</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
                      <AlertDialogAction>&gt; DELETE</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Sheet */}
              <div>
                <Label className="mb-4 block">[SHEET]:</Label>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">&gt; OPEN_SHEET</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Sheet Title</SheetTitle>
                      <SheetDescription>Sheet description goes here.</SheetDescription>
                    </SheetHeader>
                    <div className="py-4">Sheet content</div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Popover */}
              <div>
                <Label className="mb-4 block">[POPOVER]:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">&gt; OPEN_POPOVER</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <h4 className={cn("text-sm font-medium", mode.font)}>Popover Title</h4>
                      <p className="text-muted-foreground text-sm">Popover content goes here.</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* HoverCard */}
              <div>
                <Label className="mb-4 block">[HOVER_CARD]:</Label>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link">&gt; HOVER_ME</Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="space-y-2">
                      <h4 className={cn("text-sm font-medium", mode.font)}>HoverCard Title</h4>
                      <p className="text-muted-foreground text-sm">HoverCard content on hover.</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>

              {/* Tooltip */}
              <div>
                <Label className="mb-4 block">[TOOLTIP]:</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">&gt; HOVER_FOR_TOOLTIP</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* DropdownMenu */}
              <div>
                <Label className="mb-4 block">[DROPDOWN_MENU]:</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">&gt; OPEN_MENU</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 size-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 size-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 size-4" />
                      Email
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* ContextMenu */}
              <div>
                <Label className="mb-4 block">[CONTEXT_MENU]:</Label>
                <ContextMenu>
                  <ContextMenuTrigger
                    className={cn(
                      "border-border flex h-24 w-48 items-center justify-center border border-dashed text-sm",
                      mode.font
                    )}
                  >
                    Right-click here
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>Edit</ContextMenuItem>
                    <ContextMenuItem>Copy</ContextMenuItem>
                    <ContextMenuItem>Delete</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>

              {/* Command */}
              <div>
                <Label className="mb-4 block">[COMMAND]:</Label>
                <Command className="border-border max-w-sm border">
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>
                        <File className="mr-2 size-4" />
                        Documents
                      </CommandItem>
                      <CommandItem>
                        <Settings className="mr-2 size-4" />
                        Settings
                      </CommandItem>
                      <CommandItem>
                        <User className="mr-2 size-4" />
                        Profile
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>

              {/* Collapsible */}
              <div>
                <Label className="mb-4 block">[COLLAPSIBLE]:</Label>
                <Collapsible className="max-w-sm">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Toggle Section <ChevronRight className="size-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="border-border mt-2 border p-4">
                    <p className="text-muted-foreground text-sm">This content is collapsible.</p>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* SECTION 7: NAVIGATION */}
          {/* ============================================ */}
          <section id="navigation" className={cn("border-border border", mode.radius)}>
            <SectionHeader code="0x07" title="NAVIGATION" />
            <div className="space-y-8 p-6">
              {/* Tabs */}
              <div>
                <Label className="mb-4 block">[TABS]:</Label>
                <Tabs defaultValue="tab1" className="max-w-md">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="p-4">
                    Tab 1 content
                  </TabsContent>
                  <TabsContent value="tab2" className="p-4">
                    Tab 2 content
                  </TabsContent>
                  <TabsContent value="tab3" className="p-4">
                    Tab 3 content
                  </TabsContent>
                </Tabs>
              </div>

              {/* Accordion */}
              <div>
                <Label className="mb-4 block">[ACCORDION]:</Label>
                <Accordion type="single" collapsible className="max-w-md">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Section 1</AccordionTrigger>
                    <AccordionContent>Content for section 1</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Section 2</AccordionTrigger>
                    <AccordionContent>Content for section 2</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Breadcrumb */}
              <div>
                <Label className="mb-4 block">[BREADCRUMB]:</Label>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Components</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Pagination */}
              <div>
                <Label className="mb-4 block">[PAGINATION]:</Label>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              {/* NavigationMenu */}
              <div>
                <Label className="mb-4 block">[NAVIGATION_MENU]:</Label>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-48 p-4">
                          <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-48 p-4">
                          <NavigationMenuLink href="/components">All Components</NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* Menubar */}
              <div>
                <Label className="mb-4 block">[MENUBAR]:</Label>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>New</MenubarItem>
                      <MenubarItem>Open</MenubarItem>
                      <MenubarItem>Save</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Undo</MenubarItem>
                      <MenubarItem>Redo</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* SECTION 8: LAYOUT & CONTAINERS */}
          {/* ============================================ */}
          <section id="layout" className={cn("border-border border", mode.radius)}>
            <SectionHeader code="0x08" title="LAYOUT_&_CONTAINERS" />
            <div className="space-y-8 p-6">
              {/* WindowControls */}
              <div>
                <Label className="mb-4 block">[WINDOW_CONTROLS]:</Label>
                <div className="flex gap-8">
                  <div className="text-center">
                    <WindowControls size="xs" />
                    <p className="text-muted-foreground mt-2 text-xs">xs</p>
                  </div>
                  <div className="text-center">
                    <WindowControls size="sm" />
                    <p className="text-muted-foreground mt-2 text-xs">sm</p>
                  </div>
                  <div className="text-center">
                    <WindowControls size="md" />
                    <p className="text-muted-foreground mt-2 text-xs">md</p>
                  </div>
                  <div className="text-center">
                    <WindowControls size="lg" />
                    <p className="text-muted-foreground mt-2 text-xs">lg</p>
                  </div>
                  <div className="text-center">
                    <WindowControls size="sm" animated />
                    <p className="text-muted-foreground mt-2 text-xs">animated</p>
                  </div>
                </div>
              </div>

              {/* WindowHeader */}
              <div>
                <Label className="mb-4 block">[WINDOW_HEADER]:</Label>
                <div className={cn("border-border border", mode.radius)}>
                  <WindowHeader filename="example.tsx" />
                  <div className="p-4">
                    <p className="text-muted-foreground text-sm">Window content</p>
                  </div>
                </div>
              </div>

              {/* Container */}
              <div>
                <Label className="mb-4 block">[CONTAINER]:</Label>
                <Container className="border-border border border-dashed p-4">
                  <p className="text-muted-foreground text-sm">
                    Container with max-width constraints
                  </p>
                </Container>
              </div>

              {/* Grid */}
              <div>
                <Label className="mb-4 block">[GRID]:</Label>
                <Grid cols={3} gap={4}>
                  <div className="border-border bg-muted border p-4 text-center text-sm">1</div>
                  <div className="border-border bg-muted border p-4 text-center text-sm">2</div>
                  <div className="border-border bg-muted border p-4 text-center text-sm">3</div>
                </Grid>
              </div>

              {/* ScrollArea */}
              <div>
                <Label className="mb-4 block">[SCROLL_AREA]:</Label>
                <ScrollArea className="border-border h-32 w-48 border">
                  <div className="p-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <p key={i} className="text-sm">
                        Scrollable item {i + 1}
                      </p>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Separator */}
              <div>
                <Label className="mb-4 block">[SEPARATOR]:</Label>
                <div className="max-w-sm space-y-2">
                  <p className="text-sm">Above separator</p>
                  <Separator />
                  <p className="text-sm">Below separator</p>
                </div>
              </div>

              {/* AspectRatio */}
              <div>
                <Label className="mb-4 block">[ASPECT_RATIO]:</Label>
                <div className="w-48">
                  <AspectRatio ratio={16 / 9} className="bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">16:9</span>
                  </AspectRatio>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Toaster />
      </div>
    </TooltipProvider>
  );
}
