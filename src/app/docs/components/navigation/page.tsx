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
        <h1 className="text-3xl font-bold tracking-tight">Navigation & Header</h1>
        <p className="mt-2 text-muted-foreground">
          Navigation components for building headers, menus, and site navigation.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Navigation</code> - Main site navigation with responsive mobile menu</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Breadcrumb</code> - Breadcrumb navigation for page hierarchy</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Sidebar</code> - Collapsible sidebar navigation</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Menubar</code> - Horizontal menu bar with dropdowns</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">DropdownMenu</code> - Dropdown menu for actions</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Import Examples</h2>
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
        <h2 className="text-xl font-semibold">Usage Examples</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Landing Navigation</h3>
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
          <h3 className="text-lg font-medium">Breadcrumb</h3>
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
          <h3 className="text-lg font-medium">Dropdown Menu</h3>
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
