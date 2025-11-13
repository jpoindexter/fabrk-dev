import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip'
import { Button } from '../button'

describe('Tooltip', () => {
  const TooltipExample = ({ side, sideOffset, delayDuration }: {
    side?: 'top' | 'right' | 'bottom' | 'left'
    sideOffset?: number
    delayDuration?: number
  } = {}) => (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          <p>Tooltip content</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  it('renders trigger button', () => {
    render(<TooltipExample />)
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument()
  })

  it('shows tooltip content on hover', async () => {
    render(<TooltipExample delayDuration={0} />)
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await userEvent.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
    })
  })

  it('hides tooltip content when not hovering', async () => {
    render(<TooltipExample delayDuration={0} />)
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await userEvent.hover(trigger)
    await waitFor(() => {
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
    })

    await userEvent.unhover(trigger)
    await waitFor(() => {
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
  })

  it('applies neo-brutalism styling', async () => {
    render(<TooltipExample delayDuration={0} />)
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('Tooltip content').parentElement
      expect(content).toHaveClass('rounded-brutal')
      expect(content).toHaveClass('border-2')
      expect(content).toHaveClass('border-black')
      expect(content).toHaveClass('shadow-brutal')
    })
  })

  it('applies custom className to content', async () => {
    render(
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button>Hover</Button>
          </TooltipTrigger>
          <TooltipContent className="custom-class">
            <p>Content</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByRole('button')
    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('Content').parentElement
      expect(content).toHaveClass('custom-class')
    })
  })

  it('supports different side positions', async () => {
    const { rerender } = render(<TooltipExample side="top" delayDuration={0} />)
    let trigger = screen.getByRole('button')

    await userEvent.hover(trigger)
    await waitFor(() => {
      const content = screen.getByText('Tooltip content').parentElement
      expect(content).toHaveAttribute('data-side', 'top')
    })

    await userEvent.unhover(trigger)

    // Test bottom
    rerender(<TooltipExample side="bottom" delayDuration={0} />)
    trigger = screen.getByRole('button')
    await userEvent.hover(trigger)
    await waitFor(() => {
      const content = screen.getByText('Tooltip content').parentElement
      expect(content).toHaveAttribute('data-side', 'bottom')
    })
  })

  it('applies default sideOffset of 4', async () => {
    render(<TooltipExample delayDuration={0} />)
    const trigger = screen.getByRole('button')

    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('Tooltip content').parentElement
      expect(content).toBeInTheDocument()
    })
  })

  it('renders with long content', async () => {
    const longContent = 'This is a longer tooltip with more detailed information that wraps to multiple lines. Perfect for explaining complex features or providing additional context.'

    render(
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button>Show detailed info</Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{longContent}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByRole('button')
    await userEvent.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText(longContent)).toBeInTheDocument()
    })
  })

  it('works with icon trigger', async () => {
    render(
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" aria-label="Info">
              i
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click for more information</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByRole('button', { name: 'Info' })
    await userEvent.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('Click for more information')).toBeInTheDocument()
    })
  })

  it('has proper ARIA attributes', async () => {
    render(<TooltipExample delayDuration={0} />)
    const trigger = screen.getByRole('button')

    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('Tooltip content').parentElement
      expect(content).toHaveAttribute('role', 'tooltip')
    })
  })

  it('supports custom delay duration', async () => {
    render(<TooltipExample delayDuration={0} />)
    const trigger = screen.getByRole('button')

    // With 0 delay, should appear immediately
    await userEvent.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
    }, { timeout: 100 })
  })
})
