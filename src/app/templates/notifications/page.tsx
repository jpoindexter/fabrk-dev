/**
 * FABRK COMPONENT
 * Notifications Center Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Check,
  CheckCheck,
  Info,
  AlertTriangle,
  AlertCircle,
  MessageSquare,
  Settings,
  Trash2,
  Archive,
} from "lucide-react";

interface Notification {
  id: string;
  type: "info" | "warning" | "error" | "success" | "message";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const initialNotifications: Notification[] = [
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
    actionUrl: "/settings/billing",
  },
  {
    id: "3",
    type: "info",
    title: "New Feature Available",
    message: "Check out our new analytics dashboard with real-time metrics.",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    type: "message",
    title: "New Comment",
    message: "Sarah left a comment on your project: \"Looking great!\"",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "error",
    title: "Build Failed",
    message: "Build #1234 failed due to type errors. Check logs for details.",
    timestamp: "3 hours ago",
    read: true,
    actionUrl: "/builds/1234",
  },
  {
    id: "6",
    type: "info",
    title: "Team Invitation",
    message: "You've been invited to join the \"Fabrk Core\" team.",
    timestamp: "5 hours ago",
    read: true,
    actionUrl: "/teams/invites",
  },
  {
    id: "7",
    type: "success",
    title: "Payment Received",
    message: "Payment of $29.00 for Pro plan has been processed.",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "8",
    type: "warning",
    title: "SSL Certificate Expiring",
    message: "Your SSL certificate expires in 7 days. Renew now.",
    timestamp: "2 days ago",
    read: true,
    actionUrl: "/settings/domains",
  },
];

const getTypeIcon = (type: Notification["type"]) => {
  switch (type) {
    case "info":
      return Info;
    case "warning":
      return AlertTriangle;
    case "error":
      return AlertCircle;
    case "success":
      return Check;
    case "message":
      return MessageSquare;
    default:
      return Bell;
  }
};

const getTypeColor = (type: Notification["type"]) => {
  switch (type) {
    case "info":
      return "text-primary";
    case "warning":
      return "text-warning";
    case "error":
      return "text-destructive";
    case "success":
      return "text-success";
    case "message":
      return "text-muted-foreground";
    default:
      return "text-foreground";
  }
};

export default function NotificationsTemplate() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block border border-border px-3 py-1">
            <span className="font-mono text-xs text-muted-foreground">
              [TEMPLATE]: NOTIFICATIONS_CENTER
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Notifications Center
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Manage your notifications with filtering, actions, and real-time
            updates
          </p>
        </div>

        {/* Main Notifications Panel */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              notifications.tsx
            </span>
            <div className="ml-auto flex items-center gap-2">
              <Bell className="h-3 w-3 text-muted-foreground" />
              {unreadCount > 0 && (
                <Badge className="rounded-none font-mono text-xs bg-primary text-primary-foreground h-5 px-1.5">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </div>

          <div className="p-4">
            {/* Actions Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-xs text-muted-foreground">
                [NOTIFICATIONS]: TOTAL={notifications.length} | UNREAD=
                {unreadCount}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="rounded-none font-mono text-xs h-7"
                >
                  <CheckCheck className="mr-1 h-3 w-3" />
                  &gt; MARK_ALL_READ
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  disabled={notifications.length === 0}
                  className="rounded-none font-mono text-xs h-7"
                >
                  <Archive className="mr-1 h-3 w-3" />
                  &gt; CLEAR_ALL
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none font-mono text-xs h-7"
                >
                  <Settings className="mr-1 h-3 w-3" />
                  &gt; SETTINGS
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="rounded-none border border-border bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="all"
                  className="rounded-none font-mono text-xs px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  [ALL]
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="rounded-none font-mono text-xs px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  [UNREAD] ({unreadCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                {filteredNotifications.length === 0 ? (
                  <div className="border border-border bg-muted/30 p-8 text-center">
                    <Bell className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <div className="font-mono text-sm text-muted-foreground">
                      {activeTab === "unread"
                        ? "[NO_UNREAD_NOTIFICATIONS]"
                        : "[NO_NOTIFICATIONS]"}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">
                      You&apos;re all caught up!
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredNotifications.map((notification) => {
                      const Icon = getTypeIcon(notification.type);
                      const colorClass = getTypeColor(notification.type);

                      return (
                        <div
                          key={notification.id}
                          className={`border border-border p-4 transition-colors hover:bg-muted/30 ${
                            !notification.read ? "bg-primary/5" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div
                              className={`p-2 border border-border ${
                                notification.type === "error"
                                  ? "bg-destructive/10"
                                  : notification.type === "warning"
                                    ? "bg-warning/10"
                                    : notification.type === "success"
                                      ? "bg-success/10"
                                      : "bg-muted/30"
                              }`}
                            >
                              <Icon className={`h-4 w-4 ${colorClass}`} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-sm font-medium">
                                  {notification.title}
                                </span>
                                {!notification.read && (
                                  <Badge className="rounded-none font-mono text-[10px] bg-primary/20 text-primary border-primary/50 px-1 h-4">
                                    NEW
                                  </Badge>
                                )}
                              </div>
                              <p className="font-mono text-xs text-muted-foreground mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-[10px] text-muted-foreground">
                                  {notification.timestamp}
                                </span>
                                {notification.actionUrl && (
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="h-auto p-0 font-mono text-[10px] text-primary"
                                  >
                                    &gt; VIEW_DETAILS
                                  </Button>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-7 w-7 p-0 rounded-none"
                                  title="Mark as read"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="h-7 w-7 p-0 rounded-none text-destructive hover:text-destructive"
                                title="Delete"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Notification Types Reference */}
        <div className="grid md:grid-cols-5 gap-4">
          {(
            [
              { type: "info", label: "Info", color: "primary" },
              { type: "success", label: "Success", color: "success" },
              { type: "warning", label: "Warning", color: "warning" },
              { type: "error", label: "Error", color: "destructive" },
              { type: "message", label: "Message", color: "muted-foreground" },
            ] as const
          ).map((item) => {
            const Icon = getTypeIcon(item.type);
            return (
              <div key={item.type} className="border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
                  <div className="flex gap-1">
                    <div className="size-1.5 rounded-full bg-destructive/50" />
                    <div className="size-1.5 rounded-full bg-warning/50" />
                    <div className="size-1.5 rounded-full bg-success/50" />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {item.type}.tsx
                  </span>
                </div>
                <div className="p-3 text-center">
                  <Icon className={`h-6 w-6 mx-auto mb-2 text-${item.color}`} />
                  <div className="font-mono text-xs font-medium">
                    {item.label}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-1">
                    [{item.type.toUpperCase()}]
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Card */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              features.md
            </span>
          </div>
          <div className="p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">
              [TEMPLATE_FEATURES]:
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> All/Unread tab
                filtering
              </div>
              <div>
                <span className="text-success">&gt;</span> Mark as read
                (individual or all)
              </div>
              <div>
                <span className="text-success">&gt;</span> Delete notifications
              </div>
              <div>
                <span className="text-success">&gt;</span> 5 notification types
                (info, success, warning, error, message)
              </div>
              <div>
                <span className="text-success">&gt;</span> Unread badge counter
              </div>
              <div>
                <span className="text-success">&gt;</span> Action URLs for
                navigation
              </div>
              <div>
                <span className="text-success">&gt;</span> Empty state handling
              </div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: Connect to your notification service (WebSockets, SSE) for
              real-time updates.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
