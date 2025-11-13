import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '../context-menu'

describe('ContextMenu', () => {
  const SimpleContextMenu = () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-brutal border-2 border-black">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )

  it('renders trigger element', () => {
    render(<SimpleContextMenu />)
    expect(screen.getByText('Right click here')).toBeInTheDocument()
  })

  it('opens menu on right click', async () => {
    render(<SimpleContextMenu />)
    const trigger = screen.getByText('Right click here')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument()
      expect(screen.getByText('Copy')).toBeInTheDocument()
      expect(screen.getByText('Paste')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })
  })

  it('applies neo-brutalism styling to content', async () => {
    render(<SimpleContextMenu />)
    const trigger = screen.getByText('Right click here')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const content = screen.getByText('Edit').closest('[role="menu"]')
      expect(content).toHaveClass('rounded-brutal')
      expect(content).toHaveClass('border-2')
      expect(content).toHaveClass('border-black')
      expect(content).toHaveClass('shadow-brutal-xl')
    })
  })

  it('handles item selection', async () => {
    const handleSelect = vi.fn()
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={handleSelect}>Edit</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    const trigger = screen.getByText('Right click')
    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText('Edit'))

    expect(handleSelect).toHaveBeenCalled()
  })

  it('renders disabled items', async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem disabled>Disabled Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    const trigger = screen.getByText('Right click')
    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const item = screen.getByText('Disabled Item')
      expect(item).toBeInTheDocument()
      expect(item.closest('[role="menuitem"]')).toHaveAttribute('data-disabled', 'true')
    })
  })

  it('renders keyboard shortcuts', async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    const trigger = screen.getByText('Right click')
    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const shortcut = screen.getByText('⌘S')
      expect(shortcut).toBeInTheDocument()
      expect(shortcut).toHaveClass('ml-auto')
      expect(shortcut).toHaveClass('text-xs')
      expect(shortcut).toHaveClass('text-muted-foreground')
    })
  })

  it('renders separators', async () => {
    render(<SimpleContextMenu />)
    const trigger = screen.getByText('Right click here')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const separators = screen.getAllByRole('separator')
      expect(separators.length).toBeGreaterThan(0)
    })
  })

  it('renders with inset items', async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset>Inset Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    const trigger = screen.getByText('Right click')
    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const item = screen.getByText('Inset Item').closest('[role="menuitem"]')
      expect(item).toHaveClass('pl-8')
    })
  })

  it('applies custom className to items', async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem className="custom-item">Custom</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    const trigger = screen.getByText('Right click')
    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const item = screen.getByText('Custom').closest('[role="menuitem"]')
      expect(item).toHaveClass('custom-item')
    })
  })

  it('applies focus styling to items', async () => {
    render(<SimpleContextMenu />)
    const trigger = screen.getByText('Right click here')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const item = screen.getByText('Edit').closest('[role="menuitem"]')
      expect(item).toHaveClass('focus:bg-primary')
      expect(item).toHaveClass('focus:text-primary-foreground')
      expect(item).toHaveClass('focus:border-black')
    })
  })

  it('has proper ARIA attributes', async () => {
    render(<SimpleContextMenu />)
    const trigger = screen.getByText('Right click here')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const menu = screen.getByText('Edit').closest('[role="menu"]')
      expect(menu).toHaveAttribute('role', 'menu')
    })
  })
})

describe('ContextMenu with Checkbox Items', () => {
  const CheckboxMenu = () => (
    <ContextMenu>
      <ContextMenuTrigger>Right click</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )

  it('renders checkbox items', async () => {
    render(<CheckboxMenu />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      expect(screen.getByText('Show Bookmarks Bar')).toBeInTheDocument()
      expect(screen.getByText('Show Full URLs')).toBeInTheDocument()
    })
  })

  it('shows check icon for checked items', async () => {
    render(<CheckboxMenu />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const checkedItem = screen.getByText('Show Bookmarks Bar').closest('[role="menuitemcheckbox"]')
      expect(checkedItem).toHaveAttribute('data-state', 'checked')
    })
  })

  it('applies proper styling to checkbox items', async () => {
    render(<CheckboxMenu />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const item = screen.getByText('Show Bookmarks Bar').closest('[role="menuitemcheckbox"]')
      expect(item).toHaveClass('pl-8')
      expect(item).toHaveClass('rounded-brutal')
      expect(item).toHaveClass('border-2')
      expect(item).toHaveClass('border-transparent')
    })
  })
})

describe('ContextMenu with Radio Items', () => {
  const RadioMenu = () => (
    <ContextMenu>
      <ContextMenuTrigger>Right click</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuRadioGroup value="option1">
          <ContextMenuLabel>Choose Option</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="option1">Option 1</ContextMenuRadioItem>
          <ContextMenuRadioItem value="option2">Option 2</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )

  it('renders radio items', async () => {
    render(<RadioMenu />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })
  })

  it('renders label', async () => {
    render(<RadioMenu />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const label = screen.getByText('Choose Option')
      expect(label).toBeInTheDocument()
      expect(label).toHaveClass('font-bold')
    })
  })

  it('shows selected radio item', async () => {
    render(<RadioMenu />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const selectedItem = screen.getByText('Option 1').closest('[role="menuitemradio"]')
      expect(selectedItem).toHaveAttribute('data-state', 'checked')
    })
  })

  it('applies proper styling to radio items', async () => {
    render(<RadioMenu />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const item = screen.getByText('Option 1').closest('[role="menuitemradio"]')
      expect(item).toHaveClass('pl-8')
      expect(item).toHaveClass('rounded-brutal')
    })
  })
})

describe('ContextMenu with Submenu', () => {
  const SubmenuExample = () => (
    <ContextMenu>
      <ContextMenuTrigger>Right click</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save Page As</ContextMenuItem>
            <ContextMenuItem>Create Shortcut</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )

  it('renders submenu trigger', async () => {
    render(<SubmenuExample />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      expect(screen.getByText('More Tools')).toBeInTheDocument()
    })
  })

  it('shows chevron icon in submenu trigger', async () => {
    render(<SubmenuExample />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const subTrigger = screen.getByText('More Tools').parentElement
      const icon = subTrigger?.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })
  })

  it('opens submenu on hover', async () => {
    render(<SubmenuExample />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      expect(screen.getByText('More Tools')).toBeInTheDocument()
    })

    const subTrigger = screen.getByText('More Tools')
    await userEvent.hover(subTrigger)

    await waitFor(() => {
      expect(screen.getByText('Save Page As')).toBeInTheDocument()
      expect(screen.getByText('Create Shortcut')).toBeInTheDocument()
    })
  })

  it('applies styling to submenu trigger', async () => {
    render(<SubmenuExample />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const subTrigger = screen.getByText('More Tools').closest('[role="menuitem"]')
      expect(subTrigger).toHaveClass('rounded-brutal')
      expect(subTrigger).toHaveClass('border-2')
      expect(subTrigger).toHaveClass('border-transparent')
    })
  })

  it('applies styling to submenu content', async () => {
    render(<SubmenuExample />)
    const trigger = screen.getByText('Right click')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      expect(screen.getByText('More Tools')).toBeInTheDocument()
    })

    const subTrigger = screen.getByText('More Tools')
    await userEvent.hover(subTrigger)

    await waitFor(() => {
      const subContent = screen.getByText('Save Page As').closest('[role="menu"]')
      expect(subContent).toHaveClass('rounded-brutal')
      expect(subContent).toHaveClass('border-2')
      expect(subContent).toHaveClass('border-black')
      expect(subContent).toHaveClass('shadow-brutal-lg')
    })
  })

  it('supports inset in submenu trigger', async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Item</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    )

    const trigger = screen.getByText('Right click')
    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const subTrigger = screen.getByText('More Tools').closest('[role="menuitem"]')
      expect(subTrigger).toHaveClass('pl-8')
    })
  })
})

describe('ContextMenu Complex Example', () => {
  const ComplexMenu = () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-brutal border-2 border-black border-dashed">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )

  it('renders all item types together', async () => {
    render(<ComplexMenu />)
    const trigger = screen.getByText('Right click here')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      expect(screen.getByText('Back')).toBeInTheDocument()
      expect(screen.getByText('Forward')).toBeInTheDocument()
      expect(screen.getByText('Show Bookmarks Bar')).toBeInTheDocument()
      expect(screen.getByText('People')).toBeInTheDocument()
      expect(screen.getByText('Pedro Duarte')).toBeInTheDocument()
      expect(screen.getByText('Colm Tuite')).toBeInTheDocument()
    })
  })

  it('applies custom width to content', async () => {
    render(<ComplexMenu />)
    const trigger = screen.getByText('Right click here')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const content = screen.getByText('Back').closest('[role="menu"]')
      expect(content).toHaveClass('w-64')
    })
  })

  it('renders multiple separators', async () => {
    render(<ComplexMenu />)
    const trigger = screen.getByText('Right click here')

    await userEvent.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      const separators = screen.getAllByRole('separator')
      expect(separators.length).toBeGreaterThan(1)
    })
  })
})
