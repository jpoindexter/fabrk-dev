import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TreeView, TreeNode } from "./tree-view";
import { Folder, FolderOpen, File, User, Building, Mail, Phone, Code, Image, FileText } from "lucide-react";
import { Input } from "./input";

const meta: Meta<typeof TreeView> = {
  title: "UI/TreeView",
  component: TreeView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TreeView>;

// Sample data: 3-level hierarchy
const basicTreeData: TreeNode[] = [
  {
    id: "1",
    label: "Documents",
    icon: Folder,
    children: [
      {
        id: "1-1",
        label: "Work",
        icon: Folder,
        children: [
          { id: "1-1-1", label: "Report.pdf", icon: File },
          { id: "1-1-2", label: "Presentation.pptx", icon: File },
        ],
      },
      {
        id: "1-2",
        label: "Personal",
        icon: Folder,
        children: [
          { id: "1-2-1", label: "Resume.docx", icon: File },
          { id: "1-2-2", label: "Cover Letter.pdf", icon: File },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "Images",
    icon: Folder,
    children: [
      { id: "2-1", label: "Vacation.jpg", icon: Image },
      { id: "2-2", label: "Family.png", icon: Image },
    ],
  },
  {
    id: "3",
    label: "Videos",
    icon: Folder,
  },
];

// Deep nesting (5+ levels)
const deepTreeData: TreeNode[] = [
  {
    id: "root",
    label: "Root Directory",
    icon: Folder,
    children: [
      {
        id: "level1-1",
        label: "Level 1 - Folder A",
        icon: Folder,
        children: [
          {
            id: "level2-1",
            label: "Level 2 - Folder A1",
            icon: Folder,
            children: [
              {
                id: "level3-1",
                label: "Level 3 - Folder A1a",
                icon: Folder,
                children: [
                  {
                    id: "level4-1",
                    label: "Level 4 - Folder A1a1",
                    icon: Folder,
                    children: [
                      {
                        id: "level5-1",
                        label: "Level 5 - File.txt",
                        icon: File,
                      },
                      {
                        id: "level5-2",
                        label: "Level 5 - Deep File.pdf",
                        icon: File,
                      },
                    ],
                  },
                  { id: "level4-2", label: "Level 4 - File.docx", icon: File },
                ],
              },
              { id: "level3-2", label: "Level 3 - File.xlsx", icon: File },
            ],
          },
          { id: "level2-2", label: "Level 2 - File.pptx", icon: File },
        ],
      },
      {
        id: "level1-2",
        label: "Level 1 - Folder B",
        icon: Folder,
        children: [
          { id: "level2-3", label: "Level 2 - Shallow File.txt", icon: File },
        ],
      },
    ],
  },
];

// File system tree
const fileSystemData: TreeNode[] = [
  {
    id: "src",
    label: "src",
    icon: Folder,
    children: [
      {
        id: "components",
        label: "components",
        icon: Folder,
        children: [
          {
            id: "ui",
            label: "ui",
            icon: Folder,
            children: [
              { id: "button.tsx", label: "button.tsx", icon: Code },
              { id: "input.tsx", label: "input.tsx", icon: Code },
              { id: "tree-view.tsx", label: "tree-view.tsx", icon: Code },
            ],
          },
          { id: "header.tsx", label: "header.tsx", icon: Code },
          { id: "footer.tsx", label: "footer.tsx", icon: Code },
        ],
      },
      {
        id: "app",
        label: "app",
        icon: Folder,
        children: [
          { id: "page.tsx", label: "page.tsx", icon: Code },
          { id: "layout.tsx", label: "layout.tsx", icon: Code },
        ],
      },
      {
        id: "lib",
        label: "lib",
        icon: Folder,
        children: [
          { id: "utils.ts", label: "utils.ts", icon: Code },
          { id: "api.ts", label: "api.ts", icon: Code },
        ],
      },
    ],
  },
  {
    id: "public",
    label: "public",
    icon: Folder,
    children: [
      { id: "logo.png", label: "logo.png", icon: Image },
      { id: "favicon.ico", label: "favicon.ico", icon: Image },
    ],
  },
  { id: "package.json", label: "package.json", icon: FileText },
  { id: "README.md", label: "README.md", icon: FileText },
];

// Organization chart
const orgChartData: TreeNode[] = [
  {
    id: "ceo",
    label: "Sarah Johnson - CEO",
    icon: User,
    children: [
      {
        id: "cto",
        label: "Michael Chen - CTO",
        icon: User,
        children: [
          {
            id: "dev-lead",
            label: "Emma Williams - Dev Lead",
            icon: User,
            children: [
              { id: "dev1", label: "Alex Rodriguez - Senior Dev", icon: User },
              { id: "dev2", label: "Jessica Lee - Junior Dev", icon: User },
            ],
          },
          {
            id: "qa-lead",
            label: "David Kim - QA Lead",
            icon: User,
            children: [
              { id: "qa1", label: "Sophie Martin - QA Engineer", icon: User },
            ],
          },
        ],
      },
      {
        id: "cfo",
        label: "Robert Taylor - CFO",
        icon: User,
        children: [
          { id: "accountant", label: "Lisa Brown - Accountant", icon: User },
          { id: "finance", label: "James Wilson - Finance Manager", icon: User },
        ],
      },
      {
        id: "cmo",
        label: "Amanda Garcia - CMO",
        icon: User,
        children: [
          { id: "marketing1", label: "Chris Anderson - Marketing Specialist", icon: User },
          { id: "marketing2", label: "Maria Gonzalez - Content Manager", icon: User },
        ],
      },
    ],
  },
];

// Disabled nodes example
const disabledNodesData: TreeNode[] = [
  {
    id: "available",
    label: "Available Features",
    icon: Folder,
    children: [
      { id: "feature1", label: "Dashboard (Active)", icon: File },
      { id: "feature2", label: "Settings (Active)", icon: File },
    ],
  },
  {
    id: "locked",
    label: "Locked Features (Upgrade Required)",
    icon: Folder,
    disabled: true,
    children: [
      { id: "feature3", label: "Analytics (Pro)", icon: File, disabled: true },
      { id: "feature4", label: "API Access (Enterprise)", icon: File, disabled: true },
    ],
  },
];

export const Default: Story = {
  args: {
    data: basicTreeData,
    showIcons: true,
    multiSelect: false,
    showCheckboxes: false,
  },
  render: (args) => (
    <div className="w-[600px]">
      <TreeView {...args} />
    </div>
  ),
};

export const DeepNesting: Story = {
  args: {
    data: deepTreeData,
    showIcons: true,
    defaultExpandAll: false,
  },
  render: (args) => (
    <div className="w-[600px] max-h-[500px] overflow-auto">
      <TreeView {...args} />
    </div>
  ),
};

export const FileSystemTree: Story = {
  args: {
    data: fileSystemData,
    showIcons: true,
    defaultExpandAll: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <TreeView {...args} />
    </div>
  ),
};

export const OrganizationChart: Story = {
  args: {
    data: orgChartData,
    showIcons: true,
    defaultExpandAll: true,
  },
  render: (args) => (
    <div className="w-[700px]">
      <TreeView {...args} />
    </div>
  ),
};

export const WithCheckboxes: Story = {
  args: {
    data: basicTreeData,
    showCheckboxes: true,
    showIcons: true,
  },
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <div className="w-[600px] space-y-4">
        <div className="text-sm text-muted-foreground">
          Selected: {selectedIds.length > 0 ? selectedIds.join(", ") : "None"}
        </div>
        <TreeView {...args} selectedIds={selectedIds} onSelect={setSelectedIds} />
      </div>
    );
  },
};

export const MultiSelectMode: Story = {
  args: {
    data: fileSystemData,
    multiSelect: true,
    showIcons: true,
  },
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <div className="w-[600px] space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Multi-select mode (click to toggle, shift+click to add)</div>
          <div className="text-sm text-muted-foreground">
            Selected: {selectedIds.length > 0 ? selectedIds.join(", ") : "None"}
          </div>
        </div>
        <TreeView {...args} selectedIds={selectedIds} onSelect={setSelectedIds} />
      </div>
    );
  },
};

export const SingleSelectMode: Story = {
  args: {
    data: fileSystemData,
    multiSelect: false,
    showIcons: true,
  },
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <div className="w-[600px] space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Single-select mode (click to select one)</div>
          <div className="text-sm text-muted-foreground">
            Selected: {selectedIds.length > 0 ? selectedIds[0] : "None"}
          </div>
        </div>
        <TreeView {...args} selectedIds={selectedIds} onSelect={setSelectedIds} />
      </div>
    );
  },
};

export const WithCustomIcons: Story = {
  args: {
    data: [
      {
        id: "company",
        label: "Acme Corporation",
        icon: Building,
        children: [
          {
            id: "departments",
            label: "Departments",
            icon: Folder,
            children: [
              {
                id: "engineering",
                label: "Engineering",
                icon: Code,
                children: [
                  { id: "eng1", label: "Alice Smith", icon: User },
                  { id: "eng2", label: "Bob Jones", icon: User },
                ],
              },
              {
                id: "marketing",
                label: "Marketing",
                icon: Mail,
                children: [
                  { id: "mkt1", label: "Carol White", icon: User },
                ],
              },
            ],
          },
          {
            id: "contact",
            label: "Contact Information",
            icon: Phone,
            children: [
              { id: "email", label: "info@acme.com", icon: Mail },
              { id: "phone", label: "+1-555-0123", icon: Phone },
            ],
          },
        ],
      },
    ],
    showIcons: true,
    defaultExpandAll: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <TreeView {...args} />
    </div>
  ),
};

export const WithSearch: Story = {
  args: {
    data: fileSystemData,
    showIcons: true,
  },
  render: (args) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
      <div className="w-[600px] space-y-4">
        <Input
          placeholder="Search tree..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <TreeView {...args} searchTerm={searchTerm} />
      </div>
    );
  },
};

export const DefaultExpanded: Story = {
  args: {
    data: basicTreeData,
    showIcons: true,
    defaultExpandAll: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <TreeView {...args} />
    </div>
  ),
};

export const PartiallySelected: Story = {
  args: {
    data: basicTreeData,
    showCheckboxes: true,
    showIcons: true,
  },
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(["1-1-1", "2-1"]);

    return (
      <div className="w-[600px] space-y-4">
        <div className="text-sm text-muted-foreground">
          Pre-selected: 1-1-1, 2-1 (notice indeterminate parent checkboxes)
        </div>
        <TreeView {...args} selectedIds={selectedIds} onSelect={setSelectedIds} />
      </div>
    );
  },
};

export const DisabledNodes: Story = {
  args: {
    data: disabledNodesData,
    showIcons: true,
    showCheckboxes: true,
  },
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <div className="w-[600px] space-y-4">
        <div className="text-sm text-muted-foreground">
          Try selecting the locked features - they're disabled
        </div>
        <TreeView {...args} selectedIds={selectedIds} onSelect={setSelectedIds} />
      </div>
    );
  },
};

export const WithNodeActions: Story = {
  args: {
    data: fileSystemData,
    showIcons: true,
  },
  render: (args) => {
    const [logs, setLogs] = useState<string[]>([]);

    const handleNodeClick = (node: TreeNode) => {
      setLogs((prev) => [
        `Clicked: ${node.label} (ID: ${node.id})`,
        ...prev.slice(0, 4),
      ]);
    };

    return (
      <div className="w-[600px] space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Click any node to see event logs</div>
          <div className="rounded-md border bg-muted p-3 text-sm space-y-1 min-h-[100px]">
            {logs.length === 0 ? (
              <div className="text-muted-foreground">No events yet...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-foreground">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
        <TreeView {...args} onNodeClick={handleNodeClick} />
      </div>
    );
  },
};

export const ControlledState: Story = {
  args: {
    data: basicTreeData,
    showIcons: true,
  },
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(["1-1"]);
    const [expandedIds, setExpandedIds] = useState<string[]>(["1"]);

    return (
      <div className="w-[600px] space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Controlled State Example</div>
          <div className="text-sm text-muted-foreground">
            Selected: {selectedIds.join(", ") || "None"}
          </div>
          <div className="text-sm text-muted-foreground">
            Expanded: {expandedIds.join(", ") || "None"}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setExpandedIds(["1", "1-1", "1-2", "2"])}
              className="px-3 py-1 text-sm rounded-md border bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Expand All
            </button>
            <button
              onClick={() => setExpandedIds([])}
              className="px-3 py-1 text-sm rounded-md border bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Collapse All
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-1 text-sm rounded-md border bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Clear Selection
            </button>
          </div>
        </div>
        <TreeView
          {...args}
          selectedIds={selectedIds}
          expandedIds={expandedIds}
          onSelect={setSelectedIds}
          onExpand={setExpandedIds}
        />
      </div>
    );
  },
};
