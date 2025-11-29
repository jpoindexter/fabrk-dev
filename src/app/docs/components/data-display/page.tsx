import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Data Display - Fabrk Docs",
  description: "Tables, cards, badges, and lists for displaying data. Sortable, filterable, and paginated options.",
};

export default function DataDisplayComponentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-[10px] text-muted-foreground">[ [0x60] COMPONENTS ] DATA_DISPLAY</span>
        </div>
        <h1 className="font-mono text-xl font-bold tracking-tight">DATA_DISPLAY</h1>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          &gt; Components for displaying data including tables, cards, badges, and more.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-4">
          <h2 className="font-mono text-sm font-semibold mb-3">AVAILABLE_COMPONENTS</h2>
                    <ul className="space-y-2 font-mono text-[10px] text-muted-foreground">
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">Table</code> - Data table with sorting and filtering</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">Card</code> - Content container with header and footer</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">Badge</code> - Status indicators and labels</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">StatCard</code> - Statistics display card</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">Avatar</code> - User avatar display</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">Skeleton</code> - Loading placeholder</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">EmptyState</code> - Empty data placeholder</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">ActivityTimeline</code> - Timeline of events</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">NotificationList</code> - List of notifications</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">Pagination</code> - Page navigation</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">Progress</code> - Progress indicator</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-[10px]">Tooltip</code> - Hover information</li>
            <li>└─ <code className="bg-muted px-1 font-mono text-[10px]">HoverCard</code> - Preview on hover</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div>
          <h2 className="font-mono text-sm font-semibold">IMPORT_EXAMPLES</h2>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="typescript" code={`// Table
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Card
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Badge
import { Badge } from "@/components/ui/badge";

// Stat card
import { StatCard } from "@/components/ui/stat-card";

// Avatar
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Loading states
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";

// Other displays
import { ActivityTimeline } from "@/components/ui/activity-timeline";
import { NotificationList } from "@/components/ui/notification-list";
import { Pagination } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";`} />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-mono text-sm font-semibold">USAGE_EXAMPLES</h2>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">TABLE</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
];

export function UsersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">CARD</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your profile information will appear here.</p>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">BADGE_VARIANTS</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { Badge } from "@/components/ui/badge";

export function BadgeVariants() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}

// Usage in tables
<TableCell>
  <Badge variant={user.active ? "default" : "secondary"}>
    {user.active ? "Active" : "Inactive"}
  </Badge>
</TableCell>`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">STAT_CARD</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { StatCard } from "@/components/ui/stat-card";
import { Users, DollarSign, Activity } from "lucide-react";

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Users"
        value="1,234"
        icon={Users}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Revenue"
        value="$45,231"
        icon={DollarSign}
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Active Now"
        value="573"
        icon={Activity}
      />
    </div>
  );
}`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">SKELETON_LOADING</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">EMPTY_STATE</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { EmptyState } from "@/components/ui/empty-state";
import { FileText } from "lucide-react";

export function NoDataState() {
  return (
    <EmptyState
      icon={FileText}
      title="No documents found"
      description="Get started by creating your first document."
      action={{
        label: "Create Document",
        onClick: () => console.log("Create clicked"),
      }}
    />
  );
}`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">TOOLTIP</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function TooltipExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is helpful information</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">PROGRESS</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { Progress } from "@/components/ui/progress";

export function ProgressExample() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Storage used</span>
        <span>75%</span>
      </div>
      <Progress value={75} />
    </div>
  );
}`} />
        </div>
      </div>
    </div>
  );
}
