import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card'

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card>Card Content</Card>)
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('renders as div by default', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.querySelector('div[data-slot="card"]')).toBeInTheDocument()
  })

  it('renders as article when as prop is article', () => {
    const { container } = render(<Card as="article">Content</Card>)
    expect(container.querySelector('article[data-slot="card"]')).toBeInTheDocument()
  })

  it('renders as section when as prop is section', () => {
    const { container } = render(<Card as="section">Content</Card>)
    expect(container.querySelector('section[data-slot="card"]')).toBeInTheDocument()
  })

  it('applies border and background styles', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('[data-slot="card"]')
    expect(card).toHaveClass('border', 'bg-card')
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const card = container.querySelector('[data-slot="card"]')
    expect(card).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument()
  })

  it('applies focus-within ring styles', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('[data-slot="card"]')
    expect(card).toHaveClass('focus-within:ring-2')
  })
})

describe('CardHeader', () => {
  it('renders without crashing', () => {
    render(<CardHeader>Header Content</CardHeader>)
    expect(screen.getByText('Header Content')).toBeInTheDocument()
  })

  it('applies correct padding and spacing styles', () => {
    const { container } = render(<CardHeader>Header</CardHeader>)
    const header = container.querySelector('[data-slot="card-header"]')
    expect(header).toHaveClass('p-6', 'space-y-2')
  })

  it('applies custom className', () => {
    const { container } = render(<CardHeader className="custom-class">Header</CardHeader>)
    const header = container.querySelector('[data-slot="card-header"]')
    expect(header).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    const { container } = render(<CardHeader>Header</CardHeader>)
    expect(container.querySelector('[data-slot="card-header"]')).toBeInTheDocument()
  })
})

describe('CardTitle', () => {
  it('renders without crashing', () => {
    render(<CardTitle>Title Text</CardTitle>)
    expect(screen.getByText('Title Text')).toBeInTheDocument()
  })

  it('renders as h3 by default', () => {
    const { container } = render(<CardTitle>Title</CardTitle>)
    expect(container.querySelector('h3[data-slot="card-title"]')).toBeInTheDocument()
  })

  it('renders as h1 when as prop is h1', () => {
    const { container } = render(<CardTitle as="h1">Title</CardTitle>)
    expect(container.querySelector('h1[data-slot="card-title"]')).toBeInTheDocument()
  })

  it('renders as h2 when as prop is h2', () => {
    const { container } = render(<CardTitle as="h2">Title</CardTitle>)
    expect(container.querySelector('h2[data-slot="card-title"]')).toBeInTheDocument()
  })

  it('applies correct typography styles', () => {
    const { container } = render(<CardTitle>Title</CardTitle>)
    const title = container.querySelector('[data-slot="card-title"]')
    expect(title).toHaveClass('text-[20px]', 'font-semibold')
  })

  it('applies custom className', () => {
    const { container } = render(<CardTitle className="custom-class">Title</CardTitle>)
    const title = container.querySelector('[data-slot="card-title"]')
    expect(title).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    const { container } = render(<CardTitle>Title</CardTitle>)
    expect(container.querySelector('[data-slot="card-title"]')).toBeInTheDocument()
  })
})

describe('CardDescription', () => {
  it('renders without crashing', () => {
    render(<CardDescription>Description text</CardDescription>)
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('renders as paragraph element', () => {
    const { container } = render(<CardDescription>Description</CardDescription>)
    expect(container.querySelector('p[data-slot="card-description"]')).toBeInTheDocument()
  })

  it('applies correct typography styles', () => {
    const { container } = render(<CardDescription>Description</CardDescription>)
    const description = container.querySelector('[data-slot="card-description"]')
    expect(description).toHaveClass('text-[14px]', 'text-muted-foreground')
  })

  it('applies custom className', () => {
    const { container } = render(<CardDescription className="custom-class">Description</CardDescription>)
    const description = container.querySelector('[data-slot="card-description"]')
    expect(description).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    const { container } = render(<CardDescription>Description</CardDescription>)
    expect(container.querySelector('[data-slot="card-description"]')).toBeInTheDocument()
  })
})

describe('CardContent', () => {
  it('renders without crashing', () => {
    render(<CardContent>Content text</CardContent>)
    expect(screen.getByText('Content text')).toBeInTheDocument()
  })

  it('applies correct padding styles', () => {
    const { container } = render(<CardContent>Content</CardContent>)
    const content = container.querySelector('[data-slot="card-content"]')
    expect(content).toHaveClass('px-6', 'pb-6', 'pt-0')
  })

  it('applies custom className', () => {
    const { container } = render(<CardContent className="custom-class">Content</CardContent>)
    const content = container.querySelector('[data-slot="card-content"]')
    expect(content).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    const { container } = render(<CardContent>Content</CardContent>)
    expect(container.querySelector('[data-slot="card-content"]')).toBeInTheDocument()
  })
})

describe('CardFooter', () => {
  it('renders without crashing', () => {
    render(<CardFooter>Footer text</CardFooter>)
    expect(screen.getByText('Footer text')).toBeInTheDocument()
  })

  it('applies flex layout styles', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>)
    const footer = container.querySelector('[data-slot="card-footer"]')
    expect(footer).toHaveClass('flex', 'items-center')
  })

  it('applies correct padding styles', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>)
    const footer = container.querySelector('[data-slot="card-footer"]')
    expect(footer).toHaveClass('px-6', 'pb-6', 'pt-0')
  })

  it('applies custom className', () => {
    const { container } = render(<CardFooter className="custom-class">Footer</CardFooter>)
    const footer = container.querySelector('[data-slot="card-footer"]')
    expect(footer).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>)
    expect(container.querySelector('[data-slot="card-footer"]')).toBeInTheDocument()
  })
})

describe('Card - Full Composition', () => {
  it('renders complete card with all sub-components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Main Content</CardContent>
        <CardFooter>Footer Content</CardFooter>
      </Card>
    )

    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Main Content')).toBeInTheDocument()
    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })
})
