import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '../badge'

describe('Badge', () => {
  it('renders with text', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders default variant', () => {
    render(<Badge data-testid="badge">Default</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('bg-primary')
  })

  it('renders secondary variant', () => {
    render(<Badge variant="secondary" data-testid="badge">Secondary</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('bg-secondary')
  })

  it('renders destructive variant', () => {
    render(<Badge variant="accent" data-testid="badge">Destructive</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('bg-destructive')
  })

  it('renders outline variant', () => {
    render(<Badge variant="outline" data-testid="badge">Outline</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('border')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class" data-testid="badge">Custom</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('custom-class')
  })
})
