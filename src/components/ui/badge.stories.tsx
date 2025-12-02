import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">DEFAULT</Badge>
      <Badge variant="secondary">SECONDARY</Badge>
      <Badge variant="destructive">DESTRUCTIVE</Badge>
      <Badge variant="outline">OUTLINE</Badge>
      <Badge variant="success">SUCCESS</Badge>
      <Badge variant="warning">WARNING</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground w-24 font-mono text-xs">[STATUS]:</span>
        <Badge variant="success">ACTIVE</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground w-24 font-mono text-xs">[STATUS]:</span>
        <Badge variant="warning">PENDING</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground w-24 font-mono text-xs">[STATUS]:</span>
        <Badge variant="destructive">ERROR</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground w-24 font-mono text-xs">[STATUS]:</span>
        <Badge variant="outline">DRAFT</Badge>
      </div>
    </div>
  ),
};

export const Tags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-1">
      <Badge variant="secondary">react</Badge>
      <Badge variant="secondary">typescript</Badge>
      <Badge variant="secondary">nextjs</Badge>
      <Badge variant="secondary">tailwind</Badge>
      <Badge variant="secondary">prisma</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="outline" className="gap-1.5">
        <span className="bg-success h-2 w-2 rounded-none" />
        ONLINE
      </Badge>
      <Badge variant="outline" className="gap-1.5">
        <span className="bg-warning h-2 w-2 rounded-none" />
        AWAY
      </Badge>
      <Badge variant="outline" className="gap-1.5">
        <span className="bg-destructive h-2 w-2 rounded-none" />
        OFFLINE
      </Badge>
    </div>
  ),
};
