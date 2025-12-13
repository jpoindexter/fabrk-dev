/**
 * Notifications Center Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, TemplatePageHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { LibraryNavigation } from '@/components/library';
import { Bell, Check, AlertTriangle, Trash2 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Bell, Check, AlertTriangle, Trash2 } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "info" | "warning" | "error" | "success";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Deployment Complete",
      message: "Your application was successfully deployed to production.",
      timestamp: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Storage Warning",
      message: "You're using 85% of your storage quota. Consider upgrading.",
      timestamp: "15 minutes ago",
      read: false,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <Card>
        <div className="border-border flex items-center justify-between border-b px-4 py-2">
          <CardHeader code="0x00" title="NOTIFICATIONS" className="border-0 p-0" />
          <div className="flex items-center gap-2">
            <Bell className="text-muted-foreground h-3 w-3" />
            {unreadCount > 0 && (
              <Badge
                className={cn(
                  mode.radius,
                  mode.font,
                  "bg-primary text-primary-foreground h-5 px-1.5 text-xs"
                )}
              >
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.type === "warning" ? AlertTriangle : Check;
            const colorClass =
              notification.type === "warning" ? "text-warning" : "text-success";

            return (
              <div
                key={notification.id}
                className={cn(
                  mode.radius,
                  "border-border bg-card relative flex items-start gap-4 border p-4",
                  !notification.read && "bg-primary/5"
                )}
              >
                {/* Icon */}
                <div
                  className={\`border-border bg-background flex size-8 items-center justify-center border \${colorClass}\`}
                >
                  <Icon className={\`h-4 w-4 \${colorClass}\`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={cn(
                        mode.radius,
                        mode.font,
                        "border-border px-2 py-0.5 text-xs uppercase"
                      )}
                    >
                      {notification.type}
                    </Badge>
                    <span className={cn(mode.font, "text-muted-foreground text-xs")}>
                      {notification.timestamp}
                    </span>
                  </div>
                  <h4 className={cn(mode.font, "text-foreground mt-2 text-sm font-semibold")}>
                    {notification.title}
                  </h4>
                  <p className={cn(mode.font, "text-muted-foreground mt-1 text-xs")}>
                    {notification.message}
                  </p>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    {!notification.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(mode.radius, mode.font, "text-xs")}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="mr-2 size-3" /> Mark as Read
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      className={cn(mode.radius, mode.font, "text-xs")}
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="mr-2 size-3" /> Delete
                    </Button>
                  </div>
                </div>

                {/* Read indicator */}
                {!notification.read && (
                  <span className={cn(mode.radius, "bg-primary absolute top-2 right-2 size-2")} />
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}`;

function NotificationsPreview() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'success' as const,
      title: 'Deployment Complete',
      message: 'Your application was successfully deployed to production.',
      timestamp: '2 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Storage Warning',
      message: "You're using 85% of your storage quota. Consider upgrading.",
      timestamp: '15 minutes ago',
      read: false,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-background/50 min-h-[600px] p-8">
      <div className="mx-auto max-w-3xl">
        <Card>
          <div className="border-border flex items-center justify-between border-b px-4 py-2">
            <CardHeader code="0x00" title="NOTIFICATIONS" className="border-0 p-0" />
            <div className="flex items-center gap-2">
              <Bell className="text-muted-foreground h-3 w-3" />
              {unreadCount > 0 && (
                <Badge
                  className={cn(
                    mode.radius,
                    mode.font,
                    'bg-primary text-primary-foreground h-5 px-1.5 text-xs'
                  )}
                >
                  {unreadCount}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-4 p-4">
            {notifications.map((notification) => {
              const Icon = notification.type === 'warning' ? AlertTriangle : Check;
              const colorClass = notification.type === 'warning' ? 'text-warning' : 'text-success';

              return (
                <div
                  key={notification.id}
                  className={cn(
                    mode.radius,
                    'border-border bg-card relative flex items-start gap-4 border p-4',
                    !notification.read && 'bg-primary/5'
                  )}
                >
                  {/* Icon */}
                  <div
                    className={`border-border bg-background flex size-8 items-center justify-center border ${colorClass}`}
                  >
                    <Icon className={`h-4 w-4 ${colorClass}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={cn(
                          mode.radius,
                          mode.font,
                          'border-border px-2 py-0.5 text-xs uppercase'
                        )}
                      >
                        {notification.type}
                      </Badge>
                      <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                        {notification.timestamp}
                      </span>
                    </div>
                    <h4 className={cn(mode.font, 'text-foreground mt-2 text-sm font-semibold')}>
                      {notification.title}
                    </h4>
                    <p className={cn(mode.font, 'text-muted-foreground mt-1 text-xs')}>
                      {notification.message}
                    </p>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      {!notification.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(mode.radius, mode.font, 'text-xs')}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="mr-2 size-3" /> Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        className={cn(mode.radius, mode.font, 'text-xs')}
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="mr-2 size-3" /> Delete
                      </Button>
                    </div>
                  </div>

                  {/* Read indicator */}
                  {!notification.read && (
                    <span className={cn(mode.radius, 'bg-primary absolute top-2 right-2 size-2')} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function NotificationsTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Navigation */}
        <LibraryNavigation templateName="Notifications Center" />

        {/* Header */}
        <TemplatePageHeader
          badge="NOTIFICATIONS"
          title="Notifications Center"
          description="Real-time notification system with read/unread states and actions"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="preview">Preview
                </TabsTrigger>
                <TabsTrigger value="code">Code
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE PREVIEW" />
              <NotificationsPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Notification Types */}
        <Card>
          <CardHeader code="0x02" title="NOTIFICATION TYPES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-4 text-xs')}>
              <div className="space-y-2">
                <div className="font-semibold">[INFO]</div>
                <div className="text-muted-foreground">
                  General updates, new features, announcements
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[SUCCESS]</div>
                <div className="text-muted-foreground">Deployments, payments, completions</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[WARNING]</div>
                <div className="text-muted-foreground">
                  Quota limits, expiring certificates, reminders
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[ERROR]</div>
                <div className="text-muted-foreground">
                  Build failures, API errors, critical issues
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x03" title="FEATURES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-2 text-xs')}>
              <div>
                <span className="text-success">&gt;</span> Real-time notification display
              </div>
              <div>
                <span className="text-success">&gt;</span> Read/unread state management
              </div>
              <div>
                <span className="text-success">&gt;</span> Type-based color coding
              </div>
              <div>
                <span className="text-success">&gt;</span> Mark as read functionality
              </div>
              <div>
                <span className="text-success">&gt;</span> Delete notifications
              </div>
              <div>
                <span className="text-success">&gt;</span> Unread count badge
              </div>
              <div>
                <span className="text-success">&gt;</span> DS-compliant (mode.font, mode.radius)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
