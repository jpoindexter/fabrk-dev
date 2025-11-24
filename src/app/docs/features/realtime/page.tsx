import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Real-Time with Pusher - Fabrk Documentation",
  description: "Learn how to implement real-time features using Pusher in your Fabrk application.",
};

export default function RealtimePage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold mb-4">Real-Time with Pusher</h1>
        <p className="text-lg text-muted-foreground">
          Build real-time features like notifications, presence tracking, and activity feeds using Pusher Channels.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            Fabrk integrates Pusher Channels to provide real-time communication between your server and clients.
            This enables instant updates for notifications, live activity feeds, and presence tracking to show
            who&apos;s online in your organization.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Notifications:</strong> Real-time bell icon updates with badge counts</li>
            <li><strong>Activity Feed:</strong> Live organization events and updates</li>
            <li><strong>Presence Tracking:</strong> Show online members in real-time</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
          <p className="mb-4">
            Add your Pusher credentials to your environment variables:
          </p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
            <code>{`# .env.local
PUSHER_APP_ID=your_app_id
PUSHER_KEY=your_key
PUSHER_SECRET=your_secret
PUSHER_CLUSTER=your_cluster

# Client-side (exposed to browser)
NEXT_PUBLIC_PUSHER_KEY=your_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster`}</code>
          </pre>
          <p className="text-sm text-muted-foreground">
            Get your credentials from the <a href="https://dashboard.pusher.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Pusher Dashboard</a>.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Server-Side Usage</h2>
          <p className="mb-4">
            Use the server client to trigger events from your API routes:
          </p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
            <code>{`// src/lib/pusher/server.ts
import Pusher from "pusher";

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

// Trigger a notification
await pusherServer.trigger(
  \`user-\${userId}\`,
  "notification",
  {
    id: "notif-123",
    title: "New message",
    body: "You have a new message",
    createdAt: new Date().toISOString(),
  }
);

// Trigger activity feed event
await pusherServer.trigger(
  \`org-\${orgId}\`,
  "activity",
  {
    type: "member_joined",
    actor: { name: "John Doe", avatar: "/avatar.png" },
    timestamp: new Date().toISOString(),
  }
);`}</code>
          </pre>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Client-Side Usage</h2>
          <p className="mb-4">
            Subscribe to channels and listen for events in your React components:
          </p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
            <code>{`// src/lib/pusher/client.ts
import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  }
);

// In your component
"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher/client";

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

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

  return (
    <button className="relative">
      <BellIcon />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full text-xs px-1">
          {unreadCount}
        </span>
      )}
    </button>
  );
}`}</code>
          </pre>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Presence Channels</h2>
          <p className="mb-4">
            Track which members are online in an organization:
          </p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
            <code>{`// Client-side presence subscription
"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher/client";

export function OnlineMembers({ orgId }: { orgId: string }) {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe(\`presence-org-\${orgId}\`);

    channel.bind("pusher:subscription_succeeded", (data: any) => {
      setMembers(Object.values(data.members));
    });

    channel.bind("pusher:member_added", (member: any) => {
      setMembers((prev) => [...prev, member.info]);
    });

    channel.bind("pusher:member_removed", (member: any) => {
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    });

    return () => {
      pusherClient.unsubscribe(\`presence-org-\${orgId}\`);
    };
  }, [orgId]);

  return (
    <div className="flex -space-x-2">
      {members.map((member) => (
        <img
          key={member.id}
          src={member.avatar}
          alt={member.name}
          className="w-8 h-8 rounded-full border-2 border-background"
        />
      ))}
    </div>
  );
}`}</code>
          </pre>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use private channels (<code>private-</code>) for user-specific data</li>
            <li>Use presence channels (<code>presence-</code>) for tracking online status</li>
            <li>Always unsubscribe from channels when components unmount</li>
            <li>Handle connection errors gracefully with retry logic</li>
            <li>Batch events when possible to reduce message count</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
