import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Banner } from '../banner'

describe('Banner', () => {
  it('renders banner with children', () => {
    render(<Banner>Important message</Banner>)
    expect(screen.getByText('Important message')).toBeInTheDocument()
  })

  it('renders with title and children', () => {
    render(
      <Banner title="Alert">
        This is the message content
      </Banner>
    )
    expect(screen.getByText('Alert')).toBeInTheDocument()
    expect(screen.getByText('This is the message content')).toBeInTheDocument()
  })

  it('renders info variant by default', () => {
    render(<Banner>Info message</Banner>)
    const banner = screen.getByRole('alert')
    expect(banner).toHaveClass('bg-info/10', 'border-blue-500', 'text-blue-900')
  })

  it('renders success variant', () => {
    render(
      <Banner variant="success">
        Success message
      </Banner>
    )
    const banner = screen.getByRole('alert')
    expect(banner).toHaveClass('bg-success/10', 'border-success', 'text-success-foreground')
  })

  it('renders warning variant', () => {
    render(
      <Banner variant="warning">
        Warning message
      </Banner>
    )
    const banner = screen.getByRole('alert')
    expect(banner).toHaveClass('bg-warning/10', 'border-warning', 'text-warning-foreground')
  })

  it('renders error variant', () => {
    render(
      <Banner variant="error">
        Error message
      </Banner>
    )
    const banner = screen.getByRole('alert')
    expect(banner).toHaveClass('bg-destructive/10', 'border-destructive', 'text-destructive-foreground')
  })

  it('displays correct icon for info variant', () => {
    render(<Banner variant="info">Info</Banner>)
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('h-5', 'w-5')
  })

  it('displays correct icon for success variant', () => {
    render(<Banner variant="success">Success</Banner>)
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('displays correct icon for warning variant', () => {
    render(<Banner variant="warning">Warning</Banner>)
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('displays correct icon for error variant', () => {
    render(<Banner variant="error">Error</Banner>)
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('renders dismiss button when onDismiss is provided', () => {
    const handleDismiss = vi.fn()
    render(
      <Banner onDismiss={handleDismiss}>
        Dismissible message
      </Banner>
    )
    const dismissButton = screen.getByLabelText('Dismiss')
    expect(dismissButton).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', () => {
    const handleDismiss = vi.fn()
    render(
      <Banner onDismiss={handleDismiss}>
        Message
      </Banner>
    )
    fireEvent.click(screen.getByLabelText('Dismiss'))
    expect(handleDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not render dismiss button when onDismiss is not provided', () => {
    render(<Banner>Message</Banner>)
    expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument()
  })

  it('renders action button when action is provided', () => {
    const handleAction = vi.fn()
    render(
      <Banner action={{ label: 'Learn more', onClick: handleAction }}>
        Message
      </Banner>
    )
    const actionButton = screen.getByText('Learn more')
    expect(actionButton).toBeInTheDocument()
  })

  it('calls action onClick when action button is clicked', () => {
    const handleAction = vi.fn()
    render(
      <Banner action={{ label: 'Retry', onClick: handleAction }}>
        Failed to load
      </Banner>
    )
    fireEvent.click(screen.getByText('Retry'))
    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('does not render action button when action is not provided', () => {
    render(<Banner>Message</Banner>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Banner className="custom-banner">
        Custom
      </Banner>
    )
    expect(screen.getByRole('alert')).toHaveClass('custom-banner')
  })

  it('has role="alert" for accessibility', () => {
    render(<Banner>Alert</Banner>)
    const banner = screen.getByRole('alert')
    expect(banner).toBeInTheDocument()
  })

  it('renders complete banner with all features', () => {
    const handleAction = vi.fn()
    const handleDismiss = vi.fn()
    render(
      <Banner
        variant="warning"
        title="Action Required"
        action={{ label: 'Update now', onClick: handleAction }}
        onDismiss={handleDismiss}
      >
        Your subscription will expire soon. Update your payment method to continue.
      </Banner>
    )

    expect(screen.getByText('Action Required')).toBeInTheDocument()
    expect(screen.getByText('Your subscription will expire soon. Update your payment method to continue.')).toBeInTheDocument()

    const actionButton = screen.getByText('Update now')
    fireEvent.click(actionButton)
    expect(handleAction).toHaveBeenCalled()

    const dismissButton = screen.getByLabelText('Dismiss')
    fireEvent.click(dismissButton)
    expect(handleDismiss).toHaveBeenCalled()
  })

  it('title has semibold styling', () => {
    render(<Banner title="Bold title">Content</Banner>)
    const title = screen.getByText('Bold title')
    expect(title.className).toContain('font-semibold')
  })

  it('content has small text styling', () => {
    render(<Banner>Small text content</Banner>)
    const content = screen.getByText('Small text content')
    expect(content.className).toContain('text-sm')
  })

  it('renders multiple banners with different variants', () => {
    const { container } = render(
      <>
        <Banner variant="info">Info banner</Banner>
        <Banner variant="success">Success banner</Banner>
        <Banner variant="warning">Warning banner</Banner>
        <Banner variant="error">Error banner</Banner>
      </>
    )

    expect(screen.getByText('Info banner')).toBeInTheDocument()
    expect(screen.getByText('Success banner')).toBeInTheDocument()
    expect(screen.getByText('Warning banner')).toBeInTheDocument()
    expect(screen.getByText('Error banner')).toBeInTheDocument()
  })
})
