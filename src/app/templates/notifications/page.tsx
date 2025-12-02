/**
 * FABRK COMPONENT
 * Notifications Center Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import {
  Notification,
  initialNotifications,
} from "./components/notification-types";
import { NotificationsHeader } from "./components/notifications-header";
import { NotificationsActionsBar } from "./components/notifications-actions-bar";
import { NotificationsList } from "./components/notifications-list";
import { NotificationTypesReference } from "./components/notification-types-reference";
import { FeaturesCard } from "./components/features-card";

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
        <NotificationsHeader />

        {/* Main Notifications Panel */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-2">
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
            <NotificationsActionsBar
              totalNotifications={notifications.length}
              unreadCount={unreadCount}
              onMarkAllAsRead={markAllAsRead}
              onClearAll={clearAll}
            />

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
                <NotificationsList
                  notifications={filteredNotifications}
                  activeTab={activeTab}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Notification Types Reference */}
        <NotificationTypesReference />

        {/* Features Card */}
        <FeaturesCard />
      </div>
    </div>
  );
}
