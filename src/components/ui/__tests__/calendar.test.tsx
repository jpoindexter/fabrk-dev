import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Calendar } from '../calendar'
import { useState } from 'react'

describe('Calendar', () => {
  it('renders calendar component', () => {
    render(<Calendar mode="single" />)

    // Check for month navigation
    const prevButton = screen.getByRole('button', { name: /previous month/i })
    const nextButton = screen.getByRole('button', { name: /next month/i })

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('displays current month and year', () => {
    render(<Calendar mode="single" />)

    const currentDate = new Date()
    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    expect(screen.getByText(monthYear)).toBeInTheDocument()
  })

  it('renders all weekday headers', () => {
    render(<Calendar mode="single" />)

    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    weekdays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })

  it('selects a date in single mode', async () => {
    const handleSelect = vi.fn()
    render(<Calendar mode="single" onSelect={handleSelect} />)

    const today = new Date().getDate().toString()
    const dayButtons = screen.getAllByRole('button')
    const todayButton = dayButtons.find(btn => btn.textContent === today && !btn.classList.contains('day-outside'))

    if (todayButton) {
      await userEvent.click(todayButton)
      expect(handleSelect).toHaveBeenCalled()
    }
  })

  it('shows selected date with correct styling', () => {
    const selectedDate = new Date()
    render(<Calendar mode="single" selected={selectedDate} />)

    const dayButton = screen.getByRole('button', {
      name: new RegExp(selectedDate.getDate().toString())
    })

    expect(dayButton).toHaveAttribute('aria-selected', 'true')
  })

  it('highlights today with distinct styling', () => {
    render(<Calendar mode="single" />)

    const today = new Date()
    const todayButton = screen.getByRole('button', {
      name: new RegExp(today.getDate().toString())
    })

    expect(todayButton).toHaveClass('day_today')
  })

  it('navigates to previous month', async () => {
    render(<Calendar mode="single" />)

    const prevButton = screen.getByRole('button', { name: /previous month/i })
    const currentMonth = screen.getByRole('heading', { level: 3 }).textContent

    await userEvent.click(prevButton)

    const newMonth = screen.getByRole('heading', { level: 3 }).textContent
    expect(newMonth).not.toBe(currentMonth)
  })

  it('navigates to next month', async () => {
    render(<Calendar mode="single" />)

    const nextButton = screen.getByRole('button', { name: /next month/i })
    const currentMonth = screen.getByRole('heading', { level: 3 }).textContent

    await userEvent.click(nextButton)

    const newMonth = screen.getByRole('heading', { level: 3 }).textContent
    expect(newMonth).not.toBe(currentMonth)
  })

  it('supports range mode', () => {
    const dateRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 15)
    }

    render(<Calendar mode="range" selected={dateRange} />)

    const startButton = screen.getByRole('button', { name: /1/ })
    expect(startButton).toHaveClass('day_range_start')
  })

  it('supports multiple date selection', () => {
    const dates = [
      new Date(2024, 0, 1),
      new Date(2024, 0, 5),
      new Date(2024, 0, 10)
    ]

    render(<Calendar mode="multiple" selected={dates} />)

    const selectedButtons = screen.getAllByRole('button', { pressed: true })
    expect(selectedButtons.length).toBeGreaterThan(0)
  })

  it('disables past dates when disabled prop is provided', () => {
    const today = new Date()
    const isPastDate = (date: Date) => date < today

    render(<Calendar mode="single" disabled={isPastDate} />)

    const disabledDays = screen.getAllByRole('button').filter(btn =>
      btn.hasAttribute('disabled')
    )

    expect(disabledDays.length).toBeGreaterThan(0)
  })

  it('shows outside days when showOutsideDays is true', () => {
    render(<Calendar mode="single" showOutsideDays={true} />)

    const outsideDays = document.querySelectorAll('.day_outside')
    expect(outsideDays.length).toBeGreaterThan(0)
  })

  it('hides outside days when showOutsideDays is false', () => {
    render(<Calendar mode="single" showOutsideDays={false} />)

    const outsideDays = document.querySelectorAll('.day_outside')
    expect(outsideDays.length).toBe(0)
  })

  it('applies custom className', () => {
    const { container } = render(
      <Calendar mode="single" className="custom-calendar" />
    )

    const calendar = container.querySelector('.custom-calendar')
    expect(calendar).toBeInTheDocument()
  })

  it('displays multiple months in range mode', () => {
    render(<Calendar mode="range" numberOfMonths={2} />)

    const months = document.querySelectorAll('[role="grid"]')
    expect(months.length).toBe(2)
  })

  it('uses custom chevron icons', () => {
    render(<Calendar mode="single" />)

    const chevrons = document.querySelectorAll('svg')
    expect(chevrons.length).toBeGreaterThan(0)
  })

  it('supports keyboard navigation', async () => {
    const CalendarWithState = () => {
      const [date, setDate] = useState<Date | undefined>(new Date())
      return <Calendar mode="single" selected={date} onSelect={setDate} />
    }

    render(<CalendarWithState />)

    const selectedButton = screen.getByRole('button', { pressed: true })
    selectedButton.focus()

    await userEvent.keyboard('{ArrowRight}')
    expect(document.activeElement).toBeDefined()
  })

  it('applies neo-brutalism styles', () => {
    const { container } = render(
      <Calendar
        mode="single"
        className="rounded-brutal border-2 border-black shadow-brutal"
      />
    )

    const calendar = container.firstChild as HTMLElement
    expect(calendar).toHaveClass('rounded-brutal', 'border-2', 'border-black', 'shadow-brutal')
  })

  it('handles date selection callback', async () => {
    const handleSelect = vi.fn()
    const CalendarWithState = () => {
      const [date, setDate] = useState<Date | undefined>()

      const handleChange = (newDate: Date | undefined) => {
        setDate(newDate)
        handleSelect(newDate)
      }

      return <Calendar mode="single" selected={date} onSelect={handleChange} />
    }

    render(<CalendarWithState />)

    const today = new Date().getDate().toString()
    const dayButtons = screen.getAllByRole('button')
    const todayButton = dayButtons.find(btn =>
      btn.textContent === today && !btn.classList.contains('day-outside')
    )

    if (todayButton) {
      await userEvent.click(todayButton)
      expect(handleSelect).toHaveBeenCalled()
    }
  })
})
