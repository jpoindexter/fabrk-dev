import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EmptyState } from '../empty-state'
import { Inbox, Search, Users } from 'lucide-react'

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No items found" />)
    expect(screen.getByText('No items found')).toBeInTheDocument()
  })

  it('renders title and description', () => {
    render(
      <EmptyState
        title="No results"
        description="Try adjusting your search filters"
      />
    )
    expect(screen.getByText('No results')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search filters')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    render(
      <EmptyState
        icon={Inbox}
        title="Empty inbox"
        description="No messages to display"
      />
    )
    expect(screen.getByText('Empty inbox')).toBeInTheDocument()
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('h-12', 'w-12', 'text-muted-foreground')
  })

  it('renders without icon', () => {
    render(<EmptyState title="No data" />)
    const svg = document.querySelector('svg')
    expect(svg).not.toBeInTheDocument()
  })

  it('renders with action button', () => {
    const handleAction = vi.fn()
    render(
      <EmptyState
        title="No items"
        action={{ label: 'Add item', onClick: handleAction }}
      />
    )
    const button = screen.getByText('Add item')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('renders without action button', () => {
    render(<EmptyState title="Empty" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <EmptyState
        title="Custom"
        className="custom-empty-state"
      />
    )
    const element = container.querySelector('.custom-empty-state')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('custom-empty-state')
  })

  it('renders complete empty state with all props', () => {
    const handleAction = vi.fn()
    render(
      <EmptyState
        icon={Search}
        title="No search results"
        description="We couldn't find what you're looking for. Try different keywords."
        action={{ label: 'Clear filters', onClick: handleAction }}
      />
    )

    expect(screen.getByText('No search results')).toBeInTheDocument()
    expect(screen.getByText("We couldn't find what you're looking for. Try different keywords.")).toBeInTheDocument()

    const button = screen.getByText('Clear filters')
    fireEvent.click(button)
    expect(handleAction).toHaveBeenCalled()
  })

  it('centers content', () => {
    const { container } = render(<EmptyState title="Centered" />)
    const element = container.querySelector('.flex')
    expect(element).toBeInTheDocument()
    expect(element?.className).toContain('items-center')
    expect(element?.className).toContain('justify-center')
    expect(element?.className).toContain('text-center')
  })

  it('applies proper text styles', () => {
    render(
      <EmptyState
        title="Styled text"
        description="Description text"
      />
    )
    const title = screen.getByText('Styled text')
    const description = screen.getByText('Description text')

    expect(title.className).toContain('text-lg')
    expect(title.className).toContain('font-semibold')
    expect(description.className).toContain('text-sm')
    expect(description.className).toContain('text-muted-foreground')
  })

  it('renders with Users icon', () => {
    render(
      <EmptyState
        icon={Users}
        title="No users"
        description="Invite users to get started"
      />
    )
    expect(screen.getByText('No users')).toBeInTheDocument()
  })

  it('icon container has proper styling', () => {
    const { container } = render(
      <EmptyState
        icon={Inbox}
        title="Test"
      />
    )
    const iconContainer = container.querySelector('.rounded-md.border.bg-muted.p-4')
    expect(iconContainer).toBeInTheDocument()
  })

  it('description has max width constraint', () => {
    render(
      <EmptyState
        title="Test"
        description="Long description text that should be constrained"
      />
    )
    const description = screen.getByText('Long description text that should be constrained')
    expect(description.className).toContain('max-w-sm')
  })
})
