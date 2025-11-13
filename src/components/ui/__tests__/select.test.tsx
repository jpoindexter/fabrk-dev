import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../select'

describe('Select', () => {
  const SelectExample = () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  )

  it('renders trigger with placeholder', () => {
    render(<SelectExample />)
    expect(screen.getByText('Select option')).toBeInTheDocument()
  })

  it('opens dropdown on trigger click', async () => {
    render(<SelectExample />)

    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeVisible()
  })

  it('displays all options when open', async () => {
    render(<SelectExample />)

    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByText('Option 1')).toBeVisible()
    expect(screen.getByText('Option 2')).toBeVisible()
    expect(screen.getByText('Option 3')).toBeVisible()
  })

  it('can select an option', async () => {
    render(<SelectExample />)

    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('Option 2'))
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })
})
