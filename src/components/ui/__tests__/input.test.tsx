import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../input'

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text..." />)
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    await userEvent.type(input, 'Hello World')
    expect(input).toHaveValue('Hello World')
  })

  it('handles onChange event', async () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)

    await userEvent.type(screen.getByRole('textbox'), 'Test')
    expect(handleChange).toHaveBeenCalled()
  })

  it('applies error styles when error prop is true', () => {
    render(<Input error />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-destructive')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('applies success styles when success prop is true', () => {
    render(<Input success />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('focus-visible:ring-success')
  })

  it('disables input when disabled prop is true', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<Input loading />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveAttribute('aria-busy', 'true')
  })

  it('shows loading spinner when loading', () => {
    const { container } = render(<Input loading />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('shows loading text for screen readers', () => {
    render(<Input loading loadingText="Processing..." />)
    expect(screen.getByText('Processing...')).toHaveClass('sr-only')
  })

  it('adds right padding when loading', () => {
    render(<Input loading />)
    expect(screen.getByRole('textbox')).toHaveClass('pr-10')
  })

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" />)
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password')
  })

  it('supports keyboard navigation', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    input.focus()
    expect(input).toHaveFocus()
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('has correct data-slot attribute', () => {
    const { container } = render(<Input />)
    const wrapper = container.querySelector('[data-slot="input"]')
    expect(wrapper).toBeInTheDocument()
  })

  it('prevents input when disabled and loading', async () => {
    render(<Input disabled loading />)
    const input = screen.getByRole('textbox')

    await userEvent.type(input, 'Test')
    expect(input).toHaveValue('')
  })
})
