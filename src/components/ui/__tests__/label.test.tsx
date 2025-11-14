import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Label } from '../label'

describe('Label', () => {
  it('renders without crashing', () => {
    render(<Label>Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    render(<Label>Field Label</Label>)
    expect(screen.getByText('Field Label')).toHaveTextContent('Field Label')
  })

  it('applies correct typography styles', () => {
    render(<Label>Styled Label</Label>)
    const label = screen.getByText('Styled Label')
    expect(label).toHaveClass('text-[14px]')
    expect(label).toHaveClass('font-semibold')
  })

  it('shows required indicator when required prop is true', () => {
    render(<Label required>Required Field</Label>)
    const asterisk = screen.getByText('*')
    expect(asterisk).toBeInTheDocument()
    expect(asterisk).toHaveClass('text-destructive')
    expect(asterisk).toHaveAttribute('aria-label', 'required')
  })

  it('does not show required indicator when required prop is false', () => {
    render(<Label>Optional Field</Label>)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  it('applies error styles when error prop is true', () => {
    render(<Label error>Error Label</Label>)
    expect(screen.getByText('Error Label')).toHaveClass('text-destructive')
  })

  it('applies custom className', () => {
    render(<Label className="custom-class">Custom Label</Label>)
    expect(screen.getByText('Custom Label')).toHaveClass('custom-class')
  })

  it('forwards htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Test Label</Label>)
    expect(screen.getByText('Test Label')).toHaveAttribute('for', 'test-input')
  })

  it('has correct data-slot attribute', () => {
    render(<Label>Slot Test</Label>)
    expect(screen.getByText('Slot Test')).toHaveAttribute('data-slot', 'label')
  })

  it('applies transition styles', () => {
    render(<Label>Transition Label</Label>)
    expect(screen.getByText('Transition Label')).toHaveClass('transition-colors')
  })

  it('applies peer-disabled styles', () => {
    render(<Label>Peer Label</Label>)
    expect(screen.getByText('Peer Label')).toHaveClass('peer-disabled:cursor-not-allowed')
    expect(screen.getByText('Peer Label')).toHaveClass('peer-disabled:opacity-50')
  })

  it('renders as label element', () => {
    const { container } = render(<Label>Label Element</Label>)
    expect(container.querySelector('label')).toBeInTheDocument()
  })

  it('combines error and required states', () => {
    render(<Label error required>Error Required</Label>)
    const label = screen.getByText('Error Required')
    expect(label).toHaveClass('text-destructive')
    expect(screen.getByText('*')).toBeInTheDocument()
  })
})
