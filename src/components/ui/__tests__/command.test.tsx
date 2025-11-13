import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '../command'
import { useState } from 'react'

describe('Command', () => {
  const CommandExample = () => (
    <Command>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )

  it('renders command input', () => {
    render(<CommandExample />)
    expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument()
  })

  it('renders all command items', () => {
    render(<CommandExample />)
    expect(screen.getByText('Calendar')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Billing')).toBeInTheDocument()
  })

  it('renders group headings', () => {
    render(<CommandExample />)
    expect(screen.getByText('Suggestions')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('applies neo-brutalism styling', () => {
    render(<CommandExample />)
    const command = screen.getByPlaceholderText('Type a command...').closest('[cmdk-root]')
    expect(command).toHaveClass('rounded-brutal')
    expect(command).toHaveClass('border-2')
    expect(command).toHaveClass('border-black')
    expect(command).toHaveClass('shadow-brutal-lg')
  })

  it('filters items based on search input', async () => {
    render(<CommandExample />)
    const input = screen.getByPlaceholderText('Type a command...')

    await userEvent.type(input, 'cal')

    await waitFor(() => {
      expect(screen.getByText('Calendar')).toBeVisible()
    })
  })

  it('shows empty state when no results', async () => {
    render(<CommandExample />)
    const input = screen.getByPlaceholderText('Type a command...')

    await userEvent.type(input, 'xyz123notfound')

    await waitFor(() => {
      expect(screen.getByText('No results found.')).toBeVisible()
    })
  })

  it('supports keyboard navigation', async () => {
    render(<CommandExample />)
    const input = screen.getByPlaceholderText('Type a command...')

    input.focus()
    await userEvent.keyboard('{ArrowDown}')

    await waitFor(() => {
      const firstItem = screen.getByText('Calendar').closest('[cmdk-item]')
      expect(firstItem).toHaveAttribute('data-selected', 'true')
    })
  })

  it('renders command shortcuts', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem>
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    expect(screen.getByText('⌘P')).toBeInTheDocument()
    expect(screen.getByText('⌘P')).toHaveClass('ml-auto')
    expect(screen.getByText('⌘P')).toHaveClass('text-xs')
    expect(screen.getByText('⌘P')).toHaveClass('text-muted-foreground')
  })

  it('handles item selection', async () => {
    const handleSelect = vi.fn()
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem onSelect={handleSelect}>Calendar</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    await userEvent.click(screen.getByText('Calendar'))

    await waitFor(() => {
      expect(handleSelect).toHaveBeenCalled()
    })
  })

  it('supports disabled items', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem disabled>Disabled Item</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    const item = screen.getByText('Disabled Item').closest('[cmdk-item]')
    expect(item).toHaveAttribute('data-disabled', 'true')
  })

  it('applies custom className to command', () => {
    render(
      <Command className="custom-class">
        <CommandInput />
      </Command>
    )

    const command = screen.getByRole('combobox').closest('[cmdk-root]')
    expect(command).toHaveClass('custom-class')
  })

  it('renders search icon in input', () => {
    render(<CommandExample />)
    const inputWrapper = screen.getByPlaceholderText('Type a command...').parentElement
    const icon = inputWrapper?.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('has proper list max height', () => {
    render(<CommandExample />)
    const list = screen.getByText('Calendar').closest('[cmdk-list]')
    expect(list).toHaveClass('max-h-[300px]')
    expect(list).toHaveClass('overflow-y-auto')
  })

  it('applies selected state styling to items', async () => {
    render(<CommandExample />)
    const input = screen.getByPlaceholderText('Type a command...')

    input.focus()
    await userEvent.keyboard('{ArrowDown}')

    await waitFor(() => {
      const item = screen.getByText('Calendar').closest('[cmdk-item]')
      expect(item).toHaveClass('aria-selected:bg-primary')
      expect(item).toHaveClass('aria-selected:text-primary-foreground')
      expect(item).toHaveClass('aria-selected:border-black')
    })
  })

  it('renders separator between groups', () => {
    render(<CommandExample />)
    const separators = document.querySelectorAll('[cmdk-separator]')
    expect(separators.length).toBeGreaterThan(0)
  })

  it('supports custom className on items', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem className="custom-item">Custom</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    const item = screen.getByText('Custom').closest('[cmdk-item]')
    expect(item).toHaveClass('custom-item')
  })
})

describe('CommandDialog', () => {
  const DialogExample = () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <button onClick={() => setOpen(true)}>Open Dialog</button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    )
  }

  it('opens dialog on button click', async () => {
    render(<DialogExample />)
    const button = screen.getByText('Open Dialog')

    await userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument()
    })
  })

  it('renders command items in dialog', async () => {
    render(<DialogExample />)

    await userEvent.click(screen.getByText('Open Dialog'))

    await waitFor(() => {
      expect(screen.getByText('Calendar')).toBeInTheDocument()
      expect(screen.getByText('Search')).toBeInTheDocument()
    })
  })

  it('can be controlled', async () => {
    const ControlledDialog = () => {
      const [open, setOpen] = useState(true)

      return (
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandItem>Item</CommandItem>
          </CommandList>
        </CommandDialog>
      )
    }

    render(<ControlledDialog />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    })
  })

  it('has proper dialog styling', async () => {
    render(<DialogExample />)

    await userEvent.click(screen.getByText('Open Dialog'))

    await waitFor(() => {
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })
  })

  it('filters items in dialog', async () => {
    render(<DialogExample />)

    await userEvent.click(screen.getByText('Open Dialog'))

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText('Type a command...')
    await userEvent.type(input, 'cal')

    await waitFor(() => {
      expect(screen.getByText('Calendar')).toBeVisible()
    })
  })
})
