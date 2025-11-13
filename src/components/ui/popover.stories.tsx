import type { Meta, StoryObj } from '@storybook/react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

const meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '16px' }}>Popover Title</h3>
          <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
            This is a popover component. You can add any content here.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Add Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '16px' }}>Dimensions</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
              Set the dimensions for the layer.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label htmlFor="width">Width</Label>
            <Input id="width" type="number" defaultValue="100" placeholder="Enter width" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label htmlFor="height">Height</Label>
            <Input id="height" type="number" defaultValue="100" placeholder="Enter height" />
          </div>
          <Button style={{ marginTop: '8px' }}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const Information: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">What is this?</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '16px' }}>About This Feature</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
            This popover provides additional information about a feature without navigating away
            from the current page. It's perfect for tooltips, help text, or quick actions.
          </p>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--muted-foreground)',
              paddingTop: '8px',
              borderTop: '1px solid var(--border)',
            }}
          >
            Learn more in our documentation
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const AlignStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Align Start</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <p style={{ fontSize: '14px' }}>This popover is aligned to the start of the trigger.</p>
      </PopoverContent>
    </Popover>
  ),
}

export const AlignEnd: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Align End</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <p style={{ fontSize: '14px' }}>This popover is aligned to the end of the trigger.</p>
      </PopoverContent>
    </Popover>
  ),
}

export const UserProfile: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">View Profile</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-foreground)',
                fontWeight: 'bold',
              }}
            >
              JD
            </div>
            <div>
              <h3 style={{ fontWeight: 'bold' }}>John Doe</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
                john@example.com
              </p>
            </div>
          </div>
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
              Profile Settings
            </Button>
            <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
