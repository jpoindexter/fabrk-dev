import type { Meta, StoryObj } from '@storybook/nextjs'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

const meta = {
  title: 'UI/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Side Panel</SheetTitle>
          <SheetDescription>
            This is a sheet that slides in from the right side of the screen.
          </SheetDescription>
        </SheetHeader>
        <div style={{ paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
            Add your content here. Sheets are great for forms, settings panels, or any content
            that should overlay the main page.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Browse through the application sections.</SheetDescription>
        </SheetHeader>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingTop: '20px',
          }}
        >
          <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
            Dashboard
          </Button>
          <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
            Projects
          </Button>
          <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
            Settings
          </Button>
          <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
            Help
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            paddingTop: '20px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@johndoe" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
        </div>
        <SheetFooter style={{ paddingTop: '20px' }}>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notification Banner</SheetTitle>
          <SheetDescription>Important updates and announcements appear here.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Additional Information</SheetTitle>
          <SheetDescription>
            This sheet slides up from the bottom, commonly used for mobile interfaces.
          </SheetDescription>
        </SheetHeader>
        <div style={{ paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
            Bottom sheets are especially useful for mobile-first designs where users expect content
            to slide up from the bottom of the screen.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const Settings: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Settings</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Configure your application preferences.</SheetDescription>
        </SheetHeader>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            paddingTop: '20px',
          }}
        >
          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Appearance</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
              Customize how the application looks and feels.
            </p>
          </div>
          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Notifications</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
              Manage your notification preferences.
            </p>
          </div>
          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Privacy</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
              Control your privacy and data settings.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
}
