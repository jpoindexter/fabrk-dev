import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";
import {
  Inbox,
  FileText,
  Users,
  Search,
  Package,
  ShoppingCart,
  Image,
  MessageSquare,
} from "lucide-react";

const meta: Meta<typeof EmptyState> = {
  title: "UI/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: Inbox,
    title: "No messages",
    description: "You don't have any messages yet. Start a conversation to get started.",
  },
};

export const WithAction: Story = {
  args: {
    icon: FileText,
    title: "No documents",
    description: "Create your first document to get started.",
    action: {
      label: "Create Document",
      onClick: () => alert("Create document clicked"),
    },
  },
};

export const NoIcon: Story = {
  args: {
    title: "No data available",
    description: "There is no data to display at this time.",
  },
};

export const InboxEmpty: Story = {
  render: () => (
    <div className="w-[600px] rounded-md border bg-card">
      <EmptyState
        icon={Inbox}
        title="Inbox Zero!"
        description="You've read all your messages. Take a break or start a new conversation."
      />
    </div>
  ),
};

export const NoSearchResults: Story = {
  render: () => (
    <div className="w-[600px] rounded-md border bg-card">
      <EmptyState
        icon={Search}
        title="No results found"
        description="We couldn't find any results matching your search. Try adjusting your filters or search terms."
        action={{
          label: "Clear Filters",
          onClick: () => alert("Filters cleared"),
        }}
      />
    </div>
  ),
};

export const NoTeamMembers: Story = {
  render: () => (
    <div className="w-[600px] rounded-md border bg-card">
      <EmptyState
        icon={Users}
        title: "No team members yet",
        description="Invite team members to collaborate on your projects.",
        action={{
          label: "Invite Members",
          onClick: () => alert("Invite clicked"),
        }}
      />
    </div>
  ),
};

export const NoProducts: Story = {
  render: () => (
    <div className="w-[600px] rounded-md border bg-card">
      <EmptyState
        icon={Package}
        title="No products in store",
        description="Add your first product to start selling.",
        action={{
          label: "Add Product",
          onClick: () => alert("Add product clicked"),
        }}
      />
    </div>
  ),
};

export const EmptyCart: Story = {
  render: () => (
    <div className="w-[600px] rounded-md border bg-card">
      <EmptyState
        icon={ShoppingCart}
        title="Your cart is empty",
        description="Browse our products and add items to your cart.",
        action={{
          label: "Start Shopping",
          onClick: () => alert("Shopping clicked"),
        }}
      />
    </div>
  ),
};

export const NoImages: Story = {
  render: () => (
    <div className="w-[600px] rounded-md border bg-card">
      <EmptyState
        icon={Image}
        title="No images uploaded",
        description="Upload images to create your gallery.",
        action={{
          label: "Upload Images",
          onClick: () => alert("Upload clicked"),
        }}
      />
    </div>
  ),
};

export const NoComments: Story = {
  render: () => (
    <div className="w-[600px] rounded-md border bg-card">
      <EmptyState
        icon={MessageSquare}
        title="No comments yet",
        description="Be the first to share your thoughts on this post.",
        action={{
          label: "Add Comment",
          onClick: () => alert("Comment clicked"),
        }}
      />
    </div>
  ),
};

export const InDataTable: Story = {
  render: () => (
    <div className="w-[800px] space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Orders</h2>
        <div className="text-sm text-muted-foreground">0 results</div>
      </div>
      <div className="rounded-md border bg-card">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="p-3 text-left font-semibold">ID</th>
              <th className="p-3 text-left font-semibold">Customer</th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th className="p-3 text-left font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4}>
                <EmptyState
                  icon={ShoppingCart}
                  title="No orders found"
                  description="Orders will appear here when customers make purchases."
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
};
