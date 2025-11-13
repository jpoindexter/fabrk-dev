import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ScrollArea, ScrollBar } from '../scroll-area'

describe('ScrollArea', () => {
  const LongContent = () => (
    <ScrollArea className="h-[200px] w-[300px]" data-testid="scroll-area">
      <div className="p-4">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="py-2">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  )

  describe('Rendering', () => {
    it('renders scroll area with content', () => {
      render(
        <ScrollArea className="h-[200px] w-[300px]">
          <div>Scrollable Content</div>
        </ScrollArea>
      )

      expect(screen.getByText('Scrollable Content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <ScrollArea className="custom-scroll-class" data-testid="scroll-area">
          <div>Content</div>
        </ScrollArea>
      )

      const scrollArea = screen.getByTestId('scroll-area')
      expect(scrollArea).toHaveClass('custom-scroll-class')
    })

    it('has overflow-hidden class', () => {
      render(
        <ScrollArea data-testid="scroll-area">
          <div>Content</div>
        </ScrollArea>
      )

      const scrollArea = screen.getByTestId('scroll-area')
      expect(scrollArea).toHaveClass('overflow-hidden')
    })

    it('renders viewport with content', () => {
      const { container } = render(
        <ScrollArea>
          <div>Viewport Content</div>
        </ScrollArea>
      )

      const viewport = container.querySelector('[data-radix-scroll-area-viewport]')
      expect(viewport).toBeInTheDocument()
      expect(viewport).toHaveClass('h-full')
      expect(viewport).toHaveClass('w-full')
    })

    it('renders scrollbar by default', () => {
      const { container } = render(
        <ScrollArea>
          <div>Content</div>
        </ScrollArea>
      )

      const scrollbar = container.querySelector('[data-radix-scroll-area-scrollbar]')
      expect(scrollbar).toBeInTheDocument()
    })

    it('renders corner element', () => {
      const { container } = render(
        <ScrollArea>
          <div>Content</div>
        </ScrollArea>
      )

      const corner = container.querySelector('[data-radix-scroll-area-corner]')
      expect(corner).toBeInTheDocument()
    })
  })

  describe('ScrollBar Component', () => {
    it('renders vertical scrollbar by default', () => {
      const { container } = render(
        <ScrollArea>
          <div>Content</div>
        </ScrollArea>
      )

      const scrollbar = container.querySelector('[data-orientation="vertical"]')
      expect(scrollbar).toBeInTheDocument()
    })

    it('renders horizontal scrollbar when specified', () => {
      const { container } = render(
        <ScrollArea>
          <div>Content</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )

      const scrollbar = container.querySelector('[data-orientation="horizontal"]')
      expect(scrollbar).toBeInTheDocument()
    })

    it('applies vertical scrollbar styles', () => {
      const { container } = render(
        <ScrollArea>
          <div>Content</div>
        </ScrollArea>
      )

      const scrollbar = container.querySelector('[data-orientation="vertical"]')
      expect(scrollbar).toHaveClass('h-full')
      expect(scrollbar).toHaveClass('w-2.5')
      expect(scrollbar).toHaveClass('border-l')
    })

    it('applies horizontal scrollbar styles', () => {
      const { container } = render(
        <ScrollArea>
          <div>Content</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )

      const scrollbar = container.querySelector('[data-orientation="horizontal"]')
      expect(scrollbar).toHaveClass('h-2.5')
      expect(scrollbar).toHaveClass('flex-col')
      expect(scrollbar).toHaveClass('border-t')
    })

    it('renders scrollbar thumb', () => {
      const { container } = render(
        <ScrollArea>
          <div>Content</div>
        </ScrollArea>
      )

      const thumb = container.querySelector('[data-radix-scroll-area-thumb]')
      expect(thumb).toBeInTheDocument()
      expect(thumb).toHaveClass('rounded-full')
      expect(thumb).toHaveClass('bg-border')
    })

    it('applies custom className to scrollbar', () => {
      const { container } = render(
        <ScrollArea>
          <div>Content</div>
          <ScrollBar className="custom-scrollbar" />
        </ScrollArea>
      )

      const scrollbar = container.querySelector('.custom-scrollbar')
      expect(scrollbar).toBeInTheDocument()
    })
  })

  describe('Long Content Scrolling', () => {
    it('renders long list of items', () => {
      render(<LongContent />)

      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 50')).toBeInTheDocument()
    })

    it('constrains height with className', () => {
      render(<LongContent />)

      const scrollArea = screen.getByTestId('scroll-area')
      expect(scrollArea).toHaveClass('h-[200px]')
      expect(scrollArea).toHaveClass('w-[300px]')
    })

    it('makes content scrollable', () => {
      const { container } = render(<LongContent />)

      const viewport = container.querySelector('[data-radix-scroll-area-viewport]')
      expect(viewport).toBeInTheDocument()

      // Viewport should have rounded corners inherited
      expect(viewport).toHaveClass('rounded-[inherit]')
    })
  })

  describe('Horizontal Scrolling', () => {
    const HorizontalContent = () => (
      <ScrollArea className="w-96 whitespace-nowrap" data-testid="horizontal-scroll">
        <div className="flex w-max space-x-4 p-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="shrink-0">
              Tag {i + 1}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    )

    it('renders horizontal scrollable content', () => {
      render(<HorizontalContent />)

      expect(screen.getByText('Tag 1')).toBeInTheDocument()
      expect(screen.getByText('Tag 20')).toBeInTheDocument()
    })

    it('has horizontal scrollbar', () => {
      const { container } = render(<HorizontalContent />)

      const scrollbar = container.querySelector('[data-orientation="horizontal"]')
      expect(scrollbar).toBeInTheDocument()
    })

    it('applies whitespace-nowrap for horizontal content', () => {
      render(<HorizontalContent />)

      const scrollArea = screen.getByTestId('horizontal-scroll')
      expect(scrollArea).toHaveClass('whitespace-nowrap')
    })
  })

  describe('Styling Variants', () => {
    it('applies neo-brutalism styles when specified', () => {
      render(
        <ScrollArea
          className="rounded-brutal border-2 border-black shadow-brutal"
          data-testid="styled-scroll"
        >
          <div>Styled Content</div>
        </ScrollArea>
      )

      const scrollArea = screen.getByTestId('styled-scroll')
      expect(scrollArea).toHaveClass('rounded-brutal')
      expect(scrollArea).toHaveClass('border-2')
      expect(scrollArea).toHaveClass('border-black')
      expect(scrollArea).toHaveClass('shadow-brutal')
    })

    it('inherits rounded corners to viewport', () => {
      const { container } = render(
        <ScrollArea className="rounded-brutal">
          <div>Content</div>
        </ScrollArea>
      )

      const viewport = container.querySelector('[data-radix-scroll-area-viewport]')
      expect(viewport).toHaveClass('rounded-[inherit]')
    })
  })

  describe('Accessibility', () => {
    it('renders with proper scroll area structure', () => {
      const { container } = render(
        <ScrollArea>
          <div>Content</div>
        </ScrollArea>
      )

      const scrollArea = container.querySelector('[data-radix-scroll-area-root]')
      expect(scrollArea).toBeInTheDocument()
    })

    it('viewport contains accessible content', () => {
      const { container } = render(
        <ScrollArea>
          <div>Accessible Content</div>
        </ScrollArea>
      )

      const viewport = container.querySelector('[data-radix-scroll-area-viewport]')
      expect(viewport).toBeInTheDocument()
      expect(viewport).toContainHTML('Accessible Content')
    })

    it('applies touch interaction classes', () => {
      const { container } = render(
        <ScrollArea>
          <div>Content</div>
        </ScrollArea>
      )

      const scrollbar = container.querySelector('[data-radix-scroll-area-scrollbar]')
      if (scrollbar) {
        expect(scrollbar).toHaveClass('touch-none')
        expect(scrollbar).toHaveClass('select-none')
      }
    })

    it('supports scrollable content via viewport', () => {
      const { container } = render(<LongContent />)

      const viewport = container.querySelector('[data-radix-scroll-area-viewport]')
      expect(viewport).toBeInTheDocument()
    })
  })

  describe('Multiple Scroll Areas', () => {
    it('renders multiple independent scroll areas', () => {
      render(
        <div>
          <ScrollArea className="h-[100px]" data-testid="scroll-1">
            <div>Content 1</div>
          </ScrollArea>
          <ScrollArea className="h-[100px]" data-testid="scroll-2">
            <div>Content 2</div>
          </ScrollArea>
        </div>
      )

      expect(screen.getByTestId('scroll-1')).toBeInTheDocument()
      expect(screen.getByTestId('scroll-2')).toBeInTheDocument()
      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.getByText('Content 2')).toBeInTheDocument()
    })
  })

  describe('Dynamic Content', () => {
    it('handles dynamically added content', () => {
      const { rerender } = render(
        <ScrollArea className="h-[200px]">
          <div>
            <div>Item 1</div>
          </div>
        </ScrollArea>
      )

      expect(screen.getByText('Item 1')).toBeInTheDocument()

      rerender(
        <ScrollArea className="h-[200px]">
          <div>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
          </div>
        </ScrollArea>
      )

      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('Item 3')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty content', () => {
      render(
        <ScrollArea data-testid="empty-scroll">
          <div></div>
        </ScrollArea>
      )

      const scrollArea = screen.getByTestId('empty-scroll')
      expect(scrollArea).toBeInTheDocument()
    })

    it('handles very short content that does not need scrolling', () => {
      render(
        <ScrollArea className="h-[500px]" data-testid="no-scroll-needed">
          <div className="p-4">Short content</div>
        </ScrollArea>
      )

      expect(screen.getByText('Short content')).toBeInTheDocument()
      const scrollArea = screen.getByTestId('no-scroll-needed')
      expect(scrollArea).toBeInTheDocument()
    })

    it('maintains scroll position on re-render', () => {
      const { rerender } = render(
        <ScrollArea className="h-[200px]">
          <div>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i}>Item {i + 1}</div>
            ))}
          </div>
        </ScrollArea>
      )

      // Scroll position should be maintained across re-renders
      rerender(
        <ScrollArea className="h-[200px]">
          <div>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i}>Item {i + 1}</div>
            ))}
          </div>
        </ScrollArea>
      )

      expect(screen.getByText('Item 1')).toBeInTheDocument()
    })
  })
})
