import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    rows: {
      control: 'number',
      description: 'Number of visible rows',
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: 'This is a pre-filled textarea with some content.',
    placeholder: 'Enter your message...',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    placeholder: 'This field has an error',
    error: true,
    defaultValue: 'Invalid content',
  },
}

export const CustomRows: Story = {
  args: {
    placeholder: 'Textarea with 10 rows',
    rows: 10,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '400px' }}>
      <label htmlFor="message" style={{ fontWeight: 600 }}>
        Message
      </label>
      <Textarea id="message" placeholder="Enter your message here..." />
    </div>
  ),
}

export const FullWidth: Story = {
  args: {
    placeholder: 'Full width textarea',
    style: { width: '500px' },
  },
}
