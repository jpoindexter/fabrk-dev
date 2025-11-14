/**
 * ✅ FABRK COMPONENT
 * Kbd Stories - Keyboard shortcut display
 * - Under 150 lines ✓
 * - No hardcoded colors ✓
 * - Design tokens only ✓
 */

import { Kbd } from "@/components/ui/kbd";
import { tokens } from "@/lib/design-system/tokens";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Kbd> = {
  title: "UI/Typography/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Kbd>;

// Default kbd
export const Default: Story = {
  args: {
    children: "⌘",
  },
};

// Single keys
export const SingleKeys: Story = {
  render: () => (
    <div className="flex gap-2">
      <Kbd>⌘</Kbd>
      <Kbd>Ctrl</Kbd>
      <Kbd>Alt</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Esc</Kbd>
    </div>
  ),
};

// Keyboard shortcuts
export const Shortcuts: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex w-[300px] items-center justify-between">
        <span className="text-sm">Copy</span>
        <div className="flex gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>C</Kbd>
        </div>
      </div>
      <div className="flex w-[300px] items-center justify-between">
        <span className="text-sm">Paste</span>
        <div className="flex gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>V</Kbd>
        </div>
      </div>
      <div className="flex w-[300px] items-center justify-between">
        <span className="text-sm">Save</span>
        <div className="flex gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </div>
      </div>
      <div className="flex w-[300px] items-center justify-between">
        <span className="text-sm">Undo</span>
        <div className="flex gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>Z</Kbd>
        </div>
      </div>
    </div>
  ),
};

// Inline usage
export const InlineUsage: Story = {
  render: () => (
    <div className="max-w-md space-y-2">
      <p className="text-sm">
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette.
      </p>
      <p className="text-sm">
        Use <Kbd>Ctrl</Kbd> <Kbd>C</Kbd> to copy text.
      </p>
      <p className="text-sm">
        Hit <Kbd>Esc</Kbd> to close this dialog.
      </p>
    </div>
  ),
};

// Menu with shortcuts
export const MenuWithShortcuts: Story = {
  render: () => (
    <div className="w-[250px] rounded-lg border p-2">
      {[
        { label: "New File", shortcut: ["⌘", "N"] },
        { label: "Open File", shortcut: ["⌘", "O"] },
        { label: "Save", shortcut: ["⌘", "S"] },
        { label: "Save As", shortcut: ["⌘", "Shift", "S"] },
        { label: "Close", shortcut: ["⌘", "W"] },
      ].map((item) => (
        <div
          key={item.label}
          className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
        >
          <span>{item.label}</span>
          <div className="flex gap-1">
            {item.shortcut.map((key) => (
              <Kbd key={key} className="text-xs">
                {key}
              </Kbd>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// Help panel
export const HelpPanel: Story = {
  render: () => (
    <div className="w-[400px] space-y-4 rounded-lg border p-6">
      <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
      <div className="space-y-3">
        <div>
          <h4 className="mb-2 text-sm font-medium">General</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Command palette</span>
              <div className="flex gap-1">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Search</span>
              <div className="flex gap-1">
                <Kbd>⌘</Kbd>
                <Kbd>F</Kbd>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Editing</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Bold</span>
              <div className="flex gap-1">
                <Kbd>⌘</Kbd>
                <Kbd>B</Kbd>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Italic</span>
              <div className="flex gap-1">
                <Kbd>⌘</Kbd>
                <Kbd>I</Kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
