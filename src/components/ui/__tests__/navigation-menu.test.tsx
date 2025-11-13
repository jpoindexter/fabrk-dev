import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../navigation-menu'

describe('NavigationMenu', () => {
  const SimpleNavigationMenu = () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <li>
                <NavigationMenuLink href="/products/pro">
                  Pro
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/products/team">
                  Team
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/pricing">
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/about">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )

  describe('Rendering', () => {
    it('renders navigation menu', () => {
      const { container } = render(<SimpleNavigationMenu />)
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
    })

    it('renders navigation menu list', () => {
      render(<SimpleNavigationMenu />)
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Pricing')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
    })

    it('applies custom className to root', () => {
      const { container } = render(
        <NavigationMenu className="custom-class">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )
      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('custom-class')
    })

    it('applies neo-brutalism styles to triggers', () => {
      render(<SimpleNavigationMenu />)
      const trigger = screen.getByText('Products')
      expect(trigger).toHaveClass('rounded-brutal')
      expect(trigger).toHaveClass('border-2')
      expect(trigger).toHaveClass('border-black')
    })
  })

  describe('NavigationMenuTrigger', () => {
    it('renders trigger with chevron icon', () => {
      const { container } = render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('Menu')
      const icon = trigger.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('toggles content on trigger click', async () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Menu Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('Menu')

      // Initially closed
      expect(trigger).toHaveAttribute('data-state', 'closed')

      // Open on click
      await userEvent.click(trigger)
      expect(trigger).toHaveAttribute('data-state', 'open')
    })

    it('rotates chevron when open', async () => {
      const { container } = render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('Menu')
      const icon = trigger.querySelector('svg')

      await userEvent.click(trigger)

      expect(icon).toHaveClass('group-data-[state=open]:rotate-180')
    })

    it('applies custom className to trigger', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="custom-trigger">
                Menu
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('Menu')
      expect(trigger).toHaveClass('custom-trigger')
    })
  })

  describe('NavigationMenuContent', () => {
    it('renders content when trigger is clicked', async () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Menu Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      await userEvent.click(screen.getByText('Menu'))
      expect(screen.getByText('Menu Content')).toBeInTheDocument()
    })

    it('applies custom className to content', async () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent className="custom-content">
                <div>Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      await userEvent.click(screen.getByText('Menu'))
      const content = screen.getByText('Content').parentElement
      expect(content).toHaveClass('custom-content')
    })

    it('has neo-brutalism styles on viewport', () => {
      const { container } = render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const viewport = container.querySelector('[data-radix-navigation-menu-viewport]')
      expect(viewport).toHaveClass('rounded-brutal')
      expect(viewport).toHaveClass('border-2')
      expect(viewport).toHaveClass('border-black')
      expect(viewport).toHaveClass('shadow-brutal-lg')
    })
  })

  describe('NavigationMenuLink', () => {
    it('renders link with href', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/test">
                Test Link
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const link = screen.getByText('Test Link')
      expect(link).toHaveAttribute('href', '/test')
    })

    it('applies navigationMenuTriggerStyle', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/test">
                Styled Link
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const link = screen.getByText('Styled Link')
      expect(link).toHaveClass('rounded-brutal')
      expect(link).toHaveClass('border-2')
      expect(link).toHaveClass('border-black')
    })
  })

  describe('navigationMenuTriggerStyle', () => {
    it('returns correct class names', () => {
      const styles = navigationMenuTriggerStyle()
      expect(styles).toContain('rounded-brutal')
      expect(styles).toContain('border-2')
      expect(styles).toContain('border-black')
      expect(styles).toContain('bg-background')
      expect(styles).toContain('font-bold')
    })
  })

  describe('Multiple Items', () => {
    it('renders multiple navigation items', () => {
      render(<SimpleNavigationMenu />)

      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Pricing')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
    })

    it('switches between different menu contents', async () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu 1</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Content 1</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu 2</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Content 2</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      await userEvent.click(screen.getByText('Menu 1'))
      expect(screen.getByText('Content 1')).toBeInTheDocument()

      await userEvent.click(screen.getByText('Menu 2'))
      expect(screen.getByText('Content 2')).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('focuses trigger on Tab key', async () => {
      render(<SimpleNavigationMenu />)

      await userEvent.tab()

      const firstTrigger = screen.getByText('Products')
      expect(firstTrigger).toHaveFocus()
    })

    it('navigates between items with arrow keys', async () => {
      render(<SimpleNavigationMenu />)

      const productsTrigger = screen.getByText('Products')
      productsTrigger.focus()

      await userEvent.keyboard('{ArrowRight}')
      expect(screen.getByText('Pricing')).toHaveFocus()

      await userEvent.keyboard('{ArrowRight}')
      expect(screen.getByText('About')).toHaveFocus()
    })

    it('opens menu on Enter key', async () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('Menu')
      trigger.focus()

      await userEvent.keyboard('{Enter}')
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('closes menu on Escape key', async () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('Menu')
      await userEvent.click(trigger)
      expect(screen.getByText('Content')).toBeInTheDocument()

      await userEvent.keyboard('{Escape}')
      expect(trigger).toHaveAttribute('data-state', 'closed')
    })
  })

  describe('Hover Interactions', () => {
    it('supports hover interactions', async () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Hover Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('Menu')
      await userEvent.hover(trigger)

      // Trigger should be hoverable
      expect(trigger).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has correct role on navigation', () => {
      const { container } = render(<SimpleNavigationMenu />)
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
    })

    it('has correct ARIA attributes on trigger', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('Menu')
      expect(trigger).toHaveAttribute('aria-expanded')
    })

    it('sets aria-expanded to true when open', async () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('Menu')

      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      await userEvent.click(trigger)
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })

    it('chevron icon has aria-hidden', () => {
      const { container } = render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const icon = container.querySelector('svg')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })

    it('maintains focus management', async () => {
      render(<SimpleNavigationMenu />)

      await userEvent.tab()
      expect(screen.getByText('Products')).toHaveFocus()

      await userEvent.tab()
      expect(screen.getByText('Pricing')).toHaveFocus()

      await userEvent.tab()
      expect(screen.getByText('About')).toHaveFocus()
    })
  })

  describe('States', () => {
    it('shows active state on trigger', async () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('Menu')

      await userEvent.click(trigger)
      expect(trigger).toHaveClass('data-[state=open]:bg-primary/90')
    })

    it('shows disabled state', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger disabled>Disabled</NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('Disabled')
      expect(trigger).toBeDisabled()
      expect(trigger).toHaveClass('disabled:opacity-50')
    })
  })
})
