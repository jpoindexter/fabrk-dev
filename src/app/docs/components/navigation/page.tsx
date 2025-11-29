import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Menu, ChevronRight, PanelLeft, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Navigation Components - Fabrk Docs",
  description: "Build site navigation with header, mobile menu, and breadcrumb components. Responsive and accessible.",
};

export default function NavigationComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="Navigation_Components"
      description="Navigation components for building headers, menus, and site navigation."
      overview="5 navigation components including responsive header navigation, breadcrumbs, collapsible sidebar, menubar, and dropdown menus."
      features={[
        { icon: Menu, title: "Navigation", description: "Responsive header with mobile menu." },
        { icon: ChevronRight, title: "Breadcrumb", description: "Page hierarchy navigation." },
        { icon: PanelLeft, title: "Sidebar", description: "Collapsible side navigation." },
        { icon: MoreVertical, title: "Dropdown", description: "Dropdown action menus." },
      ]}
      usage={[
        {
          title: "Landing Navigation",
          description: "Pre-built responsive navigation for landing pages",
          code: `import { Navigation } from "@/components/landing/navigation";

export default function LandingPage() {
  return (
    <div>
      <Navigation />
      {/* Page content */}
    </div>
  );
}`,
          language: "tsx",
        },
        {
          title: "Breadcrumb",
          description: "Show page hierarchy navigation",
          code: `import {
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
}`,
          language: "tsx",
        },
        {
          title: "Dropdown Menu",
          description: "Action menu triggered by button",
          code: `import {
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
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Uploads", href: "/docs/components/uploads" }}
      next={{ title: "Hero", href: "/docs/components/hero" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Navigation</code> - Main site navigation with responsive mobile menu</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Breadcrumb</code> - Breadcrumb navigation for page hierarchy</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Sidebar</code> - Collapsible sidebar navigation</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Menubar</code> - Horizontal menu bar with dropdowns</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">DropdownMenu</code> - Dropdown menu for actions</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/hero">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Hero</h3>
                <p className={docsTypography.body}>Landing page hero sections</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/footer">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Footer</h3>
                <p className={docsTypography.body}>Site footer components</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
