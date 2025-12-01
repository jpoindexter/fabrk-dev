"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
} from "@/components/ui/context-menu";
import { useState } from "react";

export default function ContextMenuPage() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showUrls, setShowUrls] = useState(false);
  const [person, setPerson] = useState("pedro");

  return (
    <ComponentShowcaseTemplate
      code="[UI.39]"
      category="Components"
      title="Context Menu"
      description="Displays a menu triggered by right-clicking an element."
      importCode={`import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu"`}
      mainPreview={{
        preview: (
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-none border border-border bg-card text-sm">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64 rounded-none">
              <ContextMenuItem>
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>
                Forward
                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Reload
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Print...</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ),
        code: `<ContextMenu>
  <ContextMenuTrigger className="border rounded-md p-4">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuItem>
      Back
      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem disabled>
      Forward
      <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      Reload
      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
      }}
      variants={[
        {
          title: "With Checkboxes",
          description: "Context menu with checkbox items for toggling options.",
          preview: (
            <ContextMenu>
              <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-none border border-border bg-card text-sm">
                Right click for options
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64 rounded-none">
                <ContextMenuLabel>Appearance</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem
                  checked={showBookmarks}
                  onCheckedChange={setShowBookmarks}
                >
                  Show Bookmarks Bar
                  <ContextMenuShortcut>⌘B</ContextMenuShortcut>
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem
                  checked={showUrls}
                  onCheckedChange={setShowUrls}
                >
                  Show Full URLs
                </ContextMenuCheckboxItem>
              </ContextMenuContent>
            </ContextMenu>
          ),
          code: `const [showBookmarks, setShowBookmarks] = useState(true);
const [showUrls, setShowUrls] = useState(false);

<ContextMenu>
  <ContextMenuTrigger>Right click for options</ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuLabel>Appearance</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem
      checked={showBookmarks}
      onCheckedChange={setShowBookmarks}
    >
      Show Bookmarks Bar
      <ContextMenuShortcut>⌘B</ContextMenuShortcut>
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem
      checked={showUrls}
      onCheckedChange={setShowUrls}
    >
      Show Full URLs
    </ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>`,
        },
        {
          title: "With Radio Group",
          description: "Context menu with radio items for selecting one option.",
          preview: (
            <ContextMenu>
              <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-none border border-border bg-card text-sm">
                Right click to select
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64 rounded-none">
                <ContextMenuLabel>People</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
                  <ContextMenuRadioItem value="pedro">
                    Pedro Duarte
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value="colm">
                    Colm Tuite
                  </ContextMenuRadioItem>
                </ContextMenuRadioGroup>
              </ContextMenuContent>
            </ContextMenu>
          ),
          code: `const [person, setPerson] = useState("pedro");

<ContextMenu>
  <ContextMenuTrigger>Right click to select</ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuLabel>People</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
      <ContextMenuRadioItem value="pedro">
        Pedro Duarte
      </ContextMenuRadioItem>
      <ContextMenuRadioItem value="colm">
        Colm Tuite
      </ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`,
        },
        {
          title: "With Submenu",
          description: "Context menu with nested submenus.",
          preview: (
            <ContextMenu>
              <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-none border border-border bg-card text-sm">
                Right click for submenu
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64 rounded-none">
                <ContextMenuItem>Open</ContextMenuItem>
                <ContextMenuItem>Download</ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-48 rounded-none">
                    <ContextMenuItem>Email</ContextMenuItem>
                    <ContextMenuItem>Messages</ContextMenuItem>
                    <ContextMenuItem>Airdrop</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ),
          code: `<ContextMenu>
  <ContextMenuTrigger>Right click for submenu</ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuItem>Open</ContextMenuItem>
    <ContextMenuItem>Download</ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-48">
        <ContextMenuItem>Email</ContextMenuItem>
        <ContextMenuItem>Messages</ContextMenuItem>
        <ContextMenuItem>Airdrop</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuItem>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
        },
        {
          title: "With Groups",
          description: "Context menu with grouped items using labels.",
          preview: (
            <ContextMenu>
              <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-none border border-border bg-card text-sm">
                Right click for grouped menu
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64 rounded-none">
                <ContextMenuGroup>
                  <ContextMenuLabel>Edit Actions</ContextMenuLabel>
                  <ContextMenuItem>Cut</ContextMenuItem>
                  <ContextMenuItem>Copy</ContextMenuItem>
                  <ContextMenuItem>Paste</ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuLabel>View</ContextMenuLabel>
                  <ContextMenuItem>Zoom In</ContextMenuItem>
                  <ContextMenuItem>Zoom Out</ContextMenuItem>
                  <ContextMenuItem>Reset Zoom</ContextMenuItem>
                </ContextMenuGroup>
              </ContextMenuContent>
            </ContextMenu>
          ),
          code: `<ContextMenu>
  <ContextMenuTrigger>Right click for grouped menu</ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuGroup>
      <ContextMenuLabel>Edit Actions</ContextMenuLabel>
      <ContextMenuItem>Cut</ContextMenuItem>
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem>Paste</ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuGroup>
      <ContextMenuLabel>View</ContextMenuLabel>
      <ContextMenuItem>Zoom In</ContextMenuItem>
      <ContextMenuItem>Zoom Out</ContextMenuItem>
    </ContextMenuGroup>
  </ContextMenuContent>
</ContextMenu>`,
        },
        {
          title: "Disabled Items",
          description: "Context menu with disabled menu items.",
          preview: (
            <ContextMenu>
              <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-none border border-border bg-card text-sm">
                Right click (some disabled)
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64 rounded-none">
                <ContextMenuItem>New File</ContextMenuItem>
                <ContextMenuItem>New Folder</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem disabled>Undo</ContextMenuItem>
                <ContextMenuItem disabled>Redo</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Settings</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ),
          code: `<ContextMenu>
  <ContextMenuTrigger>Right click (some disabled)</ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuItem>New File</ContextMenuItem>
    <ContextMenuItem>New Folder</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem disabled>Undo</ContextMenuItem>
    <ContextMenuItem disabled>Redo</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Settings</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
        },
      ]}
      props={[
        {
          name: "inset",
          type: "boolean",
          default: "false",
          description: "For ContextMenuItem/ContextMenuLabel - adds left padding for alignment with items that have indicators.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "For ContextMenuItem - disables the menu item.",
        },
        {
          name: "checked",
          type: "boolean",
          description: "For ContextMenuCheckboxItem - the controlled checked state.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          description: "For ContextMenuCheckboxItem - callback when checked state changes.",
        },
        {
          name: "value",
          type: "string",
          description: "For ContextMenuRadioGroup - the value of the selected item.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "For ContextMenuRadioGroup - callback when the selected value changes.",
        },
      ]}
      accessibility={[
        "Built on Radix UI with full ARIA support",
        "Keyboard navigation with Arrow keys",
        "Enter or Space to activate menu items",
        "Escape to close the menu",
        "Right Arrow to open submenus, Left Arrow to close",
        "Type-ahead support for quick navigation",
        "Screen reader announcements for menu state changes",
        "Focus management when opening and closing",
      ]}
      previous={{ title: "Copy Button", href: "/docs/components/copy-button" }}
      next={{ title: "Cropper", href: "/docs/components/cropper" }}
    />
  );
}
