import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
} from '../pagination'

describe('Pagination', () => {
  it('renders pagination nav', () => {
    render(
      <Pagination data-testid="pagination">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    const nav = screen.getByTestId('pagination')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('role', 'navigation')
    expect(nav).toHaveAttribute('aria-label', 'pagination')
  })

  it('renders page numbers correctly', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#page-1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#page-2">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#page-3">3</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('applies active state to current page', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#page-1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#page-2" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#page-3">3</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    const activePage = screen.getByText('2')
    expect(activePage).toHaveAttribute('aria-current', 'page')
  })

  it('handles previous button click', () => {
    const handleClick = vi.fn()
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#prev" onClick={handleClick} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    fireEvent.click(screen.getByText('Previous'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles next button click', () => {
    const handleClick = vi.fn()
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext href="#next" onClick={handleClick} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    fireEvent.click(screen.getByText('Next'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles first page button', () => {
    const handleClick = vi.fn()
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst href="#first" onClick={handleClick} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    const firstButton = screen.getByLabelText('Go to first page')
    expect(firstButton).toBeInTheDocument()
    fireEvent.click(firstButton)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles last page button', () => {
    const handleClick = vi.fn()
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLast href="#last" onClick={handleClick} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    const lastButton = screen.getByLabelText('Go to last page')
    expect(lastButton).toBeInTheDocument()
    fireEvent.click(lastButton)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders ellipsis for truncated pages', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#page-1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#page-10">10</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    expect(screen.getByText('More pages')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Pagination className="custom-pagination" data-testid="pagination">
        <PaginationContent className="custom-content">
          <PaginationItem className="custom-item">
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    expect(screen.getByTestId('pagination')).toHaveClass('custom-pagination')
  })

  it('navigates with keyboard', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#page-1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#page-2">2</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    const firstLink = screen.getByText('1')
    const secondLink = screen.getByText('2')

    firstLink.focus()
    expect(document.activeElement).toBe(firstLink)

    fireEvent.keyDown(firstLink, { key: 'Tab' })
  })

  it('renders complete pagination with all components', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst href="#first" />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious href="#prev" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#page-1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#page-2" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#page-3">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#page-10">10</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#next" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast href="#last" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument()
    expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page')
  })
})
