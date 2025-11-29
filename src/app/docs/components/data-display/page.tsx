import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Table, LayoutDashboard, Tag, User } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Data Display - Fabrk Docs",
  description: "Tables, cards, badges, and lists for displaying data. Sortable, filterable, and paginated options.",
};

export default function DataDisplayComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="Data_Display"
      description="Components for displaying data including tables, cards, badges, and more."
      overview="13+ data display components including tables, cards, badges, stat cards, avatars, skeletons, empty states, and tooltips."
      features={[
        { icon: Table, title: "Table", description: "Data tables with sorting/filtering." },
        { icon: LayoutDashboard, title: "Cards", description: "Content containers with sections." },
        { icon: Tag, title: "Badge", description: "Status indicators and labels." },
        { icon: User, title: "Avatar", description: "User avatars with fallbacks." },
      ]}
      usage={[
        {
          title: "Table",
          description: "Display data in a table format",
          code: `import {
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
}`,
          language: "tsx",
        },
        {
          title: "Card",
          description: "Content container with header, body, footer",
          code: `import {
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
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your profile information will appear here.</p>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}`,
          language: "tsx",
        },
        {
          title: "Badge Variants",
          description: "Status indicators and labels",
          code: `import { Badge } from "@/components/ui/badge";

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
</TableCell>`,
          language: "tsx",
        },
        {
          title: "Stat Card",
          description: "Statistics display with trends",
          code: `import { StatCard } from "@/components/ui/stat-card";
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
}`,
          language: "tsx",
        },
        {
          title: "Skeleton Loading",
          description: "Loading placeholders",
          code: `import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="space-y-4">
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
}`,
          language: "tsx",
        },
        {
          title: "Empty State",
          description: "Placeholder when no data exists",
          code: `import { EmptyState } from "@/components/ui/empty-state";
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
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Forms", href: "/docs/components/forms" }}
      next={{ title: "Charts", href: "/docs/components/charts" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Table</code> - Data table with sorting and filtering</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Card</code> - Content container with header and footer</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Badge</code> - Status indicators and labels</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">StatCard</code> - Statistics display card</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Avatar</code> - User avatar display</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Skeleton</code> - Loading placeholder</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">EmptyState</code> - Empty data placeholder</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Progress</code> - Progress indicator</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Tooltip</code> - Hover information</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">HoverCard</code> - Preview on hover</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/charts">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Charts</h3>
                <p className={docsTypography.body}>Data visualization components</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/navigation">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Navigation</h3>
                <p className={docsTypography.body}>Menus and breadcrumbs</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
