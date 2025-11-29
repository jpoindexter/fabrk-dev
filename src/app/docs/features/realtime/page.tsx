import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Real-Time with Pusher - Fabrk Documentation",
  description: "Learn how to implement real-time features using Pusher in your Fabrk application.",
};

export default function RealtimePage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl space-y-6">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline font-mono text-xs mb-4 inline-block">
          &larr; Back to Documentation
        </Link>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ FEATURES ] REALTIME</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">REALTIME_WITH_PUSHER</h1>
        <p className="font-mono text-sm text-muted-foreground">&gt; Build real-time features like notifications, presence tracking, and activity feeds using Pusher Channels.</p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold text-primary mb-4">OVERVIEW</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Fabrk integrates Pusher Channels to provide real-time communication between your server and clients.
            This enables instant updates for notifications, live activity feeds, and presence tracking to show
            who&apos;s online in your organization.
          </p>
          <div className="font-mono text-sm text-muted-foreground space-y-1">
            <div>├─ Notifications: Real-time bell icon updates with badge counts</div>
            <div>├─ Activity Feed: Live organization events and updates</div>
            <div>└─ Presence Tracking: Show online members in real-time</div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">CONFIGURATION</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Add your Pusher credentials to your environment variables:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="bash" code={`# .env.local
PUSHER_APP_ID=your_app_id
PUSHER_KEY=your_key
PUSHER_SECRET=your_secret
PUSHER_CLUSTER=your_cluster

# Client-side (exposed to browser)
NEXT_PUBLIC_PUSHER_KEY=your_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster`} />
        </div>
        <div>
          <p className="font-mono text-sm text-muted-foreground">
            Get your credentials from the <a href="https://dashboard.pusher.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Pusher Dashboard</a>.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">SERVER_SIDE_USAGE</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Use the server client to trigger events from your API routes:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="typescript" code={`// src/lib/pusher/server.ts
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
);`} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">CLIENT_SIDE_USAGE</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Subscribe to channels and listen for events in your React components:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="tsx" code={`// src/lib/pusher/client.ts
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
}`} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">PRESENCE_CHANNELS</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Track which members are online in an organization:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="tsx" code={`// Client-side presence subscription
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
}`} />
        </div>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold text-primary mb-4">BEST_PRACTICES</h2>
          <div className="font-mono text-sm text-muted-foreground space-y-1">
            <div>├─ Use private channels (<code className="bg-muted px-1 font-mono text-xs">private-</code>) for user-specific data</div>
            <div>├─ Use presence channels (<code className="bg-muted px-1 font-mono text-xs">presence-</code>) for tracking online status</div>
            <div>├─ Always unsubscribe from channels when components unmount</div>
            <div>├─ Handle connection errors gracefully with retry logic</div>
            <div>└─ Batch events when possible to reduce message count</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
