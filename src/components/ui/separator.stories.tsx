import type { Meta, StoryObj } from '@storybook/nextjs'
import { Separator } from './separator'

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the separator',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is purely decorative',
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <div style={{ padding: '16px 0' }}>
        <p style={{ fontSize: '14px' }}>Section above separator</p>
      </div>
      <Separator {...args} />
      <div style={{ padding: '16px 0' }}>
        <p style={{ fontSize: '14px' }}>Section below separator</p>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', height: '100px', gap: '16px' }}>
      <p style={{ fontSize: '14px' }}>Left section</p>
      <Separator {...args} />
      <p style={{ fontSize: '14px' }}>Right section</p>
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        border: '2px solid var(--border)',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '4px 4px 0px 0px var(--border)',
      }}
    >
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
        Card Title
      </h3>
      <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
        Card description goes here.
      </p>
      <Separator style={{ margin: '20px 0' }} />
      <p style={{ fontSize: '14px' }}>Card content below separator.</p>
    </div>
  ),
}

export const InMenu: Story = {
  render: () => (
    <div
      style={{
        width: '250px',
        border: '2px solid var(--border)',
        borderRadius: '8px',
        padding: '8px',
        boxShadow: '4px 4px 0px 0px var(--border)',
      }}
    >
      <div style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: 600 }}>
        Profile
      </div>
      <div style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: 600 }}>
        Settings
      </div>
      <Separator style={{ margin: '8px 0' }} />
      <div style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: 600 }}>
        Logout
      </div>
    </div>
  ),
}

export const MultipleInList: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <div style={{ padding: '12px 0' }}>
        <h4 style={{ fontWeight: 'bold' }}>Item 1</h4>
        <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
          Description for item 1
        </p>
      </div>
      <Separator />
      <div style={{ padding: '12px 0' }}>
        <h4 style={{ fontWeight: 'bold' }}>Item 2</h4>
        <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
          Description for item 2
        </p>
      </div>
      <Separator />
      <div style={{ padding: '12px 0' }}>
        <h4 style={{ fontWeight: 'bold' }}>Item 3</h4>
        <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
          Description for item 3
        </p>
      </div>
    </div>
  ),
}
