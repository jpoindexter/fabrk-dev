/**
 * Analytics Dashboard Template
 * Complete dashboard with charts, metrics, and data visualization
 */

"use client";

// Animation handled via CSS, no state needed
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemoNav } from "@/components/demo/demo-nav";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Download,
  Calendar,
  BarChart3,
} from "lucide-react";

export default function AnalyticsDashboardTemplate() {
  return (
    <div className="min-h-screen bg-background">
      {/* Demo Navigation */}
      <DemoNav backButtonText="Back" backButtonHref="/demo" />

      {/* Page Content */}
      <main className="container mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Analytics Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Track revenue, users, conversions, and growth metrics
            </p>
          </div>
          <Button className="font-semibold">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Metric Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Revenue",
              value: "$45,231.89",
              change: "+20.1%",
              trend: "up",
              icon: DollarSign,
              description: "from last month",
            },
            {
              title: "Active Users",
              value: "2,350",
              change: "+15.3%",
              trend: "up",
              icon: Users,
              description: "from last month",
            },
            {
              title: "Conversions",
              value: "12.5%",
              change: "-2.4%",
              trend: "down",
              icon: Activity,
              description: "from last month",
            },
            {
              title: "Growth Rate",
              value: "+28%",
              change: "+8.2%",
              trend: "up",
              icon: TrendingUp,
              description: "from last month",
            },
          ].map((metric, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{metric.value}</div>
                <div className="flex items-center gap-2 pt-1">
                  <Badge
                    variant={metric.trend === "up" ? "default" : "outline"}
                    className="text-xs font-medium"
                  >
                    {metric.trend === "up" ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {metric.change}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Main Chart */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Monthly revenue for the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="h-[300px] flex items-end justify-between gap-2 px-2">
                    {[
                      { month: "Jan", revenue: 32000, height: 55 },
                      { month: "Feb", revenue: 42000, height: 70 },
                      { month: "Mar", revenue: 38000, height: 65 },
                      { month: "Apr", revenue: 54000, height: 85 },
                      { month: "May", revenue: 57000, height: 90 },
                      { month: "Jun", revenue: 63000, height: 100 },
                    ].map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center group h-full">
                        <span className="text-xs font-semibold text-foreground opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                          ${(data.revenue / 1000).toFixed(0)}k
                        </span>
                        <div className="flex-1 flex items-end w-full">
                          <div
                            className="w-full bg-primary rounded-t-md hover:bg-primary/90 hover:shadow-md transition-colors"
                            style={{
                              height: `${data.height}%`,
                              animation: `bar-grow 0.6s ease-out ${i * 100}ms both`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between px-2 gap-2">
                    {[
                      { month: "Jan", revenue: 32000, height: 55 },
                      { month: "Feb", revenue: 42000, height: 70 },
                      { month: "Mar", revenue: 38000, height: 65 },
                      { month: "Apr", revenue: 54000, height: 85 },
                      { month: "May", revenue: 57000, height: 90 },
                      { month: "Jun", revenue: 63000, height: 100 },
                    ].map((data, i) => (
                      <div key={i} className="flex-1 text-center">
                        <span className="text-xs text-muted-foreground">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Average</p>
                      <p className="text-lg font-semibold">$47,667</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Highest</p>
                      <p className="text-lg font-semibold">$63,000</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Growth</p>
                      <p className="text-lg font-semibold text-green-600">+96.9%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest user interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "John Doe", action: "Purchased Pro Plan", time: "2m ago" },
                  { user: "Jane Smith", action: "Signed up", time: "15m ago" },
                  { user: "Bob Wilson", action: "Upgraded account", time: "1h ago" },
                  { user: "Alice Brown", action: "Left feedback", time: "2h ago" },
                  { user: "Charlie Davis", action: "Referred friend", time: "3h ago" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-sm font-semibold text-primary-foreground">
                      {activity.user.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.user}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.action}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Pages</CardTitle>
                <CardDescription>
                  Pages with the most traffic this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Bounce Rate</TableHead>
                      <TableHead>Conversion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { page: "/landing", views: "12,453", bounce: "32%", conversion: "8.2%" },
                      { page: "/pricing", views: "8,932", bounce: "28%", conversion: "12.5%" },
                      { page: "/features", views: "6,721", bounce: "45%", conversion: "3.1%" },
                      { page: "/about", views: "4,562", bounce: "52%", conversion: "1.8%" },
                      { page: "/blog", views: "3,891", bounce: "38%", conversion: "4.2%" },
                    ].map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{row.page}</TableCell>
                        <TableCell>{row.views}</TableCell>
                        <TableCell>{row.bounce}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{row.conversion}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { source: "Organic Search", percentage: 45 },
                    { source: "Direct", percentage: 30 },
                    { source: "Social Media", percentage: 15 },
                    { source: "Referral", percentage: 10 },
                  ].map((source, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{source.source}</span>
                        <span className="text-muted-foreground">
                          {source.percentage}%
                        </span>
                      </div>
                      <Progress value={source.percentage} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                  <CardDescription>Visitor devices and platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { device: "Desktop", percentage: 55 },
                    { device: "Mobile", percentage: 35 },
                    { device: "Tablet", percentage: 10 },
                  ].map((device, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{device.device}</span>
                        <span className="text-muted-foreground">
                          {device.percentage}%
                        </span>
                      </div>
                      <Progress value={device.percentage} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>
                  Export detailed analytics reports for your team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "Monthly Summary", desc: "Overview of all metrics" },
                    { name: "User Behavior", desc: "Detailed user journey analysis" },
                    { name: "Revenue Report", desc: "Financial performance breakdown" },
                    { name: "Custom Report", desc: "Build your own report" },
                  ].map((report, i) => (
                    <div
                      key={i}
                      className="p-4 border border-border rounded-md hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{report.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {report.desc}
                          </p>
                        </div>
                        <BarChart3 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-3">
                        <Download className="mr-2 h-4 w-4" />
                        Generate
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Template Features Card */}
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h4 className="mb-2 font-semibold">📊 Template Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="font-semibold">✓ 4 key metric cards (revenue, users, conversions, growth)</li>
              <li className="font-semibold">✓ Revenue overview chart with 6-month data</li>
              <li className="font-semibold">✓ Recent activity feed with user avatars</li>
              <li className="font-semibold">✓ Tabbed analytics section (Overview, Analytics, Reports)</li>
              <li className="font-semibold">✓ Top performing pages table with bounce rates</li>
              <li className="font-semibold">✓ Traffic sources breakdown with progress bars</li>
              <li className="font-semibold">✓ Device breakdown statistics</li>
              <li className="font-semibold">✓ Report generation templates (Monthly, User Behavior, Revenue, Custom)</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
