import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from '../toast'

describe('Toast', () => {
  it('renders toast with title', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Success</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    expect(screen.getByText('Success')).toBeInTheDocument()
  })

  it('renders toast with title and description', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Your changes have been saved.</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    expect(screen.getByText('Success')).toBeInTheDocument()
    expect(screen.getByText('Your changes have been saved.')).toBeInTheDocument()
  })

  it('renders default variant toast', () => {
    render(
      <ToastProvider>
        <Toast variant="default" open data-testid="toast">
          <ToastTitle>Default Toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    expect(screen.getByTestId('toast')).toBeInTheDocument()
  })

  it('renders destructive variant toast', () => {
    render(
      <ToastProvider>
        <Toast variant="destructive" open data-testid="toast">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>Something went wrong.</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    const toast = screen.getByTestId('toast')
    expect(toast).toBeInTheDocument()
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('renders close button with accessibility', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Closeable Toast</ToastTitle>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    const closeButton = screen.getByLabelText('Close notification')
    expect(closeButton).toBeInTheDocument()
  })

  it('renders toast with action button', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Update Available</ToastTitle>
          <ToastAction altText="Update now">Update</ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    expect(screen.getByText('Update')).toBeInTheDocument()
  })

  it('renders viewport container', () => {
    render(
      <ToastProvider>
        <ToastViewport data-testid="viewport" />
      </ToastProvider>
    )
    expect(screen.getByTestId('viewport')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <ToastProvider>
        <Toast open className="custom-toast" data-testid="toast">
          <ToastTitle className="custom-title">Custom</ToastTitle>
          <ToastDescription className="custom-description">Description</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    expect(screen.getByTestId('toast')).toHaveClass('custom-toast')
  })

  it('renders multiple toasts', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Toast 1</ToastTitle>
        </Toast>
        <Toast open>
          <ToastTitle>Toast 2</ToastTitle>
        </Toast>
        <Toast open>
          <ToastTitle>Toast 3</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    expect(screen.getByText('Toast 1')).toBeInTheDocument()
    expect(screen.getByText('Toast 2')).toBeInTheDocument()
    expect(screen.getByText('Toast 3')).toBeInTheDocument()
  })

  it('renders destructive toast with action', () => {
    render(
      <ToastProvider>
        <Toast variant="destructive" open>
          <ToastTitle>Failed to save</ToastTitle>
          <ToastDescription>Your changes could not be saved.</ToastDescription>
          <ToastAction altText="Try again">Retry</ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    expect(screen.getByText('Failed to save')).toBeInTheDocument()
    expect(screen.getByText('Your changes could not be saved.')).toBeInTheDocument()
    expect(screen.getByText('Retry')).toBeInTheDocument()
  })

  it('has correct ARIA attributes', () => {
    render(
      <ToastProvider>
        <Toast open data-testid="toast">
          <ToastTitle>Accessible Toast</ToastTitle>
          <ToastDescription>This toast is accessible</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    const toast = screen.getByTestId('toast')
    expect(toast).toHaveAttribute('data-slot', 'toast')
  })
})
