import type { Meta, StoryObj } from '@storybook/nextjs'
import { Toaster } from './toaster'

const meta = {
  title: 'UI/Toaster',
  component: Toaster,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          Toast Container
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', marginBottom: '24px' }}>
          The Toaster component manages and displays toast notifications. It should be added once
          at the root of your application.
        </p>
        <div
          style={{
            padding: '24px',
            border: '2px solid var(--border)',
            borderRadius: '8px',
            boxShadow: '4px 4px 0px 0px var(--border)',
            backgroundColor: 'var(--card)',
          }}
        >
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Usage</h3>
          <pre
            style={{
              textAlign: 'left',
              backgroundColor: 'var(--muted)',
              padding: '16px',
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
            }}
          >
            {`// In your root layout:
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`}
          </pre>
        </div>
        <div style={{ marginTop: '24px', fontSize: '14px', color: 'var(--muted-foreground)' }}>
          Toaster automatically manages toast positioning and animations
        </div>
      </div>
      <Toaster />
    </div>
  ),
}

export const Positioned: Story = {
  render: () => (
    <div style={{ padding: '40px', position: 'relative', minHeight: '400px' }}>
      <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--muted-foreground)' }}>
        Toasts appear in the bottom-right corner on desktop and top-center on mobile
      </p>
      <Toaster />
    </div>
  ),
}
