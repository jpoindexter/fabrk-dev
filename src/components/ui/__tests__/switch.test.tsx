import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '../switch'

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('renders unchecked by default', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).not.toBeChecked()
  })

  it('can be toggled', async () => {
    render(<Switch />)
    const switchElement = screen.getByRole('switch')

    await userEvent.click(switchElement)
    expect(switchElement).toBeChecked()

    await userEvent.click(switchElement)
    expect(switchElement).not.toBeChecked()
  })

  it('handles onCheckedChange event', async () => {
    const handleChange = vi.fn()
    render(<Switch onCheckedChange={handleChange} />)

    await userEvent.click(screen.getByRole('switch'))
    expect(handleChange).toHaveBeenCalledWith(true)

    await userEvent.click(screen.getByRole('switch'))
    expect(handleChange).toHaveBeenCalledWith(false)
  })

  it('supports controlled checked state', () => {
    const { rerender } = render(<Switch checked={false} />)
    expect(screen.getByRole('switch')).not.toBeChecked()

    rerender(<Switch checked={true} />)
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('can be disabled', () => {
    render(<Switch disabled />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('prevents interaction when disabled', async () => {
    const handleChange = vi.fn()
    render(<Switch disabled onCheckedChange={handleChange} />)

    await userEvent.click(screen.getByRole('switch'))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('applies correct size styles', () => {
    render(<Switch />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveClass('h-7', 'w-14')
  })

  it('applies custom className', () => {
    render(<Switch className="custom-class" />)
    expect(screen.getByRole('switch')).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-slot', 'switch')
  })

  it('has thumb with correct data-slot attribute', () => {
    const { container } = render(<Switch />)
    const thumb = container.querySelector('[data-slot="switch-thumb"]')
    expect(thumb).toBeInTheDocument()
  })

  it('applies focus ring styles', () => {
    render(<Switch />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveClass('focus-visible:ring-2', 'focus-visible:ring-ring')
  })

  it('applies checked background color', () => {
    render(<Switch checked />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveClass('data-[state=checked]:bg-primary')
  })

  it('applies unchecked background color', () => {
    render(<Switch />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveClass('data-[state=unchecked]:bg-muted')
  })

  it('supports keyboard navigation', async () => {
    render(<Switch />)
    const switchElement = screen.getByRole('switch')

    switchElement.focus()
    expect(switchElement).toHaveFocus()
  })

  it('can be toggled with space key', async () => {
    render(<Switch />)
    const switchElement = screen.getByRole('switch')

    switchElement.focus()
    await userEvent.keyboard(' ')
    expect(switchElement).toBeChecked()
  })

  it('applies disabled opacity', () => {
    render(<Switch disabled />)
    expect(screen.getByRole('switch')).toHaveClass('disabled:opacity-50')
  })

  it('applies disabled cursor style', () => {
    render(<Switch disabled />)
    expect(screen.getByRole('switch')).toHaveClass('disabled:cursor-not-allowed')
  })
})
