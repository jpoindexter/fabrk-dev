import type { Meta, StoryObj } from '@storybook/nextjs'
import { Alert, AlertDescription, AlertTitle } from './alert'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success'],
      description: 'Alert variant',
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert style={{ width: '450px' }}>
      <Info className="h-4 w-4" />
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>This is an informational alert with default styling.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" style={{ width: '450px' }}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again to continue.
      </AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert variant="success" style={{ width: '450px' }}>
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved successfully.</AlertDescription>
    </Alert>
  ),
}

export const WithoutIcon: Story = {
  render: () => (
    <Alert style={{ width: '450px' }}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add alerts without icons for a simpler design.
      </AlertDescription>
    </Alert>
  ),
}

export const WithLongContent: Story = {
  render: () => (
    <Alert style={{ width: '500px' }}>
      <Info className="h-4 w-4" />
      <AlertTitle>System Maintenance Scheduled</AlertTitle>
      <AlertDescription>
        We will be performing scheduled maintenance on Sunday, January 15th from 2:00 AM to 6:00 AM
        EST. During this time, some features may be unavailable. We apologize for any
        inconvenience this may cause. Please save your work before the maintenance window begins.
      </AlertDescription>
    </Alert>
  ),
}

export const MultipleAlerts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>Check out our new dashboard analytics.</AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>Your subscription has been renewed for another month.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Action required</AlertTitle>
        <AlertDescription>
          Your payment method is about to expire. Please update your billing information.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <Alert style={{ width: '450px' }}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Server will restart in 10 minutes</AlertTitle>
    </Alert>
  ),
}
