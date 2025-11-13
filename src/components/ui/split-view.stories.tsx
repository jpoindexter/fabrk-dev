import type { Meta, StoryObj } from "@storybook/react";
import {
  SplitView,
  SplitViewThreePanel,
  SplitViewCustom,
  MasterDetail,
  SidebarLayout,
} from "./split-view";
import { Home, Users, Settings, FileText, Search, Bell } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

const meta: Meta<typeof SplitView> = {
  title: "UI/SplitView",
  component: SplitView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SplitView>;

export const EqualSplit: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <SplitView ratio="1:1">
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Left Panel (50%)</h3>
          <p className="text-sm text-muted-foreground">
            Equal split with 1:1 ratio.
          </p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Right Panel (50%)</h3>
          <p className="text-sm text-muted-foreground">
            Both panels take equal space.
          </p>
        </div>
      </SplitView>
    </div>
  ),
};

export const OneToTwoRatio: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <SplitView ratio="1:2">
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Sidebar (33%)</h3>
          <p className="text-sm text-muted-foreground">
            Smaller left panel with 1:2 ratio.
          </p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Main Content (67%)</h3>
          <p className="text-sm text-muted-foreground">
            Larger right panel takes twice the space.
          </p>
        </div>
      </SplitView>
    </div>
  ),
};

export const TwoToOneRatio: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <SplitView ratio="2:1">
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Main Content (67%)</h3>
          <p className="text-sm text-muted-foreground">
            Larger left panel with 2:1 ratio.
          </p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Sidebar (33%)</h3>
          <p className="text-sm text-muted-foreground">
            Smaller right panel takes half the space.
          </p>
        </div>
      </SplitView>
    </div>
  ),
};

export const OneToThreeRatio: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <SplitView ratio="1:3">
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Narrow Sidebar (25%)</h3>
          <p className="text-sm text-muted-foreground">
            Very small left panel with 1:3 ratio.
          </p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Wide Content (75%)</h3>
          <p className="text-sm text-muted-foreground">
            Large right panel takes three times the space.
          </p>
        </div>
      </SplitView>
    </div>
  ),
};

export const VerticalSplit: Story = {
  render: () => (
    <div style={{ height: "500px" }}>
      <SplitView direction="vertical" ratio="1:2">
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Top Panel (33%)</h3>
          <p className="text-sm text-muted-foreground">
            Vertical split with smaller top panel.
          </p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Bottom Panel (67%)</h3>
          <p className="text-sm text-muted-foreground">
            Larger bottom panel.
          </p>
        </div>
      </SplitView>
    </div>
  ),
};

export const WithGap: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <SplitView ratio="1:1" gap={16}>
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Left Panel</h3>
          <p className="text-sm text-muted-foreground">
            16px gap between panels.
          </p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Right Panel</h3>
          <p className="text-sm text-muted-foreground">
            Gap creates visual separation.
          </p>
        </div>
      </SplitView>
    </div>
  ),
};

export const ThreeEqualPanels: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <SplitViewThreePanel>
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Left (33%)</h3>
          <p className="text-sm text-muted-foreground">First panel</p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Middle (33%)</h3>
          <p className="text-sm text-muted-foreground">Second panel</p>
        </div>
        <div className="h-full p-4 bg-secondary border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Right (34%)</h3>
          <p className="text-sm text-muted-foreground">Third panel</p>
        </div>
      </SplitViewThreePanel>
    </div>
  ),
};

export const ThreeCustomRatios: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <SplitViewThreePanel ratios={[20, 60, 20]} gap={8}>
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Sidebar (20%)</h3>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Main (60%)</h3>
        </div>
        <div className="h-full p-4 bg-secondary border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Aside (20%)</h3>
        </div>
      </SplitViewThreePanel>
    </div>
  ),
};

export const CustomMultiplePanels: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <SplitViewCustom sizes={[1, 2, 1, 3]} gap={12}>
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <p className="text-sm font-bold">14%</p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <p className="text-sm font-bold">29%</p>
        </div>
        <div className="h-full p-4 bg-secondary border-2 border-brutal rounded-brutal">
          <p className="text-sm font-bold">14%</p>
        </div>
        <div className="h-full p-4 bg-muted border-2 border-brutal rounded-brutal">
          <p className="text-sm font-bold">43%</p>
        </div>
      </SplitViewCustom>
    </div>
  ),
};

export const MasterDetailLayout: Story = {
  render: () => (
    <div style={{ height: "500px" }}>
      <MasterDetail
        masterWidth={300}
        gap={16}
        master={
          <div className="h-full border-2 border-brutal rounded-brutal bg-card">
            <div className="border-b-2 border-brutal p-3">
              <h3 className="font-bold text-sm">Items</h3>
            </div>
            <div className="divide-y divide-brutal">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="p-3 hover:bg-accent cursor-pointer transition-colors"
                >
                  <p className="font-bold text-sm">Item {i + 1}</p>
                  <p className="text-xs text-muted-foreground">
                    Click to view details
                  </p>
                </div>
              ))}
            </div>
          </div>
        }
        detail={
          <div className="h-full border-2 border-brutal rounded-brutal bg-background">
            <div className="border-b-2 border-brutal p-4">
              <h3 className="font-bold text-xl">Item Details</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Select an item from the list to view its details here.
              </p>
              <div className="space-y-4">
                <div className="p-4 border-2 border-brutal rounded-brutal">
                  <p className="font-bold text-sm mb-1">Description</p>
                  <p className="text-sm text-muted-foreground">
                    This is where the item description would appear.
                  </p>
                </div>
                <div className="p-4 border-2 border-brutal rounded-brutal">
                  <p className="font-bold text-sm mb-1">Metadata</p>
                  <p className="text-sm text-muted-foreground">
                    Additional information about the selected item.
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  ),
};

export const SidebarLayoutBasic: Story = {
  render: () => (
    <div style={{ height: "600px" }}>
      <SidebarLayout
        sidebarWidth={250}
        footerHeight={60}
        gap={16}
        sidebar={
          <div className="h-full border-2 border-brutal rounded-brutal bg-card">
            <div className="border-b-2 border-brutal p-4">
              <h2 className="font-bold">Navigation</h2>
            </div>
            <nav className="p-2 space-y-1">
              {[
                { icon: Home, label: "Home" },
                { icon: Users, label: "Users" },
                { icon: FileText, label: "Documents" },
                { icon: Settings, label: "Settings" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-brutal hover:bg-accent transition-colors text-left"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        }
        content={
          <div className="h-full border-2 border-brutal rounded-brutal bg-background">
            <div className="border-b-2 border-brutal p-4 flex items-center justify-between">
              <h1 className="font-bold text-xl">Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-4 border-2 border-brutal rounded-brutal"
                  >
                    <p className="text-2xl font-bold">{(i + 1) * 1234}</p>
                    <p className="text-sm text-muted-foreground">Metric {i + 1}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="p-6 border-2 border-brutal rounded-brutal">
                  <h3 className="font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="p-3 border-2 border-brutal rounded-brutal"
                      >
                        <p className="text-sm">Activity item {i + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        footer={
          <div className="h-full border-2 border-brutal rounded-brutal bg-card flex items-center justify-between px-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Your Company
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm hover:underline">
                Privacy
              </a>
              <a href="#" className="text-sm hover:underline">
                Terms
              </a>
              <a href="#" className="text-sm hover:underline">
                Help
              </a>
            </div>
          </div>
        }
      />
    </div>
  ),
};

export const NestedSplits: Story = {
  render: () => (
    <div style={{ height: "500px" }}>
      <SplitView ratio="1:2">
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Sidebar</h3>
          <p className="text-sm text-muted-foreground">Fixed left panel</p>
        </div>
        <div className="h-full">
          <SplitView direction="vertical" ratio="2:1">
            <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
              <h3 className="font-bold mb-2">Main Content</h3>
              <p className="text-sm text-muted-foreground">Nested vertical split</p>
            </div>
            <div className="h-full p-4 bg-secondary border-2 border-brutal rounded-brutal">
              <h3 className="font-bold mb-2">Footer</h3>
              <p className="text-sm text-muted-foreground">Bottom panel</p>
            </div>
          </SplitView>
        </div>
      </SplitView>
    </div>
  ),
};

export const EmailClientLayout: Story = {
  render: () => (
    <div style={{ height: "600px" }}>
      <SplitViewThreePanel ratios={[20, 35, 45]} gap={8}>
        <div className="h-full border-2 border-brutal rounded-brutal bg-card p-3">
          <h3 className="font-bold mb-3 text-sm">Folders</h3>
          <nav className="space-y-1">
            {["Inbox (12)", "Starred", "Sent", "Drafts (3)", "Trash"].map((folder) => (
              <button
                key={folder}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-accent text-sm"
              >
                {folder}
              </button>
            ))}
          </nav>
        </div>
        <div className="h-full border-2 border-brutal rounded-brutal bg-background">
          <div className="border-b-2 border-brutal p-3">
            <Input placeholder="Search messages..." className="w-full" />
          </div>
          <div className="divide-y divide-brutal">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="p-3 hover:bg-accent cursor-pointer">
                <p className="font-bold text-sm">Email Subject {i + 1}</p>
                <p className="text-xs text-muted-foreground">
                  Preview text...
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full border-2 border-brutal rounded-brutal bg-card p-4">
          <h3 className="font-bold mb-4">Message Content</h3>
          <p className="text-sm text-muted-foreground">
            Select a message to view its content here.
          </p>
        </div>
      </SplitViewThreePanel>
    </div>
  ),
};
