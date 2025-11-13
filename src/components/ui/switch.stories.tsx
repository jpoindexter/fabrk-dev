import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './switch'
import { Label } from './label'

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
      <Switch id="marketing" defaultChecked />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Label htmlFor="marketing">Marketing emails</Label>
        <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
          Receive emails about new products and features
        </p>
      </div>
    </div>
  ),
}

export const SettingsList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '350px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Label htmlFor="push">Push notifications</Label>
        <Switch id="push" defaultChecked />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Label htmlFor="email">Email notifications</Label>
        <Switch id="email" defaultChecked />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Label htmlFor="sms">SMS notifications</Label>
        <Switch id="sms" />
      </div>
    </div>
  ),
}
