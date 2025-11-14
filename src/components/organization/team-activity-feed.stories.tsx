import type { Meta, StoryObj } from "@storybook/react";
import { TeamActivityFeed } from "./team-activity-feed";

const meta: Meta<typeof TeamActivityFeed> = {
  title: "Organization/TeamActivityFeed",
  component: TeamActivityFeed,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TeamActivityFeed>;

const mockActivities = [
  {
    id: "1",
    type: "created" as const,
    user: { name: "John Doe", email: "john@example.com" },
    action: "created",
    target: "Project Roadmap",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    type: "commented" as const,
    user: { name: "Jane Smith", email: "jane@example.com" },
    action: "commented on",
    target: "Design Review",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "3",
    type: "uploaded" as const,
    user: { name: "Bob Johnson", email: "bob@example.com" },
    action: "uploaded",
    target: "logo-final.png",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    metadata: { size: "2.4 MB", type: "image/png" },
  },
  {
    id: "4",
    type: "invited" as const,
    user: { name: "Alice Williams", email: "alice@example.com" },
    action: "invited",
    target: "charlie@example.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: "5",
    type: "completed" as const,
    user: { name: "Charlie Brown", email: "charlie@example.com" },
    action: "completed",
    target: "Authentication System",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
];

export const Default: Story = {
  args: {
    activities: mockActivities,
  },
};

export const Empty: Story = {
  args: {
    activities: [],
  },
};

export const WithMetadata: Story = {
  args: {
    activities: [
      {
        id: "1",
        type: "uploaded" as const,
        user: { name: "John Doe" },
        action: "uploaded",
        target: "document.pdf",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        metadata: {
          size: "5.2 MB",
          pages: "24",
          format: "PDF",
        },
      },
      {
        id: "2",
        type: "updated" as const,
        user: { name: "Jane Smith" },
        action: "updated",
        target: "API Settings",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        metadata: {
          changes: "3",
          environment: "production",
        },
      },
    ],
  },
};

export const AllActivityTypes: Story = {
  args: {
    activities: [
      {
        id: "1",
        type: "created" as const,
        user: { name: "User One" },
        action: "created",
        target: "New Feature",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "2",
        type: "updated" as const,
        user: { name: "User Two" },
        action: "updated",
        target: "Settings",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
      },
      {
        id: "3",
        type: "deleted" as const,
        user: { name: "User Three" },
        action: "deleted",
        target: "Old File",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
      },
      {
        id: "4",
        type: "commented" as const,
        user: { name: "User Four" },
        action: "commented on",
        target: "Pull Request",
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
      },
      {
        id: "5",
        type: "uploaded" as const,
        user: { name: "User Five" },
        action: "uploaded",
        target: "image.jpg",
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
      },
      {
        id: "6",
        type: "invited" as const,
        user: { name: "User Six" },
        action: "invited",
        target: "newuser@example.com",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: "7",
        type: "completed" as const,
        user: { name: "User Seven" },
        action: "completed",
        target: "Task",
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
      },
      {
        id: "8",
        type: "configured" as const,
        user: { name: "User Eight" },
        action: "configured",
        target: "Webhooks",
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
      },
    ],
  },
};

export const CustomHeight: Story = {
  args: {
    activities: mockActivities,
    maxHeight: 200,
  },
};

export const WithoutTimestamp: Story = {
  args: {
    activities: mockActivities,
    showTimestamp: false,
  },
};
