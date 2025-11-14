import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Spinner, Skeleton, LoadingContainer, LoadingButton, LoadingSpinner } from '../loading'

// Mock tokens module to prevent undefined errors
vi.mock('@/lib/design-system/tokens', () => ({
  tokens: {
    sizes: {
      avatar: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      }
    },
    spacing: {
      gap: {
        6: 'gap-6'
      }
    },
    text: {
      size: {
        base: 'text-base'
      }
    }
  }
}))

describe('Spinner', () => {
  it('renders spinner with default size', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('aria-label', 'Loading')
  })

  it('renders small spinner', () => {
    render(<Spinner size="sm" data-testid="spinner" />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('renders medium spinner', () => {
    render(<Spinner size="md" data-testid="spinner" />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('renders large spinner', () => {
    render(<Spinner size="lg" data-testid="spinner" />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('has accessibility attributes', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Spinner className="custom-spinner" data-testid="spinner" />)
    expect(screen.getByTestId('spinner')).toHaveClass('custom-spinner')
  })

  it('has correct data slot attribute', () => {
    render(<Spinner data-testid="spinner" />)
    expect(screen.getByTestId('spinner')).toHaveAttribute('data-slot', 'spinner')
  })
})

describe('Skeleton', () => {
  it('renders text skeleton by default', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('renders circular skeleton', () => {
    render(<Skeleton variant="circular" data-testid="skeleton" />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('rounded-full')
  })

  it('renders rectangular skeleton', () => {
    render(<Skeleton variant="rectangular" data-testid="skeleton" />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('rounded-md')
  })

  it('has aria-hidden attribute', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies custom className', () => {
    render(<Skeleton className="custom-skeleton" data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-skeleton')
  })

  it('has animate-pulse class', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse')
  })

  it('has correct data slot attribute', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-slot', 'skeleton')
  })
})

describe('LoadingContainer', () => {
  it('renders loading container', () => {
    render(<LoadingContainer data-testid="container" />)
    expect(screen.getByTestId('container')).toBeInTheDocument()
  })

  it('renders spinner inside container', () => {
    render(<LoadingContainer />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders children text', () => {
    render(<LoadingContainer>Please wait...</LoadingContainer>)
    expect(screen.getByText('Please wait...')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<LoadingContainer className="custom-container" data-testid="container" />)
    expect(screen.getByTestId('container')).toHaveClass('custom-container')
  })

  it('centers content', () => {
    render(<LoadingContainer data-testid="container" />)
    const container = screen.getByTestId('container')
    expect(container.className).toContain('items-center')
    expect(container.className).toContain('justify-center')
  })

  it('has correct data slot attribute', () => {
    render(<LoadingContainer data-testid="container" />)
    expect(screen.getByTestId('container')).toHaveAttribute('data-slot', 'loading-container')
  })
})

describe('LoadingButton', () => {
  it('renders normal button when not loading', () => {
    render(<LoadingButton>Click me</LoadingButton>)
    const button = screen.getByText('Click me')
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  it('disables button when loading', () => {
    render(<LoadingButton loading>Click me</LoadingButton>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('shows spinner when loading', () => {
    render(<LoadingButton loading>Submit</LoadingButton>)
    const svg = document.querySelector('.animate-spin')
    expect(svg).toBeInTheDocument()
  })

  it('shows loading text when provided', () => {
    render(
      <LoadingButton loading loadingText="Saving...">
        Save
      </LoadingButton>
    )
    expect(screen.getByText('Saving...')).toBeInTheDocument()
    expect(screen.queryByText('Save')).not.toBeInTheDocument()
  })

  it('shows original text when loading without loadingText', () => {
    render(<LoadingButton loading>Submit</LoadingButton>)
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('handles click when not loading', () => {
    const handleClick = vi.fn()
    render(<LoadingButton onClick={handleClick}>Click me</LoadingButton>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not handle click when loading', () => {
    const handleClick = vi.fn()
    render(
      <LoadingButton loading onClick={handleClick}>
        Click me
      </LoadingButton>
    )
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('respects disabled prop', () => {
    render(<LoadingButton disabled>Disabled</LoadingButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('has correct data slot attribute', () => {
    render(<LoadingButton data-testid="button">Click</LoadingButton>)
    expect(screen.getByTestId('button')).toHaveAttribute('data-slot', 'loading-button')
  })

  it('applies button variants', () => {
    render(
      <LoadingButton variant="destructive" data-testid="button">
        Delete
      </LoadingButton>
    )
    expect(screen.getByTestId('button')).toBeInTheDocument()
  })
})

describe('LoadingSpinner', () => {
  it('is an alias for Spinner', () => {
    render(<LoadingSpinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders with all Spinner props', () => {
    render(<LoadingSpinner size="lg" data-testid="spinner" />)
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })
})
