/**
 * ✅ FABRK STORYBOOK
 * NotificationBadge component examples and variations.
 */

import type { Meta, StoryObj } from "@storybook/nextjs";
import { NotificationBadge } from "./notification-badge";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Bell, Mail, MessageSquare, ShoppingCart, User } from "lucide-react";

const meta = {
  title: "UI/NotificationBadge",
  component: NotificationBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A notification badge component for displaying counts or indicators on elements. Supports multiple variants, positions, and animations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: "number",
      description: "Number to display in the badge",
    },
    max: {
      control: "number",
      description: "Maximum number to display before showing '+'",
    },
    showZero: {
      control: "boolean",
      description: "Show badge when count is 0",
    },
    dot: {
      control: "boolean",
      description: "Show as a dot instead of number",
    },
    variant: {
      control: "select",
      options: ["primary", "destructive", "success", "warning"],
      description: "Visual style variant",
    },
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      description: "Badge position relative to parent",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Badge size",
    },
    pulse: {
      control: "boolean",
      description: "Enable pulse animation",
    },
  },
} satisfies Meta<typeof NotificationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const OnButton: Story = {
  args: {
    count: 5,
    variant: "primary",
    position: "top-right",
  },
  render: (args) => (
    <NotificationBadge {...args}>
      <Button>
        <Bell className="h-4 w-4" />
        Notifications
      </Button>
    </NotificationBadge>
  ),
};

export const OnAvatar: Story = {
  args: {
    count: 3,
    variant: "destructive",
    position: "top-right",
  },
  render: (args) => (
    <NotificationBadge {...args}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </NotificationBadge>
  ),
};

export const OnIcon: Story = {
  args: {
    count: 12,
    variant: "primary",
    position: "top-right",
  },
  render: (args) => (
    <NotificationBadge {...args}>
      <div className="rounded-brutal border-brutal bg-card p-3 shadow-brutal">
        <Mail className="h-6 w-6" />
      </div>
    </NotificationBadge>
  ),
};

// Dot Variant
export const DotVariant: Story = {
  args: {
    dot: true,
    variant: "destructive",
    position: "top-right",
    pulse: true,
  },
  render: (args) => (
    <NotificationBadge {...args}>
      <Button variant="outline">
        <MessageSquare className="h-4 w-4" />
        Messages
      </Button>
    </NotificationBadge>
  ),
};

// Count Variations
export const CountVariations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={0}>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Hidden (0)
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">count=0 (hidden)</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={0} showZero>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Shown (0)
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">
          count=0 (showZero)
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={1}>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Single
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">count=1</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={10}>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Double Digit
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">count=10</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={99}>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Max
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">count=99</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={100}>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Over Max
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">count=100 (99+)</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={999} max={999}>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Custom Max
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">max=999</span>
      </div>
    </div>
  ),
};

// Color Variants
export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} variant="primary">
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Primary
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">primary</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={3} variant="destructive">
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Destructive
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">destructive</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={7} variant="success">
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Success
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">success</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={2} variant="warning">
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Warning
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">warning</span>
      </div>
    </div>
  ),
};

// All Positions
export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} position="top-right">
          <div className="rounded-brutal border-brutal bg-card p-6 shadow-brutal">
            <Mail className="h-8 w-8" />
          </div>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">top-right</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} position="top-left">
          <div className="rounded-brutal border-brutal bg-card p-6 shadow-brutal">
            <Mail className="h-8 w-8" />
          </div>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">top-left</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} position="bottom-right">
          <div className="rounded-brutal border-brutal bg-card p-6 shadow-brutal">
            <Mail className="h-8 w-8" />
          </div>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">bottom-right</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} position="bottom-left">
          <div className="rounded-brutal border-brutal bg-card p-6 shadow-brutal">
            <Mail className="h-8 w-8" />
          </div>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">bottom-left</span>
      </div>
    </div>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} size="sm">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
            Small
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">sm</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} size="md">
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Medium
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">md</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} size="lg">
          <Button variant="outline" size="lg">
            <Bell className="h-4 w-4" />
            Large
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
    </div>
  ),
};

// With Pulse Animation
export const WithPulse: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} pulse variant="destructive">
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            New Messages
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">with pulse</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge dot pulse variant="destructive">
          <Button variant="outline">
            <Mail className="h-4 w-4" />
            Unread
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">dot + pulse</span>
      </div>
    </div>
  ),
};

// Custom Offset
export const CustomOffset: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} offset={{ x: 0, y: 0 }}>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Default
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">offset x:0 y:0</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} offset={{ x: 8, y: 0 }}>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Right Offset
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">offset x:8 y:0</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} offset={{ x: 0, y: -8 }}>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Top Offset
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">offset x:0 y:-8</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <NotificationBadge count={5} offset={{ x: 8, y: -8 }}>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
            Diagonal
          </Button>
        </NotificationBadge>
        <span className="text-xs text-muted-foreground">offset x:8 y:-8</span>
      </div>
    </div>
  ),
};

// Navigation Menu Example
export const NavigationMenu: Story = {
  render: () => (
    <nav className="flex items-center gap-4 rounded-brutal border-brutal bg-card p-4 shadow-brutal">
      <NotificationBadge count={3} variant="destructive">
        <button className="rounded-brutal p-2 hover:bg-muted">
          <Bell className="h-5 w-5" />
        </button>
      </NotificationBadge>

      <NotificationBadge count={12} variant="primary">
        <button className="rounded-brutal p-2 hover:bg-muted">
          <Mail className="h-5 w-5" />
        </button>
      </NotificationBadge>

      <NotificationBadge count={5} variant="success">
        <button className="rounded-brutal p-2 hover:bg-muted">
          <MessageSquare className="h-5 w-5" />
        </button>
      </NotificationBadge>

      <NotificationBadge dot pulse variant="warning">
        <button className="rounded-brutal p-2 hover:bg-muted">
          <ShoppingCart className="h-5 w-5" />
        </button>
      </NotificationBadge>
    </nav>
  ),
};

// Multiple Badges Example
export const MultipleBadges: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <NotificationBadge count={5} position="top-right" variant="primary">
          <NotificationBadge
            count={3}
            position="bottom-right"
            variant="destructive"
          >
            <div className="rounded-brutal border-brutal bg-card p-8 shadow-brutal">
              <User className="h-12 w-12" />
            </div>
          </NotificationBadge>
        </NotificationBadge>
      </div>
      <span className="text-xs text-muted-foreground">
        Two badges on same element
      </span>
    </div>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [count, setCount] = React.useState(5);

    return (
      <div className="flex flex-col items-center gap-6">
        <NotificationBadge count={count} variant="primary" pulse={count > 0}>
          <Button variant="outline" size="lg">
            <Bell className="h-5 w-5" />
            Notifications
          </Button>
        </NotificationBadge>

        <div className="flex gap-2">
          <Button size="sm" onClick={() => setCount(count + 1)}>
            Add +1
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setCount(Math.max(0, count - 1))}
          >
            Remove -1
          </Button>
          <Button size="sm" variant="outline" onClick={() => setCount(0)}>
            Clear
          </Button>
        </div>

        <span className="text-sm text-muted-foreground">
          Current count: {count}
        </span>
      </div>
    );
  },
};

// Real-World Example: Inbox
export const RealWorldInbox: Story = {
  render: () => (
    <div className="w-[400px] rounded-brutal border-brutal bg-card shadow-brutal">
      <div className="border-b-2 border-brutal p-4">
        <h3 className="font-bold">Inbox</h3>
      </div>
      <div className="divide-y-2 divide-brutal">
        {[
          { title: "New Messages", icon: Mail, count: 12, variant: "primary" },
          {
            title: "Mentions",
            icon: MessageSquare,
            count: 3,
            variant: "destructive",
          },
          {
            title: "Updates",
            icon: Bell,
            count: 7,
            variant: "success",
          },
        ].map((item) => (
          <button
            key={item.title}
            className="flex w-full items-center justify-between p-4 text-left hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{item.title}</span>
            </div>
            <NotificationBadge
              count={item.count}
              variant={item.variant as any}
              size="sm"
            >
              <div />
            </NotificationBadge>
          </button>
        ))}
      </div>
    </div>
  ),
};
