import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Separator } from '../separator'

describe('Separator', () => {
  it('renders without crashing', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with horizontal orientation by default', () => {
    const { container } = render(<Separator />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
    expect(separator).toHaveClass('h-[1px]', 'w-full')
  })

  it('renders with vertical orientation', () => {
    const { container } = render(<Separator orientation="vertical" />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveAttribute('aria-orientation', 'vertical')
    expect(separator).toHaveClass('h-full', 'w-[1px]')
  })

  it('is decorative by default', () => {
    const { container } = render(<Separator />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveAttribute('role', 'none')
  })

  it('has separator role when not decorative', () => {
    const { container } = render(<Separator decorative={false} />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveAttribute('role', 'separator')
  })

  it('applies border color styles', () => {
    const { container } = render(<Separator />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveClass('bg-border')
  })

  it('applies shrink-0 style', () => {
    const { container } = render(<Separator />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveClass('shrink-0')
  })

  it('applies custom className', () => {
    const { container } = render(<Separator className="custom-class" />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveClass('custom-class')
  })

  it('applies correct horizontal styles', () => {
    const { container } = render(<Separator orientation="horizontal" />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveClass('h-[1px]')
    expect(separator).toHaveClass('w-full')
    expect(separator).not.toHaveClass('w-[1px]')
  })

  it('applies correct vertical styles', () => {
    const { container } = render(<Separator orientation="vertical" />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveClass('w-[1px]')
    expect(separator).toHaveClass('h-full')
    expect(separator).not.toHaveClass('h-[1px]')
  })

  it('merges custom styles with default styles', () => {
    const { container } = render(<Separator className="my-4" />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveClass('my-4')
    expect(separator).toHaveClass('bg-border')
  })

  it('supports additional HTML div attributes', () => {
    const { container } = render(<Separator data-testid="test-separator" />)
    const separator = container.firstChild as HTMLElement
    expect(separator).toHaveAttribute('data-testid', 'test-separator')
  })

  it('can be used in flex layouts', () => {
    const { container } = render(
      <div className="flex items-center gap-4">
        <span>Left</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Right</span>
      </div>
    )
    const separator = container.querySelector('.w-\\[1px\\]')
    expect(separator).toBeInTheDocument()
  })

  it('can be used as horizontal divider', () => {
    const { container } = render(
      <div>
        <p>Above</p>
        <Separator className="my-4" />
        <p>Below</p>
      </div>
    )
    const separator = container.querySelector('.h-\\[1px\\]')
    expect(separator).toBeInTheDocument()
  })

  it('maintains accessibility with decorative prop', () => {
    const { container: decorativeContainer } = render(<Separator decorative={true} />)
    const decorativeSeparator = decorativeContainer.firstChild as HTMLElement
    expect(decorativeSeparator).toHaveAttribute('role', 'none')

    const { container: nonDecorativeContainer } = render(<Separator decorative={false} />)
    const nonDecorativeSeparator = nonDecorativeContainer.firstChild as HTMLElement
    expect(nonDecorativeSeparator).toHaveAttribute('role', 'separator')
  })
})
