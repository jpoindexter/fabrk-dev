import type { Meta, StoryObj } from '@storybook/nextjs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'
import { Button } from './button'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card>
      <CardContent>
        <p>Simple card with just content.</p>
      </CardContent>
    </Card>
  ),
}

export const NoFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Feature Announcement</CardTitle>
        <CardDescription>New features released today!</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Check out the latest updates to our platform.</p>
      </CardContent>
    </Card>
  ),
}

export const WithMultipleActions: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Confirm Action</CardTitle>
        <CardDescription>Are you sure you want to proceed?</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This action cannot be undone.</p>
      </CardContent>
      <CardFooter style={{ gap: '8px' }}>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <Card style={{ width: '500px' }}>
      <CardHeader>
        <CardTitle>Dashboard Stats</CardTitle>
        <CardDescription>Your performance this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div><strong>Users:</strong> 1,234</div>
          <div><strong>Revenue:</strong> $12,345</div>
          <div><strong>Growth:</strong> +23%</div>
        </div>
      </CardContent>
    </Card>
  ),
}
