import type { Meta, StoryObj } from '@storybook/nextjs'
import { Badge } from './badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Visual style variant',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span style={{ marginRight: '4px' }}>✨</span>
        New
      </>
    ),
  },
}

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge>Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="accent">Inactive</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge style={{ fontSize: '10px', padding: '2px 6px' }}>Small</Badge>
      <Badge>Default</Badge>
      <Badge style={{ fontSize: '14px', padding: '6px 12px' }}>Large</Badge>
    </div>
  ),
}
