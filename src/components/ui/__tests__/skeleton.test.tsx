import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skeleton } from '../skeleton'

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('renders skeleton element', () => {
      render(<Skeleton data-testid="skeleton" />)
      expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    })

    it('renders as a div element', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton.tagName).toBe('DIV')
    })

    it('applies base skeleton styles', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')

      expect(skeleton).toHaveClass('animate-pulse')
      expect(skeleton).toHaveClass('rounded-brutal')
      expect(skeleton).toHaveClass('bg-muted')
      expect(skeleton).toHaveClass('border-2')
      expect(skeleton).toHaveClass('border-black/10')
    })

    it('applies custom className', () => {
      render(<Skeleton className="custom-class" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('custom-class')
    })

    it('merges custom className with base classes', () => {
      render(<Skeleton className="h-10 w-10" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')

      expect(skeleton).toHaveClass('h-10')
      expect(skeleton).toHaveClass('w-10')
      expect(skeleton).toHaveClass('animate-pulse')
      expect(skeleton).toHaveClass('bg-muted')
    })
  })

  describe('Size Variants', () => {
    it('renders with small size', () => {
      render(<Skeleton className="w-[100px] h-[20px]" data-testid="small-skeleton" />)
      const skeleton = screen.getByTestId('small-skeleton')

      expect(skeleton).toHaveClass('w-[100px]')
      expect(skeleton).toHaveClass('h-[20px]')
    })

    it('renders with medium size', () => {
      render(<Skeleton className="h-[125px] w-[250px]" data-testid="medium-skeleton" />)
      const skeleton = screen.getByTestId('medium-skeleton')

      expect(skeleton).toHaveClass('h-[125px]')
      expect(skeleton).toHaveClass('w-[250px]')
    })

    it('renders with full width', () => {
      render(<Skeleton className="w-full h-12" data-testid="full-width-skeleton" />)
      const skeleton = screen.getByTestId('full-width-skeleton')

      expect(skeleton).toHaveClass('w-full')
      expect(skeleton).toHaveClass('h-12')
    })
  })

  describe('Shape Variants', () => {
    it('renders with default brutal rounded style', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')

      expect(skeleton).toHaveClass('rounded-brutal')
    })

    it('renders with circular shape', () => {
      render(<Skeleton className="rounded-full h-12 w-12" data-testid="circle-skeleton" />)
      const skeleton = screen.getByTestId('circle-skeleton')

      expect(skeleton).toHaveClass('rounded-full')
      expect(skeleton).toHaveClass('h-12')
      expect(skeleton).toHaveClass('w-12')
    })

    it('renders with custom border radius', () => {
      render(<Skeleton className="rounded-lg" data-testid="custom-skeleton" />)
      const skeleton = screen.getByTestId('custom-skeleton')

      expect(skeleton).toHaveClass('rounded-lg')
    })
  })

  describe('Card Skeleton Pattern', () => {
    it('renders card skeleton structure', () => {
      render(
        <div data-testid="card-skeleton">
          <Skeleton className="h-[125px] w-[250px] rounded-brutal" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )

      const cardSkeleton = screen.getByTestId('card-skeleton')
      const skeletons = cardSkeleton.querySelectorAll('[class*="animate-pulse"]')

      expect(skeletons).toHaveLength(3)
    })
  })

  describe('Profile Skeleton Pattern', () => {
    it('renders profile skeleton structure', () => {
      render(
        <div data-testid="profile-skeleton" className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )

      const profileSkeleton = screen.getByTestId('profile-skeleton')
      const skeletons = profileSkeleton.querySelectorAll('[class*="animate-pulse"]')

      expect(skeletons).toHaveLength(3)

      const avatar = skeletons[0]
      expect(avatar).toHaveClass('rounded-full')
      expect(avatar).toHaveClass('h-12')
      expect(avatar).toHaveClass('w-12')
    })
  })

  describe('List Skeleton Pattern', () => {
    it('renders list of skeleton items', () => {
      render(
        <div data-testid="list-skeleton" className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-brutal" />
          ))}
        </div>
      )

      const listSkeleton = screen.getByTestId('list-skeleton')
      const skeletons = listSkeleton.querySelectorAll('[class*="animate-pulse"]')

      expect(skeletons).toHaveLength(5)

      skeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass('h-12')
        expect(skeleton).toHaveClass('w-full')
        expect(skeleton).toHaveClass('rounded-brutal')
      })
    })
  })

  describe('Text Skeleton Pattern', () => {
    it('renders text line skeletons', () => {
      render(
        <div data-testid="text-skeleton" className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      )

      const textSkeleton = screen.getByTestId('text-skeleton')
      const skeletons = textSkeleton.querySelectorAll('[class*="animate-pulse"]')

      expect(skeletons).toHaveLength(3)
      expect(skeletons[0]).toHaveClass('w-full')
      expect(skeletons[1]).toHaveClass('w-5/6')
      expect(skeletons[2]).toHaveClass('w-4/6')
    })
  })

  describe('Animation', () => {
    it('has pulse animation', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')

      expect(skeleton).toHaveClass('animate-pulse')
    })

    it('maintains animation across re-renders', () => {
      const { rerender } = render(<Skeleton data-testid="skeleton" />)

      expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse')

      rerender(<Skeleton data-testid="skeleton" className="h-10 w-10" />)

      expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse')
    })
  })

  describe('Accessibility', () => {
    it('can have aria-label for screen readers', () => {
      render(<Skeleton aria-label="Loading content" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')

      expect(skeleton).toHaveAttribute('aria-label', 'Loading content')
    })

    it('can have aria-busy attribute', () => {
      render(<Skeleton aria-busy="true" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')

      expect(skeleton).toHaveAttribute('aria-busy', 'true')
    })

    it('can have role attribute', () => {
      render(<Skeleton role="status" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')

      expect(skeleton).toHaveAttribute('role', 'status')
    })
  })

  describe('HTML Attributes', () => {
    it('accepts standard HTML div attributes', () => {
      render(
        <Skeleton
          id="my-skeleton"
          data-testid="skeleton"
          title="Loading..."
        />
      )
      const skeleton = screen.getByTestId('skeleton')

      expect(skeleton).toHaveAttribute('id', 'my-skeleton')
      expect(skeleton).toHaveAttribute('title', 'Loading...')
    })

    it('forwards ref', () => {
      const ref = { current: null }
      render(<Skeleton ref={ref as any} data-testid="skeleton" />)

      expect(ref.current).not.toBeNull()
    })
  })

  describe('Composition', () => {
    it('can be nested in other components', () => {
      render(
        <div data-testid="container">
          <div className="border p-4">
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      )

      const container = screen.getByTestId('container')
      const skeleton = container.querySelector('[class*="animate-pulse"]')

      expect(skeleton).toBeInTheDocument()
    })

    it('can contain child elements if needed', () => {
      render(
        <Skeleton data-testid="skeleton">
          <span className="sr-only">Loading...</span>
        </Skeleton>
      )

      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toContainHTML('<span class="sr-only">Loading...</span>')
    })
  })

  describe('Multiple Skeletons', () => {
    it('renders multiple independent skeletons', () => {
      render(
        <div>
          <Skeleton className="h-10 w-10" data-testid="skeleton-1" />
          <Skeleton className="h-20 w-20" data-testid="skeleton-2" />
          <Skeleton className="h-30 w-30" data-testid="skeleton-3" />
        </div>
      )

      expect(screen.getByTestId('skeleton-1')).toHaveClass('h-10', 'w-10')
      expect(screen.getByTestId('skeleton-2')).toHaveClass('h-20', 'w-20')
      expect(screen.getByTestId('skeleton-3')).toHaveClass('h-30', 'w-30')
    })
  })

  describe('Responsive Variants', () => {
    it('applies responsive classes', () => {
      render(
        <Skeleton
          className="h-10 w-full md:h-20 md:w-1/2"
          data-testid="responsive-skeleton"
        />
      )
      const skeleton = screen.getByTestId('responsive-skeleton')

      expect(skeleton).toHaveClass('h-10')
      expect(skeleton).toHaveClass('w-full')
      expect(skeleton).toHaveClass('md:h-20')
      expect(skeleton).toHaveClass('md:w-1/2')
    })
  })

  describe('Edge Cases', () => {
    it('renders with no className', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')

      expect(skeleton).toHaveClass('animate-pulse')
      expect(skeleton).toHaveClass('bg-muted')
    })

    it('handles empty string className', () => {
      render(<Skeleton className="" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')

      expect(skeleton).toHaveClass('animate-pulse')
    })

    it('handles very long className', () => {
      const longClassName = 'h-10 w-10 rounded-full border-4 border-primary bg-secondary shadow-lg hover:shadow-xl transition-all duration-300'
      render(<Skeleton className={longClassName} data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')

      expect(skeleton).toHaveClass('h-10')
      expect(skeleton).toHaveClass('rounded-full')
      expect(skeleton).toHaveClass('transition-all')
    })
  })
})
