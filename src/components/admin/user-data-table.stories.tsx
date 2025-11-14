import type { Meta, StoryObj } from "@storybook/react";
import { UserDataTable } from "./user-data-table";

const meta: Meta<typeof UserDataTable> = {
  title: "Admin/UserDataTable",
  component: UserDataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserDataTable>;

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "ADMIN" as const,
    status: "ACTIVE" as const,
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date("2024-11-14"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "USER" as const,
    status: "ACTIVE" as const,
    createdAt: new Date("2024-02-20"),
    lastLogin: new Date("2024-11-13"),
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "USER" as const,
    status: "INACTIVE" as const,
    createdAt: new Date("2024-03-10"),
    lastLogin: new Date("2024-10-01"),
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "USER" as const,
    status: "SUSPENDED" as const,
    createdAt: new Date("2024-04-05"),
    lastLogin: new Date("2024-09-15"),
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "ADMIN" as const,
    status: "ACTIVE" as const,
    createdAt: new Date("2024-05-12"),
    lastLogin: new Date("2024-11-14"),
  },
];

export const Default: Story = {
  args: {
    users: mockUsers,
  },
};

export const WithActions: Story = {
  args: {
    users: mockUsers,
    onEdit: (user) => alert(`Editing ${user.name}`),
    onDelete: (userId) => alert(`Deleting user ${userId}`),
    onBulkDelete: (userIds) => alert(`Bulk deleting ${userIds.length} users`),
  },
};

export const Empty: Story = {
  args: {
    users: [],
  },
};

export const LargeDataset: Story = {
  args: {
    users: Array.from({ length: 50 }, (_, i) => ({
      id: `user-${i}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 5 === 0 ? ("ADMIN" as const) : ("USER" as const),
      status:
        i % 3 === 0
          ? ("ACTIVE" as const)
          : i % 3 === 1
            ? ("INACTIVE" as const)
            : ("SUSPENDED" as const),
      createdAt: new Date(2024, 0, (i % 28) + 1),
      lastLogin: i % 4 === 0 ? undefined : new Date(2024, 10, (i % 14) + 1),
    })),
    onEdit: (user) => console.log("Edit", user),
    onDelete: (userId) => console.log("Delete", userId),
  },
};
