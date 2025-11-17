import type { Meta, StoryObj } from "@storybook/nextjs";
import { Sidebar, SidebarItem } from "./sidebar";
import {
  Home,
  Settings,
  Users,
  FileText,
  BarChart,
  Mail,
  Calendar,
  Bell,
  Package,
  CreditCard,
} from "lucide-react";

const meta: Meta<typeof Sidebar> = {
  title: "UI/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const items: SidebarItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <Home className="h-5 w-5" />,
    href: "#",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart className="h-5 w-5" />,
    href: "#",
    badge: 3,
  },
  {
    id: "content",
    label: "Content",
    icon: <FileText className="h-5 w-5" />,
    children: [
      { id: "posts", label: "Posts", href: "#", badge: 12 },
      { id: "pages", label: "Pages", href: "#" },
      { id: "media", label: "Media", href: "#" },
    ],
  },
  {
    id: "team",
    label: "Team",
    icon: <Users className="h-5 w-5" />,
    children: [
      { id: "members", label: "Members", href: "#" },
      { id: "roles", label: "Roles", href: "#" },
      { id: "invites", label: "Invites", href: "#", badge: 2 },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "#",
  },
];

export const Default: Story = {
  render: () => (
    <div className="h-[600px] flex">
      <Sidebar items={items} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Main Content</h1>
        <p className="text-muted-foreground">
          This is the main content area
        </p>
      </div>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div className="h-[600px] flex">
      <Sidebar items={items} defaultCollapsed />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Main Content</h1>
        <p className="text-muted-foreground">
          Sidebar starts collapsed
        </p>
      </div>
    </div>
  ),
};

export const WithManyItems: Story = {
  render: () => {
    const manyItems: SidebarItem[] = [
      { id: "dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" />, href: "#" },
      { id: "analytics", label: "Analytics", icon: <BarChart className="h-5 w-5" />, href: "#", badge: 5 },
      { id: "messages", label: "Messages", icon: <Mail className="h-5 w-5" />, href: "#", badge: 12 },
      { id: "calendar", label: "Calendar", icon: <Calendar className="h-5 w-5" />, href: "#" },
      { id: "notifications", label: "Notifications", icon: <Bell className="h-5 w-5" />, href: "#", badge: 3 },
      {
        id: "products",
        label: "Products",
        icon: <Package className="h-5 w-5" />,
        children: [
          { id: "all-products", label: "All Products", href: "#" },
          { id: "categories", label: "Categories", href: "#" },
          { id: "inventory", label: "Inventory", href: "#", badge: 7 },
          { id: "pricing", label: "Pricing", href: "#" },
        ],
      },
      {
        id: "billing",
        label: "Billing",
        icon: <CreditCard className="h-5 w-5" />,
        children: [
          { id: "invoices", label: "Invoices", href: "#" },
          { id: "subscriptions", label: "Subscriptions", href: "#" },
          { id: "payment-methods", label: "Payment Methods", href: "#" },
        ],
      },
      {
        id: "team-management",
        label: "Team",
        icon: <Users className="h-5 w-5" />,
        children: [
          { id: "members", label: "Members", href: "#" },
          { id: "roles", label: "Roles & Permissions", href: "#" },
          { id: "invitations", label: "Invitations", href: "#", badge: 2 },
        ],
      },
      { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" />, href: "#" },
    ];

    return (
      <div className="h-[800px] flex">
        <Sidebar items={manyItems} />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">
            Sidebar with many items and nested navigation
          </p>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    return (
      <div className="h-[600px] flex">
        <Sidebar
          items={items}
          onItemClick={(item) => setSelectedItem(item.label)}
        />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold">Interactive Sidebar</h1>
          {selectedItem ? (
            <div className="mt-4 rounded-md border bg-primary/10 p-4">
              <p className="text-sm font-semibold">Selected:</p>
              <p className="text-sm text-muted-foreground">{selectedItem}</p>
            </div>
          ) : (
            <p className="text-muted-foreground mt-4">
              Click a sidebar item to see it here
            </p>
          )}
        </div>
      </div>
    );
  },
};

export const SimpleLayout: Story = {
  render: () => {
    const simpleItems: SidebarItem[] = [
      { id: "overview", label: "Overview", icon: <Home className="h-5 w-5" /> },
      { id: "reports", label: "Reports", icon: <BarChart className="h-5 w-5" /> },
      { id: "documents", label: "Documents", icon: <FileText className="h-5 w-5" /> },
      { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
    ];

    return (
      <div className="h-[500px] flex">
        <Sidebar items={simpleItems} />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold">Simple Sidebar</h1>
          <p className="text-muted-foreground">
            Basic sidebar without nested items
          </p>
        </div>
      </div>
    );
  },
};

export const ApplicationLayout: Story = {
  render: () => {
    const [selectedView, setSelectedView] = React.useState("dashboard");

    const appItems: SidebarItem[] = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home className="h-5 w-5" />,
        onClick: () => setSelectedView("dashboard"),
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: <BarChart className="h-5 w-5" />,
        onClick: () => setSelectedView("analytics"),
        badge: 5,
      },
      {
        id: "content",
        label: "Content",
        icon: <FileText className="h-5 w-5" />,
        children: [
          {
            id: "posts",
            label: "All Posts",
            onClick: () => setSelectedView("posts"),
            badge: 42,
          },
          {
            id: "drafts",
            label: "Drafts",
            onClick: () => setSelectedView("drafts"),
            badge: 7,
          },
          {
            id: "published",
            label: "Published",
            onClick: () => setSelectedView("published"),
          },
        ],
      },
      {
        id: "team",
        label: "Team",
        icon: <Users className="h-5 w-5" />,
        children: [
          {
            id: "members",
            label: "Members",
            onClick: () => setSelectedView("members"),
          },
          {
            id: "invites",
            label: "Pending Invites",
            onClick: () => setSelectedView("invites"),
            badge: 3,
          },
        ],
      },
      {
        id: "settings",
        label: "Settings",
        icon: <Settings className="h-5 w-5" />,
        onClick: () => setSelectedView("settings"),
      },
    ];

    return (
      <div className="h-[700px] flex">
        <Sidebar items={appItems} />
        <div className="flex-1 p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-2xl font-semibold capitalize">{selectedView}</h1>
            <div className="text-sm text-muted-foreground">
              View: {selectedView}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-32 rounded-md border bg-card p-4"
              >
                <div className="text-sm font-semibold">Card {i}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Content for {selectedView}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
