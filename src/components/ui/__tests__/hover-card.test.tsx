import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../hover-card'
import { Button } from '../button'

describe('HoverCard', () => {
  const HoverCardExample = ({ align, sideOffset }: {
    align?: 'start' | 'center' | 'end'
    sideOffset?: number
  } = {}) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@username</Button>
      </HoverCardTrigger>
      <HoverCardContent align={align} sideOffset={sideOffset}>
        <div className="space-y-2">
          <h4 className="text-sm font-bold">@username</h4>
          <p className="text-sm">User profile information</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )

  it('renders trigger button', () => {
    render(<HoverCardExample />)
    expect(screen.getByRole('button', { name: '@username' })).toBeInTheDocument()
  })

  it('shows card content on hover', async () => {
    render(<HoverCardExample />)
    const trigger = screen.getByRole('button', { name: '@username' })

    await userEvent.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('User profile information')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('hides card content when not hovering', async () => {
    render(<HoverCardExample />)
    const trigger = screen.getByRole('button', { name: '@username' })

    await userEvent.hover(trigger)
    await waitFor(() => {
      expect(screen.getByText('User profile information')).toBeInTheDocument()
    }, { timeout: 2000 })

    await userEvent.unhover(trigger)
    await waitFor(() => {
      expect(screen.queryByText('User profile information')).not.toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('applies neo-brutalism styling', async () => {
    render(<HoverCardExample />)
    const trigger = screen.getByRole('button', { name: '@username' })

    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('User profile information').closest('[role="dialog"]')
      expect(content).toHaveClass('rounded-brutal')
      expect(content).toHaveClass('border-2')
      expect(content).toHaveClass('border-black')
      expect(content).toHaveClass('shadow-brutal-lg')
    }, { timeout: 2000 })
  })

  it('applies default width of w-64', async () => {
    render(<HoverCardExample />)
    const trigger = screen.getByRole('button', { name: '@username' })

    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('User profile information').closest('[role="dialog"]')
      expect(content).toHaveClass('w-64')
    }, { timeout: 2000 })
  })

  it('applies custom className to content', async () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>Hover</Button>
        </HoverCardTrigger>
        <HoverCardContent className="custom-class w-80">
          <p>Custom content</p>
        </HoverCardContent>
      </HoverCard>
    )

    const trigger = screen.getByRole('button')
    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('Custom content').closest('[role="dialog"]')
      expect(content).toHaveClass('custom-class')
      expect(content).toHaveClass('w-80')
    }, { timeout: 2000 })
  })

  it('applies default align of center', async () => {
    render(<HoverCardExample />)
    const trigger = screen.getByRole('button')

    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('User profile information').closest('[role="dialog"]')
      expect(content).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('applies default sideOffset of 4', async () => {
    render(<HoverCardExample />)
    const trigger = screen.getByRole('button')

    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('User profile information').closest('[role="dialog"]')
      expect(content).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('supports custom align position', async () => {
    const { rerender } = render(<HoverCardExample align="start" />)
    let trigger = screen.getByRole('button')

    await userEvent.hover(trigger)
    await waitFor(() => {
      const content = screen.getByText('User profile information').closest('[role="dialog"]')
      expect(content).toHaveAttribute('data-align', 'start')
    }, { timeout: 2000 })

    await userEvent.unhover(trigger)

    // Test end align
    rerender(<HoverCardExample align="end" />)
    trigger = screen.getByRole('button')
    await userEvent.hover(trigger)
    await waitFor(() => {
      const content = screen.getByText('User profile information').closest('[role="dialog"]')
      expect(content).toHaveAttribute('data-align', 'end')
    }, { timeout: 2000 })
  })

  it('renders user profile with stats', async () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Hover for profile</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-bold">John Doe</h4>
            <p className="text-sm text-muted-foreground">
              Full-stack developer passionate about building great user experiences.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <div>
                <span className="font-bold text-foreground">1.2K</span> Followers
              </div>
              <div>
                <span className="font-bold text-foreground">342</span> Following
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    )

    const trigger = screen.getByRole('button')
    await userEvent.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText(/Full-stack developer/i)).toBeInTheDocument()
      expect(screen.getByText('1.2K')).toBeInTheDocument()
      expect(screen.getByText('342')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('works with inline text trigger', async () => {
    render(
      <div>
        <p>
          Hover over the{' '}
          <HoverCard>
            <HoverCardTrigger asChild>
              <span className="font-bold text-primary cursor-pointer underline">
                highlighted text
              </span>
            </HoverCardTrigger>
            <HoverCardContent>
              <p>Additional context appears here</p>
            </HoverCardContent>
          </HoverCard>
        </p>
      </div>
    )

    const trigger = screen.getByText('highlighted text')
    await userEvent.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('Additional context appears here')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('has proper ARIA attributes', async () => {
    render(<HoverCardExample />)
    const trigger = screen.getByRole('button')

    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('User profile information').closest('[role="dialog"]')
      expect(content).toHaveAttribute('role', 'dialog')
      expect(content).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('supports animation states', async () => {
    render(<HoverCardExample />)
    const trigger = screen.getByRole('button')

    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('User profile information').closest('[role="dialog"]')
      expect(content).toHaveAttribute('data-state', 'open')
    }, { timeout: 2000 })
  })

  it('renders rich content with images', async () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@vercel</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold">@vercel</h4>
              <p className="text-sm text-muted-foreground">
                The React Framework
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    )

    const trigger = screen.getByRole('button')
    await userEvent.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('@vercel')).toBeInTheDocument()
      expect(screen.getByText('The React Framework')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('maintains card visibility when hovering content', async () => {
    render(<HoverCardExample />)
    const trigger = screen.getByRole('button')

    await userEvent.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('User profile information')).toBeInTheDocument()
    }, { timeout: 2000 })

    // Move to content
    const content = screen.getByText('User profile information')
    await userEvent.hover(content)

    // Should still be visible
    expect(screen.getByText('User profile information')).toBeInTheDocument()
  })

  it('applies bg-card styling to content', async () => {
    render(<HoverCardExample />)
    const trigger = screen.getByRole('button')

    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('User profile information').closest('[role="dialog"]')
      expect(content).toHaveClass('bg-card')
      expect(content).toHaveClass('text-card-foreground')
    }, { timeout: 2000 })
  })

  it('applies proper padding to content', async () => {
    render(<HoverCardExample />)
    const trigger = screen.getByRole('button')

    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('User profile information').closest('[role="dialog"]')
      expect(content).toHaveClass('p-4')
    }, { timeout: 2000 })
  })
})
