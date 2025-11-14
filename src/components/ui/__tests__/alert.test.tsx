import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Alert, AlertTitle, AlertDescription } from '../alert'

describe('Alert', () => {
  it('renders without crashing', () => {
    render(<Alert>Alert content</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    render(<Alert>Test Alert</Alert>)
    expect(screen.getByText('Test Alert')).toBeInTheDocument()
  })

  it('has role of alert', () => {
    render(<Alert>Alert</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Alert>Default Alert</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('bg-primary', 'text-primary-foreground')
  })

  it('applies destructive variant styles', () => {
    render(<Alert variant="destructive">Error Alert</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('bg-destructive', 'text-destructive-foreground')
  })

  it('applies success variant styles', () => {
    render(<Alert variant="success">Success Alert</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('bg-accent', 'text-accent-foreground')
  })

  it('applies custom className', () => {
    render(<Alert className="custom-class">Alert</Alert>)
    expect(screen.getByRole('alert')).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    render(<Alert>Alert</Alert>)
    expect(screen.getByRole('alert')).toHaveAttribute('data-slot', 'alert')
  })

  it('applies border and rounded styles', () => {
    render(<Alert>Alert</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('border', 'rounded-lg')
  })

  it('applies grid layout styles', () => {
    render(<Alert>Alert</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('grid')
  })

  it('applies padding styles', () => {
    render(<Alert>Alert</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('px-6', 'py-4')
  })
})

describe('AlertTitle', () => {
  it('renders without crashing', () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
      </Alert>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('applies correct typography styles', () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
      </Alert>
    )
    const title = container.querySelector('[data-slot="alert-title"]')
    expect(title).toHaveClass('font-semibold', 'tracking-tight')
  })

  it('applies line clamp', () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Long Title</AlertTitle>
      </Alert>
    )
    const title = container.querySelector('[data-slot="alert-title"]')
    expect(title).toHaveClass('line-clamp-1')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Alert>
        <AlertTitle className="custom-class">Title</AlertTitle>
      </Alert>
    )
    const title = container.querySelector('[data-slot="alert-title"]')
    expect(title).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
      </Alert>
    )
    expect(container.querySelector('[data-slot="alert-title"]')).toBeInTheDocument()
  })

  it('applies grid column start', () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
      </Alert>
    )
    const title = container.querySelector('[data-slot="alert-title"]')
    expect(title).toHaveClass('col-start-2')
  })
})

describe('AlertDescription', () => {
  it('renders without crashing', () => {
    render(
      <Alert>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    )
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('applies correct typography styles', () => {
    const { container } = render(
      <Alert>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    )
    const description = container.querySelector('[data-slot="alert-description"]')
    expect(description).toHaveClass('text-sm', 'font-normal')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Alert>
        <AlertDescription className="custom-class">Description</AlertDescription>
      </Alert>
    )
    const description = container.querySelector('[data-slot="alert-description"]')
    expect(description).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    const { container } = render(
      <Alert>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    )
    expect(container.querySelector('[data-slot="alert-description"]')).toBeInTheDocument()
  })

  it('applies grid column start', () => {
    const { container } = render(
      <Alert>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    )
    const description = container.querySelector('[data-slot="alert-description"]')
    expect(description).toHaveClass('col-start-2')
  })

  it('applies grid layout', () => {
    const { container } = render(
      <Alert>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    )
    const description = container.querySelector('[data-slot="alert-description"]')
    expect(description).toHaveClass('grid')
  })
})

describe('Alert - Full Composition', () => {
  it('renders complete alert with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is a warning message</AlertDescription>
      </Alert>
    )

    expect(screen.getByText('Warning')).toBeInTheDocument()
    expect(screen.getByText('This is a warning message')).toBeInTheDocument()
  })

  it('renders alert with icon', () => {
    const { container } = render(
      <Alert>
        <svg>
          <title>Icon</title>
        </svg>
        <AlertTitle>Alert with Icon</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    )

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('works with all variants', () => {
    const variants = ['default', 'destructive', 'success'] as const

    variants.forEach(variant => {
      const { container } = render(
        <Alert variant={variant}>
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Description</AlertDescription>
        </Alert>
      )

      expect(container.querySelector('[role="alert"]')).toBeInTheDocument()
    })
  })
})
