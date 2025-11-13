import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Progress } from '../progress'

describe('Progress', () => {
  it('renders with default value', () => {
    render(<Progress data-testid="progress" />)
    expect(screen.getByTestId('progress')).toBeInTheDocument()
  })

  it('renders with specific value', () => {
    render(<Progress value={50} data-testid="progress" />)
    const progressBar = screen.getByTestId('progress')
    expect(progressBar).toBeInTheDocument()
  })

  it('applies aria attributes', () => {
    render(<Progress value={75} data-testid="progress" />)
    const progressBar = screen.getByTestId('progress')
    expect(progressBar).toHaveAttribute('role', 'progressbar')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
  })

  it('handles 0% progress', () => {
    render(<Progress value={0} data-testid="progress" />)
    expect(screen.getByTestId('progress')).toBeInTheDocument()
  })

  it('handles 100% progress', () => {
    render(<Progress value={100} data-testid="progress" />)
    expect(screen.getByTestId('progress')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Progress className="custom-class" data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('custom-class')
  })
})
