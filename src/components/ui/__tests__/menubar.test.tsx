import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '../menubar'

describe('Menubar', () => {
  const SimpleMenubar = () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarItem>Open</MenubarItem>
          <MenubarItem>Save</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )

  describe('Rendering', () => {
    it('renders menubar with triggers', () => {
      render(<SimpleMenubar />)
      expect(screen.getByText('File')).toBeInTheDocument()
      expect(screen.getByText('Edit')).toBeInTheDocument()
    })

    it('applies neo-brutalism styles to root', () => {
      const { container } = render(<SimpleMenubar />)
      const menubar = container.firstChild as HTMLElement
      expect(menubar).toHaveClass('rounded-brutal')
      expect(menubar).toHaveClass('border-2')
      expect(menubar).toHaveClass('border-black')
      expect(menubar).toHaveClass('shadow-brutal')
    })

    it('applies custom className', () => {
      const { container } = render(
        <Menubar className="custom-class">
          <MenubarMenu>
            <MenubarTrigger>Test</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      )
      const menubar = container.firstChild as HTMLElement
      expect(menubar).toHaveClass('custom-class')
    })
  })

  describe('MenubarItem', () => {
    it('renders menu items when trigger is activated', async () => {
      render(<SimpleMenubar />)

      const trigger = screen.getByText('File')
      await userEvent.click(trigger)

      // Menu items should be in the document after clicking
      expect(screen.getByText('New')).toBeInTheDocument()
      expect(screen.getByText('Open')).toBeInTheDocument()
      expect(screen.getByText('Save')).toBeInTheDocument()
    })

    it('renders disabled menu item', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem disabled>Disabled Item</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const item = screen.getByText('Disabled Item')
      expect(item).toHaveAttribute('data-disabled')
    })

    it('renders item with inset prop', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem inset>Inset Item</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const item = screen.getByText('Inset Item')
      expect(item).toHaveClass('pl-8')
    })

    it('handles item click', async () => {
      const onClick = vi.fn()
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={onClick}>Clickable</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      await userEvent.click(screen.getByText('File'))
      await userEvent.click(screen.getByText('Clickable'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('MenubarCheckboxItem', () => {
    it('renders checkbox item', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem>Show Toolbar</MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      expect(screen.getByText('Show Toolbar')).toBeInTheDocument()
    })

    it('renders checked state', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked>Checked Item</MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const item = screen.getByText('Checked Item')
      expect(item).toHaveAttribute('data-state', 'checked')
    })

    it('handles checkbox toggle', async () => {
      const onCheckedChange = vi.fn()
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem onCheckedChange={onCheckedChange}>
                Toggle Item
              </MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      await userEvent.click(screen.getByText('View'))
      await userEvent.click(screen.getByText('Toggle Item'))

      expect(onCheckedChange).toHaveBeenCalled()
    })
  })

  describe('MenubarRadioGroup', () => {
    it('renders radio group with items', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup value="user1">
                <MenubarRadioItem value="user1">User 1</MenubarRadioItem>
                <MenubarRadioItem value="user2">User 2</MenubarRadioItem>
                <MenubarRadioItem value="user3">User 3</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      expect(screen.getByText('User 1')).toBeInTheDocument()
      expect(screen.getByText('User 2')).toBeInTheDocument()
      expect(screen.getByText('User 3')).toBeInTheDocument()
    })

    it('shows selected radio item', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup value="user2">
                <MenubarRadioItem value="user1">User 1</MenubarRadioItem>
                <MenubarRadioItem value="user2">User 2</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const selectedItem = screen.getByText('User 2')
      expect(selectedItem).toHaveAttribute('data-state', 'checked')
    })

    it('handles radio selection change', async () => {
      const onValueChange = vi.fn()
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup value="user1" onValueChange={onValueChange}>
                <MenubarRadioItem value="user1">User 1</MenubarRadioItem>
                <MenubarRadioItem value="user2">User 2</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      await userEvent.click(screen.getByText('Profiles'))
      await userEvent.click(screen.getByText('User 2'))

      expect(onValueChange).toHaveBeenCalledWith('user2')
    })
  })

  describe('MenubarSub', () => {
    it('renders submenu trigger', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email</MenubarItem>
                  <MenubarItem>Message</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      expect(screen.getByText('Share')).toBeInTheDocument()
    })

    it('shows chevron icon on submenu trigger', () => {
      const { container } = render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('Share').parentElement
      const icon = trigger?.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('renders submenu with inset prop', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger inset>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('Share')
      expect(trigger).toHaveClass('pl-8')
    })
  })

  describe('MenubarSeparator', () => {
    it('renders separator', () => {
      const { container } = render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New</MenubarItem>
              <MenubarSeparator data-testid="separator" />
              <MenubarItem>Open</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const separator = screen.getByTestId('separator')
      expect(separator).toBeInTheDocument()
      expect(separator).toHaveClass('bg-border')
    })
  })

  describe('MenubarLabel', () => {
    it('renders label', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Recent Files</MenubarLabel>
              <MenubarItem>document.txt</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      expect(screen.getByText('Recent Files')).toBeInTheDocument()
    })

    it('renders label with inset', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel inset>Recent Files</MenubarLabel>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const label = screen.getByText('Recent Files')
      expect(label).toHaveClass('pl-8')
    })
  })

  describe('MenubarShortcut', () => {
    it('renders keyboard shortcut', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      expect(screen.getByText('⌘N')).toBeInTheDocument()
    })

    it('applies shortcut styles', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const shortcut = screen.getByText('⌘N')
      expect(shortcut).toHaveClass('text-muted-foreground')
      expect(shortcut).toHaveClass('ml-auto')
    })
  })

  describe('Keyboard Navigation', () => {
    it('opens menu on Enter key', async () => {
      render(<SimpleMenubar />)

      const trigger = screen.getByText('File')
      trigger.focus()
      await userEvent.keyboard('{Enter}')

      expect(screen.getByText('New')).toBeInTheDocument()
    })

    it('navigates between menus with arrow keys', async () => {
      render(<SimpleMenubar />)

      const fileTrigger = screen.getByText('File')
      fileTrigger.focus()

      await userEvent.keyboard('{ArrowRight}')
      expect(screen.getByText('Edit')).toHaveFocus()
    })

    it('closes menu on Escape key', async () => {
      render(<SimpleMenubar />)

      await userEvent.click(screen.getByText('File'))
      expect(screen.getByText('New')).toBeInTheDocument()

      await userEvent.keyboard('{Escape}')
      expect(screen.queryByText('New')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('renders semantic menubar structure', () => {
      const { container } = render(<SimpleMenubar />)
      const menubar = container.querySelector('[role="menubar"]')
      expect(menubar).toBeInTheDocument()
    })

    it('trigger has accessible attributes', () => {
      render(<SimpleMenubar />)
      const trigger = screen.getByText('File')

      expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
      expect(trigger).toHaveAttribute('aria-expanded')
    })

    it('menu items are keyboard accessible', async () => {
      render(<SimpleMenubar />)
      const trigger = screen.getByText('File')

      trigger.focus()
      expect(trigger).toHaveFocus()
    })
  })
})
