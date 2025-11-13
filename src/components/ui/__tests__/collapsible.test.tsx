import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../collapsible'
import { Button } from '../button'

describe('Collapsible', () => {
  const CollapsibleExample = ({
    open = false,
    onOpenChange = vi.fn(),
  }: {
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }) => (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <CollapsibleTrigger asChild>
        <Button>Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div>Collapsible content</div>
      </CollapsibleContent>
    </Collapsible>
  )

  it('renders closed by default', () => {
    render(<CollapsibleExample />)
    expect(screen.getByText('Toggle')).toBeInTheDocument()
    expect(screen.queryByText('Collapsible content')).not.toBeVisible()
  })

  it('renders open when open prop is true', () => {
    render(<CollapsibleExample open={true} />)
    expect(screen.getByText('Collapsible content')).toBeVisible()
  })

  it('toggles content on trigger click', async () => {
    const handleOpenChange = vi.fn()
    render(<CollapsibleExample onOpenChange={handleOpenChange} />)

    await userEvent.click(screen.getByText('Toggle'))
    expect(handleOpenChange).toHaveBeenCalledWith(true)
  })

  it('has correct aria-expanded attribute', () => {
    const { rerender } = render(<CollapsibleExample open={false} />)
    const trigger = screen.getByText('Toggle')

    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    rerender(<CollapsibleExample open={true} />)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('supports keyboard navigation', async () => {
    const handleOpenChange = vi.fn()
    render(<CollapsibleExample onOpenChange={handleOpenChange} />)

    const trigger = screen.getByText('Toggle')
    trigger.focus()

    await userEvent.keyboard('{Enter}')
    expect(handleOpenChange).toHaveBeenCalledWith(true)
  })

  it('renders multiple collapsibles independently', async () => {
    const { container } = render(
      <div>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button>Toggle 1</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>Content 1</CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button>Toggle 2</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>Content 2</CollapsibleContent>
        </Collapsible>
      </div>
    )

    expect(screen.getByText('Toggle 1')).toBeInTheDocument()
    expect(screen.getByText('Toggle 2')).toBeInTheDocument()
    expect(container.querySelectorAll('button')).toHaveLength(2)
  })

  it('applies custom className to trigger', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button className="custom-trigger">Custom</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    )

    expect(screen.getByText('Custom')).toHaveClass('custom-trigger')
  })

  it('applies custom className to content', () => {
    render(
      <Collapsible open={true}>
        <CollapsibleTrigger asChild>
          <Button>Toggle</Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="custom-content">
          Content
        </CollapsibleContent>
      </Collapsible>
    )

    const content = screen.getByText('Content').parentElement
    expect(content).toHaveClass('custom-content')
  })

  it('supports disabled state', () => {
    render(
      <Collapsible disabled>
        <CollapsibleTrigger asChild>
          <Button disabled>Disabled</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    )

    expect(screen.getByText('Disabled')).toBeDisabled()
  })

  it('renders FAQ-style collapsibles', () => {
    render(
      <div>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button>What is React?</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            React is a JavaScript library for building user interfaces.
          </CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button>How do I get started?</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            You can get started by installing React using npm or yarn.
          </CollapsibleContent>
        </Collapsible>
      </div>
    )

    expect(screen.getByText('What is React?')).toBeInTheDocument()
    expect(screen.getByText('How do I get started?')).toBeInTheDocument()
  })
})
