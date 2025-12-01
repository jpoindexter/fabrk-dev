"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarShortcut,
} from "@/components/ui/menubar";
import { useState } from "react";

export default function MenubarPage() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showUrls, setShowUrls] = useState(false);
  const [zoom, setZoom] = useState("100");

  return (
    <ComponentShowcaseTemplate
      code="[UI.41]"
      category="Components"
      title="Menubar"
      description="A horizontal menu bar component with dropdown menus, similar to desktop application menus."
      importCode={`import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar"`}
      mainPreview={{
        preview: (
          <Menubar className="rounded-none">
            <MenubarMenu>
              <MenubarTrigger className="font-mono text-xs">File</MenubarTrigger>
              <MenubarContent className="rounded-none">
                <MenubarItem className="font-mono text-xs">
                  New Tab
                  <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem className="font-mono text-xs">
                  New Window
                  <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="font-mono text-xs">Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="font-mono text-xs">Print...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="font-mono text-xs">Edit</MenubarTrigger>
              <MenubarContent className="rounded-none">
                <MenubarItem className="font-mono text-xs">
                  Undo
                  <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem className="font-mono text-xs">
                  Redo
                  <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="font-mono text-xs">Cut</MenubarItem>
                <MenubarItem className="font-mono text-xs">Copy</MenubarItem>
                <MenubarItem className="font-mono text-xs">Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="font-mono text-xs">View</MenubarTrigger>
              <MenubarContent className="rounded-none">
                <MenubarItem className="font-mono text-xs">
                  Reload
                  <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled className="font-mono text-xs">
                  Force Reload
                  <MenubarShortcut>⇧⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="font-mono text-xs">Toggle Fullscreen</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ),
        code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab
        <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        New Window
        <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print...</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Undo
        <MenubarShortcut>⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>Cut</MenubarItem>
      <MenubarItem>Copy</MenubarItem>
      <MenubarItem>Paste</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
      }}
      variants={[
        {
          title: "With Checkboxes",
          description: "Menubar with checkbox items for toggling options.",
          preview: (
            <Menubar className="rounded-none">
              <MenubarMenu>
                <MenubarTrigger className="font-mono text-xs">View</MenubarTrigger>
                <MenubarContent className="rounded-none">
                  <MenubarCheckboxItem
                    checked={showBookmarks}
                    onCheckedChange={setShowBookmarks}
                    className="font-mono text-xs"
                  >
                    Show Bookmarks
                    <MenubarShortcut>⌘B</MenubarShortcut>
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem
                    checked={showUrls}
                    onCheckedChange={setShowUrls}
                    className="font-mono text-xs"
                  >
                    Show Full URLs
                  </MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarItem className="font-mono text-xs">
                    Reload
                    <MenubarShortcut>⌘R</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ),
          code: `const [showBookmarks, setShowBookmarks] = useState(true);
const [showUrls, setShowUrls] = useState(false);

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem
        checked={showBookmarks}
        onCheckedChange={setShowBookmarks}
      >
        Show Bookmarks
        <MenubarShortcut>⌘B</MenubarShortcut>
      </MenubarCheckboxItem>
      <MenubarCheckboxItem
        checked={showUrls}
        onCheckedChange={setShowUrls}
      >
        Show Full URLs
      </MenubarCheckboxItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
        },
        {
          title: "With Radio Group",
          description: "Menubar with radio items for selecting zoom level.",
          preview: (
            <Menubar className="rounded-none">
              <MenubarMenu>
                <MenubarTrigger className="font-mono text-xs">Zoom</MenubarTrigger>
                <MenubarContent className="rounded-none">
                  <MenubarRadioGroup value={zoom} onValueChange={setZoom}>
                    <MenubarRadioItem value="50" className="font-mono text-xs">
                      50%
                    </MenubarRadioItem>
                    <MenubarRadioItem value="75" className="font-mono text-xs">
                      75%
                    </MenubarRadioItem>
                    <MenubarRadioItem value="100" className="font-mono text-xs">
                      100%
                    </MenubarRadioItem>
                    <MenubarRadioItem value="125" className="font-mono text-xs">
                      125%
                    </MenubarRadioItem>
                    <MenubarRadioItem value="150" className="font-mono text-xs">
                      150%
                    </MenubarRadioItem>
                  </MenubarRadioGroup>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ),
          code: `const [zoom, setZoom] = useState("100");

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Zoom</MenubarTrigger>
    <MenubarContent>
      <MenubarRadioGroup value={zoom} onValueChange={setZoom}>
        <MenubarRadioItem value="50">50%</MenubarRadioItem>
        <MenubarRadioItem value="75">75%</MenubarRadioItem>
        <MenubarRadioItem value="100">100%</MenubarRadioItem>
        <MenubarRadioItem value="125">125%</MenubarRadioItem>
        <MenubarRadioItem value="150">150%</MenubarRadioItem>
      </MenubarRadioGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
        },
        {
          title: "With Submenu",
          description: "Menubar with nested submenu items.",
          preview: (
            <Menubar className="rounded-none">
              <MenubarMenu>
                <MenubarTrigger className="font-mono text-xs">File</MenubarTrigger>
                <MenubarContent className="rounded-none">
                  <MenubarItem className="font-mono text-xs">
                    New Tab
                    <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSub>
                    <MenubarSubTrigger className="font-mono text-xs">
                      Open Recent
                    </MenubarSubTrigger>
                    <MenubarSubContent className="rounded-none">
                      <MenubarItem className="font-mono text-xs">Document.pdf</MenubarItem>
                      <MenubarItem className="font-mono text-xs">Image.png</MenubarItem>
                      <MenubarItem className="font-mono text-xs">Notes.txt</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem className="font-mono text-xs">Clear Recent</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem className="font-mono text-xs">
                    Close Tab
                    <MenubarShortcut>⌘W</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ),
          code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab
        <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarSub>
        <MenubarSubTrigger>Open Recent</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>Document.pdf</MenubarItem>
          <MenubarItem>Image.png</MenubarItem>
          <MenubarItem>Notes.txt</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Clear Recent</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
      <MenubarSeparator />
      <MenubarItem>Close Tab</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
        },
        {
          title: "With Labels",
          description: "Menubar with labeled sections.",
          preview: (
            <Menubar className="rounded-none">
              <MenubarMenu>
                <MenubarTrigger className="font-mono text-xs">Tools</MenubarTrigger>
                <MenubarContent className="rounded-none">
                  <MenubarLabel className="font-mono text-xs">Developer</MenubarLabel>
                  <MenubarItem className="font-mono text-xs">
                    Console
                    <MenubarShortcut>⌘⌥J</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className="font-mono text-xs">
                    Sources
                    <MenubarShortcut>⌘⌥S</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarLabel className="font-mono text-xs">Extensions</MenubarLabel>
                  <MenubarItem className="font-mono text-xs">Manage Extensions</MenubarItem>
                  <MenubarItem className="font-mono text-xs">Task Manager</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ),
          code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Tools</MenubarTrigger>
    <MenubarContent>
      <MenubarLabel>Developer</MenubarLabel>
      <MenubarItem>
        Console
        <MenubarShortcut>⌘⌥J</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>Sources</MenubarItem>
      <MenubarSeparator />
      <MenubarLabel>Extensions</MenubarLabel>
      <MenubarItem>Manage Extensions</MenubarItem>
      <MenubarItem>Task Manager</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
        },
        {
          title: "Terminal Style",
          description: "Menubar with terminal-style design matching Fabrk theme.",
          preview: (
            <Menubar className="rounded-none border border-border bg-card">
              <MenubarMenu>
                <MenubarTrigger className="font-mono text-xs">&gt; FILE</MenubarTrigger>
                <MenubarContent className="rounded-none">
                  <MenubarLabel className="font-mono text-xs text-muted-foreground">
                    [FILE_OPERATIONS]
                  </MenubarLabel>
                  <MenubarSeparator />
                  <MenubarItem className="font-mono text-xs">
                    &gt; NEW_FILE
                    <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className="font-mono text-xs">
                    &gt; OPEN_FILE
                    <MenubarShortcut>⌘O</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className="font-mono text-xs">
                    &gt; SAVE
                    <MenubarShortcut>⌘S</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="font-mono text-xs">&gt; EDIT</MenubarTrigger>
                <MenubarContent className="rounded-none">
                  <MenubarLabel className="font-mono text-xs text-muted-foreground">
                    [EDIT_OPERATIONS]
                  </MenubarLabel>
                  <MenubarSeparator />
                  <MenubarItem className="font-mono text-xs">
                    &gt; UNDO
                    <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className="font-mono text-xs">
                    &gt; REDO
                    <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="font-mono text-xs">&gt; VIEW</MenubarTrigger>
                <MenubarContent className="rounded-none">
                  <MenubarCheckboxItem
                    checked={showBookmarks}
                    onCheckedChange={setShowBookmarks}
                    className="font-mono text-xs"
                  >
                    &gt; SIDEBAR
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem
                    checked={showUrls}
                    onCheckedChange={setShowUrls}
                    className="font-mono text-xs"
                  >
                    &gt; TERMINAL
                  </MenubarCheckboxItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ),
          code: `<Menubar className="rounded-none border bg-card">
  <MenubarMenu>
    <MenubarTrigger className="font-mono">&gt; FILE</MenubarTrigger>
    <MenubarContent className="rounded-none">
      <MenubarLabel className="font-mono text-muted-foreground">
        [FILE_OPERATIONS]
      </MenubarLabel>
      <MenubarSeparator />
      <MenubarItem className="font-mono">
        &gt; NEW_FILE
        <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarItem className="font-mono">
        &gt; SAVE
        <MenubarShortcut>⌘S</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
        },
      ]}
      props={[
        {
          name: "align",
          type: '"start" | "center" | "end"',
          default: '"start"',
          description: "For MenubarContent - horizontal alignment relative to the trigger.",
        },
        {
          name: "alignOffset",
          type: "number",
          default: "-4",
          description: "For MenubarContent - offset in pixels from the aligned position.",
        },
        {
          name: "sideOffset",
          type: "number",
          default: "8",
          description: "For MenubarContent - distance in pixels between trigger and content.",
        },
        {
          name: "inset",
          type: "boolean",
          default: "false",
          description: "For MenubarItem/MenubarLabel - adds left padding for alignment with items that have indicators.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "For MenubarItem - disables the menu item.",
        },
        {
          name: "checked",
          type: "boolean",
          description: "For MenubarCheckboxItem - the controlled checked state.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          description: "For MenubarCheckboxItem - callback when checked state changes.",
        },
        {
          name: "value",
          type: "string",
          description: "For MenubarRadioGroup - the value of the selected item.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "For MenubarRadioGroup - callback when the selected value changes.",
        },
      ]}
      accessibility={[
        "Built on Radix UI with full ARIA support",
        "Keyboard navigation with Arrow keys between menus",
        "Tab key to move focus in and out of menubar",
        "Enter or Space to activate menu items",
        "Escape to close open menus",
        "Arrow Down to open menu from trigger",
        "Arrow Up/Down to navigate menu items",
        "Arrow Right to open submenus, Left to close",
        "Type-ahead support for quick navigation",
        "Screen reader announcements for menu state",
        "Focus management when opening and closing menus",
      ]}
      previous={{ title: "Multi Select", href: "/docs/components/multi-select" }}
      next={{ title: "Navigation", href: "/docs/components/navigation" }}
    />
  );
}
