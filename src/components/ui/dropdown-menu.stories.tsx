import type { Meta, StoryObj } from '@storybook/nextjs'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Button } from './button'

const meta = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>New Project</DropdownMenuItem>
        <DropdownMenuItem>Invite Team</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithShortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>File</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          New File
          <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Open
          <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Save
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Export
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithCheckboxes: Story = {
  render: () => {
    const [showPanel, setShowPanel] = (true, true)
    const [showToolbar, setShowToolbar] = (true, true)
    const [showSidebar, setShowSidebar] = (true, false)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">View</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

export const WithRadioGroup: Story = {
  render: () => {
    const [position, setPosition] = ('bottom', 'bottom')

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Panel Position</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

export const WithSubmenus: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Edit</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Undo</DropdownMenuItem>
        <DropdownMenuItem>Redo</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Find</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Find in File</DropdownMenuItem>
            <DropdownMenuItem>Find in Files</DropdownMenuItem>
            <DropdownMenuItem>Replace</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Cut</DropdownMenuItem>
        <DropdownMenuItem>Copy</DropdownMenuItem>
        <DropdownMenuItem>Paste</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const UserMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">John Doe</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Logout
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
