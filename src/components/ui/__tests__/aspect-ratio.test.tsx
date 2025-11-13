import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AspectRatio } from '../aspect-ratio'

describe('AspectRatio', () => {
  it('renders children correctly', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div>Test content</div>
      </AspectRatio>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders image with correct aspect ratio', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img src="test.jpg" alt="Test image" />
      </AspectRatio>
    )

    const image = screen.getByRole('img', { name: 'Test image' })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'test.jpg')
  })

  it('applies square aspect ratio (1:1)', () => {
    const { container } = render(
      <AspectRatio ratio={1 / 1}>
        <div>Square content</div>
      </AspectRatio>
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveStyle({ paddingBottom: '100%' })
  })

  it('applies video aspect ratio (16:9)', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Video content</div>
      </AspectRatio>
    )

    const wrapper = container.firstChild as HTMLElement
    const expectedPadding = (9 / 16) * 100
    expect(wrapper).toHaveStyle({ paddingBottom: `${expectedPadding}%` })
  })

  it('applies portrait aspect ratio (3:4)', () => {
    const { container } = render(
      <AspectRatio ratio={3 / 4}>
        <div>Portrait content</div>
      </AspectRatio>
    )

    const wrapper = container.firstChild as HTMLElement
    const expectedPadding = (4 / 3) * 100
    expect(wrapper).toHaveStyle({ paddingBottom: `${expectedPadding}%` })
  })

  it('renders placeholder div with aspect ratio', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div className="bg-muted">16:9 Aspect Ratio</div>
      </AspectRatio>
    )

    expect(screen.getByText('16:9 Aspect Ratio')).toBeInTheDocument()
  })

  it('applies custom className to children', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div className="custom-class">Content</div>
      </AspectRatio>
    )

    expect(screen.getByText('Content')).toHaveClass('custom-class')
  })

  it('handles custom ratio values', () => {
    const { container } = render(
      <AspectRatio ratio={21 / 9}>
        <div>Ultrawide content</div>
      </AspectRatio>
    )

    const wrapper = container.firstChild as HTMLElement
    const expectedPadding = (9 / 21) * 100
    expect(wrapper).toHaveStyle({ paddingBottom: `${expectedPadding}%` })
  })

  it('renders multiple aspect ratios', () => {
    const { container } = render(
      <div>
        <AspectRatio ratio={1 / 1}>
          <div>Square</div>
        </AspectRatio>
        <AspectRatio ratio={16 / 9}>
          <div>Video</div>
        </AspectRatio>
        <AspectRatio ratio={3 / 4}>
          <div>Portrait</div>
        </AspectRatio>
      </div>
    )

    expect(screen.getByText('Square')).toBeInTheDocument()
    expect(screen.getByText('Video')).toBeInTheDocument()
    expect(screen.getByText('Portrait')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-radix-aspect-ratio-wrapper]')).toHaveLength(3)
  })

  it('maintains aspect ratio with responsive images', () => {
    render(
      <div className="w-[450px]">
        <AspectRatio ratio={16 / 9}>
          <img
            src="https://images.unsplash.com/photo-test"
            alt="Responsive image"
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
    )

    const image = screen.getByRole('img', { name: 'Responsive image' })
    expect(image).toHaveClass('w-full', 'h-full', 'object-cover')
  })

  it('supports video elements', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <video src="test.mp4" controls>
          <track kind="captions" />
        </video>
      </AspectRatio>
    )

    const video = document.querySelector('video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', 'test.mp4')
  })

  it('supports iframe elements', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://example.com"
          title="Embedded content"
          className="w-full h-full"
        />
      </AspectRatio>
    )

    const iframe = screen.getByTitle('Embedded content')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveClass('w-full', 'h-full')
  })
})
