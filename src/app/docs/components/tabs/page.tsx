"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TabsPage() {
  return (
    <ComponentShowcaseTemplate
      title="Tabs"
      description="A set of layered sections of content—known as tab panels—that are displayed one at a time."
      mainPreview={{
        code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>`,
        component: (
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        ),
      }}
      variants={[
        {
          title: "With Cards",
          description: "Tabs combined with card components for structured content",
          code: `<Tabs defaultValue="overview" className="w-full">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          View your account overview and recent activity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>Your dashboard content goes here.</p>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="analytics">
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>
          View detailed analytics and insights.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>Analytics data will be displayed here.</p>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="reports">
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>
          Generate and view reports.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>Reports will be shown here.</p>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>`,
          component: (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>
                      View your account overview and recent activity.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>Your dashboard content goes here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>
                      View detailed analytics and insights.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>Analytics data will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>
                      Generate and view reports.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>Reports will be shown here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ),
        },
        {
          title: "Disabled Tab",
          description: "Individual tabs can be disabled to prevent interaction",
          code: `<Tabs defaultValue="enabled" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="enabled">Enabled</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
    <TabsTrigger value="another">Another</TabsTrigger>
  </TabsList>
  <TabsContent value="enabled">
    This tab is enabled and active.
  </TabsContent>
  <TabsContent value="disabled">
    This content won't be shown as the tab is disabled.
  </TabsContent>
  <TabsContent value="another">
    Another enabled tab.
  </TabsContent>
</Tabs>`,
          component: (
            <Tabs defaultValue="enabled" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="enabled">Enabled</TabsTrigger>
                <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
                <TabsTrigger value="another">Another</TabsTrigger>
              </TabsList>
              <TabsContent value="enabled">
                This tab is enabled and active.
              </TabsContent>
              <TabsContent value="disabled">
                This content won't be shown as the tab is disabled.
              </TabsContent>
              <TabsContent value="another">
                Another enabled tab.
              </TabsContent>
            </Tabs>
          ),
        },
        {
          title: "Full Width",
          description: "Tabs that span the full width of their container",
          code: `<Tabs defaultValue="tab1" className="w-full">
  <TabsList className="w-full">
    <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3" className="flex-1">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for tab 1</TabsContent>
  <TabsContent value="tab2">Content for tab 2</TabsContent>
  <TabsContent value="tab3">Content for tab 3</TabsContent>
</Tabs>`,
          component: (
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3" className="flex-1">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">Content for tab 1</TabsContent>
              <TabsContent value="tab2">Content for tab 2</TabsContent>
              <TabsContent value="tab3">Content for tab 3</TabsContent>
            </Tabs>
          ),
        },
        {
          title: "Vertical Orientation",
          description: "Tabs can be oriented vertically with custom styling",
          code: `<Tabs defaultValue="tab1" orientation="vertical" className="flex gap-4">
  <TabsList className="flex-col h-auto">
    <TabsTrigger value="tab1" className="w-full justify-start">
      Profile
    </TabsTrigger>
    <TabsTrigger value="tab2" className="w-full justify-start">
      Settings
    </TabsTrigger>
    <TabsTrigger value="tab3" className="w-full justify-start">
      Notifications
    </TabsTrigger>
  </TabsList>
  <div className="flex-1">
    <TabsContent value="tab1">
      Profile settings and information
    </TabsContent>
    <TabsContent value="tab2">
      Application settings
    </TabsContent>
    <TabsContent value="tab3">
      Notification preferences
    </TabsContent>
  </div>
</Tabs>`,
          component: (
            <Tabs defaultValue="tab1" orientation="vertical" className="flex gap-4">
              <TabsList className="flex-col h-auto">
                <TabsTrigger value="tab1" className="w-full justify-start">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="tab2" className="w-full justify-start">
                  Settings
                </TabsTrigger>
                <TabsTrigger value="tab3" className="w-full justify-start">
                  Notifications
                </TabsTrigger>
              </TabsList>
              <div className="flex-1">
                <TabsContent value="tab1">
                  Profile settings and information
                </TabsContent>
                <TabsContent value="tab2">
                  Application settings
                </TabsContent>
                <TabsContent value="tab3">
                  Notification preferences
                </TabsContent>
              </div>
            </Tabs>
          ),
        },
      ]}
      props={[
        {
          name: "defaultValue",
          type: "string",
          description: "The value of the tab that should be active by default",
        },
        {
          name: "value",
          type: "string",
          description: "The controlled value of the active tab. Use with onValueChange for controlled tabs.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Callback function when the active tab changes",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          description: "The orientation of the tabs",
          default: '"horizontal"',
        },
        {
          name: "disabled",
          type: "boolean",
          description: "When true on TabsTrigger, prevents interaction with that tab",
          default: "false",
        },
      ]}
      accessibility={[
        "Supports keyboard navigation with arrow keys between tabs",
        "Tab key moves focus into and out of the tab list",
        "Automatically manages aria-selected and aria-controls attributes",
        "TabsContent is hidden with display: none when inactive, properly removing from tab order",
      ]}
      previousPage={{
        title: "Navigation Components",
        href: "/docs/components#navigation",
      }}
      nextPage={{
        title: "Dropdown Menu",
        href: "/docs/components/dropdown-menu",
      }}
    />
  );
}
