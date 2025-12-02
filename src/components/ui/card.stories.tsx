import type { Meta, StoryObj } from "@storybook/nextjs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
import { Button } from "./button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="font-mono text-sm">[ CARD_TITLE ]</CardTitle>
        <CardDescription className="font-mono text-xs">
          Card description text goes here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground font-mono text-xs">
          This is the main content area of the card component.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">{"> ACTION"}</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[350px] p-4">
      <p className="text-foreground font-mono text-xs">
        A simple card with just content and padding.
      </p>
    </Card>
  ),
};

export const WithTerminalHeader: Story = {
  render: () => (
    <Card className="w-[400px]">
      <div className="border-border bg-muted/50 border-b px-4 py-2">
        <span className="text-muted-foreground font-mono text-xs">[ [0x01] SYSTEM_STATUS ]</span>
      </div>
      <CardContent className="pt-4">
        <div className="space-y-2 font-mono text-xs">
          <p className="text-success">[OK] Database connected</p>
          <p className="text-success">[OK] API healthy</p>
          <p className="text-warning">[WARN] Cache miss rate: 12%</p>
        </div>
      </CardContent>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <Card className="w-[200px]">
      <CardHeader className="pb-2">
        <CardDescription className="text-muted-foreground font-mono text-xs">
          TOTAL_USERS
        </CardDescription>
        <CardTitle className="font-mono text-3xl">2,847</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-success font-mono text-xs">+12.5% from last month</p>
      </CardContent>
    </Card>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card className="w-[200px]">
        <CardHeader className="pb-2">
          <CardDescription className="font-mono text-xs">REVENUE</CardDescription>
          <CardTitle className="font-mono text-2xl">$45,231</CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-[200px]">
        <CardHeader className="pb-2">
          <CardDescription className="font-mono text-xs">ORDERS</CardDescription>
          <CardTitle className="font-mono text-2xl">1,234</CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-[200px]">
        <CardHeader className="pb-2">
          <CardDescription className="font-mono text-xs">CONVERSION</CardDescription>
          <CardTitle className="font-mono text-2xl">3.2%</CardTitle>
        </CardHeader>
      </Card>
    </div>
  ),
};
