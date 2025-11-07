"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  Mail,
  CreditCard,
  Shield,
  Users,
  Zap,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type NotificationType = "info" | "success" | "warning" | "error";
type NotificationCategory = "account" | "billing" | "security" | "team" | "system";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  isRead: boolean;
  createdAt: Date;
}

interface NotificationPreferences {
  email: {
    account: boolean;
    billing: boolean;
    security: boolean;
    team: boolean;
    system: boolean;
  };
  push: {
    account: boolean;
    billing: boolean;
    security: boolean;
    team: boolean;
    system: boolean;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Payment Successful",
    message: "Your payment of $49.00 for the Professional plan has been processed.",
    type: "success",
    category: "billing",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    title: "New Team Member Joined",
    message: "Sarah Johnson has accepted your invitation and joined the team.",
    type: "info",
    category: "team",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "3",
    title: "Security Alert",
    message: "A new device logged into your account from Chrome on Windows.",
    type: "warning",
    category: "security",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "4",
    title: "API Key Expiring Soon",
    message: "Your API key 'sk_live_abc123' will expire in 7 days.",
    type: "warning",
    category: "system",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "5",
    title: "Account Verification Complete",
    message: "Your email has been verified successfully. You now have full access.",
    type: "success",
    category: "account",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
];

const defaultPreferences: NotificationPreferences = {
  email: {
    account: true,
    billing: true,
    security: true,
    team: true,
    system: false,
  },
  push: {
    account: false,
    billing: true,
    security: true,
    team: false,
    system: false,
  },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | NotificationCategory>("all");
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);

  const filteredNotifications = notifications.filter((notif) => {
    const matchesReadFilter = filter === "all" || (filter === "unread" && !notif.isRead);
    const matchesCategory = categoryFilter === "all" || notif.category === categoryFilter;
    return matchesReadFilter && matchesCategory;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleDeleteAll = () => {
    if (confirm("Are you sure you want to delete all notifications?")) {
      setNotifications([]);
    }
  };

  const getNotificationIcon = (category: NotificationCategory) => {
    switch (category) {
      case "account":
        return Mail;
      case "billing":
        return CreditCard;
      case "security":
        return Shield;
      case "team":
        return Users;
      case "system":
        return Zap;
    }
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return Check;
      case "warning":
        return AlertCircle;
      case "error":
        return AlertCircle;
      case "info":
        return Info;
    }
  };

  const getTypeBadgeVariant = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "default";
      case "warning":
        return "outline";
      case "error":
        return "destructive";
      case "info":
        return "secondary";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const handlePreferenceChange = (
    channel: "email" | "push",
    category: NotificationCategory,
    value: boolean
  ) => {
    setPreferences({
      ...preferences,
      [channel]: {
        ...preferences[channel],
        [category]: value,
      },
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Notifications</h1>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {unreadCount} Unread
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Stay updated with important events and activities
        </p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filters and Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex gap-3 flex-1">
                  <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as any)}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    <CheckCheck className="h-4 w-4 mr-2" />
                    Mark All Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteAll}
                    disabled={notifications.length === 0}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  {filter === "unread"
                    ? "You're all caught up! No unread notifications."
                    : "You don't have any notifications yet."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => {
                const CategoryIcon = getNotificationIcon(notification.category);
                const TypeIcon = getTypeIcon(notification.type);

                return (
                  <Card
                    key={notification.id}
                    className={notification.isRead ? "opacity-60" : "border-primary/50"}
                  >
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <div className="shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CategoryIcon className="h-5 w-5 text-primary" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{notification.title}</h3>
                              {!notification.isRead && (
                                <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                              )}
                            </div>
                            <Badge variant={getTypeBadgeVariant(notification.type)} className="shrink-0">
                              <TypeIcon className="h-3 w-3 mr-1" />
                              {notification.type}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="capitalize">{notification.category}</span>
                              <span>•</span>
                              <span>{formatTimeAgo(notification.createdAt)}</span>
                            </div>

                            <div className="flex gap-2">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Mark Read
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(notification.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to receive notifications for different types of events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(["account", "billing", "security", "team", "system"] as NotificationCategory[]).map(
                (category) => {
                  const Icon = getNotificationIcon(category);
                  return (
                    <div key={category}>
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold capitalize">{category}</h3>
                      </div>

                      <div className="space-y-3 ml-8">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`email-${category}`} className="cursor-pointer">
                            Email notifications
                          </Label>
                          <Switch
                            id={`email-${category}`}
                            checked={preferences.email[category]}
                            onCheckedChange={(checked) =>
                              handlePreferenceChange("email", category, checked)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`push-${category}`} className="cursor-pointer">
                            Push notifications
                          </Label>
                          <Switch
                            id={`push-${category}`}
                            checked={preferences.push[category]}
                            onCheckedChange={(checked) =>
                              handlePreferenceChange("push", category, checked)
                            }
                          />
                        </div>
                      </div>

                      {category !== "system" && <Separator className="mt-6" />}
                    </div>
                  );
                }
              )}

              <div className="pt-4">
                <Button onClick={() => alert("Preferences saved!")}>
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/30">
            <CardHeader>
              <CardTitle className="text-base">Important Security Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Security-related notifications cannot be disabled to ensure your account safety.
                You will always receive email alerts for login attempts, password changes, and
                other critical security events.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
