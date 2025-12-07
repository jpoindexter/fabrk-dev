"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  DashboardShell,
  DashboardShellHeader,
  DashboardShellSection,
  DashboardShellGrid,
} from "@/components/ui/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Home, Users, Settings, BarChart, FileText } from "lucide-react";
import type { SidebarItem } from "@/components/ui/sidebar";

export default function DashboardShellPage() {
  const sidebarItems: SidebarItem[] = [
    { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart className="h-4 w-4" /> },
    { id: "users", label: "Users", icon: <Users className="h-4 w-4" /> },
    { id: "documents", label: "Documents", icon: <FileText className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  const user = {
    name: "John Doe",
    email: "john@example.com",
    image: null,
  };

  return (
    <ComponentShowcaseTemplate
      code="[UI.100]"
      category="Layout"
      title="Dashboard Shell"
      description="A complete dashboard layout with sidebar navigation, top bar, and responsive mobile menu. Composes Sidebar + TopBar for a professional admin interface."
      importCode={`import {
  DashboardShell,
  DashboardShellHeader,
  DashboardShellSection,
  DashboardShellGrid,
} from "@/components/ui/dashboard-shell"`}
      mainPreview={{
        preview: (
          <div className="border-border h-[500px] overflow-hidden border">
            <DashboardShell
              sidebarItems={sidebarItems}
              topBar={{
                logo: <span className="font-bold">FABRK</span>,
                user,
                showSearch: true,
                showNotifications: true,
                notificationCount: 3,
              }}
            >
              <DashboardShellHeader
                title="Dashboard"
                description="Welcome back, John"
                actions={<Button>&gt; NEW_ITEM</Button>}
              />
              <DashboardShellGrid columns={3}>
                <div className="border-border bg-card border p-4">Card 1</div>
                <div className="border-border bg-card border p-4">Card 2</div>
                <div className="border-border bg-card border p-4">Card 3</div>
              </DashboardShellGrid>
            </DashboardShell>
          </div>
        ),
        code: `<DashboardShell
  sidebarItems={sidebarItems}
  topBar={{
    logo: <span className="font-bold">FABRK</span>,
    user: { name: "John Doe", email: "john@example.com" },
    showSearch: true,
    showNotifications: true,
    notificationCount: 3,
  }}
>
  <DashboardShellHeader
    title="Dashboard"
    description="Welcome back, John"
    actions={<Button>> NEW_ITEM</Button>}
  />
  <DashboardShellGrid columns={3}>
    <div className="border border-border bg-card p-4">Card 1</div>
    <div className="border border-border bg-card p-4">Card 2</div>
    <div className="border border-border bg-card p-4">Card 3</div>
  </DashboardShellGrid>
</DashboardShell>`,
      }}
      variants={[
        {
          title: "With Sections",
          description: "Dashboard with organized sections.",
          preview: (
            <div className="border-border h-[400px] overflow-hidden border">
              <DashboardShell sidebarItems={sidebarItems} sidebarCollapsed={true}>
                <DashboardShellSection title="Analytics" description="Your weekly performance">
                  <div className="border-border bg-card border p-4">Charts here</div>
                </DashboardShellSection>
              </DashboardShell>
            </div>
          ),
          code: `<DashboardShell sidebarItems={sidebarItems} sidebarCollapsed={true}>
  <DashboardShellSection title="Analytics" description="Your weekly performance">
    <div className="border border-border bg-card p-4">Charts here</div>
  </DashboardShellSection>
</DashboardShell>`,
        },
      ]}
      props={[
        {
          name: "sidebarItems",
          type: "SidebarItem[]",
          required: true,
          description: "Navigation items for the sidebar.",
        },
        {
          name: "sidebarCollapsed",
          type: "boolean",
          default: "false",
          description: "Start sidebar in collapsed state.",
        },
        {
          name: "topBar",
          type: "TopBarProps",
          description: "Configuration for the top navigation bar.",
        },
        { name: "children", type: "ReactNode", required: true, description: "Main content area." },
        { name: "footer", type: "ReactNode", description: "Optional footer content." },
        {
          name: "onSidebarItemClick",
          type: "(item: SidebarItem) => void",
          description: "Sidebar item click handler.",
        },
      ]}
      accessibility={[
        "Responsive mobile menu with Sheet overlay",
        "Keyboard navigation for sidebar items",
        "ARIA labels for menu toggles",
        "Focus management when opening/closing mobile menu",
      ]}
      previous={{ title: "Container", href: "/docs/components/container" }}
      next={{ title: "Grid", href: "/docs/components/grid" }}
    />
  );
}
