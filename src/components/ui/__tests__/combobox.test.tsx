import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Combobox } from '../combobox'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

describe('Combobox', () => {
  it('renders with placeholder text', () => {
    render(<Combobox options={frameworks} placeholder="Select framework..." />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('Select framework...')).toBeInTheDocument()
  })

  it('opens popover when trigger is clicked', async () => {
    render(<Combobox options={frameworks} />)

    const trigger = screen.getByRole('combobox')
    await userEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('displays all options when opened', async () => {
    render(<Combobox options={frameworks} />)

    await userEvent.click(screen.getByRole('combobox'))

    await waitFor(() => {
      expect(screen.getByText('Next.js')).toBeInTheDocument()
      expect(screen.getByText('SvelteKit')).toBeInTheDocument()
      expect(screen.getByText('Nuxt.js')).toBeInTheDocument()
      expect(screen.getByText('Remix')).toBeInTheDocument()
      expect(screen.getByText('Astro')).toBeInTheDocument()
    })
  })

  it('selects an option when clicked', async () => {
    const handleValueChange = vi.fn()
    render(
      <Combobox
        options={frameworks}
        onValueChange={handleValueChange}
      />
    )

    await userEvent.click(screen.getByRole('combobox'))

    await waitFor(() => {
      expect(screen.getByText('Next.js')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText('Next.js'))

    expect(handleValueChange).toHaveBeenCalledWith('next.js')
  })

  it('displays selected option label', () => {
    render(
      <Combobox
        options={frameworks}
        value="next.js"
      />
    )

    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  it('shows check icon for selected option', async () => {
    render(
      <Combobox
        options={frameworks}
        value="next.js"
      />
    )

    await userEvent.click(screen.getByRole('combobox'))

    await waitFor(() => {
      const nextJsOption = screen.getByText('Next.js').closest('[role="option"]')
      const checkIcon = nextJsOption?.querySelector('svg')
      expect(checkIcon).toHaveClass('opacity-100')
    })
  })

  it('filters options based on search input', async () => {
    render(<Combobox options={frameworks} />)

    await userEvent.click(screen.getByRole('combobox'))

    const searchInput = await screen.findByRole('combobox', { hidden: true })
    await userEvent.type(searchInput, 'next')

    await waitFor(() => {
      expect(screen.getByText('Next.js')).toBeInTheDocument()
      expect(screen.queryByText('SvelteKit')).not.toBeInTheDocument()
    })
  })

  it('shows empty text when no options match search', async () => {
    render(
      <Combobox
        options={frameworks}
        emptyText="No framework found."
      />
    )

    await userEvent.click(screen.getByRole('combobox'))

    const searchInput = await screen.findByRole('combobox', { hidden: true })
    await userEvent.type(searchInput, 'zzzzz')

    await waitFor(() => {
      expect(screen.getByText('No framework found.')).toBeInTheDocument()
    })
  })

  it('uses custom placeholder text', () => {
    render(
      <Combobox
        options={frameworks}
        placeholder="Choose a framework..."
      />
    )

    expect(screen.getByText('Choose a framework...')).toBeInTheDocument()
  })

  it('uses custom search placeholder', async () => {
    render(
      <Combobox
        options={frameworks}
        searchPlaceholder="Search frameworks..."
      />
    )

    await userEvent.click(screen.getByRole('combobox'))

    const searchInput = await screen.findByPlaceholderText('Search frameworks...')
    expect(searchInput).toBeInTheDocument()
  })

  it('uses custom empty text', async () => {
    render(
      <Combobox
        options={frameworks}
        emptyText="No results available."
      />
    )

    await userEvent.click(screen.getByRole('combobox'))

    const searchInput = await screen.findByRole('combobox', { hidden: true })
    await userEvent.type(searchInput, 'nonexistent')

    await waitFor(() => {
      expect(screen.getByText('No results available.')).toBeInTheDocument()
    })
  })

  it('applies custom className to trigger', () => {
    render(
      <Combobox
        options={frameworks}
        className="w-[300px] custom-combobox"
      />
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveClass('w-[300px]', 'custom-combobox')
  })

  it('closes popover after selection', async () => {
    render(<Combobox options={frameworks} />)

    const trigger = screen.getByRole('combobox')
    await userEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await waitFor(() => {
      expect(screen.getByText('Next.js')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText('Next.js'))

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('toggles selection when same option is clicked', async () => {
    const handleValueChange = vi.fn()
    render(
      <Combobox
        options={frameworks}
        value="next.js"
        onValueChange={handleValueChange}
      />
    )

    await userEvent.click(screen.getByRole('combobox'))

    await waitFor(() => {
      expect(screen.getByText('Next.js')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText('Next.js'))

    expect(handleValueChange).toHaveBeenCalledWith('')
  })

  it('handles large option lists', async () => {
    const countries = [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'es', label: 'Spain' },
      { value: 'it', label: 'Italy' },
      { value: 'jp', label: 'Japan' },
      { value: 'cn', label: 'China' },
    ]

    render(<Combobox options={countries} />)

    await userEvent.click(screen.getByRole('combobox'))

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument()
      expect(screen.getByText('China')).toBeInTheDocument()
    })
  })

  it('supports keyboard navigation', async () => {
    render(<Combobox options={frameworks} />)

    const trigger = screen.getByRole('combobox')
    trigger.focus()

    await userEvent.keyboard('{Enter}')

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })

    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Enter}')

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('displays caret icon in trigger', () => {
    render(<Combobox options={frameworks} />)

    const trigger = screen.getByRole('combobox')
    const icon = trigger.querySelector('svg')

    expect(icon).toBeInTheDocument()
  })

  it('maintains focus management', async () => {
    render(<Combobox options={frameworks} />)

    const trigger = screen.getByRole('combobox')
    await userEvent.click(trigger)

    await waitFor(() => {
      const searchInput = screen.getByRole('combobox', { hidden: true })
      expect(document.activeElement).toBe(searchInput)
    })
  })

  it('handles empty options array', () => {
    render(<Combobox options={[]} emptyText="No options available" />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders with controlled value', () => {
    const { rerender } = render(
      <Combobox options={frameworks} value="next.js" />
    )

    expect(screen.getByText('Next.js')).toBeInTheDocument()

    rerender(<Combobox options={frameworks} value="remix" />)

    expect(screen.getByText('Remix')).toBeInTheDocument()
  })
})
