import type { Meta, StoryObj } from '@storybook/nextjs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Input } from './input'
import { Label } from './label'
import { Button } from './button'

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" style={{ width: '400px' }}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p style={{ fontSize: '14px' }}>Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p style={{ fontSize: '14px' }}>Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p style={{ fontSize: '14px' }}>Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  ),
}

export const WithCards: Story = {
  render: () => (
    <Tabs defaultValue="account" style={{ width: '500px' }}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account here.</CardDescription>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@johndoe" />
            </div>
            <Button style={{ marginTop: '8px' }}>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" />
            </div>
            <Button style={{ marginTop: '8px' }}>Update Password</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
}

export const FourTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" style={{ width: '600px' }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div style={{ padding: '20px', fontSize: '14px' }}>Overview dashboard content</div>
      </TabsContent>
      <TabsContent value="analytics">
        <div style={{ padding: '20px', fontSize: '14px' }}>Analytics charts and graphs</div>
      </TabsContent>
      <TabsContent value="reports">
        <div style={{ padding: '20px', fontSize: '14px' }}>Report generation tools</div>
      </TabsContent>
      <TabsContent value="settings">
        <div style={{ padding: '20px', fontSize: '14px' }}>Settings configuration</div>
      </TabsContent>
    </Tabs>
  ),
}

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="enabled1" style={{ width: '400px' }}>
      <TabsList>
        <TabsTrigger value="enabled1">Enabled</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="enabled2">Enabled</TabsTrigger>
      </TabsList>
      <TabsContent value="enabled1">
        <p style={{ fontSize: '14px' }}>Content for first enabled tab</p>
      </TabsContent>
      <TabsContent value="disabled">
        <p style={{ fontSize: '14px' }}>This content cannot be accessed</p>
      </TabsContent>
      <TabsContent value="enabled2">
        <p style={{ fontSize: '14px' }}>Content for second enabled tab</p>
      </TabsContent>
    </Tabs>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="tab1" style={{ width: '100%', maxWidth: '800px' }}>
      <TabsList style={{ width: '100%' }}>
        <TabsTrigger value="tab1" style={{ flex: 1 }}>
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="tab2" style={{ flex: 1 }}>
          Projects
        </TabsTrigger>
        <TabsTrigger value="tab3" style={{ flex: 1 }}>
          Team
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div style={{ padding: '20px' }}>Dashboard overview with key metrics</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div style={{ padding: '20px' }}>List of all projects</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div style={{ padding: '20px' }}>Team member management</div>
      </TabsContent>
    </Tabs>
  ),
}
