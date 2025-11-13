import type { Meta, StoryObj } from "@storybook/react";
import { StatusIndicator } from "./status-indicator";

const meta: Meta<typeof StatusIndicator> = {
  title: "UI/StatusIndicator",
  component: StatusIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

export const Online: Story = {
  args: {
    status: "online",
  },
};

export const OnlineWithLabel: Story = {
  args: {
    status: "online",
    label: "Online",
  },
};

export const OnlineWithPulse: Story = {
  args: {
    status: "online",
    label: "Online",
    showPulse: true,
  },
};

export const Offline: Story = {
  args: {
    status: "offline",
    label: "Offline",
  },
};

export const Busy: Story = {
  args: {
    status: "busy",
    label: "Busy",
  },
};

export const Away: Story = {
  args: {
    status: "away",
    label: "Away",
  },
};

export const Idle: Story = {
  args: {
    status: "idle",
    label: "Idle",
  },
};

export const SmallSize: Story = {
  args: {
    status: "online",
    label: "Online",
    size: "sm",
  },
};

export const MediumSize: Story = {
  args: {
    status: "online",
    label: "Online",
    size: "md",
  },
};

export const LargeSize: Story = {
  args: {
    status: "online",
    label: "Online",
    size: "lg",
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusIndicator status="online" label="Online" showPulse />
      <StatusIndicator status="offline" label="Offline" />
      <StatusIndicator status="busy" label="Busy" />
      <StatusIndicator status="away" label="Away" />
      <StatusIndicator status="idle" label="Idle" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusIndicator status="online" label="Small" size="sm" />
      <StatusIndicator status="online" label="Medium" size="md" />
      <StatusIndicator status="online" label="Large" size="lg" />
    </div>
  ),
};

export const UserCard: Story = {
  render: () => (
    <div className="w-[300px] rounded-brutal border-2 border-brutal bg-card p-4">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-brutal border-2 border-brutal bg-primary/10" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold">John Doe</h3>
            <StatusIndicator status="online" showPulse size="sm" />
          </div>
          <p className="text-sm text-muted-foreground">Software Engineer</p>
        </div>
      </div>
    </div>
  ),
};

export const UserList: Story = {
  render: () => {
    const users = [
      { name: "Alice Johnson", status: "online" as const, role: "Designer" },
      { name: "Bob Smith", status: "busy" as const, role: "Developer" },
      { name: "Carol White", status: "away" as const, role: "Manager" },
      { name: "David Brown", status: "offline" as const, role: "Developer" },
    ];

    return (
      <div className="w-[400px] rounded-brutal border-2 border-brutal bg-card">
        <div className="border-b-2 border-brutal p-4">
          <h2 className="font-bold">Team Members</h2>
        </div>
        <div className="divide-y divide-brutal">
          {users.map((user) => (
            <div key={user.name} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
              <StatusIndicator status={user.status} label={user.status} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const ServerStatus: Story = {
  render: () => {
    const servers = [
      { name: "API Server", status: "online" as const, uptime: "99.9%" },
      { name: "Database", status: "online" as const, uptime: "99.8%" },
      { name: "Cache", status: "busy" as const, uptime: "98.5%" },
      { name: "Worker", status: "offline" as const, uptime: "0%" },
    ];

    return (
      <div className="w-[500px] rounded-brutal border-2 border-brutal bg-card">
        <div className="border-b-2 border-brutal p-4">
          <h2 className="font-bold">System Status</h2>
        </div>
        <div className="divide-y divide-brutal">
          {servers.map((server) => (
            <div
              key={server.name}
              className="p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <StatusIndicator
                  status={server.status}
                  showPulse={server.status === "online"}
                  size="lg"
                />
                <div>
                  <p className="font-bold text-sm">{server.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Uptime: {server.uptime}
                  </p>
                </div>
              </div>
              <div className="text-sm capitalize text-muted-foreground">
                {server.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
