import type { Meta, StoryObj } from "@storybook/react";
import { ResizablePanel, ResizableThreePanel } from "./resizable-panel";
import { useState } from "react";
import { Folder, File, Inbox, Star, Send, Archive, Trash2 } from "lucide-react";

const meta: Meta<typeof ResizablePanel> = {
  title: "UI/ResizablePanel",
  component: ResizablePanel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResizablePanel>;

export const HorizontalDefault: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <ResizablePanel>
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Left Panel</h3>
          <p className="text-sm text-muted-foreground">
            Drag the handle to resize this panel.
          </p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Right Panel</h3>
          <p className="text-sm text-muted-foreground">
            This panel automatically fills the remaining space.
          </p>
        </div>
      </ResizablePanel>
    </div>
  ),
};

export const VerticalDefault: Story = {
  render: () => (
    <div style={{ height: "500px" }}>
      <ResizablePanel direction="vertical">
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Top Panel</h3>
          <p className="text-sm text-muted-foreground">
            Drag the handle down to resize this panel.
          </p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Bottom Panel</h3>
          <p className="text-sm text-muted-foreground">
            This panel automatically fills the remaining space.
          </p>
        </div>
      </ResizablePanel>
    </div>
  ),
};

export const CustomDefaultSize: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <ResizablePanel defaultSize={30}>
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Sidebar (30%)</h3>
          <p className="text-sm text-muted-foreground">
            Starts at 30% width.
          </p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Main Content (70%)</h3>
          <p className="text-sm text-muted-foreground">
            Takes up the remaining 70%.
          </p>
        </div>
      </ResizablePanel>
    </div>
  ),
};

export const WithSizeConstraints: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Constrained Panel</h3>
          <p className="text-sm text-muted-foreground">
            Min: 15%, Max: 40%
          </p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Main Content</h3>
          <p className="text-sm text-muted-foreground">
            The left panel cannot be resized beyond its constraints.
          </p>
        </div>
      </ResizablePanel>
    </div>
  ),
};

export const WithoutHandle: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <ResizablePanel showHandle={false}>
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Left Panel</h3>
          <p className="text-sm text-muted-foreground">
            Handle is hidden but still draggable.
          </p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Right Panel</h3>
          <p className="text-sm text-muted-foreground">
            Hover over the divider to see the cursor change.
          </p>
        </div>
      </ResizablePanel>
    </div>
  ),
};

export const WithResizeCallback: Story = {
  render: () => {
    const [size, setSize] = useState(50);

    return (
      <div style={{ height: "400px" }}>
        <div className="mb-4 p-4 bg-muted rounded-brutal border-2 border-brutal">
          <p className="text-sm font-bold">
            Current left panel size: {size.toFixed(1)}%
          </p>
        </div>
        <ResizablePanel onResize={setSize}>
          <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
            <h3 className="font-bold mb-2">Left Panel</h3>
            <p className="text-sm text-muted-foreground">
              Resize to see the percentage update.
            </p>
          </div>
          <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
            <h3 className="font-bold mb-2">Right Panel</h3>
            <p className="text-sm text-muted-foreground">
              The onResize callback tracks size changes.
            </p>
          </div>
        </ResizablePanel>
      </div>
    );
  },
};

export const IDELayout: Story = {
  render: () => (
    <div style={{ height: "600px" }}>
      <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
        <div className="h-full border-2 border-brutal rounded-brutal bg-card">
          <div className="border-b-2 border-brutal p-3">
            <h3 className="font-bold text-sm">Explorer</h3>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm hover:bg-accent p-2 rounded cursor-pointer">
              <Folder className="h-4 w-4" />
              <span>src</span>
            </div>
            <div className="flex items-center gap-2 text-sm hover:bg-accent p-2 rounded cursor-pointer ml-4">
              <File className="h-4 w-4" />
              <span>index.ts</span>
            </div>
            <div className="flex items-center gap-2 text-sm hover:bg-accent p-2 rounded cursor-pointer ml-4">
              <File className="h-4 w-4" />
              <span>app.ts</span>
            </div>
            <div className="flex items-center gap-2 text-sm hover:bg-accent p-2 rounded cursor-pointer">
              <Folder className="h-4 w-4" />
              <span>components</span>
            </div>
          </div>
        </div>
        <div className="h-full">
          <ResizablePanel direction="vertical" defaultSize={70}>
            <div className="h-full border-2 border-brutal rounded-brutal bg-background">
              <div className="border-b-2 border-brutal p-3">
                <h3 className="font-bold text-sm">index.ts</h3>
              </div>
              <div className="p-4 font-mono text-sm">
                <div className="text-purple-600">import</div>
                <div className="text-green-600">// Code editor content</div>
              </div>
            </div>
            <div className="h-full border-2 border-brutal rounded-brutal bg-card">
              <div className="border-b-2 border-brutal p-3">
                <h3 className="font-bold text-sm">Terminal</h3>
              </div>
              <div className="p-4 font-mono text-sm">
                <div>$ npm run dev</div>
                <div className="text-green-600">✓ Server running on port 3000</div>
              </div>
            </div>
          </ResizablePanel>
        </div>
      </ResizablePanel>
    </div>
  ),
};

export const EmailClientLayout: Story = {
  render: () => (
    <div style={{ height: "600px" }}>
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full border-2 border-brutal rounded-brutal bg-card">
          <div className="border-b-2 border-brutal p-3">
            <h3 className="font-bold text-sm">Folders</h3>
          </div>
          <div className="p-2 space-y-1">
            {[
              { icon: Inbox, label: "Inbox", count: 12 },
              { icon: Star, label: "Starred", count: 3 },
              { icon: Send, label: "Sent", count: null },
              { icon: Archive, label: "Archive", count: null },
              { icon: Trash2, label: "Trash", count: 5 },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-2 text-sm hover:bg-accent p-2 rounded cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                    {item.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="h-full">
          <ResizablePanel defaultSize={40}>
            <div className="h-full border-2 border-brutal rounded-brutal bg-background">
              <div className="border-b-2 border-brutal p-3">
                <h3 className="font-bold text-sm">Message List</h3>
              </div>
              <div className="divide-y divide-brutal">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-3 hover:bg-accent cursor-pointer"
                  >
                    <p className="font-bold text-sm">Email Subject {i + 1}</p>
                    <p className="text-xs text-muted-foreground">
                      Preview text...
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-full border-2 border-brutal rounded-brutal bg-card">
              <div className="border-b-2 border-brutal p-3">
                <h3 className="font-bold text-sm">Message Content</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  Select a message to view its content.
                </p>
              </div>
            </div>
          </ResizablePanel>
        </div>
      </ResizablePanel>
    </div>
  ),
};

export const DashboardLayout: Story = {
  render: () => (
    <div style={{ height: "600px" }}>
      <ResizablePanel direction="vertical" defaultSize={20}>
        <div className="h-full border-2 border-brutal rounded-brutal bg-card p-4">
          <h3 className="font-bold mb-4">Header</h3>
          <div className="flex gap-4">
            <div className="flex-1 p-4 border-2 border-brutal rounded-brutal">
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
            <div className="flex-1 p-4 border-2 border-brutal rounded-brutal">
              <p className="text-2xl font-bold">$12,456</p>
              <p className="text-sm text-muted-foreground">Revenue</p>
            </div>
          </div>
        </div>
        <div className="h-full">
          <ResizablePanel defaultSize={60}>
            <div className="h-full border-2 border-brutal rounded-brutal bg-background p-4">
              <h3 className="font-bold mb-4">Main Chart</h3>
              <div className="h-32 bg-muted rounded-brutal border-2 border-brutal flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Chart Area</p>
              </div>
            </div>
            <div className="h-full border-2 border-brutal rounded-brutal bg-card p-4">
              <h3 className="font-bold mb-4">Recent Activity</h3>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-2 border-2 border-brutal rounded-brutal"
                  >
                    <p className="text-sm">Activity item {i + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          </ResizablePanel>
        </div>
      </ResizablePanel>
    </div>
  ),
};

export const ThreePanelHorizontal: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <ResizableThreePanel>
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Left Panel</h3>
          <p className="text-sm text-muted-foreground">First panel (33%)</p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Middle Panel</h3>
          <p className="text-sm text-muted-foreground">Second panel (33%)</p>
        </div>
        <div className="h-full p-4 bg-secondary border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Right Panel</h3>
          <p className="text-sm text-muted-foreground">Third panel (34%)</p>
        </div>
      </ResizableThreePanel>
    </div>
  ),
};

export const ThreePanelVertical: Story = {
  render: () => (
    <div style={{ height: "600px" }}>
      <ResizableThreePanel direction="vertical">
        <div className="h-full p-4 bg-card border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Top Panel</h3>
          <p className="text-sm text-muted-foreground">First panel (33%)</p>
        </div>
        <div className="h-full p-4 bg-accent border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Middle Panel</h3>
          <p className="text-sm text-muted-foreground">Second panel (33%)</p>
        </div>
        <div className="h-full p-4 bg-secondary border-2 border-brutal rounded-brutal">
          <h3 className="font-bold mb-2">Bottom Panel</h3>
          <p className="text-sm text-muted-foreground">Third panel (34%)</p>
        </div>
      </ResizableThreePanel>
    </div>
  ),
};
