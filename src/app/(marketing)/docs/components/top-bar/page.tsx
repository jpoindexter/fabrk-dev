"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { TopBar } from "@/components/ui/top-bar";
import { Settings, User, LogOut } from "lucide-react";

export default function TopBarPage() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    image: null,
  };

  const menuItems = [
    { label: "Profile", href: "/profile", icon: <User className="h-4 w-4" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
    {
      label: "Sign Out",
      onClick: () => {},
      icon: <LogOut className="h-4 w-4" />,
      destructive: true,
    },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.101]"
      category="Navigation"
      title="Top Bar"
      description="A dashboard header component with logo, search, notifications, and user menu. Designed to work with DashboardShell or standalone."
      importCode={`import { TopBar } from "@/components/ui/top-bar"`}
      mainPreview={{
        preview: (
          <div className="border-border overflow-hidden border">
            <TopBar
              logo={<span className="font-bold">FABRK</span>}
              user={user}
              userMenuItems={menuItems}
              showSearch={true}
              searchPlaceholder="Search..."
              showNotifications={true}
              notificationCount={5}
              showMobileMenu={false}
            />
          </div>
        ),
        code: `<TopBar
  logo={<span className="font-bold">FABRK</span>}
  user={{ name: "John Doe", email: "john@example.com" }}
  userMenuItems={[
    { label: "Profile", href: "/profile", icon: <User /> },
    { label: "Settings", href: "/settings", icon: <Settings /> },
    { label: "Sign Out", onClick: () => {}, destructive: true },
  ]}
  showSearch={true}
  showNotifications={true}
  notificationCount={5}
/>`,
      }}
      variants={[
        {
          title: "Minimal",
          description: "TopBar with just logo and user menu.",
          preview: (
            <div className="border-border overflow-hidden border">
              <TopBar
                logo={<span className="font-bold">ACME</span>}
                user={user}
                showMobileMenu={false}
              />
            </div>
          ),
          code: `<TopBar
  logo={<span className="font-bold">ACME</span>}
  user={{ name: "John Doe", email: "john@example.com" }}
/>`,
        },
        {
          title: "With Custom Content",
          description: "TopBar with custom right-side content.",
          preview: (
            <div className="border-border overflow-hidden border">
              <TopBar
                logo={<span className="font-bold">APP</span>}
                user={user}
                showMobileMenu={false}
                rightContent={<span className="text-muted-foreground text-xs">v1.0.0</span>}
              />
            </div>
          ),
          code: `<TopBar
  logo={<span className="font-bold">APP</span>}
  user={user}
  rightContent={<span className="text-xs">v1.0.0</span>}
/>`,
        },
      ]}
      props={[
        { name: "logo", type: "ReactNode", description: "Logo element displayed on the left." },
        { name: "user", type: "TopBarUser", description: "User info for avatar and menu." },
        {
          name: "userMenuItems",
          type: "TopBarMenuItem[]",
          description: "Dropdown menu items for user.",
        },
        {
          name: "showSearch",
          type: "boolean",
          default: "false",
          description: "Show search input.",
        },
        {
          name: "searchPlaceholder",
          type: "string",
          default: '"Search..."',
          description: "Search input placeholder.",
        },
        {
          name: "onSearchChange",
          type: "(value: string) => void",
          description: "Search change handler.",
        },
        {
          name: "showNotifications",
          type: "boolean",
          default: "false",
          description: "Show notification badge.",
        },
        {
          name: "notificationCount",
          type: "number",
          default: "0",
          description: "Notification count.",
        },
        {
          name: "onNotificationClick",
          type: "() => void",
          description: "Notification click handler.",
        },
        {
          name: "showMobileMenu",
          type: "boolean",
          default: "true",
          description: "Show mobile menu button.",
        },
        {
          name: "onMobileMenuClick",
          type: "() => void",
          description: "Mobile menu click handler.",
        },
        {
          name: "rightContent",
          type: "ReactNode",
          description: "Custom content on the right side.",
        },
      ]}
      accessibility={[
        "Accessible dropdown menus with keyboard navigation",
        "ARIA labels on all buttons",
        "Focus visible states",
        "Screen reader support for notification count",
      ]}
      previous={{ title: "Tabs", href: "/docs/components/tabs" }}
      next={{ title: "Breadcrumb", href: "/docs/components/breadcrumb" }}
    />
  );
}
