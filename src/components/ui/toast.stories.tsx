import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast'

const meta = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Toast variant',
    },
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = (false, false)

    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Show Toast</Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <ToastTitle>Notification</ToastTitle>
            <ToastDescription>Your changes have been saved.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
  },
}

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = (false, false)

    return (
      <ToastProvider>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Show Error Toast
        </Button>
        <Toast variant="destructive" open={open} onOpenChange={setOpen}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>Something went wrong. Please try again.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
  },
}

export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = (false, false)

    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Show Toast with Action</Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <ToastTitle>Update Available</ToastTitle>
            <ToastDescription>A new version is available. Update now?</ToastDescription>
          </div>
          <ToastAction altText="Update now" onClick={() => alert('Updating...')}>
            Update
          </ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
  },
}

export const TitleOnly: Story = {
  render: () => {
    const [open, setOpen] = (false, false)

    return (
      <ToastProvider>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Show Simple Toast
        </Button>
        <Toast open={open} onOpenChange={setOpen}>
          <ToastTitle>Message sent successfully</ToastTitle>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
  },
}

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = (false, false)

    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Show Long Toast</Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <ToastTitle>File Upload Complete</ToastTitle>
            <ToastDescription>
              Your file "project-documents-final-v2.pdf" has been successfully uploaded to the
              server. It will be available for download in the Files section.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
  },
}
