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
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x40] FEATURES ] NOTIFICATIONS</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">NOTIFICATIONS_SYSTEM</h1>
        <p className="font-mono text-sm text-muted-foreground">&gt; Real-time notifications with database persistence, bell icon badge, and read/unread state management.</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-4">
          <h2 className="font-mono text-lg font-bold mb-4">OVERVIEW</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            The notifications system combines real-time delivery via Pusher with database persistence
            for a complete notification experience. Users receive instant notifications with a visual
            bell icon indicator and can manage their notification history.
          </p>
          <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
            <li className="font-mono text-sm text-muted-foreground"><strong>Real-time delivery:</strong> Instant push via Pusher</li>
            <li className="font-mono text-sm text-muted-foreground"><strong>Persistence:</strong> Stored in database for history</li>
            <li className="font-mono text-sm text-muted-foreground"><strong>Bell icon badge:</strong> Visual unread count indicator</li>
            <li className="font-mono text-sm text-muted-foreground"><strong>Read/Unread states:</strong> Mark individual or all as read</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold mb-4">DATABASE_SCHEMA</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Notification model in Prisma schema:
          </p>
        </div>
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
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold mb-4">CREATING_NOTIFICATIONS</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Send notifications from anywhere in your application:
          </p>
        </div>
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
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold mb-4">BELL_ICON_COMPONENT</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            The notification bell with real-time updates and dropdown:
          </p>
        </div>
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
                  <p className="font-mono text-xs text-muted-foreground mt-1">
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
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold mb-4">API_ROUTES</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Notification management endpoints:
          </p>
        </div>
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
      </div>

      <Card className="rounded-none">
        <CardContent className="p-4">
          <h2 className="font-mono text-lg font-bold mb-4">BEST_PRACTICES</h2>
          <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
            <li className="font-mono text-sm text-muted-foreground"><strong>Be selective:</strong> Only notify for important, actionable events</li>
            <li className="font-mono text-sm text-muted-foreground"><strong>Clear titles:</strong> Make notifications scannable at a glance</li>
            <li className="font-mono text-sm text-muted-foreground"><strong>Include links:</strong> Let users take action directly from the notification</li>
            <li className="font-mono text-sm text-muted-foreground"><strong>Cleanup old notifications:</strong> Archive or delete notifications older than 30 days</li>
            <li className="font-mono text-sm text-muted-foreground"><strong>Allow preferences:</strong> Let users control which notifications they receive</li>
            <li className="font-mono text-sm text-muted-foreground"><strong>Test thoroughly:</strong> Ensure real-time and persistence work together</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
