import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Navigation Components - Fabrk Docs",
  description: "Build site navigation with header, mobile menu, and breadcrumb components. Responsive and accessible.",
};

export default function NavigationComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x60] COMPONENTS ] NAVIGATION</span>
        </div>
        <h1 className="font-mono text-3xl font-bold tracking-tight">NAVIGATION_COMPONENTS</h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          &gt; Navigation components for building headers, menus, and site navigation.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="font-mono text-xl font-semibold mb-4">AVAILABLE_COMPONENTS</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">Navigation</code> - Main site navigation with responsive mobile menu</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">Breadcrumb</code> - Breadcrumb navigation for page hierarchy</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">Sidebar</code> - Collapsible sidebar navigation</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">Menubar</code> - Horizontal menu bar with dropdowns</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">DropdownMenu</code> - Dropdown menu for actions</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-xl font-semibold">IMPORT_EXAMPLES</h2>
        </div>
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

      <div className="space-y-8">
        <h2 className="font-mono text-xl font-semibold">USAGE_EXAMPLES</h2>

        <div className="space-y-4">
          <h3 className="font-mono text-lg font-medium">LANDING_NAVIGATION</h3>
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

        <div className="space-y-4">
          <h3 className="font-mono text-lg font-medium">BREADCRUMB</h3>
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

        <div className="space-y-4">
          <h3 className="font-mono text-lg font-medium">DROPDOWN_MENU</h3>
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
  );
}
