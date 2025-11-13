import type { Meta, StoryObj } from "@storybook/react";
import { NotificationCenter, type Notification } from "./notification-center";
import { useState } from "react";

const meta: Meta<typeof NotificationCenter> = {
  title: "Components/NotificationCenter",
  component: NotificationCenter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationCenter>;

// Sample notification data
const createNotification = (overrides: Partial<Notification> = {}): Notification => ({
  id: Math.random().toString(36).substring(7),
  type: "info",
  title: "New notification",
  message: "This is a sample notification message",
  timestamp: new Date(),
  read: false,
  ...overrides,
});

const sampleNotifications: Notification[] = [
  createNotification({
    type: "mention",
    title: "Sarah mentioned you",
    message: "Sarah mentioned you in a comment: 'Great work on the new feature!'",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    avatar: "https://i.pravatar.cc/150?img=1",
    actionLabel: "View",
    onAction: () => alert("View action clicked"),
  }),
  createNotification({
    type: "success",
    title: "Payment received",
    message: "Your payment of $99.00 has been successfully processed",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  }),
  createNotification({
    type: "warning",
    title: "Subscription expiring soon",
    message: "Your subscription will expire in 3 days. Renew now to avoid interruption",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: false,
    actionLabel: "Renew",
    onAction: () => alert("Renew action clicked"),
  }),
  createNotification({
    type: "info",
    title: "New feature available",
    message: "Check out our new analytics dashboard with real-time insights",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
    read: true,
  }),
  createNotification({
    type: "error",
    title: "API rate limit exceeded",
    message: "You've exceeded your API rate limit. Upgrade your plan for higher limits",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
    actionLabel: "Upgrade",
    onAction: () => alert("Upgrade action clicked"),
  }),
];

// Interactive wrapper component for stories
const NotificationCenterWrapper = ({
  initialNotifications,
  ...props
}: {
  initialNotifications: Notification[];
  groupByDate?: boolean;
  autoMarkAsRead?: boolean;
  maxHeight?: number;
}) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <NotificationCenter
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
        {...props}
      />
    </div>
  );
};

// Default story with mixed notifications
export const Default: Story = {
  render: () => <NotificationCenterWrapper initialNotifications={sampleNotifications} />,
};

// All unread notifications
export const AllUnread: Story = {
  render: () => (
    <NotificationCenterWrapper
      initialNotifications={sampleNotifications.map((n) => ({ ...n, read: false }))}
    />
  ),
};

// All read notifications
export const AllRead: Story = {
  render: () => (
    <NotificationCenterWrapper
      initialNotifications={sampleNotifications.map((n) => ({ ...n, read: true }))}
    />
  ),
};

// Empty state
export const Empty: Story = {
  render: () => <NotificationCenterWrapper initialNotifications={[]} />,
};

// Grouped by date (default behavior)
export const GroupedByDate: Story = {
  render: () => (
    <NotificationCenterWrapper
      initialNotifications={[
        createNotification({
          type: "info",
          title: "Today notification 1",
          message: "This notification is from today",
          timestamp: new Date(),
          read: false,
        }),
        createNotification({
          type: "success",
          title: "Today notification 2",
          message: "Another notification from today",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: false,
        }),
        createNotification({
          type: "warning",
          title: "Yesterday notification",
          message: "This notification is from yesterday",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          read: true,
        }),
        createNotification({
          type: "error",
          title: "This week notification",
          message: "This notification is from 3 days ago",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          read: true,
        }),
        createNotification({
          type: "mention",
          title: "Older notification",
          message: "This notification is from 10 days ago",
          timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          read: true,
        }),
      ]}
      groupByDate={true}
    />
  ),
};

// Without date grouping
export const WithoutGrouping: Story = {
  render: () => (
    <NotificationCenterWrapper
      initialNotifications={sampleNotifications}
      groupByDate={false}
    />
  ),
};

// With avatars
export const WithAvatars: Story = {
  render: () => (
    <NotificationCenterWrapper
      initialNotifications={[
        createNotification({
          type: "mention",
          title: "John mentioned you",
          message: "John mentioned you in a comment",
          timestamp: new Date(),
          read: false,
          avatar: "https://i.pravatar.cc/150?img=12",
        }),
        createNotification({
          type: "mention",
          title: "Emily liked your post",
          message: "Emily liked your recent post about design systems",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          read: false,
          avatar: "https://i.pravatar.cc/150?img=5",
        }),
        createNotification({
          type: "mention",
          title: "Mike commented",
          message: "Mike left a comment on your project",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: true,
          avatar: "https://i.pravatar.cc/150?img=8",
        }),
      ]}
    />
  ),
};

// With action buttons
export const WithActionButtons: Story = {
  render: () => (
    <NotificationCenterWrapper
      initialNotifications={[
        createNotification({
          type: "info",
          title: "Team invitation",
          message: "Sarah invited you to join the Design Team",
          timestamp: new Date(),
          read: false,
          actionLabel: "Accept",
          onAction: () => alert("Accepted invitation"),
        }),
        createNotification({
          type: "warning",
          title: "Review request",
          message: "Mike requested a review on PR #123",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          read: false,
          actionLabel: "Review",
          onAction: () => alert("Review clicked"),
        }),
        createNotification({
          type: "success",
          title: "Payment received",
          message: "Your payment of $99.00 has been processed",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: false,
          actionLabel: "View Receipt",
          onAction: () => alert("View receipt clicked"),
        }),
      ]}
    />
  ),
};

// Long notification list (10+)
export const LongList: Story = {
  render: () => (
    <NotificationCenterWrapper
      initialNotifications={Array.from({ length: 15 }, (_, i) =>
        createNotification({
          type: ["info", "success", "warning", "error", "mention"][i % 5] as Notification["type"],
          title: `Notification ${i + 1}`,
          message: `This is notification number ${i + 1} with some additional text to show how longer messages are displayed`,
          timestamp: new Date(Date.now() - i * 60 * 60 * 1000),
          read: i % 3 === 0,
        })
      )}
    />
  ),
};

// Different notification types showcase
export const NotificationTypes: Story = {
  render: () => (
    <NotificationCenterWrapper
      initialNotifications={[
        createNotification({
          type: "info",
          title: "Info notification",
          message: "This is an informational notification with some details",
          timestamp: new Date(),
          read: false,
        }),
        createNotification({
          type: "success",
          title: "Success notification",
          message: "Your action was completed successfully",
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          read: false,
        }),
        createNotification({
          type: "warning",
          title: "Warning notification",
          message: "Please pay attention to this important warning",
          timestamp: new Date(Date.now() - 20 * 60 * 1000),
          read: false,
        }),
        createNotification({
          type: "error",
          title: "Error notification",
          message: "An error occurred and needs your attention",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          read: false,
        }),
        createNotification({
          type: "mention",
          title: "Mention notification",
          message: "Someone mentioned you in a conversation",
          timestamp: new Date(Date.now() - 40 * 60 * 1000),
          read: false,
          avatar: "https://i.pravatar.cc/150?img=3",
        }),
      ]}
    />
  ),
};

// Auto-mark as read on view
export const AutoMarkAsRead: Story = {
  render: () => (
    <NotificationCenterWrapper
      initialNotifications={sampleNotifications.map((n) => ({ ...n, read: false }))}
      autoMarkAsRead={true}
    />
  ),
};

// Custom max height
export const CustomMaxHeight: Story = {
  render: () => (
    <NotificationCenterWrapper
      initialNotifications={Array.from({ length: 10 }, (_, i) =>
        createNotification({
          type: "info",
          title: `Notification ${i + 1}`,
          message: `Message for notification ${i + 1}`,
          timestamp: new Date(Date.now() - i * 60 * 60 * 1000),
          read: false,
        })
      )}
      maxHeight={400}
    />
  ),
};

// Real-world example with mixed content
export const RealWorldExample: Story = {
  render: () => (
    <NotificationCenterWrapper
      initialNotifications={[
        createNotification({
          type: "mention",
          title: "Sarah Chen mentioned you",
          message: '@you Great work on the notification center! The design looks fantastic.',
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
          read: false,
          avatar: "https://i.pravatar.cc/150?img=1",
          actionLabel: "Reply",
          onAction: () => alert("Reply clicked"),
        }),
        createNotification({
          type: "success",
          title: "Deployment successful",
          message: "Your application has been deployed to production successfully",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          read: false,
        }),
        createNotification({
          type: "warning",
          title: "API rate limit warning",
          message: "You've used 80% of your API quota. Consider upgrading your plan",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          read: false,
          actionLabel: "Upgrade",
          onAction: () => alert("Upgrade clicked"),
        }),
        createNotification({
          type: "info",
          title: "New team member",
          message: "Mike Johnson joined your team as a developer",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          read: true,
          avatar: "https://i.pravatar.cc/150?img=12",
        }),
        createNotification({
          type: "error",
          title: "Payment failed",
          message: "Your payment method was declined. Please update your billing information",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          read: true,
          actionLabel: "Update Payment",
          onAction: () => alert("Update payment clicked"),
        }),
        createNotification({
          type: "mention",
          title: "Emily Rodriguez commented",
          message: '@you Can you review the latest PR when you get a chance?',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          read: true,
          avatar: "https://i.pravatar.cc/150?img=5",
          actionLabel: "View PR",
          onAction: () => alert("View PR clicked"),
        }),
      ]}
    />
  ),
};
