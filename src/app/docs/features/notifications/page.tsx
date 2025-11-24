import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Notifications System - Fabrk Documentation",
  description: "Learn how to implement real-time notifications with persistence, bell icon, and read/unread states.",
};

export default function NotificationsPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold mb-4">Notifications System</h1>
        <p className="text-lg text-muted-foreground">
          Real-time notifications with database persistence, bell icon badge, and read/unread state management.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            The notifications system combines real-time delivery via Pusher with database persistence
            for a complete notification experience. Users receive instant notifications with a visual
            bell icon indicator and can manage their notification history.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Real-time delivery:</strong> Instant push via Pusher</li>
            <li><strong>Persistence:</strong> Stored in database for history</li>
            <li><strong>Bell icon badge:</strong> Visual unread count indicator</li>
            <li><strong>Read/Unread states:</strong> Mark individual or all as read</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Database Schema</h2>
          <p className="mb-4">
            Notification model in Prisma schema:
          </p>
          <CodeBlock language="prisma" code={`// prisma/schema.prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  type      String   // "info", "success", "warning", "error"
  title     String
  body      String?
  link      String?  // Optional action link

  read      Boolean  @default(false)
  readAt    DateTime?

  createdAt DateTime @default(now())

  @@index([userId, read])
  @@index([userId, createdAt])
}`} />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Creating Notifications</h2>
          <p className="mb-4">
            Send notifications from anywhere in your application:
          </p>
          <CodeBlock language="typescript" code={`// src/lib/notifications.ts
import { prisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher/server";

interface CreateNotificationInput {
  userId: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  body?: string;
  link?: string;
}

export async function createNotification(input: CreateNotificationInput) {
  // Save to database
  const notification = await prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      body: input.body,
      link: input.link,
    },
  });

  // Send real-time push
  await pusherServer.trigger(
    \`user-\${input.userId}\`,
    "notification",
    {
      id: notification.id,
      type: notification.type,
      title: notification.title,
      body: notification.body,
      link: notification.link,
      createdAt: notification.createdAt.toISOString(),
    }
  );

  return notification;
}

// Usage examples
await createNotification({
  userId: user.id,
  type: "success",
  title: "Payment successful",
  body: "Your subscription has been activated",
  link: "/dashboard/billing",
});

await createNotification({
  userId: user.id,
  type: "info",
  title: "New team member",
  body: "John Doe joined your organization",
});`} />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Bell Icon Component</h2>
          <p className="mb-4">
            The notification bell with real-time updates and dropdown:
          </p>
          <CodeBlock language="tsx" code={`"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { pusherClient } from "@/lib/pusher/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  type: string;
  title: string;
  body?: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch existing notifications on mount
  useEffect(() => {
    fetch("/api/v1/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      });
  }, []);

  // Subscribe to real-time notifications
  useEffect(() => {
    const channel = pusherClient.subscribe(\`user-\${userId}\`);

    channel.bind("notification", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(\`user-\${userId}\`);
    };
  }, [userId]);

  const markAsRead = async (id: string) => {
    await fetch(\`/api/v1/notifications/\${id}/read\`, { method: "POST" });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    await fetch("/api/v1/notifications/read-all", { method: "POST" });
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-muted">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-4 text-center text-muted-foreground">
              No notifications
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={\`p-3 border-b hover:bg-muted cursor-pointer \${
                  !notification.read ? "bg-primary/5" : ""
                }\`}
                onClick={() => markAsRead(notification.id)}
              >
                <p className="font-medium text-sm">{notification.title}</p>
                {notification.body && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.body}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`} />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">API Routes</h2>
          <p className="mb-4">
            Notification management endpoints:
          </p>
          <CodeBlock language="typescript" code={`// GET /api/v1/notifications
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const unreadCount = await prisma.notification.count({
    where: { userId: session.user.id, read: false },
  });

  return Response.json({ notifications, unreadCount });
}

// POST /api/v1/notifications/:id/read
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.notification.update({
    where: { id: params.id, userId: session.user.id },
    data: { read: true, readAt: new Date() },
  });

  return Response.json({ success: true });
}

// POST /api/v1/notifications/read-all
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.notification.updateMany({
    where: { userId: session.user.id, read: false },
    data: { read: true, readAt: new Date() },
  });

  return Response.json({ success: true });
}`} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Be selective:</strong> Only notify for important, actionable events</li>
            <li><strong>Clear titles:</strong> Make notifications scannable at a glance</li>
            <li><strong>Include links:</strong> Let users take action directly from the notification</li>
            <li><strong>Cleanup old notifications:</strong> Archive or delete notifications older than 30 days</li>
            <li><strong>Allow preferences:</strong> Let users control which notifications they receive</li>
            <li><strong>Test thoroughly:</strong> Ensure real-time and persistence work together</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
