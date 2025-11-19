/**
 * Main Dashboard Page
 * Overview with stats, activity, and quick actions
 */

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Upload,
  Settings,
  CreditCard,
  FileText,
  Clock,
} from "lucide-react";

interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  activeUsers: number;
  usersChange: number;
  totalUploads: number;
  uploadsChange: number;
  storageUsed: number;
  storageLimit: number;
}

interface ActivityItem {
  id: string;
  type: "login" | "upload" | "payment" | "setting" | "security";
  description: string;
  timestamp: Date;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, fetch from your API
        // For now, using mock data
        setStats({
          totalRevenue: 24500,
          revenueChange: 12.5,
          activeUsers: 1234,
          usersChange: -2.3,
          totalUploads: 456,
          uploadsChange: 8.1,
          storageUsed: 2.4,
          storageLimit: 10,
        });

        setActivities([
          {
            id: "1",
            type: "login",
            description: "Logged in from new device",
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
          },
          {
            id: "2",
            type: "security",
            description: "Two-factor authentication enabled",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          },
          {
            id: "3",
            type: "upload",
            description: "Uploaded 3 files",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
          },
          {
            id: "4",
            type: "payment",
            description: "Payment received: $99.00",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          },
          {
            id: "5",
            type: "setting",
            description: "Updated profile information",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
          },
        ]);
      } catch (error: unknown) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const userInitials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "login":
        return Activity;
      case "upload":
        return Upload;
      case "payment":
        return DollarSign;
      case "setting":
        return Settings;
      case "security":
        return Shield;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome back, {session?.user?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your account today.
          </p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${loading ? "..." : stats?.totalRevenue.toLocaleString()}
            </div>
            {!loading && stats && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stats.revenueChange >= 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-success" />
                    <span className="text-success">
                      +{stats.revenueChange}%
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-destructive" />
                    <span className="text-destructive">{stats.revenueChange}%</span>
                  </>
                )}
                <span>from last month</span>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats?.activeUsers.toLocaleString()}
            </div>
            {!loading && stats && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stats.usersChange >= 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-success" />
                    <span className="text-success">
                      +{stats.usersChange}%
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-destructive" />
                    <span className="text-destructive">{stats.usersChange}%</span>
                  </>
                )}
                <span>from last month</span>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Total Uploads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats?.totalUploads.toLocaleString()}
            </div>
            {!loading && stats && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stats.uploadsChange >= 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-success" />
                    <span className="text-success">
                      +{stats.uploadsChange}%
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-destructive" />
                    <span className="text-destructive">{stats.uploadsChange}%</span>
                  </>
                )}
                <span>from last month</span>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Storage Used */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading
                ? "..."
                : `${stats?.storageUsed} / ${stats?.storageLimit} GB`}
            </div>
            {!loading && stats && (
              <div className="mt-2">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    data-storage-percent={(stats.storageUsed / stats.storageLimit) * 100}
                    style={{
                      width: `${(stats.storageUsed / stats.storageLimit) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent account activity and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-6 rounded-lg border p-3"
                  >
                    <div className="rounded-full bg-secondary p-2">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/profile">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
            <Link href="/settings/security">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Security Settings
              </Button>
            </Link>
            <Link href="/billing">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing & Plans
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </Link>

            {/* Show admin link if user is admin */}
            {(session?.user?.role === "ADMIN" || session?.user?.role === "SUPER_ADMIN") && (
              <Link href="/admin">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
          <CardDescription>
            Current account information and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Security</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={
                      session?.user?.mfaEnabled
                        ? "default"
                        : "secondary"
                    }
                  >
                    2FA{" "}
                    {session?.user?.mfaEnabled
                      ? "Enabled"
                      : "Disabled"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Account Type</p>
                <Badge variant="outline" className="mt-1">
                  {session?.user?.tier || "FREE"}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge className="mt-1 bg-success text-success-foreground">Active</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
