/**
 * FABRK COMPONENT
 * Notifications Center Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { StyledCard, StyledCardHeader } from "@/components/ui/card";
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs";
import { Bell } from "lucide-react";
import { Notification, initialNotifications } from "./components/notification-types";
import { NotificationsHeader } from "./components/notifications-header";
import { NotificationsActionsBar } from "./components/notifications-actions-bar";
import { NotificationsList } from "./components/notifications-list";
import { NotificationTypesReference } from "./components/notification-types-reference";
import { FeaturesCard } from "./components/features-card";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all", label: "ALL" },
  { id: "unread", label: "UNREAD" },
];

export default function NotificationsTemplate() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications =
    activeTab === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
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
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <NotificationsHeader />

        {/* Main Notifications Panel */}
        <StyledCard>
          <div className="border-border flex items-center justify-between border-b px-4 py-2">
            <StyledCardHeader code="0x00" title="NOTIFICATIONS" className="border-0 p-0" />
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

          <div className="p-4">
            {/* Actions Bar */}
            <NotificationsActionsBar
              totalNotifications={notifications.length}
              unreadCount={unreadCount}
              onMarkAllAsRead={markAllAsRead}
              onClearAll={clearAll}
            />

            {/* Tabs */}
            <StyledTabs
              code="0x01"
              title="FILTER"
              tabs={tabs}
              value={activeTab}
              onValueChange={setActiveTab}
              description={(tab) =>
                tab === "unread"
                  ? `${unreadCount} unread notifications`
                  : `${notifications.length} total notifications`
              }
            >
              <StyledTabsContent value="all">
                <NotificationsList
                  notifications={filteredNotifications}
                  activeTab={activeTab}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              </StyledTabsContent>
              <StyledTabsContent value="unread">
                <NotificationsList
                  notifications={filteredNotifications}
                  activeTab={activeTab}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              </StyledTabsContent>
            </StyledTabs>
          </div>
        </StyledCard>

        {/* Notification Types Reference */}
        <NotificationTypesReference />

        {/* Features Card */}
        <FeaturesCard />
      </div>
    </div>
  );
}
