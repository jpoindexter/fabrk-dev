import type { Meta, StoryObj } from "@storybook/react";
import { VirtualList, DynamicVirtualList, GridVirtualList } from "./virtual-list";
import { useState } from "react";
import { User, Mail, Calendar, MessageSquare, Image as ImageIcon } from "lucide-react";
import { Avatar } from "./avatar";
import { Badge } from "./badge";

const meta: Meta<typeof VirtualList> = {
  title: "UI/VirtualList",
  component: VirtualList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof VirtualList>;

// Generate large dataset for testing
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is item number ${i + 1} in the list`,
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));

export const BasicList: Story = {
  render: () => {
    const items = generateItems(10000);

    return (
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm font-bold">
            Rendering 10,000 items with virtualization
          </p>
          <p className="text-xs text-muted-foreground">
            Only visible items are rendered for optimal performance
          </p>
        </div>
        <VirtualList
          items={items}
          itemHeight={60}
          containerHeight={400}
          renderItem={(item) => (
            <div className="px-4 py-3 border-b border-brutal hover:bg-accent transition-colors">
              <p className="font-bold text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          )}
          className="border-brutal rounded-brutal bg-card"
        />
      </div>
    );
  },
};

export const InfiniteScroll: Story = {
  render: () => {
    const [items, setItems] = useState(generateItems(50));
    const [loading, setLoading] = useState(false);

    const loadMore = () => {
      setLoading(true);
      setTimeout(() => {
        setItems((prev) => [
          ...prev,
          ...generateItems(50).map((item) => ({
            ...item,
            id: prev.length + item.id,
            title: `Item ${prev.length + item.id}`,
          })),
        ]);
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm font-bold">
            Infinite scroll with lazy loading ({items.length} items loaded)
          </p>
          <p className="text-xs text-muted-foreground">
            Scroll to bottom to load more items
          </p>
        </div>
        <VirtualList
          items={items}
          itemHeight={60}
          containerHeight={400}
          renderItem={(item) => (
            <div className="px-4 py-3 border-b border-brutal hover:bg-accent transition-colors">
              <p className="font-bold text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          )}
          onEndReached={loadMore}
          endReachedThreshold={0.8}
          loading={loading}
          className="border-brutal rounded-brutal bg-card"
        />
      </div>
    );
  },
};

export const DynamicHeights: Story = {
  render: () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      title: `Item ${i + 1}`,
      description:
        i % 3 === 0
          ? `This is a longer description for item ${i + 1}. It has multiple lines of text to demonstrate dynamic height handling. The virtual list will adjust to accommodate different content sizes.`
          : `Short description for item ${i + 1}`,
    }));

    return (
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm font-bold">
            Dynamic item heights (1,000 items)
          </p>
          <p className="text-xs text-muted-foreground">
            Items automatically adjust to content height
          </p>
        </div>
        <DynamicVirtualList
          items={items}
          containerHeight={400}
          estimatedItemHeight={80}
          renderItem={(item) => (
            <div className="px-4 py-3 border-b border-brutal hover:bg-accent transition-colors">
              <p className="font-bold text-sm mb-1">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          )}
          className="border-brutal rounded-brutal bg-card"
        />
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    return (
      <div className="p-4">
        <VirtualList
          items={[]}
          itemHeight={60}
          containerHeight={400}
          renderItem={() => null}
          emptyComponent={
            <div className="text-center p-8">
              <div className="rounded-brutal border-brutal bg-muted p-4 inline-block mb-4">
                <Mail className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="font-bold mb-2">No items to display</p>
              <p className="text-sm text-muted-foreground">
                The list is currently empty
              </p>
            </div>
          }
          className="border-brutal rounded-brutal bg-card"
        />
      </div>
    );
  },
};

export const UserList: Story = {
  render: () => {
    const users = Array.from({ length: 5000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ["Admin", "Editor", "Viewer"][i % 3],
      status: ["online", "offline", "away"][i % 3],
      lastActive: new Date(Date.now() - Math.random() * 86400000 * 30),
    }));

    return (
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm font-bold">
            User directory (5,000 users)
          </p>
          <p className="text-xs text-muted-foreground">
            Virtualized user list with avatars and status
          </p>
        </div>
        <VirtualList
          items={users}
          itemHeight={72}
          containerHeight={500}
          renderItem={(user) => (
            <div className="px-4 py-3 border-b border-brutal hover:bg-accent transition-colors flex items-center gap-3">
              <Avatar>
                <User className="h-4 w-4" />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-sm">{user.name}</p>
                  <Badge
                    variant={user.status === "online" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {user.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium">{user.role}</p>
                <p className="text-xs text-muted-foreground">
                  {user.lastActive.toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
          className="border-brutal rounded-brutal bg-card"
        />
      </div>
    );
  },
};

export const LogViewer: Story = {
  render: () => {
    const logs = Array.from({ length: 50000 }, (_, i) => ({
      id: i + 1,
      timestamp: new Date(Date.now() - i * 1000).toISOString(),
      level: ["INFO", "WARN", "ERROR", "DEBUG"][i % 4],
      message: `Log entry ${i + 1}: ${["Database query executed", "API request received", "Cache hit", "Authentication successful"][i % 4]}`,
    }));

    return (
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm font-bold">
            Server logs (50,000 entries)
          </p>
          <p className="text-xs text-muted-foreground">
            High-performance log viewer with virtualization
          </p>
        </div>
        <VirtualList
          items={logs}
          itemHeight={48}
          containerHeight={500}
          renderItem={(log) => (
            <div className="px-4 py-2 border-b border-brutal hover:bg-accent transition-colors font-mono text-xs flex items-center gap-3">
              <span className="text-muted-foreground">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <Badge
                variant={
                  log.level === "ERROR"
                    ? "destructive"
                    : log.level === "WARN"
                    ? "secondary"
                    : "outline"
                }
                className="text-xs"
              >
                {log.level}
              </Badge>
              <span className="flex-1">{log.message}</span>
            </div>
          )}
          className="border-brutal rounded-brutal bg-card"
        />
      </div>
    );
  },
};

export const GridLayout: Story = {
  render: () => {
    const items = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      title: `Image ${i + 1}`,
      color: `hsl(${(i * 137.5) % 360}, 70%, 60%)`,
    }));

    return (
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm font-bold">
            Image grid (10,000 items)
          </p>
          <p className="text-xs text-muted-foreground">
            Virtualized grid layout for optimal performance
          </p>
        </div>
        <GridVirtualList
          items={items}
          containerHeight={500}
          containerWidth={800}
          itemHeight={150}
          itemWidth={150}
          columns={5}
          gap={8}
          renderItem={(item) => (
            <div className="h-full border-brutal rounded-brutal overflow-hidden hover:shadow-brutal-lg transition-all cursor-pointer">
              <div
                className="h-24 flex items-center justify-center"
                style={{ backgroundColor: item.color }}
              >
                <ImageIcon className="h-8 w-8 text-white/80" />
              </div>
              <div className="p-2 bg-card">
                <p className="text-xs font-bold truncate">{item.title}</p>
              </div>
            </div>
          )}
          className="border-brutal rounded-brutal bg-background"
        />
      </div>
    );
  },
};

export const MessageThread: Story = {
  render: () => {
    const messages = Array.from({ length: 3000 }, (_, i) => ({
      id: i + 1,
      author: `User ${(i % 10) + 1}`,
      content: i % 5 === 0
        ? `This is a longer message with more content. It demonstrates how the virtual list handles messages of varying lengths. Message number ${i + 1}.`
        : `Message ${i + 1}`,
      timestamp: new Date(Date.now() - (3000 - i) * 60000),
      isOwn: i % 3 === 0,
    }));

    return (
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm font-bold">
            Chat messages (3,000 messages)
          </p>
          <p className="text-xs text-muted-foreground">
            Smooth scrolling through thousands of messages
          </p>
        </div>
        <DynamicVirtualList
          items={messages}
          containerHeight={500}
          estimatedItemHeight={60}
          renderItem={(message) => (
            <div
              className={cn(
                "px-4 py-2 flex",
                message.isOwn ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-brutal border-brutal p-3",
                  message.isOwn ? "bg-primary text-primary-foreground" : "bg-card"
                )}
              >
                {!message.isOwn && (
                  <p className="text-xs font-bold mb-1">{message.author}</p>
                )}
                <p className="text-sm">{message.content}</p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    message.isOwn
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          )}
          className="border-brutal rounded-brutal bg-background"
        />
      </div>
    );
  },
};

export const NotificationCenter: Story = {
  render: () => {
    const notifications = Array.from({ length: 2000 }, (_, i) => ({
      id: i + 1,
      type: ["message", "mention", "system", "update"][i % 4],
      title: `Notification ${i + 1}`,
      description: `This is notification number ${i + 1}`,
      timestamp: new Date(Date.now() - i * 300000),
      read: i % 3 === 0,
    }));

    const getIcon = (type: string) => {
      switch (type) {
        case "message":
          return MessageSquare;
        case "mention":
          return User;
        case "system":
          return Calendar;
        default:
          return Mail;
      }
    };

    return (
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm font-bold">
            Notification center (2,000 notifications)
          </p>
          <p className="text-xs text-muted-foreground">
            Fast rendering of notification history
          </p>
        </div>
        <VirtualList
          items={notifications}
          itemHeight={80}
          containerHeight={500}
          renderItem={(notification) => {
            const Icon = getIcon(notification.type);
            return (
              <div
                className={cn(
                  "px-4 py-3 border-b border-brutal hover:bg-accent transition-colors flex items-start gap-3",
                  !notification.read && "bg-primary/5"
                )}
              >
                <div className="rounded-brutal border-brutal bg-muted p-2">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-sm">{notification.title}</p>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          }}
          className="border-brutal rounded-brutal bg-card"
        />
      </div>
    );
  },
};

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
