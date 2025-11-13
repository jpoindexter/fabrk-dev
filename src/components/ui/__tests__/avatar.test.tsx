import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar, AvatarImage, AvatarFallback } from '../avatar'

describe('Avatar', () => {
  it('renders fallback when no image', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders image when provided', () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByRole('img', { name: 'User avatar' })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Avatar className="custom-class" data-testid="avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByTestId('avatar')).toHaveClass('custom-class')
  })
})
