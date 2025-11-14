import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Toaster, ToastAction, ToastTitle, ToastDescription, ToastClose, ToastViewport } from '../toaster'

describe('Toaster', () => {
  it('renders toaster container', () => {
    render(<Toaster data-testid="toaster" />)
    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })

  it('has correct data attribute', () => {
    render(<Toaster data-testid="toaster" />)
    const toaster = screen.getByTestId('toaster')
    expect(toaster).toHaveAttribute('data-slot', 'toaster')
  })

  it('applies custom className', () => {
    render(<Toaster className="custom-toaster" data-testid="toaster" />)
    expect(screen.getByTestId('toaster')).toHaveClass('custom-toaster')
  })

  it('renders toaster provider', () => {
    const { container } = render(<Toaster />)
    const toasterElement = container.querySelector('[data-slot="toaster"]')
    expect(toasterElement).toBeInTheDocument()
  })

  it('exports ToastAction component', () => {
    render(<ToastAction>Action</ToastAction>)
    const action = screen.getByText('Action')
    expect(action).toBeInTheDocument()
    expect(action).toHaveAttribute('data-slot', 'toast-action')
  })

  it('ToastAction has accessibility label', () => {
    render(<ToastAction altText="Perform action">Click me</ToastAction>)
    const action = screen.getByLabelText('Perform action')
    expect(action).toBeInTheDocument()
  })

  it('exports ToastTitle component', () => {
    render(<ToastTitle>Title</ToastTitle>)
    const title = screen.getByText('Title')
    expect(title).toBeInTheDocument()
    expect(title).toHaveAttribute('data-slot', 'toast-title')
  })

  it('exports ToastDescription component', () => {
    render(<ToastDescription>Description text</ToastDescription>)
    const description = screen.getByText('Description text')
    expect(description).toBeInTheDocument()
    expect(description).toHaveAttribute('data-slot', 'toast-description')
  })

  it('exports ToastClose component', () => {
    render(<ToastClose />)
    const closeButton = screen.getByLabelText('Close')
    expect(closeButton).toBeInTheDocument()
    expect(closeButton).toHaveAttribute('data-slot', 'toast-close')
  })

  it('ToastClose renders close icon', () => {
    render(<ToastClose />)
    expect(screen.getByText('×')).toBeInTheDocument()
  })

  it('exports ToastViewport component', () => {
    render(<ToastViewport />)
    const viewport = document.querySelector('[data-slot="toast-viewport"]')
    expect(viewport).toBeInTheDocument()
  })

  it('ToastTitle applies font-medium class', () => {
    render(<ToastTitle>Bold Title</ToastTitle>)
    const title = screen.getByText('Bold Title')
    expect(title).toHaveClass('font-medium')
  })

  it('ToastDescription applies text-sm and opacity classes', () => {
    render(<ToastDescription>Small text</ToastDescription>)
    const description = screen.getByText('Small text')
    expect(description.className).toContain('text-sm')
    expect(description.className).toContain('opacity-90')
  })

  it('accepts HTML attributes', () => {
    render(
      <Toaster
        data-testid="toaster"
        aria-label="Notifications"
        role="region"
      />
    )
    const toaster = screen.getByTestId('toaster')
    expect(toaster).toHaveAttribute('aria-label', 'Notifications')
    expect(toaster).toHaveAttribute('role', 'region')
  })
})
