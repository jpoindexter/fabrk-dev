import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Navigation Components - Fabrk Docs",
  description: "Build site navigation with header, mobile menu, and breadcrumb components. Responsive and accessible.",
};

export default function NavigationComponentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-2 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x60] COMPONENTS ] NAVIGATION</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">NAVIGATION_COMPONENTS</h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          &gt; Navigation components for building headers, menus, and site navigation.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-4">
          <h2 className="font-mono text-xs font-semibold mb-3">AVAILABLE_COMPONENTS</h2>
          <div className="space-y-1 font-mono text-xs text-muted-foreground">
            <div>├─ <code className="bg-muted px-1 font-mono">Navigation</code> - Main site navigation with responsive mobile menu</div>
            <div>├─ <code className="bg-muted px-1 font-mono">Breadcrumb</code> - Breadcrumb navigation for page hierarchy</div>
            <div>├─ <code className="bg-muted px-1 font-mono">Sidebar</code> - Collapsible sidebar navigation</div>
            <div>├─ <code className="bg-muted px-1 font-mono">Menubar</code> - Horizontal menu bar with dropdowns</div>
            <div>└─ <code className="bg-muted px-1 font-mono">DropdownMenu</code> - Dropdown menu for actions</div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="font-mono text-lg font-semibold">IMPORT_EXAMPLES</h2>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// Landing page navigation
import { Navigation } from "@/components/landing/navigation";

// Breadcrumb navigation
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Sidebar
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Dropdown menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";`} />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-mono text-lg font-semibold">USAGE_EXAMPLES</h2>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">LANDING_NAVIGATION</h3>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="tsx" code={`import { Navigation } from "@/components/landing/navigation";

export default function LandingPage() {
  return (
    <div>
      <Navigation />
      {/* Page content */}
    </div>
  );
}`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">BREADCRUMB</h3>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="tsx" code={`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function PageBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Navigation</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">DROPDOWN_MENU</h3>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="tsx" code={`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">My Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
