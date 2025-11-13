import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../checkbox'

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('can be checked', async () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')

    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('handles onChange event', async () => {
    const handleChange = vi.fn()
    render(<Checkbox onCheckedChange={handleChange} />)

    await userEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('can be disabled', () => {
    render(<Checkbox disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('supports checked state', () => {
    render(<Checkbox checked={true} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})
