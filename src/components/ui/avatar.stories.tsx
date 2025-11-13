import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-image.jpg" alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar style={{ width: '32px', height: '32px' }}>
        <AvatarFallback style={{ fontSize: '12px' }}>SM</AvatarFallback>
      </Avatar>
      <Avatar style={{ width: '40px', height: '40px' }}>
        <AvatarFallback style={{ fontSize: '14px' }}>MD</AvatarFallback>
      </Avatar>
      <Avatar style={{ width: '56px', height: '56px' }}>
        <AvatarFallback style={{ fontSize: '16px' }}>LG</AvatarFallback>
      </Avatar>
      <Avatar style={{ width: '80px', height: '80px' }}>
        <AvatarFallback style={{ fontSize: '20px' }}>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const WithInitials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const UserProfile: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <div style={{ fontWeight: 'bold' }}>John Doe</div>
        <div style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>john@example.com</div>
      </div>
    </div>
  ),
}

export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar style={{ marginLeft: '-8px', zIndex: 3 }}>
        <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar style={{ marginLeft: '-8px', zIndex: 2 }}>
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar style={{ marginLeft: '-8px', zIndex: 1 }}>
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <div
        style={{
          marginLeft: '-8px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'var(--muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          border: '2px solid var(--border)',
        }}
      >
        +5
      </div>
    </div>
  ),
}

export const ColoredFallbacks: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Avatar>
        <AvatarFallback style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          AB
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>
          CD
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback style={{ backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)' }}>
          EF
        </AvatarFallback>
      </Avatar>
    </div>
  ),
}
