import type { Meta, StoryObj } from "@storybook/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">TAB_1</TabsTrigger>
        <TabsTrigger value="tab2">TAB_2</TabsTrigger>
        <TabsTrigger value="tab3">TAB_3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-muted-foreground p-4 font-mono text-xs">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-muted-foreground p-4 font-mono text-xs">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-muted-foreground p-4 font-mono text-xs">Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithCards: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
        <TabsTrigger value="analytics">ANALYTICS</TabsTrigger>
        <TabsTrigger value="settings">SETTINGS</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle className="font-mono text-sm">[ OVERVIEW ]</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground font-mono text-xs">
              Your account overview and quick stats.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle className="font-mono text-sm">[ ANALYTICS ]</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground font-mono text-xs">
              View detailed analytics and metrics.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle className="font-mono text-sm">[ SETTINGS ]</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground font-mono text-xs">Manage your account settings.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">ACTIVE</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          DISABLED
        </TabsTrigger>
        <TabsTrigger value="another">ANOTHER</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <p className="text-muted-foreground p-4 font-mono text-xs">Active tab content</p>
      </TabsContent>
      <TabsContent value="another">
        <p className="text-muted-foreground p-4 font-mono text-xs">Another tab content</p>
      </TabsContent>
    </Tabs>
  ),
};
