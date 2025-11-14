import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup, RadioGroupItem } from '../radio-group'

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
      </RadioGroup>
    )
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('renders multiple radio items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
        <RadioGroupItem value="option3" />
      </RadioGroup>
    )
    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3)
  })

  it('handles value selection', async () => {
    const handleChange = vi.fn()
    render(
      <RadioGroup onValueChange={handleChange}>
        <RadioGroupItem value="option1" id="option1" />
        <RadioGroupItem value="option2" id="option2" />
      </RadioGroup>
    )

    const radios = screen.getAllByRole('radio')
    await userEvent.click(radios[0])
    expect(handleChange).toHaveBeenCalled()
  })

  it('supports controlled value', () => {
    render(
      <RadioGroup value="option2">
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
      </RadioGroup>
    )

    const radios = screen.getAllByRole('radio')
    expect(radios[1]).toBeChecked()
  })

  it('disables individual radio items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" disabled />
      </RadioGroup>
    )

    const radios = screen.getAllByRole('radio')
    expect(radios[0]).not.toBeDisabled()
    expect(radios[1]).toBeDisabled()
  })

  it('disables entire radio group', () => {
    render(
      <RadioGroup disabled>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
      </RadioGroup>
    )

    const radios = screen.getAllByRole('radio')
    radios.forEach(radio => {
      expect(radio).toBeDisabled()
    })
  })

  it('applies grid layout styles', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
      </RadioGroup>
    )
    expect(screen.getByRole('radiogroup')).toHaveClass('grid', 'gap-2')
  })

  it('applies custom className to RadioGroup', () => {
    render(
      <RadioGroup className="custom-group">
        <RadioGroupItem value="option1" />
      </RadioGroup>
    )
    expect(screen.getByRole('radiogroup')).toHaveClass('custom-group')
  })

  it('applies custom className to RadioGroupItem', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" className="custom-item" />
      </RadioGroup>
    )
    expect(screen.getByRole('radio')).toHaveClass('custom-item')
  })

  it('supports keyboard navigation', async () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
      </RadioGroup>
    )

    const firstRadio = screen.getAllByRole('radio')[0]
    firstRadio.focus()
    expect(firstRadio).toHaveFocus()
  })

  it('renders indicator when item is selected', () => {
    const { container } = render(
      <RadioGroup value="option1">
        <RadioGroupItem value="option1" />
      </RadioGroup>
    )

    const indicator = container.querySelector('[class*="fill-current"]')
    expect(indicator).toBeInTheDocument()
  })

  it('applies correct size styles to radio item', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
      </RadioGroup>
    )

    const radio = screen.getByRole('radio')
    expect(radio).toHaveClass('h-5', 'w-5')
  })

  it('applies focus ring styles', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
      </RadioGroup>
    )

    const radio = screen.getByRole('radio')
    expect(radio).toHaveClass('focus-visible:ring-2', 'focus-visible:ring-primary')
  })

  it('prevents selection when disabled', async () => {
    const handleChange = vi.fn()
    render(
      <RadioGroup onValueChange={handleChange}>
        <RadioGroupItem value="option1" disabled />
      </RadioGroup>
    )

    const radio = screen.getByRole('radio')
    await userEvent.click(radio)
    expect(handleChange).not.toHaveBeenCalled()
  })
})
